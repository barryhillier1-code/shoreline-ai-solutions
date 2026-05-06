import type { Metadata } from 'next';
import Schema from '@/components/Schema';
import ShorelineChatWidget from '@/components/ShorelineChatWidget';
import StickyNavbar from '@/components/StickyNavbar';
import { siteConfig } from '@/lib/siteConfig';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

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
      </head>
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
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
        <StickyNavbar businessName={siteConfig.businessName} />
        {children}
        <ShorelineChatWidget />
      </body>
    </html>
  );
}
