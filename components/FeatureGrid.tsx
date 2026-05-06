'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  ChevronRight,
  Gauge,
  CloudSun,
  LayoutTemplate,
  type LucideIcon,
  MapPinned,
  MessagesSquare,
  Workflow,
} from 'lucide-react';

export type FeatureItem = {
  description: string;
  href: string;
  icon: LucideIcon;
  learnMoreLabel?: string;
  title: string;
};

type FeatureGridProps = {
  features?: FeatureItem[];
  intro?: string;
  title?: string;
};

const defaultFeatures: FeatureItem[] = [
  {
    description:
      'Use AI-assisted development to ship modern pages faster without losing control of the real business details that make the site convert.',
    href: '/contact',
    icon: Bot,
    title: 'Ship Faster',
  },
  {
    description:
      'Turn local intent into visibility with metadata, schema, map-ready location signals, and cleaner service-page structure.',
    href: '/contact',
    icon: MapPinned,
    title: 'Rank Locally',
  },
  {
    description:
      'Build intake forms and automations that ask better questions up front so the inbox gets stronger leads instead of vague tire-kickers.',
      href: '#contact',
      icon: Workflow,
      title: 'Qualify Leads',
  },
  {
    description:
      'Sharper layouts, cleaner spacing, and premium section systems help local businesses look established from the first scroll.',
    href: '#gallery',
    icon: LayoutTemplate,
    title: 'Look More Premium',
  },
  {
    description:
      'Fast-loading pages, lighter assets, and cleaner front-end structure help the site feel polished on mobile and desktop.',
    href: '#services',
    icon: Gauge,
    title: 'Perform Better',
  },
  {
    description:
      'Clear messaging and strong conversion hooks make it easier for visitors to understand the value and take the next step.',
    href: '#contact',
    icon: MessagesSquare,
    title: 'Convert More Clearly',
  },
];

type FeatureCardProps = {
  cardRef?: (element: HTMLElement | null) => void;
  feature: FeatureItem;
  index: number;
  isVisible: boolean;
};

function FeatureCard({ cardRef, feature, index, isVisible }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <article
      ref={cardRef}
      data-index={index}
      className={[
        'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.05)] transition-all duration-700 ease-out hover:scale-105 hover:border-sky-200 hover:shadow-[0_22px_48px_rgba(29,79,115,0.12)]',
        'transform-gpu',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      ].join(' ')}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className={[
          'inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-500',
          'group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-700',
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
        ].join(' ')}
        style={{ transitionDelay: `${120 + index * 110}ms` }}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>

      <a
        href={feature.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-sky-700"
      >
        <span>{feature.learnMoreLabel ?? 'Learn More'}</span>
        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </article>
  );
}

export default function FeatureGrid({
  features = defaultFeatures,
  intro = 'The strongest local-business sites do more than look clean. They connect messaging, SEO structure, speed, and lead capture into one system that is easier to trust and easier to act on.',
  title = 'What makes Shoreline AI Solution useful beyond the first redesign',
}: FeatureGridProps) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCards(
        features.reduce<Record<number, boolean>>((accumulator, _, index) => {
          accumulator[index] = true;
          return accumulator;
        }, {}),
      );

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = Number(entry.target.getAttribute('data-index'));
          setVisibleCards((current) => (current[index] ? current : { ...current, [index]: true }));
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.16,
      },
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [features]);

  return (
    <section id="features" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Feature Grid
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{intro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
              feature={feature}
              index={index}
              isVisible={Boolean(visibleCards[index])}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
