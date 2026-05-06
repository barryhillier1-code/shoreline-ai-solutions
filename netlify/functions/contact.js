function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
}

function parseBody(event) {
  const rawBody = event.body ?? '';
  const contentType = event.headers?.['content-type'] || event.headers?.['Content-Type'] || '';

  if (contentType.includes('application/json')) {
    return JSON.parse(rawBody || '{}');
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }

  try {
    return JSON.parse(rawBody || '{}');
  } catch {
    return Object.fromEntries(new URLSearchParams(rawBody));
  }
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const DEFAULT_NOTIFICATION_EMAIL = 'Barry.Hillier1@icloud.com';
const DEFAULT_FROM_EMAIL = 'Shoreline AI Solutions <onboarding@resend.dev>';

async function sendNotificationEmail(lead) {
  if (!process.env.RESEND_API_KEY) {
    return {
      delivered: false,
      reason: 'missing_resend_api_key',
    };
  }

  const to = process.env.CONTACT_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const subject = `New Shoreline lead: ${lead.name} - ${lead.service}`;
  const text = [
    'New Shoreline AI Solutions lead',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Service: ${lead.service}`,
    `Timeline: ${lead.timeline}`,
    '',
    'Project details:',
    lead.message,
  ].join('\n');

  const html = `
    <h1>New Shoreline AI Solutions lead</h1>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Service:</strong> ${lead.service}</p>
    <p><strong>Timeline:</strong> ${lead.timeline}</p>
    <p><strong>Project details:</strong></p>
    <p>${lead.message.replace(/\n/g, '<br />')}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject,
      text,
      html,
    }),
  });

  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(`Resend request failed: ${response.status} ${responseBody}`);
  }

  return {
    delivered: true,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, {
      success: false,
      error: 'Method not allowed.',
    });
  }

  try {
    const body = parseBody(event);
    const name = `${body.name ?? ''}`.trim();
    const email = `${body.email ?? ''}`.trim();
    const phone = `${body.phone ?? ''}`.trim();
    const service = `${body.service ?? ''}`.trim();
    const timeline = `${body.timeline ?? ''}`.trim();
    const message = `${body.message ?? ''}`.trim();
    const honeypot = `${body['bot-field'] ?? ''}`.trim();

    if (honeypot) {
      return jsonResponse(200, {
        success: true,
        message: 'Thanks for reaching out.',
      });
    }

    if (!name || !email || !phone || !service || !timeline || !message) {
      return jsonResponse(400, {
        success: false,
        error: 'Please complete every required field before sending your request.',
      });
    }

    if (!isValidEmail(email)) {
      return jsonResponse(400, {
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const lead = {
      name,
      email,
      phone,
      service,
      timeline,
      message,
    };

    console.log(
      JSON.stringify({
        event: 'shoreline_contact_submission',
        submittedAt: new Date().toISOString(),
        lead,
      }),
    );

    const notification = await sendNotificationEmail(lead);

    console.log(
      JSON.stringify({
        event: 'shoreline_contact_notification',
        submittedAt: new Date().toISOString(),
        notification,
      }),
    );

    return jsonResponse(200, {
      success: true,
      message:
        'Thanks - Barry has your request and will follow up from Clarenville within 1 business day.',
    });
  } catch (error) {
    console.error('Shoreline contact submission failed.', error);

    return jsonResponse(400, {
      success: false,
      error: 'Invalid request payload.',
    });
  }
};
