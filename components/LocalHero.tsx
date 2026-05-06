'use client';

import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, MapPinned, Sparkles } from 'lucide-react';
import { CHAT_LEAD_STORAGE_KEY, type ChatLeadPayload } from '@/lib/chatLead';
import shorelineHero from './shorelineai-hero.jpg';

const heroPills = [
  'Barry Hillier | Clarenville, NL',
  'Websites for Restaurants, Retail, Trades & Tourism',
];
const supportHighlights = [
  'Starting at $599',
  'Built in 1-3 Days',
  'Free Mockup in 24 Hours',
  'Barry Hillier, Clarenville',
];
const verticalFocus = ['Restaurants', 'Retail', 'Trades', 'Tourism'];
const HERO_FORM_NAME = 'free-mockup';

function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, '');
}

function isLikelyPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10;
}

export default function LocalHero() {
  const formRef = useRef<HTMLFormElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const phoneFieldRef = useRef<HTMLInputElement>(null);
  const messageFieldRef = useRef<HTMLInputElement>(null);
  const sourceFieldRef = useRef<HTMLInputElement>(null);
  const [leadValue, setLeadValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedLead = leadValue.trim();

    if (!trimmedLead) {
      setStatus('Add an email or mobile number and Barry can follow up with the right next step.');
      return;
    }

    const email = isLikelyEmail(trimmedLead) ? trimmedLead : '';
    const phone = !email && isLikelyPhone(trimmedLead) ? normalizePhone(trimmedLead) : '';

    if (!email && !phone) {
      setStatus('Use a valid email address or mobile number so Barry can send the mockup follow-up to the right place.');
      return;
    }

    const payload: ChatLeadPayload = {
      email,
      message:
        'Requested a free custom website mockup from the hero section. Add your name and business details below if you want Barry to tailor the follow-up faster.',
      phone,
      service: 'New Website Build',
      source: 'Hero free mockup request',
    };

    setIsSubmitting(true);
    setStatus('');

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(CHAT_LEAD_STORAGE_KEY, JSON.stringify(payload));
    }

    if (emailFieldRef.current) {
      emailFieldRef.current.value = email;
    }

    if (phoneFieldRef.current) {
      phoneFieldRef.current.value = phone;
    }

    if (messageFieldRef.current) {
      messageFieldRef.current.value = 'Requested a free 24-hour website mockup from the hero section.';
    }

    if (sourceFieldRef.current) {
      sourceFieldRef.current.value = 'Hero free mockup request';
    }

    formRef.current?.submit();
  }

  return (
    <header
      id="top"
      aria-label="Shoreline AI Solutions hero"
      className="relative min-h-[80vh] w-full overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${shorelineHero.src})` }}
    >
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,255,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(71,85,105,0.16),transparent_26%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[80vh] max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-3">
            {heroPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-50 backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </div>

          <h1 className="mt-6 max-w-5xl text-[3.65rem] font-semibold leading-[0.94] tracking-[-0.045em] text-white [font-family:var(--font-cormorant)] sm:text-6xl lg:text-7xl">
            <span className="sm:block">Turn an Outdated Website</span>{' '}
            <span className="sm:block">Into More Calls, Bookings,</span>{' '}
            <span className="sm:block">and Walk-Ins.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">
            If your site looks dated, loads slow, or barely shows up on Google, you are losing
            trust before the customer ever calls. Barry builds fast, professional websites for
            Newfoundland businesses in 1-3 days, starting at $599, with a free 24-hour mockup and
            direct support from Barry in Clarenville.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {verticalFocus.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-slate-50 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5 text-sm">
            {supportHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/8 px-3.5 py-1.5 font-medium text-slate-100 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
            <a
              href="tel:+17096411028"
              className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3.5 py-1.5 font-medium text-cyan-100 transition hover:bg-cyan-400/20 hover:text-white"
            >
              709-641-1028
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="tel:+17096411028"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_32px_rgba(15,23,42,0.24)] transition hover:bg-slate-100"
            >
              Call Barry Direct
            </a>
            <a
              href="sms:+17096411028"
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/16"
            >
              Text Barry Now
            </a>
          </div>

          <form
            ref={formRef}
            name={HERO_FORM_NAME}
            method="POST"
            action="/?submitted=mockup#contact"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="mt-10 max-w-3xl rounded-[1.75rem] border border-white/12 bg-white/10 p-4 shadow-[0_24px_70px_rgba(2,8,23,0.26)] backdrop-blur-md"
          >
            <input type="hidden" name="form-name" value={HERO_FORM_NAME} />
            <input ref={emailFieldRef} type="hidden" name="email" defaultValue="" />
            <input ref={phoneFieldRef} type="hidden" name="phone" defaultValue="" />
            <input ref={messageFieldRef} type="hidden" name="message" defaultValue="" />
            <input ref={sourceFieldRef} type="hidden" name="source" defaultValue="" />
            <p className="hidden">
              <label htmlFor="hero-bot-field">
                Do not fill this out if you are human:
                <input id="hero-bot-field" name="bot-field" />
              </label>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="local-hero-lead" className="sr-only">
                Email or mobile number
              </label>
              <input
                id="local-hero-lead"
                type="text"
                inputMode="email"
                value={leadValue}
                onChange={(event) => setLeadValue(event.target.value)}
                placeholder="Enter your email or mobile number"
                className="min-h-14 flex-1 rounded-2xl border border-white/12 bg-white/95 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-cyber px-6 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7]"
              >
                {isSubmitting ? 'Sending Request...' : 'See My Free 24-Hour Website Mockup'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-100">
              See the direction first, decide after. No pressure, no bloated process, and Barry
              replies personally from Clarenville.
            </p>

            {status ? (
              <p className="mt-3 max-w-2xl text-sm text-sky-100" aria-live="polite">
                {status}
              </p>
            ) : null}
          </form>
        </div>

        <div className="coast-card rounded-[2rem] p-6 text-slate-950 shadow-[0_28px_80px_rgba(2,8,23,0.28)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-800">
            Best Fit
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)]">
            For owners who need something sharp, local, and ready to convert.
          </h2>

          <div className="mt-6 space-y-4">
            {[
              {
                icon: Clock3,
                title: 'Fast launches',
                text: 'Most builds are scoped for 1-3 business days, not dragged out for weeks.',
              },
              {
                icon: MapPinned,
                title: 'Newfoundland-first SEO',
                text: 'Local schema, Google Business alignment, and cleaner location signals are baked in early.',
              },
              {
                icon: Sparkles,
                title: 'Direct support from Barry',
                text: 'You are dealing directly with Barry in Clarenville, not a bloated agency handoff.',
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-slate-100">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-sky-300" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                What Barry Handles
              </p>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Website design, local SEO foundations, Google Business setup, and practical lead
              automation for restaurants, retail, trades, and tourism brands across Newfoundland.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
