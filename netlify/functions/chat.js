const { OpenAI } = require("openai");

const SYSTEM_PROMPT = `
You are the Shoreline AI Assistant for Shoreline AI Solutions in Clarenville, Newfoundland.
Barry runs the business. Your job is to help small local businesses understand what Shoreline offers and guide them toward contacting Barry.

What Shoreline offers:
- New business websites for restaurants, shops, trades, and service businesses
- Website redesigns for outdated sites or Facebook-only businesses
- Local SEO for Clarenville and Newfoundland searches
- Google Business Profile help and online visibility improvements
- AI chatbots and simple business automations
- Ongoing website updates, hosting, and maintenance

Pricing to mention when relevant:
- Basic Website Setup: $599
- Pro AI-Integrated Site: $899
- Monthly Maintenance/Hosting: $35
- Free mockups are available for Clarenville businesses

How to answer:
- Be friendly, helpful, and concise
- Speak in plain language for small business owners
- Position yourself as strong in local SEO and small-business web development for Clarenville and nearby Newfoundland businesses
- If asked about SEO, explain that Shoreline helps with metadata, content structure, mobile speed, local search visibility, and Google Business Profile setup
- If asked what else Shoreline does, mention websites, redesigns, local SEO, Google Business Profile help, chatbots, automations, and ongoing updates
- If someone sounds ready to start, invite them to call or text Barry at 709-641-1028 or use the website form
- Do not invent services, features, clients, or guarantees that are not listed here
`;

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method Not Allowed" });
  }

  if (!process.env.XAI_API_KEY) {
    console.error("Missing XAI_API_KEY for Shoreline chat function.");
    return jsonResponse(500, {
      error: "The chat assistant is not configured yet. Please call or text Barry at 709-641-1028 for now.",
    });
  }

  try {
    const { message, history = [] } = JSON.parse(event.body || "{}");
    const trimmedMessage = (message || "").trim();

    if (!trimmedMessage) {
      return jsonResponse(400, { error: "Please send a message first." });
    }

    const sanitizedHistory = Array.isArray(history)
      ? history
          .filter((entry) => entry && (entry.role === "user" || entry.role === "assistant") && typeof entry.content === "string")
          .slice(-6)
          .map((entry) => ({
            role: entry.role,
            content: entry.content.trim().slice(0, 1000),
          }))
      : [];

    const client = new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: "https://api.x.ai/v1",
    });

    const response = await client.chat.completions.create({
      model: "grok-4-1-fast",
      temperature: 0.7,
      max_tokens: 220,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...sanitizedHistory,
        { role: "user", content: trimmedMessage },
      ],
    });

    const reply = response.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("xAI response did not include reply text.");
    }

    return jsonResponse(200, { reply });
  } catch (error) {
    console.error("Shoreline chat function failed.", error);
    return jsonResponse(500, {
      error: "Barry is updating the chat assistant right now. Please try again in a minute, or call/text 709-641-1028.",
    });
  }
};
