'use client';

import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  partySize: '2',
  tour: 'Trinity Bay Coastal Tour',
  tourDate: '',
  message: '',
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending your booking request...');

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus(data.message);
      setForm(initialForm);
    } catch {
      setStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.7rem] bg-white p-6 shadow-[0_30px_80px_rgba(15,39,65,0.14)] sm:p-8">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
          Booking Request
        </p>
        <h3 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)]">
          Start planning your day on the water.
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Tell us when you are visiting, how many guests are coming, and what kind of coastal experience you want to build.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label htmlFor="partySize" className="mb-2 block text-sm font-medium text-slate-700">
            Party Size
          </label>
          <input
            id="partySize"
            type="number"
            min="1"
            max="12"
            value={form.partySize}
            onChange={(event) => setForm({ ...form, partySize: event.target.value })}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label htmlFor="tourDate" className="mb-2 block text-sm font-medium text-slate-700">
            Preferred Date
          </label>
          <input
            id="tourDate"
            type="date"
            value={form.tourDate}
            onChange={(event) => setForm({ ...form, tourDate: event.target.value })}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="tour" className="mb-2 block text-sm font-medium text-slate-700">
          Tour Preference
        </label>
        <select
          id="tour"
          value={form.tour}
          onChange={(event) => setForm({ ...form, tour: event.target.value })}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
        >
          <option>Trinity Bay Coastal Tour</option>
          <option>Whale Watching Excursion</option>
          <option>Iceberg Sightings Tour</option>
          <option>Private Charter Adventure</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
          Trip Details
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="min-h-[160px] w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
          placeholder="Tell us about your group, whether you are hoping for whales or icebergs, and any accessibility or timing notes."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending Request...' : 'Request Booking Availability'}
      </button>

      {status ? <p className="mt-4 text-sm leading-7 text-slate-600">{status}</p> : null}
    </form>
  );
}
