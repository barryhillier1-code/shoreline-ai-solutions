export const CHAT_LEAD_EVENT = 'shoreline:chat-lead';
export const CHAT_LEAD_STORAGE_KEY = 'shoreline-chat-lead';
export const CHAT_OPEN_EVENT = 'shoreline:chat-open';

export type ChatLeadPayload = {
  email?: string;
  message: string;
  phone?: string;
  service?: string;
  source?: string;
};

export function isChatLeadPayload(value: unknown): value is ChatLeadPayload {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.message === 'string' &&
    (candidate.email === undefined || typeof candidate.email === 'string') &&
    (candidate.phone === undefined || typeof candidate.phone === 'string') &&
    (candidate.service === undefined || typeof candidate.service === 'string') &&
    (candidate.source === undefined || typeof candidate.source === 'string')
  );
}
