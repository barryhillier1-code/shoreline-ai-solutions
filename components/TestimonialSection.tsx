'use client';

import { useEffect, useRef, useState } from 'react';

export type TestimonialItem = {
  avatarAlt: string;
  avatarSrc: string;
  desktopClassName?: string;
  location: string;
  name: string;
  quote: string;
  role?: string;
  sourceLabel?: string;
};

type TestimonialSectionProps = {
  eyebrow?: string;
  intro?: string;
  testimonials?: TestimonialItem[];
  title?: string;
};

const defaultTestimonials: TestimonialItem[] = [
  {
    avatarAlt: 'Portrait of Megan Walsh, verified customer from Clarenville',
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-7 xl:col-span-5 xl:row-span-2',
    location: 'Clarenville, NL',
    name: 'Megan Walsh',
    quote:
      'The site finally feels like our business in real life. People mention the reviews, trust the brand faster, and the quote requests are far more serious now.',
    role: 'Owner, Coastal service business',
    sourceLabel: 'Verified Customer',
  },
  {
    avatarAlt: 'Portrait of Daniel Pike, verified customer from Bonavista',
    avatarSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-5 xl:col-span-3',
    location: 'Bonavista, NL',
    name: 'Daniel Pike',
    quote:
      'We needed something clean, modern, and easy for visitors to trust. This layout gave us that premium first impression without losing our local personality.',
    role: 'Tourism operator',
    sourceLabel: 'Verified Customer',
  },
  {
    avatarAlt: 'Portrait of Sarah Penney, verified customer from St. John\'s',
    avatarSrc:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-6 xl:col-span-4',
    location: 'St. John\'s, NL',
    name: 'Sarah Penney',
    quote:
      'It feels polished on desktop, easy to use on mobile, and the testimonials themselves do a lot of the selling for us before anyone even calls.',
    role: 'Retail manager',
    sourceLabel: 'Verified Customer',
  },
  {
    avatarAlt: 'Portrait of Evan Hiscock, verified customer from Gander',
    avatarSrc:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-6 xl:col-span-4',
    location: 'Gander, NL',
    name: 'Evan Hiscock',
    quote:
      'The new presentation helped people understand our value much faster. It looks established, trustworthy, and built for real customers instead of just showing off.',
    role: 'Trades contractor',
    sourceLabel: 'Verified Customer',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="h-4 w-4 fill-current drop-shadow-[0_3px_8px_rgba(245,158,11,0.3)]"
        >
          <path d="M10 1.7 12.53 6.82l5.65.82-4.09 3.98.97 5.62L10 14.58 4.94 17.24l.97-5.62-4.09-3.98 5.65-.82L10 1.7Z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-sky-700 shadow-sm ring-1 ring-sky-100">
        G
      </span>
      <span>{label}</span>
    </div>
  );
}

type TestimonialCardProps = {
  cardRef?: (element: HTMLElement | null) => void;
  isVisible: boolean;
  item: TestimonialItem;
  index: number;
};

function TestimonialCard({ cardRef, isVisible, item, index }: TestimonialCardProps) {
  return (
    <article
      ref={cardRef}
      data-index={index}
      className={[
        'group relative flex h-full min-h-[21rem] flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_rgba(15,39,65,0.08)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_28px_70px_rgba(29,79,115,0.16)]',
        'snap-center md:snap-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        item.desktopClassName ?? 'md:col-span-6 xl:col-span-4',
      ].join(' ')}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-5 top-3 text-8xl leading-none text-slate-100 [font-family:var(--font-cormorant)]">
        &ldquo;
      </span>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={item.avatarSrc}
            alt={item.avatarAlt}
            className="h-16 w-16 rounded-2xl object-cover shadow-[0_14px_24px_rgba(15,39,65,0.12)] ring-2 ring-white"
            loading="lazy"
          />
          <div>
            <p className="text-base font-semibold text-slate-950">{item.name}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{item.location}</p>
            {item.role ? <p className="mt-1 text-sm text-slate-400">{item.role}</p> : null}
          </div>
        </div>
        <VerifiedBadge label={item.sourceLabel ?? 'Verified Customer'} />
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
        <StarRating />
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          Google Review
        </span>
      </div>

      <p className="relative z-10 mt-6 text-balance text-lg leading-8 text-slate-700">
        {item.quote}
      </p>
    </article>
  );
}

export default function TestimonialSection({
  eyebrow = 'Verified-Style Feedback',
  intro = 'Credibility compounds fast when local customers can picture themselves in the results. This section is built to make trust visible before the visitor reaches the form.',
  testimonials = defaultTestimonials,
  title = 'What verified customers say after the site goes live',
}: TestimonialSectionProps) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleCards, setVisibleCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCards(
        testimonials.reduce<Record<number, boolean>>((accumulator, _, index) => {
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
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.18,
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
  }, [testimonials]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{intro}</p>
        </div>

        <div className="mt-10 grid auto-cols-[88%] grid-flow-col gap-4 overflow-x-auto pb-4 pr-6 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden sm:auto-cols-[72%] md:grid-flow-row md:auto-cols-auto md:grid-cols-12 md:overflow-visible md:pb-0 md:pr-0">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={`${item.name}-${item.location}`}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
              item={item}
              index={index}
              isVisible={Boolean(visibleCards[index])}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
