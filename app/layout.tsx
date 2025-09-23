import type { Metadata } from 'next'
import { Inter, Oswald, Rajdhani, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/providers/theme-provider'
import { CartProvider } from '@/lib/providers/cart-provider'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-military',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-tactical',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-grunge',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: {
    default: 'Truth Matters - Patriotic Apparel & Gear',
    template: '%s | Truth Matters'
  },
  description: 'Premium patriotic apparel for those who serve and support America. American-made tees, first responder gear, and veteran-inspired designs.',
  keywords: [
    'patriotic apparel',
    'american flag shirts',
    'veteran clothing',
    'first responder gear',
    'police shirts',
    'firefighter apparel',
    'military clothing',
    'usa made apparel',
    'conservative clothing',
    'patriotic gifts'
  ],
  authors: [{ name: 'Truth Matters' }],
  creator: 'Truth Matters',
  publisher: 'Truth Matters',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Truth Matters',
    title: 'Truth Matters - Patriotic Apparel & Gear',
    description: 'Premium patriotic apparel for those who serve and support America.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Truth Matters - Patriotic Apparel & Gear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@truthmatters',
    creator: '@truthmatters',
    title: 'Truth Matters - Patriotic Apparel & Gear',
    description: 'Premium patriotic apparel for those who serve and support America.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B1220" />
        <meta name="msapplication-TileColor" content="#0B1220" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Truth Matters",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              "description": "Premium patriotic apparel for those who serve and support America",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Truth Matters Team"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@truthmatters.com"
              },
              "sameAs": [
                "https://twitter.com/truthmatters",
                "https://facebook.com/truthmatters",
                "https://instagram.com/truthmatters"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable} ${rajdhani.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <CartProvider>
            <div className="min-h-screen bg-background text-foreground">
              {children}
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
        <Analytics />
        
        {/* PostHog Analytics */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}',{api_host:'${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'}'})
              `
            }}
          />
        )}
      </body>
    </html>
  )
}