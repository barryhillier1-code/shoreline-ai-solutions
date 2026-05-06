'use client';

import { type ReactNode } from 'react';

type FooterLink = {
  href: string;
  label: string;
};

type SocialLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

type ConversionFooterProps = {
  aboutBlurb?: string;
  addressLine?: string;
  businessName?: string;
  ctaLinks?: FooterLink[];
  ctaTitle?: string;
  ctaText?: string;
  email?: string;
  emailHref?: string;
  logo?: ReactNode;
  mapPlaceholderLabel?: string;
  phone?: string;
  phoneHref?: string;
  quickLinks?: FooterLink[];
  socialLinks?: SocialLink[];
};

const defaultQuickLinks: FooterLink[] = [
  { href: '/#about', label: 'About' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact' },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.244 2H21l-6.02 6.88L22 22h-5.48l-4.29-5.62L7.31 22H4.55l6.44-7.36L2 2h5.62l3.88 5.12L18.244 2Zm-.96 18h1.53L6.79 3.9H5.15L17.284 20Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.5 21v-7.03h2.36l.35-2.74H13.5v-1.75c0-.8.22-1.33 1.37-1.33h1.46V5.7c-.25-.03-1.11-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.61v2.02H8.37v2.74h2.36V21h2.77Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm-4.7 1.3A5.55 5.55 0 1 1 6.45 12 5.56 5.56 0 0 1 12 6.45Zm0 1.8A3.75 3.75 0 1 0 15.75 12 3.76 3.76 0 0 0 12 8.25Z" />
    </svg>
  );
}

function BrandMark() {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,8,23,0.25)]">
      <div className="absolute inset-1 rounded-[1rem] bg-[linear-gradient(135deg,var(--brand-deep),var(--brand-cyber))]" />
      <span className="relative z-10 text-white [font-family:var(--font-cormorant)]">SA</span>
    </div>
  );
}

const defaultSocialLinks: SocialLink[] = [
  { href: 'https://x.com', label: 'X', icon: <XIcon /> },
  { href: 'https://facebook.com', label: 'Facebook', icon: <FacebookIcon /> },
  { href: 'https://instagram.com', label: 'Instagram', icon: <InstagramIcon /> },
];

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="inline-flex text-sm text-slate-300 transition hover:text-sky-300 hover:underline"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialButtons({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-slate-200 transition hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-sky-400/12 hover:text-sky-200"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export default function ConversionFooter({
  aboutBlurb = 'We build polished local business websites that turn visitors into booked calls, quote requests, and better first impressions.',
  addressLine = '8 Park Avenue, Clarenville, NL A5A 1V3',
  businessName = 'Shoreline AI Solutions',
  ctaLinks,
  ctaTitle = 'Start Here',
  ctaText = 'Pick the next step that fits your business and Barry will take it from there.',
  email = 'Barry.Hillier1@icloud.com',
  emailHref = 'mailto:Barry.Hillier1@icloud.com',
  logo,
  mapPlaceholderLabel = 'Google Map Embed Placeholder',
  phone = '709-641-1028',
  phoneHref = 'tel:+17096411028',
  quickLinks = defaultQuickLinks,
  socialLinks = defaultSocialLinks,
}: ConversionFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              {logo ?? <BrandMark />}
              <div>
                <p className="text-lg font-semibold text-white">{businessName}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Brand / Mission</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-300">{aboutBlurb}</p>
            <SocialButtons links={socialLinks} />
          </section>

          <nav aria-label="Footer quick links" className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Quick Links
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">Explore More</h2>
            </div>
            <LinkList links={quickLinks} />
          </nav>

          <section className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Contact Info
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">Visit or Call</h2>
            </div>
            <address className="not-italic">
              <p className="text-sm font-medium text-white">{businessName}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{addressLine}</p>
              <a
                href={phoneHref}
                className="mt-4 inline-flex text-sm font-medium text-sky-300 transition hover:text-sky-200 hover:underline"
              >
                {phone}
              </a>
              <a
                href={emailHref}
                className="mt-3 inline-flex text-sm font-medium text-sky-300 transition hover:text-sky-200 hover:underline"
              >
                {email}
              </a>
            </address>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Next Step
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">{ctaTitle}</h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">{ctaText}</p>
            {ctaLinks && ctaLinks.length > 0 ? (
              <div className="space-y-3">
                {ctaLinks.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-cyber px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-4 text-center text-sm text-slate-400">
                  {mapPlaceholderLabel}
                </div>
              </div>
            ) : (
              <>
                <form className="space-y-3">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-sky-300/70 focus:bg-white/10"
                  />
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-cyber px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7]"
                  >
                    Subscribe
                  </button>
                </form>
                <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-4 text-center text-sm text-slate-400">
                  {mapPlaceholderLabel}
                </div>
              </>
            )}
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} {businessName}. All rights reserved.</p>
          <a
            href="#top"
            className="inline-flex items-center text-slate-300 transition hover:text-sky-300 hover:underline"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
