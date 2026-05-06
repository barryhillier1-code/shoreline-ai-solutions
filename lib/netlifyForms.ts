type NetlifyFormPayload = Record<string, string>;

function getSubmissionPath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return window.location.pathname === '/contact' ? '/contact' : '/';
}

export async function submitNetlifyForm(formName: string, payload: NetlifyFormPayload) {
  const response = await fetch(getSubmissionPath(), {
    body: new URLSearchParams({
      'form-name': formName,
      ...payload,
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('The form could not send just yet. Please call or email Barry directly.');
  }

  return response;
}
