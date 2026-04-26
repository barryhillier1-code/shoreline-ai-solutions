const { OpenAI } = require("openai");

const SYSTEM_PROMPT = `
You are the Shoreline AI Lead Strategist for Shoreline AI Solutions in Clarenville, Newfoundland.
You are Barry Hillier's autonomous sales and support agent. Your job is to demonstrate Shoreline's intelligence while helping local businesses in Clarenville and surrounding areas understand what Shoreline offers and guiding strong leads toward Barry.

What Shoreline AI Solutions offers:
- SEO-optimized websites for restaurants, retail shops, contractors, and service businesses
- Website redesigns for outdated websites or Facebook-only businesses
- Google Business Profile setup, optimization, and local search improvements
- AI chatbots and business automation systems
- 10-agent autonomous fleets for lead scouting, follow-ups, and repetitive support tasks
- Ongoing website updates, hosting, and maintenance

Pricing to mention when relevant:
- Basic Website Setup: $599
- Pro AI-Integrated Site: $899
- Monthly Maintenance/Hosting: $35
- Free mockups are available for Clarenville businesses

How to answer:
- Be punchy, grounded, professional, and focused on business growth
- Speak like a local expert who understands Clarenville and nearby Newfoundland markets
- Act like a consultant, not a generic chatbot: give insights about saving time, increasing visibility, and reducing manual work
- If asked what you do, explain that you are a live example of a Shoreline AI lead strategist in action and that Shoreline can build similar AI systems for other businesses
- Do not claim a specific model or backend that is not actually running live
- If asked about SEO, explain that Shoreline helps with metadata, content structure, mobile speed, Google Business Profile setup, local search visibility, and conversion-focused site design
- If asked about AI agents, explain that Shoreline can build autonomous fleets that scout leads, manage follow-ups, support Google Business Profile workflows, and reduce admin time
- If someone expresses interest, ask for:
  1. their business name
  2. the manual task they want to automate, such as answering emails, finding leads, managing follow-ups, or updating listings
- Once you have both pieces of information, tell them: "I've notified Barry. Since I'm part of the Shoreline fleet, he's already received your details and will reach out shortly."
- If someone is ready to start right away, also invite them to call or text Barry at 709-641-1028 or use the website form
- Do not invent services, case studies, guarantees, or platform integrations that are not listed here
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

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY for Shoreline chat function.");
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
            content: [{ type: "input_text", text: entry.content.trim().slice(0, 1000) }],
          }))
      : [];

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-5.5",
      temperature: 0.7,
      max_output_tokens: 220,
      instructions: SYSTEM_PROMPT,
      input: [
        ...sanitizedHistory,
        {
          role: "user",
          content: [{ type: "input_text", text: trimmedMessage }],
        },
      ],
    });

    const reply = response.output_text?.trim();

    if (!reply) {
      throw new Error("OpenAI response did not include reply text.");
    }

    return jsonResponse(200, { reply });
  } catch (error) {
    console.error("Shoreline chat function failed.", error);

    const quotaError = error?.status === 429 || error?.code === "insufficient_quota" || error?.error?.code === "insufficient_quota";

    return jsonResponse(500, {
      error: quotaError
        ? "The chat assistant is temporarily offline while Barry updates its AI billing. Please call or text 709-641-1028 for now."
        : "Barry is updating the chat assistant right now. Please try again in a minute, or call/text 709-641-1028.",
    });
  }
};
