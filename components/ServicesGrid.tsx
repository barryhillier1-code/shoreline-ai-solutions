'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, ChevronRight, type LucideIcon, MapPinned, Workflow } from 'lucide-react';

export type ServiceItem = {
  badge: string;
  description: string;
  href: string;
  icon: LucideIcon;
  learnMoreLabel?: string;
  title: string;
};

type ServicesGridProps = {
  eyebrow?: string;
  intro?: string;
  services?: ServiceItem[];
  title?: string;
};

const defaultServices: ServiceItem[] = [
  {
    badge: '1-3 Day Launches',
    description:
      'Fast, modern websites for restaurants, retail shops, trades, and tourism operators that need a stronger first impression without waiting weeks.',
    href: '/#contact',
    icon: Bot,
    title: 'AI-Driven Development',
  },
  {
    badge: 'Schema + Maps Ready',
    description:
      'Local SEO structure, Google Business alignment, metadata, and on-page clarity that help Newfoundland businesses show up better where customers search.',
    href: '/#contact',
    icon: MapPinned,
    title: 'Local SEO Mastery',
  },
  {
    badge: 'Pre-Qualified Leads',
    description:
      'Connect smarter forms, intake steps, and AI-ready workflows that filter leads before they hit your inbox and save time on follow-up.',
    href: '/#contact',
    icon: Workflow,
    title: 'Business Automations',
  },
];

type ServiceCardProps = {
  cardRef?: (element: HTMLElement | null) => void;
  index: number;
  isVisible: boolean;
  service: ServiceItem;
};

function ServiceCard({ cardRef, index, isVisible, service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article
      ref={cardRef}
      data-index={index}
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color,opacity] duration-700 ease-out hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl',
        'transform-gpu',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
      ].join(' ')}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyber to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div
          className={[
            'inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-brand-cyber transition-all duration-300',
            'group-hover:scale-105 group-hover:border-sky-200 group-hover:bg-sky-100',
          ].join(' ')}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {service.badge}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>

      <a
        href={service.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-brand-cyber"
      >
        <span>{service.learnMoreLabel ?? 'Learn More'}</span>
        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </article>
  );
}

export default function ServicesGrid({
  eyebrow = 'Core Offers',
  intro = 'Shoreline AI Solutions combines modern development, local SEO structure, and smart automation so Newfoundland businesses can turn attention into qualified leads.',
  services = defaultServices,
  title = 'Three core services built to help local businesses show up, stand out, and scale',
}: ServicesGridProps) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCards(
        services.reduce<Record<number, boolean>>((accumulator, _, index) => {
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
  }, [services]);

  return (
    <section id="services" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{intro}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
              index={index}
              isVisible={Boolean(visibleCards[index])}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
