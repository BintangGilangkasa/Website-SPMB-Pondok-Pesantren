const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export function isLandingPageApiConfigured() {
  return Boolean(API_BASE_URL);
}

async function request(path, { method = 'GET', body, authenticated = false } = {}) {
  if (!API_BASE_URL) {
    throw new Error('Atur VITE_API_BASE_URL untuk menghubungkan API landing page.');
  }

  const headers = { Accept: 'application/json' };
  const token = authenticated ? localStorage.getItem('token') : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  const isMultipart = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body !== undefined && !isMultipart) headers['Content-Type'] = 'application/json';

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : isMultipart ? body : JSON.stringify(body),
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server landing page.');
  }

  const responseText = await response.text();
  let payload = {};
  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = { message: responseText };
    }
  }

  if (!response.ok) {
    throw new Error(payload.message || `Permintaan gagal (${response.status}).`);
  }

  return payload.data ?? payload;
}

export function getPublishedLandingPage() {
  return request('/api/public/landing-page');
}

export function getLandingPageDraft() {
  return request('/api/admin/landing-page/draft', { authenticated: true });
}

export function uploadLandingPageImage(file) {
  const body = new FormData();
  body.append('file', file);
  return request('/api/admin/landing-page/media', {
    method: 'POST',
    body,
    authenticated: true,
  });
}

export function saveLandingPageAboutDraft(about) {
  return request('/api/admin/landing-page/draft/about', {
    method: 'PATCH',
    body: about,
    authenticated: true,
  });
}

export function publishLandingPage() {
  return request('/api/admin/landing-page/publish', {
    method: 'POST',
    authenticated: true,
  });
}
