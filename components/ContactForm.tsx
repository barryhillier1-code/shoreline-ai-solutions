'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import {
  CHAT_LEAD_EVENT,
  CHAT_LEAD_STORAGE_KEY,
  isChatLeadPayload,
  type ChatLeadPayload,
} from '@/lib/chatLead';
import { siteConfig } from '@/lib/siteConfig';

const FORM_NAME = 'free-mockup';
const FORM_TIMELINE_STORAGE_KEY = 'shoreline-intake-timeline';
const serviceOptions = [
  'New Website Build',
  'Website Refresh',
  'Local SEO Mastery',
  'Business Automations',
  'Google Business Setup',
];
const timelineOptions = ['This week', 'Within 30 days', 'Planning ahead', 'Just curious'];

const initialForm = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  website: '',
  service: serviceOptions[0],
  timeline: timelineOptions[0],
  message: '',
  source: 'Detailed free mockup form',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dismissedSubmission, setDismissedSubmission] = useState(false);
  const [submissionState, setSubmissionState] = useState('');
  const [submittedTimeline, setSubmittedTimeline] = useState('');
  const isSubmitted = submissionState === 'free-mockup' && !dismissedSubmission;
  const hasMockupSubmission = submissionState === 'mockup';

  useEffect(() => {
    function applyChatLead(payload: ChatLeadPayload) {
      setForm((current) => ({
        ...current,
        email: payload.email || current.email,
        message: current.message || payload.message,
        phone: payload.phone || current.phone,
        service: payload.service || current.service,
        source: payload.source || current.source,
      }));
    }

    function handleChatLead(event: Event) {
      const customEvent = event as CustomEvent<ChatLeadPayload>;
      if (isChatLeadPayload(customEvent.detail)) {
        applyChatLead(customEvent.detail);
      }
    }

    window.addEventListener(CHAT_LEAD_EVENT, handleChatLead);

    const storedLead = window.sessionStorage.getItem(CHAT_LEAD_STORAGE_KEY);
    if (storedLead) {
      try {
        const parsedLead = JSON.parse(storedLead);
        if (isChatLeadPayload(parsedLead)) {
          applyChatLead(parsedLead);
        }
      } catch {
        // Ignore corrupted session storage and let the form continue normally.
      } finally {
        window.sessionStorage.removeItem(CHAT_LEAD_STORAGE_KEY);
      }
    }

    return () => {
      window.removeEventListener(CHAT_LEAD_EVENT, handleChatLead);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    setSubmissionState(params.get('submitted') ?? '');

    const storedTimeline = window.sessionStorage.getItem(FORM_TIMELINE_STORAGE_KEY);
    if (storedTimeline) {
      setSubmittedTimeline(storedTimeline);
    }
  }, []);

  function handleSubmit() {
    setIsSubmitting(true);

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(FORM_TIMELINE_STORAGE_KEY, form.timeline);
    }
  }

  function handleResetSubmissionState() {
    setDismissedSubmission(true);
    setIsSubmitting(false);
    setForm(initialForm);
    setSubmissionState('');

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(FORM_TIMELINE_STORAGE_KEY);
      window.history.replaceState({}, '', `${window.location.pathname}#contact`);
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-[2rem] border border-white/45 bg-white/70 p-8 shadow-[0_24px_70px_rgba(15,39,65,0.16)] backdrop-blur-md sm:p-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.32em] text-sky-800">
          Thank You
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)]">
          Your free mockup request has been sent.
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700">
          Thanks! Barry will contact you soon, usually within 1 business day from Clarenville.
          {submittedTimeline === 'This week'
            ? ' Because you marked this week, Barry will aim to respond even sooner during business hours.'
            : ' If the project is time-sensitive, Barry will still do his best to reply sooner during business hours.'}
        </p>
        <div className="mt-5 flex flex-col gap-2 text-sm text-slate-600">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex w-fit font-medium text-sky-700 transition hover:text-sky-600 hover:underline"
          >
            Call {siteConfig.phone}
          </a>
          <a
            href={siteConfig.emailHref}
            className="inline-flex w-fit font-medium text-sky-700 transition hover:text-sky-600 hover:underline"
          >
            Email {siteConfig.email}
          </a>
        </div>
        <button
          type="button"
          onClick={handleResetSubmissionState}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-cyber px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7]"
        >
          Submit Another Request
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form
      id="intake-form"
      name={FORM_NAME}
      onSubmit={handleSubmit}
      method="POST"
      action="/?submitted=free-mockup#contact"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="rounded-[2rem] border border-white/45 bg-white/70 p-6 shadow-[0_24px_70px_rgba(15,39,65,0.16)] backdrop-blur-md sm:p-8"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="source" value={form.source} />
      <p className="hidden">
        <label htmlFor="contact-bot-field">
          Do not fill this out if you are human:
          <input id="contact-bot-field" name="bot-field" />
        </label>
      </p>
      {hasMockupSubmission ? (
        <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-900">
          Thanks! Your free mockup request has been sent. Barry will contact you soon. If you want
          a faster, more tailored follow-up, add the business details below and send the full form
          too.
        </div>
      ) : null}
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-800">
          Project Intake
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)]">
          Tell Barry what you need and we will map out the right next step.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Choose the option that feels closest to the problem you want solved. If you are not sure
          yet, that is completely fine - the goal is to help you leave this form with a clear
          recommendation.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Prefer to reach out directly? Call
          {' '}
          <a
            href={siteConfig.phoneHref}
            className="font-medium text-sky-700 transition hover:text-sky-600 hover:underline"
          >
            {siteConfig.phone}
          </a>
          {' '}
          or email
          {' '}
          <a
            href={siteConfig.emailHref}
            className="font-medium text-sky-700 transition hover:text-sky-600 hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-slate-700">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-business-name" className="mb-2 block text-sm font-medium text-slate-700">
            Business Name
          </label>
          <input
            id="contact-business-name"
            name="businessName"
            type="text"
            value={form.businessName}
            onChange={(event) => setForm({ ...form, businessName: event.target.value })}
            className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
            required
          />
        </div>

        <div>
          <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-slate-700">
            Service Selection
          </label>
          <select
            id="contact-service"
            name="service"
            value={form.service}
            onChange={(event) => setForm({ ...form, service: event.target.value })}
            className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
          >
            {serviceOptions.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-website" className="mb-2 block text-sm font-medium text-slate-700">
            Website or Facebook Page
          </label>
          <input
            id="contact-website"
            name="website"
            type="text"
            value={form.website}
            onChange={(event) => setForm({ ...form, website: event.target.value })}
            className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
            placeholder="Optional, but helpful if you already have an online presence."
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-timeline" className="mb-2 block text-sm font-medium text-slate-700">
          Preferred Timeline
        </label>
        <select
          id="contact-timeline"
          name="timeline"
          value={form.timeline}
          onChange={(event) => setForm({ ...form, timeline: event.target.value })}
          className="w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
        >
          {timelineOptions.map((timeline) => (
            <option key={timeline}>{timeline}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-700">
          Project Details
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="min-h-[170px] w-full rounded-2xl border border-white/55 bg-white/85 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
          placeholder="Tell us what you need, what outcome you want, and anything important we should know before we call."
          required
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-slate-600">
          Clear intake helps Barry reply faster with the right pricing tier, mockup direction, or
          automation recommendation for your business.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-brand-cyber px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Sending Request...' : 'Request My Free Mockup'}
        </button>
      </div>
    </form>
  );
}
