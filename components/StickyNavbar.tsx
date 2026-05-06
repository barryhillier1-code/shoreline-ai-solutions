'use client';

import { type ReactNode, useState } from 'react';

export type StickyNavbarItem = {
  href: string;
  label: string;
};

type StickyNavbarProps = {
  businessName?: string;
  className?: string;
  ctaHref?: string;
  ctaLabel?: string;
  logo?: ReactNode;
  navItems?: StickyNavbarItem[];
};

const defaultNavItems: StickyNavbarItem[] = [
  { href: '/#about', label: 'Barry' },
  { href: '/#portfolio', label: 'Work' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
];

function BrandMark() {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/70 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,39,65,0.12)]">
      <div className="absolute inset-1 rounded-[1rem] bg-[linear-gradient(135deg,var(--brand-deep),var(--brand-cyber))]" />
      <span className="relative z-10 text-white [font-family:var(--font-cormorant)]">SA</span>
    </div>
  );
}

type MobileMenuButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 text-slate-900 shadow-[0_12px_28px_rgba(15,39,65,0.1)] transition hover:bg-white"
    >
      <span className="relative h-4 w-5">
        <span
          className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
            isOpen ? 'translate-y-[6px] rotate-45' : ''
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`absolute left-0 top-[13px] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
            isOpen ? '-translate-y-[6px] -rotate-45' : ''
          }`}
        />
      </span>
    </button>
  );
}

type NavLinksProps = {
  items: StickyNavbarItem[];
  onSelect?: () => void;
};

function NavLinks({ items, onSelect }: NavLinksProps) {
  return (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onSelect}
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-950"
        >
          <span>{item.label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyber/0 transition group-hover:bg-brand-cyber" />
        </a>
      ))}
    </>
  );
}

export default function StickyNavbar({
  businessName = 'Shoreline AI Solutions',
  className = '',
  ctaHref = '/#contact',
  ctaLabel = 'Free Mockup',
  logo,
  navItems = defaultNavItems,
}: StickyNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-[70] px-4 pt-4 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/45 bg-white/90 shadow-[0_25px_65px_rgba(15,39,65,0.16)] supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(14,165,255,0.08),rgba(71,85,105,0.12))]" />
          <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-cyber/70 to-transparent" />

          <div className="relative flex items-center gap-4 px-4 py-3 sm:px-5">
            <a href="/" className="flex min-w-0 items-center gap-3">
              {logo ?? <BrandMark />}
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-slate-950">{businessName}</p>
                <p className="hidden text-xs uppercase tracking-[0.28em] text-slate-500 sm:block">
                  Barry Hillier • Clarenville, NL
                </p>
              </div>
            </a>

            <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
              <NavLinks items={navItems} />
            </nav>

            <div className="ml-auto hidden items-center gap-3 md:flex">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-cyber px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(14,165,255,0.24)] transition-transform duration-200 ease-out hover:scale-105 hover:bg-[#0284c7] motion-reduce:hover:scale-100"
              >
                {ctaLabel}
              </a>
            </div>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-brand-cyber px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(14,165,255,0.22)] transition-transform duration-200 ease-out hover:scale-105 hover:bg-[#0284c7] motion-reduce:hover:scale-100"
              >
                {ctaLabel}
              </a>
              <MobileMenuButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen((current) => !current)}
              />
            </div>
          </div>

          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
              isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="relative space-y-2 border-t border-white/40 px-4 pb-4 pt-3 sm:px-5">
              <nav className="flex flex-col gap-1">
                <NavLinks items={navItems} onSelect={() => setIsMenuOpen(false)} />
              </nav>
              <a
                href={ctaHref}
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,39,65,0.2)] transition hover:bg-slate-800"
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
