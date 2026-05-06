'use client';

import { MessageCircle, Sparkles } from 'lucide-react';
import { CHAT_OPEN_EVENT } from '@/lib/chatLead';

const prompts = [
  'What package fits a Clarenville restaurant that needs a faster mobile site?',
  'Can you add a booking flow and Google Business cleanup to my project?',
  'How fast can Barry rebuild my current website and what would it start at?',
];

function openAssistant(prompt?: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail: { prompt } }));
}

export default function AiAssistantDemo() {
  return (
    <section id="assistant-demo" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-sky-800">
              AI Assistant Demo
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-cormorant)] sm:text-5xl">
              Try the Shoreline AI Lead Strategist before you ever book a call.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              This is the same assistant concept used to qualify leads, explain services, and move
              the right questions toward Barry faster. Use it to ask about pricing, timelines,
              Google Business help, or whether your business needs a rebuild first.
            </p>
            <button
              type="button"
              onClick={() => openAssistant()}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-cyber px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Open the Assistant
            </button>
          </div>

          <div className="coast-card rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Suggested Prompts
                </p>
                <p className="mt-1 text-base font-semibold text-slate-950">
                  Click one and it drops straight into the live assistant.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => openAssistant(prompt)}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-white/80 px-4 py-4 text-left text-sm leading-7 text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-slate-950"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-slate-100">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                Honest fallback
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                If live AI is unavailable, the assistant still routes the question into a clear
                Barry handoff instead of pretending everything is working.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
