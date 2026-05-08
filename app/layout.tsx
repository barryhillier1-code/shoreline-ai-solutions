import type { Metadata } from 'next';
import { Suspense } from 'react';
import GoogleAnalyticsRouteTracker from '@/components/GoogleAnalyticsRouteTracker';
import Schema from '@/components/Schema';
import ShorelineChatWidget from '@/components/ShorelineChatWidget';
import StickyNavbar from '@/components/StickyNavbar';
import { siteConfig } from '@/lib/siteConfig';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const GTM_CONTAINER_ID = 'GTM-5DZSJ24K';
const GA_MEASUREMENT_ID = 'G-1HPNGY4KR5';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  applicationName: siteConfig.businessName,
  metadataBase: new URL(siteConfig.siteUrl),
};

const netlifyFormDefinitions = [
  {
    fields: [
      'name',
      'businessName',
      'email',
      'phone',
      'website',
      'service',
      'timeline',
      'message',
      'source',
    ] as const,
    name: 'free-mockup',
  },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={[manrope.variable, cormorant.variable, 'h-full'].join(' ')}>
      <head>
        <Schema />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
            `,
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {netlifyFormDefinitions.map((definition) => (
          <form
            key={definition.name}
            name={definition.name}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            hidden
            aria-hidden="true"
          >
            <input type="hidden" name="form-name" value={definition.name} />
            <input type="text" name="bot-field" />
            {definition.fields.map((field) => (
              <input key={field} type="text" name={field} />
            ))}
          </form>
        ))}
        <Suspense fallback={null}>
          <GoogleAnalyticsRouteTracker measurementId={GA_MEASUREMENT_ID} />
        </Suspense>
        <StickyNavbar businessName={siteConfig.businessName} />
        {children}
        <ShorelineChatWidget />
      </body>
    </html>
  );
}
