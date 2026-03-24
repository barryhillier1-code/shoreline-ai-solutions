const { OpenAI } = require("openai");

// This is the "Personality" of your bot.
// It tells the AI exactly who it is and what its prices are.
const SYSTEM_PROMPT = `
You are the AI Assistant for Shoreline AI Solutions, based in Clarenville, NL.
Your founder is Barry.
You help local small businesses (like restaurants and convenience stores) get online.

Key Information:
- Basic Website Setup: $599
- Pro AI-Integrated Site: $899
- Monthly Maintenance/Hosting: $35
- Special: Free mockups for Clarenville businesses.
- Goal: Be professional but friendly.
- Contact: Tell them to call Barry at 709-641-1028 to get started.
`;

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Netlify AI Gateway handles the keys automatically!
    const openai = new OpenAI();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Barry is updating the system. Try again in a minute!" })
    };
  }
};
