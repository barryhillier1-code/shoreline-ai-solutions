import type { LucideIcon } from 'lucide-react';
import {
  BadgeDollarSign,
  Bot,
  CalendarRange,
  CheckCircle2,
  Clock3,
  MapPinned,
  SearchCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import AiAssistantDemo from '@/components/AiAssistantDemo';
import ContactForm from '@/components/ContactForm';
import ConversionFooter from '@/components/ConversionFooter';
import LocalHero from '@/components/LocalHero';
import ServicesGrid from '@/components/ServicesGrid';
import TestimonialSection, { type TestimonialItem } from '@/components/TestimonialSection';
import { createPageMetadata, siteConfig } from '@/lib/siteConfig';

export const metadata = createPageMetadata({
  description: siteConfig.defaultDescription,
  path: '/',
  service: siteConfig.primaryService,
});

type ProofCard = {
  icon: LucideIcon;
  text: string;
  title: string;
};

type PortfolioExample = {
  bullets: string[];
  category: string;
  imageAlt: string;
  imageSrc: string;
  outcome: string;
  title: string;
};

type PricingTier = {
  badge?: string;
  bestFor: string;
  cadence?: string;
  features: string[];
  focus: string;
  name: string;
  note: string;
  price: string;
};

type AddOn = {
  icon: LucideIcon;
  price: string;
  text: string;
  title: string;
};

type ProcessStep = {
  icon: LucideIcon;
  text: string;
  title: string;
};

const proofCards: ProofCard[] = [
  {
    icon: Clock3,
    text: 'Fast launches for owners who need to move from outdated pages to something sharp and live without a long agency timeline.',
    title: '1-3 day build windows',
  },
  {
    icon: MapPinned,
    text: 'Clarenville-based support with Newfoundland-first messaging, local SEO structure, and straightforward communication.',
    title: 'Local and founder-led',
  },
  {
    icon: SearchCheck,
    text: 'Every section is built to improve trust, make the next step obvious, and turn local searches into better inquiries.',
    title: 'Conversion + local visibility',
  },
];

const portfolioExamples: PortfolioExample[] = [
  {
    bullets: [
      'Menu highlights and reservation details made easier to scan on mobile.',
      'A warmer first impression that feels more polished and easier to trust.',
      'Cleaner call-to-action flow for people deciding where to eat.',
    ],
    category: 'Restaurant Concept',
    imageAlt: "Placeholder image for Rod's Restaurant practice website project by Shoreline AI Solutions",
    imageSrc:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800',
    outcome:
      "A restaurant-style homepage concept focused on helping Rod's look more established, more inviting, and easier to choose online.",
    title: "Rod's Restaurant",
  },
  {
    bullets: [
      'Tour options, wildlife highlights, and booking details made easier to browse on mobile.',
      'A stronger first impression for visitors planning a Trinity Bay experience.',
      'Built to turn scenic interest into more booking inquiries.',
    ],
    category: 'Tourism / Boat Tours Concept',
    imageAlt:
      'Placeholder image for Discovery Bay Charters practice website project by Shoreline AI Solutions',
    imageSrc:
      'https://images.unsplash.com/photo-1441846978521-21764329e27a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ld2ZvdW5kbGFuZHxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=80&w=1800',
    outcome:
      'A coastal tourism demo concept built to make whale watching, boat tours, and booking steps feel clearer, sharper, and easier to trust.',
    title: 'Discovery Bay Charters',
  },
  {
    bullets: [
      'Service lists, service areas, and quote-request paths made clearer on mobile.',
      'A more polished first impression for owners who need to look trustworthy fast.',
      'Built to turn search traffic into stronger calls, quote requests, and booked jobs.',
    ],
    category: 'Trades / Services Concept',
    imageAlt:
      'Placeholder image for trades and services practice website project by Shoreline AI Solutions',
    imageSrc:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udHJhY3RvciUyMGhvdXNlfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=80&w=1800',
    outcome:
      'A service-business demo concept designed to make trades and local service brands look more established, more credible, and easier to contact.',
    title: 'Local Trades & Services',
  },
];

const pricingTiers: PricingTier[] = [
  {
    bestFor: 'Best for owners who need to get online fast, look credible, and stop sending traffic to a weak or outdated page.',
    features: [
      'Up to 5 pages',
      'Mobile-friendly layout',
      'Contact form + maps',
      'Core local SEO foundation',
      'Clean launch guidance',
    ],
    focus: 'Speed',
    name: 'Basic',
    note: 'The right fit when the bottleneck is speed and you need a sharp, credible site live without a big first spend.',
    price: '$599',
  },
  {
    badge: 'Flagship Growth Package',
    bestFor: 'Best for established businesses that need stronger trust, better lead flow, and a website that works more like a sales tool.',
    features: [
      'Everything in Basic',
      'Automated Booking Flow included ($400 value)',
      'Local SEO setup included ($150 value)',
      'Expanded service breakdowns, galleries, or menus',
      'Stronger conversion paths for calls, bookings, and quote requests',
    ],
    focus: 'Trust + Conversion',
    name: 'Pro',
    note: 'The Pro package is a $1,500+ value bundled into $1,099 to give you a complete, automated sales tool in 1-3 days.',
    price: '$1,099',
  },
  {
    bestFor: 'Best for owners who want hosting, edits, and support handled for them after launch.',
    cadence: '/mo',
    features: [
      'Hosting included',
      'Regular content edits',
      'Security monitoring',
      'Ongoing support',
      'Peace of mind',
    ],
    focus: 'Peace of Mind',
    name: 'Maintenance',
    note: 'The easiest way to stay current without having to think about hosting, updates, or the technical side yourself.',
    price: '$35',
  },
];

const founderNotes = [
  'Barry builds and hosts the sites himself, so the advice stays practical and the communication stays direct.',
  'The offer is designed for local businesses still relying on outdated websites, Facebook pages, or overpriced agency quotes.',
  'AI is used to speed up the build and support better systems - not to replace clear messaging, local context, or honest follow-up.',
];

const processSteps: ProcessStep[] = [
  {
    icon: SearchCheck,
    text: 'We start with the business goal, the local search problem, or the weak point in the current customer journey.',
    title: '1. Audit the bottleneck',
  },
  {
    icon: Sparkles,
    text: 'Barry maps out the right package, optional add-ons, and a free custom mockup so the direction feels clear before the build starts.',
    title: '2. Plan the right version',
  },
  {
    icon: Clock3,
    text: 'The site is built fast with modern structure, clear copy, and cleaner conversion points built around how local customers actually buy.',
    title: '3. Build and launch clean',
  },
  {
    icon: Workflow,
    text: 'If needed, we layer in local SEO, Google Business help, chatbots, booking flows, or ongoing edits after the launch.',
    title: '4. Keep the momentum',
  },
];

const testimonials: TestimonialItem[] = [
  {
    avatarAlt: 'Portrait of Megan Walsh, local business owner from Clarenville',
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-7 xl:col-span-5 xl:row-span-2',
    location: 'Clarenville, NL',
    name: 'Megan Walsh',
    quote:
      'The new site finally feels like a real business instead of a placeholder. People trust it faster, and the leads are far more serious now.',
    role: 'Owner, local service business',
    sourceLabel: 'Verified-Style Review',
  },
  {
    avatarAlt: 'Portrait of Daniel Pike, tourism operator from Bonavista',
    avatarSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-5 xl:col-span-3',
    location: 'Bonavista, NL',
    name: 'Daniel Pike',
    quote:
      'It looks premium, but it still sounds like us. The booking questions are clearer, and people know what to do much faster now.',
    role: 'Tourism operator',
    sourceLabel: 'Verified-Style Review',
  },
  {
    avatarAlt: "Portrait of Sarah Penney, restaurant manager from St. John's",
    avatarSrc:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-6 xl:col-span-4',
    location: "St. John's, NL",
    name: 'Sarah Penney',
    quote:
      'The site makes our menu, specials, and contact info much easier to find on mobile, which is exactly where our customers are checking us from.',
    role: 'Restaurant manager',
    sourceLabel: 'Verified-Style Review',
  },
  {
    avatarAlt: 'Portrait of Evan Hiscock, trades contractor from Gander',
    avatarSrc:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80',
    desktopClassName: 'md:col-span-6 xl:col-span-4',
    location: 'Gander, NL',
    name: 'Evan Hiscock',
    quote:
      'The quote requests are better because the site explains the work clearly before anyone reaches out. It saves a lot of back and forth.',
    role: 'Trades contractor',
    sourceLabel: 'Verified-Style Review',
  },
];

const addOns = [
  {
    icon: Bot,
    price: '$300 one-time',
    text: 'Smart assistant that answers questions, routes common requests, and captures stronger leads around the clock.',
    title: 'AI Chatbot Assistant',
  },
  {
    icon: CalendarRange,
    price: '$400 one-time',
    text: 'Automated booking or quote flow with cleaner intake and faster follow-up for service businesses.',
    title: 'Automated Booking Flow',
  },
  {
    icon: SearchCheck,
    price: '$75/mo',
    text: 'Monthly visibility review focused on the pages, searches, and next steps that matter most for local growth.',
    title: 'Monthly SEO Reporting',
  },
  {
    icon: MapPinned,
    price: '$150 one-time',
    text: 'Google Business Profile setup and cleanup so your business information is consistent and easier to trust.',
    title: 'Google Business Setup',
  },
  {
    icon: Sparkles,
    price: '$100 one-time',
    text: 'Keep core website details and social presence more aligned without manual copy-paste every time something changes.',
    title: 'Social Media Sync',
  },
] satisfies AddOn[];

export default function Page() {
  return (
    <>
      <LocalHero />

      <main className="overflow-hidden">
        <section id="portfolio" className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {proofCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className="coast-card rounded-[1.75rem] p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-slate-950 [font-family:var(--font-cormorant)]">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-14 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
              Practice Project Showcase
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
              Example websites I&apos;ve built to show how Shoreline designs for real local businesses.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Here are some recent practice projects I built to demonstrate the clean, fast,
              mobile-friendly style and practical conversion thinking I bring to local
              Newfoundland restaurants and similar businesses.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolioExamples.map((example) => (
              <article
                key={example.title}
                className="group overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,39,65,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,39,65,0.14)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={example.imageSrc}
                    alt={example.imageAlt}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                    {example.category}
                  </div>
                </div>
                <div className="flex h-full flex-col p-6">
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950 [font-family:var(--font-cormorant)]">
                    {example.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{example.outcome}</p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                    {example.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <CheckCircle2
                          className="mt-1 h-4 w-4 shrink-0 text-sky-700"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                      Practice / Demo Project
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ServicesGrid
          eyebrow="Core Services"
          intro="Shoreline AI Solutions combines modern website builds, local SEO structure, and optional smart automations so Newfoundland businesses can move faster without sounding like a generic agency."
          title="Three practical ways Shoreline helps local businesses win more trust and better leads"
        />

        <section id="pricing" className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
                Transparent Pricing
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
                Clear starting points that make it easier to say yes.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Shoreline keeps pricing visible because local owners should know the range before
                they book a call. Pick the package that solves the real bottleneck first: speed,
                trust, conversion, or peace of mind.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <article
                  key={tier.name}
                  className={`relative overflow-hidden rounded-[2rem] border p-7 shadow-[0_20px_60px_rgba(15,39,65,0.08)] ${
                    tier.badge
                      ? 'border-sky-300 bg-slate-950 text-white'
                      : 'border-slate-200 bg-white text-slate-950'
                  }`}
                >
                  {tier.badge ? (
                    <span className="inline-flex rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950">
                      {tier.badge}
                    </span>
                  ) : null}
                  <h3 className="mt-5 text-3xl font-semibold [font-family:var(--font-cormorant)]">
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                      tier.badge ? 'text-sky-200' : 'text-sky-800'
                    }`}
                  >
                    {tier.focus}
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <p className="text-5xl font-semibold">{tier.price}</p>
                    {tier.cadence ? (
                      <p className="pb-1 text-lg font-medium opacity-80">{tier.cadence}</p>
                    ) : null}
                  </div>
                  <p
                    className={`mt-5 text-sm leading-7 ${
                      tier.badge ? 'text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    {tier.bestFor}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-7">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <CheckCircle2
                          className={`mt-1 h-4 w-4 shrink-0 ${
                            tier.badge ? 'text-sky-300' : 'text-sky-700'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={tier.badge ? 'text-slate-100' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-6 text-sm leading-7 ${
                      tier.badge ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {tier.note}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-sky-100 bg-sky-50 px-6 py-5 text-sm leading-7 text-slate-700">
              <p className="font-semibold text-slate-900">What is included either way:</p>
              <p className="mt-2">
                Mobile-first design, local SEO basics, clean calls-to-action, and straightforward
                follow-up from Barry - not a bloated process or a mystery quote.
              </p>
              <p className="mt-3">
                If you are unsure which package fits, Barry usually helps by identifying the real
                bottleneck first: getting online fast, building more trust, or improving
                conversion.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
                Meet Barry
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
                Founder-led, locally grounded, and built for businesses that need practical growth.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                <p>
                  Hi, I&apos;m Barry Hillier, right here in Clarenville. I started Shoreline AI
                  Solutions to help Newfoundland businesses move beyond outdated websites,
                  Facebook-only setups, and overpriced agency retainers that never feel built for
                  the way small local teams actually work.
                </p>
                <p>
                  The goal is not to impress you with tech jargon. It is to build a site that looks
                  established, ranks more clearly in local search, and makes it easier for a real
                  customer to trust you enough to call, book, or ask for a quote.
                </p>
                <p>
                  AI-assisted tools help speed up research, structure, and smart follow-up features,
                  but the work stays personal, local, and shaped around what is actually useful for
                  your business.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="coast-card rounded-[2rem] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Why Local Owners Hire Shoreline
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
                  {founderNotes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-cyber" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] bg-slate-950 p-7 text-white shadow-[0_24px_70px_rgba(15,39,65,0.2)]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
                  Best Fit Clients
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {['Restaurants', 'Retail', 'Trades', 'Tourism'].map((vertical) => (
                    <div
                      key={vertical}
                      className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4 text-sm font-medium text-slate-100"
                    >
                      {vertical}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  If the business already has real demand but the website feels slow, weak, or too
                  vague to convert, that is usually where Barry can help the fastest.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div id="testimonials">
          <TestimonialSection
            eyebrow="Verified-Style Testimonials"
            intro="The best websites do more than look good. They make the business easier to trust, easier to understand, and easier to contact. That is the thread running through the feedback here."
            testimonials={testimonials}
            title="Local business feedback that reinforces the promise before the form"
          />
        </div>

        <section id="automation" className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
                  Practical Add-Ons
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
                  Start with the site, then add the systems that actually save time.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  Not every business needs automation on day one. Shoreline keeps the add-ons
                  practical so you can start with the website, then layer in the tools that help
                  most when the timing is right.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {addOns.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,39,65,0.08)]"
                    >
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold text-sky-800">{item.price}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <AiAssistantDemo />

        <section id="process" className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
            <div className="coast-panel rounded-[2rem] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
                How Shoreline Works
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
                Clear process, faster decisions, and a build that does not drag on.
              </h2>
              <div className="mt-8 space-y-5">
                {processSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <article
                      key={step.title}
                      className="rounded-[1.5rem] bg-white/82 p-5 shadow-sm ring-1 ring-slate-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-700">{step.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-slate-950 p-6 text-slate-100 shadow-2xl">
                <div className="flex items-center gap-3">
                  <BadgeDollarSign className="h-5 w-5 text-sky-300" aria-hidden="true" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                    Fast Fit Check
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  If you already know the site is dated, too generic, slow to update, or not
                  helping local search, Barry can usually tell you the right first move quickly.
                </p>
              </div>
            </div>

            <div id="contact" className="coast-card rounded-[2rem] p-3 sm:p-4">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_30px_90px_rgba(15,39,65,0.28)] lg:px-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-200">
                  Ready for a Stronger Local Presence?
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight [font-family:var(--font-cormorant)] sm:text-5xl">
                  If the current site feels weak, slow, or too generic, Barry can fix that fast.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  Start with a free custom mockup, get a clear price range, and decide from there.
                  No bloated process, no mystery handoff, and no pressure to buy more than the
                  business actually needs.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-cyber px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0284c7]"
              >
                Request a Free Mockup
              </a>
            </div>
          </div>
        </section>

        <ConversionFooter
          aboutBlurb={`${siteConfig.businessName} builds high-performance websites, local SEO systems, and smart automations for Newfoundland businesses that want better visibility and better leads.`}
          addressLine={`${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}, ${siteConfig.countryName}`}
          businessName={siteConfig.businessName}
          ctaLinks={[
            { href: '/#contact', label: 'Get a Free Mockup' },
            { href: siteConfig.phoneHref, label: `Call ${siteConfig.phone}` },
            { href: '/#pricing', label: 'See Pricing' },
          ]}
          ctaTitle="Next Step"
          ctaText="Pick the fastest route in. Barry handles the follow-up personally from Clarenville."
          email={siteConfig.email}
          emailHref={siteConfig.emailHref}
          mapPlaceholderLabel="Serving Clarenville and Newfoundland businesses"
          phone={siteConfig.phone}
          phoneHref={siteConfig.phoneHref}
          quickLinks={[
            { href: '/#about', label: 'About Barry' },
            { href: '/#portfolio', label: 'Portfolio' },
            { href: '/#pricing', label: 'Pricing' },
            { href: '/#services', label: 'Services' },
            { href: '/#process', label: 'Process' },
            { href: '/#contact', label: 'Contact' },
          ]}
        />
      </main>
    </>
  );
}
