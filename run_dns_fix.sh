#!/bin/bash
# One-liner DNS fix for truthmatters.tdstudiosny.com

# Replace YOUR_TOKEN_HERE with your actual Cloudflare API token
CF_API_TOKEN="YOUR_TOKEN_HERE"

if [ "$CF_API_TOKEN" = "YOUR_TOKEN_HERE" ]; then
  echo "[!] Please replace YOUR_TOKEN_HERE with your actual Cloudflare API token"
  echo "    Get it from: https://dash.cloudflare.com/profile/api-tokens"
  exit 1
fi

echo "[*] Getting Zone ID for tdstudiosny.com..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=tdstudiosny.com" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" | jq -r ".result[0].id")

if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" = "null" ]; then
  echo "[!] Failed to get Zone ID. Check your API token."
  exit 1
fi
echo "[+] Zone ID: $ZONE_ID"

for SUBDOMAIN in truthmatters www.truthmatters; do
  echo ""
  echo "[*] Processing $SUBDOMAIN.tdstudiosny.com..."

  # Get existing record ID
  RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=CNAME&name=$SUBDOMAIN.tdstudiosny.com" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" | jq -r ".result[0].id")

  # Delete old record if it exists
  if [ "$RECORD_ID" != "null" ] && [ -n "$RECORD_ID" ]; then
    echo "[*] Deleting old record ($RECORD_ID)..."
    curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
      -H "Authorization: Bearer $CF_API_TOKEN" \
      -H "Content-Type: application/json" | jq .
  else
    echo "[*] No existing record found"
  fi

  # Add new record
  echo "[*] Adding new CNAME record: $SUBDOMAIN -> serve-with-pride-theme.vercel.app"
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{
      \"type\": \"CNAME\",
      \"name\": \"$SUBDOMAIN\",
      \"content\": \"serve-with-pride-theme.vercel.app\",
      \"ttl\": 3600,
      \"proxied\": false
    }" | jq .
done

echo ""
echo "[*] DNS records updated! Testing in 30 seconds..."
sleep 30

# Test the domains
while true; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://truthmatters.tdstudiosny.com)
  WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.truthmatters.tdstudiosny.com)

  echo "[*] Testing... truthmatters=$STATUS, www=$WWW_STATUS"

  if [ "$STATUS" = "200" ] && [ "$WWW_STATUS" = "200" ]; then
    echo ""
    echo "[✓] SUCCESS! Both domains are now live:"
    echo "    https://truthmatters.tdstudiosny.com (HTTP $STATUS)"
    echo "    https://www.truthmatters.tdstudiosny.com (HTTP $WWW_STATUS)"
    break
  else
    echo "[*] Not ready yet. Checking again in 60 seconds..."
    sleep 60
  fi
done