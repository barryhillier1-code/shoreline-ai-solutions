const { OpenAI } = require('openai');

const SYSTEM_PROMPT =
  'You are the highly professional, 24/7 AI assistant for Shoreline AI Solution, a premium web development agency based in Clarenville, Newfoundland. Your primary goal is to help local business owners understand the value of AI-driven web development, local SEO, and business automations. Answer questions concisely and confidently. Your ultimate objective is to gently collect their name, phone number, and a brief description of their business so Barry can reach out with a free mockup. Do not promise specific prices.';

const MODEL = 'gpt-3.5-turbo';

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(payload),
  };
}

function normalizeReplyText(text) {
  return text
    .replace(/\u00A0/g, ' ')
    .replace(/â|â€œ/g, '"')
    .replace(/â|â€�/g, '"')
    .replace(/â|â€˜/g, "'")
    .replace(/â|â€™/g, "'")
    .replace(/â|â€“/g, '-')
    .replace(/â|â€”/g, '-')
    .replace(/â¦|â€¦/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'insert_key_here') {
    console.error('Missing OPENAI_API_KEY for Shoreline chat function.');
    return jsonResponse(500, {
      error: 'AI responses are temporarily unavailable. Please call or text Barry at 709-641-1028 for now.',
    });
  }

  try {
    const { message, history = [] } = JSON.parse(event.body || '{}');
    const trimmedMessage = (message || '').trim();

    if (!trimmedMessage) {
      return jsonResponse(400, { error: 'Please send a message first.' });
    }

    const sanitizedHistory = Array.isArray(history)
      ? history
          .filter(
            (entry) =>
              entry &&
              (entry.role === 'user' || entry.role === 'assistant') &&
              typeof entry.content === 'string',
          )
          .slice(-6)
          .map((entry) => ({
            role: entry.role,
            content: entry.content.trim().slice(0, 1000),
          }))
      : [];

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 220,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        ...sanitizedHistory,
        {
          role: 'user',
          content: trimmedMessage,
        },
      ],
    });

    const reply = normalizeReplyText(response.choices?.[0]?.message?.content?.trim() || '');

    if (!reply) {
      throw new Error('OpenAI response did not include reply text.');
    }

    return jsonResponse(200, { reply });
  } catch (error) {
    console.error('Shoreline chat function failed.', error);

    const quotaError =
      error?.status === 429 ||
      error?.code === 'insufficient_quota' ||
      error?.error?.code === 'insufficient_quota';

    return jsonResponse(500, {
      error: quotaError
        ? 'AI responses are temporarily unavailable while Barry updates the AI billing. Please call or text 709-641-1028 for now.'
        : 'AI responses are temporarily unavailable right now. Please try again in a minute, or call/text 709-641-1028.',
    });
  }
};
