'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import {
  CHAT_LEAD_EVENT,
  CHAT_LEAD_STORAGE_KEY,
  CHAT_OPEN_EVENT,
  type ChatLeadPayload,
} from '@/lib/chatLead';
import { siteConfig } from '@/lib/siteConfig';

type ChatMessage = {
  content: string;
  role: 'assistant' | 'user';
};

const initialAssistantMessage =
  "Hi! I'm the Shoreline AI Lead Strategist. I can help with websites, local SEO, Google Business Profiles, and practical automations for Newfoundland businesses. What are you trying to improve right now?";

const fallbackReply =
  'AI responses are temporarily unavailable, but I can still help you get this to Barry quickly.';

export default function ShorelineChatWidget() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      content: initialAssistantMessage,
      role: 'assistant',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const suggestedLead = useMemo(() => {
    const latestUserMessage = [...history].reverse().find((entry) => entry.role === 'user');
    return latestUserMessage?.content ?? '';
  }, [history]);

  useEffect(() => {
    function openChat(event: Event) {
      const customEvent = event as CustomEvent<{ prompt?: string }>;
      const prompt = customEvent.detail?.prompt;

      setIsOpen(true);
      if (typeof prompt === 'string' && prompt.trim()) {
        setInputValue(prompt);
      }

      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }

    window.addEventListener(CHAT_OPEN_EVENT, openChat as EventListener);

    return () => {
      window.removeEventListener(CHAT_OPEN_EVENT, openChat as EventListener);
    };
  }, []);

  function appendMessage(message: ChatMessage) {
    setHistory((current) => [...current, message]);
  }

  function queueLeadHandoff(userMessage: string) {
    const payload: ChatLeadPayload = {
      message: `Chat lead from site: ${userMessage}`,
      service: 'Business Automations',
      source: 'AI assistant fallback',
    };

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(CHAT_LEAD_STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent(CHAT_LEAD_EVENT, { detail: payload }));

      if (window.location.pathname === '/' && document.getElementById('contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.location.href = '/contact#intake-form';
    }
  }

  async function sendMessage() {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isSending) {
      return;
    }

    const nextHistory: ChatMessage[] = [...history, { content: trimmedMessage, role: 'user' }];
    setHistory(nextHistory);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        body: JSON.stringify({
          history: nextHistory
            .filter((entry) => entry.role === 'assistant' || entry.role === 'user')
            .slice(0, -1)
            .slice(-6),
          message: trimmedMessage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chat request failed.');
      }

      appendMessage({
        content: data.reply,
        role: 'assistant',
      });
    } catch {
      appendMessage({
        content: fallbackReply,
        role: 'assistant',
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[1100] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <div className="mb-3 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-white/30 bg-white/78 shadow-[0_24px_70px_rgba(9,26,47,0.28)] backdrop-blur-xl">
          <div className="flex items-center justify-between bg-slate-950 px-4 py-4 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-200">
                Shoreline AI Assistant
              </p>
              <p className="mt-1 text-xs text-slate-300">Lead strategist for local growth and automation</p>
            </div>
            <button
              type="button"
              aria-label="Close chatbot"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-slate-100 transition hover:bg-white/16"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-[24rem] space-y-3 overflow-y-auto bg-[linear-gradient(180deg,rgba(240,249,255,0.92),rgba(226,232,240,0.88))] p-4">
            {history.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === 'user'
                    ? 'ml-auto max-w-[86%] rounded-2xl rounded-br-md bg-brand-cyber px-4 py-3 text-sm leading-7 text-white shadow-[0_16px_34px_rgba(14,165,255,0.24)]'
                    : 'max-w-[88%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-7 text-slate-800 shadow-sm ring-1 ring-slate-200'
                }
              >
                {message.content}
              </div>
            ))}

            {history[history.length - 1]?.content === fallbackReply && suggestedLead ? (
              <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-sky-100 bg-white p-4 text-slate-800 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
                  Shoreline AI Lead Capture
                </p>
                <p className="mt-2 text-sm font-semibold">I can still get this in front of Barry right away.</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The live AI reply is temporarily offline, but if you share your business name and what you want to automate, Barry can follow up with the right next step.
                </p>
                <div className="mt-3 rounded-2xl bg-sky-50 px-3 py-3 text-sm leading-6 text-slate-700">
                  Suggested handoff: {suggestedLead}
                </div>
                <button
                  type="button"
                  onClick={() => queueLeadHandoff(suggestedLead)}
                  className="mt-4 inline-flex items-center rounded-full bg-brand-cyber px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7]"
                >
                  Send This to Barry
                </button>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 bg-white/72 p-4">
            <div className="flex gap-2">
              <label htmlFor="shoreline-chat-input" className="sr-only">
                Ask about websites, SEO, pricing, or automation
              </label>
              <input
                ref={inputRef}
                id="shoreline-chat-input"
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Ask about websites, SEO, pricing, or automation..."
                className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/30"
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={isSending}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand-cyber px-4 text-white shadow-[0_16px_34px_rgba(14,165,255,0.28)] transition hover:bg-[#0284c7] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? (
                  <span className="text-sm font-semibold">...</span>
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-500">
              Ready to start now? Call or text Barry at{' '}
              <a href={siteConfig.phoneHref} className="font-medium text-sky-700 hover:underline">
                {siteConfig.phone}
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Open Shoreline AI assistant"
        onClick={() => {
          setIsOpen(true);
          window.setTimeout(() => {
            inputRef.current?.focus();
          }, 50);
        }}
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyber text-white shadow-[0_24px_60px_rgba(14,165,255,0.35)] transition hover:scale-105 hover:bg-[#0284c7]"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
}
