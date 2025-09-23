#!/bin/bash
# Fix Cloudflare DNS for truthmatters.tdstudiosny.com + www.truthmatters.tdstudiosny.com

# --- CONFIG ---
CF_API_TOKEN="YOUR_CLOUDFLARE_API_TOKEN"   # paste your API token here
ZONE_NAME="tdstudiosny.com"
SUBDOMAINS=("truthmatters" "www.truthmatters")
NEW_TARGET="serve-with-pride-theme.vercel.app"
# --------------

if ! command -v jq &> /dev/null; then
  echo "[!] jq is required but not installed. Install it with: brew install jq"
  exit 1
fi

if [ "$CF_API_TOKEN" = "YOUR_CLOUDFLARE_API_TOKEN" ]; then
  echo "[!] Please replace YOUR_CLOUDFLARE_API_TOKEN with your actual Cloudflare API token"
  echo "    Get it from: https://dash.cloudflare.com/profile/api-tokens"
  echo "    Create a token with 'Zone:DNS:Edit' permissions for tdstudiosny.com"
  exit 1
fi

echo "[*] Getting Zone ID for $ZONE_NAME..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')

if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" = "null" ]; then
  echo "[!] Failed to fetch Zone ID"
  exit 1
fi
echo "[+] Zone ID: $ZONE_ID"

for SUBDOMAIN in "${SUBDOMAINS[@]}"; do
  echo ""
  echo "[*] Processing $SUBDOMAIN.$ZONE_NAME..."

  RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=$SUBDOMAIN.$ZONE_NAME" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" | jq -r '.result[0].id')

  if [ -n "$RECORD_ID" ] && [ "$RECORD_ID" != "null" ]; then
    echo "[*] Deleting old record ($RECORD_ID)..."
    curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
      -H "Authorization: Bearer $CF_API_TOKEN" \
      -H "Content-Type: application/json" | jq .
  else
    echo "[*] No existing record found, skipping delete."
  fi

  echo "[*] Adding new CNAME record for $SUBDOMAIN..."
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{
      \"type\": \"CNAME\",
      \"name\": \"$SUBDOMAIN\",
      \"content\": \"$NEW_TARGET\",
      \"ttl\": 3600,
      \"proxied\": false
    }" | jq .
done

echo ""
echo "[*] Waiting for DNS propagation and checking every 60 seconds..."

while true; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://truthmatters.tdstudiosny.com)
  WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.truthmatters.tdstudiosny.com)

  if [ "$STATUS" = "200" ] && [ "$WWW_STATUS" = "200" ]; then
    echo "[✓] Success! Both truthmatters.tdstudiosny.com and www.truthmatters.tdstudiosny.com are live (HTTP 200)"
    break
  else
    echo "[*] Still not live. truthmatters=$STATUS, www=$WWW_STATUS. Retrying in 60s..."
    sleep 60
  fi
done