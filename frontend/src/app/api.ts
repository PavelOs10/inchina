const API_BASE = import.meta.env.VITE_API_URL || '';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    if (window.location.pathname.startsWith('/admin')) {
      window.location.href = '/admin/login';
    }
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(data.error || 'Request failed');
  }

  return res.json();
}

// ── Public ──
export function submitLead(data: { name: string; company: string; email: string; qty: string; message: string }) {
  return request('/api/leads', { method: 'POST', body: JSON.stringify(data) });
}

export function getContacts() {
  return request('/api/contacts');
}

// ── Auth ──
export function login(password: string) {
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) });
}

export function isLoggedIn() {
  return !!localStorage.getItem('admin_token');
}

export function logout() {
  localStorage.removeItem('admin_token');
}

// ── Admin ──
export function getLeads(params?: { status?: string; page?: number; search?: string }) {
  const q = new URLSearchParams();
  if (params?.status) q.set('status', params.status);
  if (params?.page) q.set('page', String(params.page));
  if (params?.search) q.set('search', params.search);
  return request(`/api/admin/leads?${q.toString()}`);
}

export function getLead(id: number) {
  return request(`/api/admin/leads/${id}`);
}

export function updateLead(id: number, data: { status?: string; notes?: string }) {
  return request(`/api/admin/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function deleteLead(id: number) {
  return request(`/api/admin/leads/${id}`, { method: 'DELETE' });
}

export function getAdminContacts() {
  return request('/api/admin/contacts');
}

export function updateContact(key: string, value: string) {
  return request(`/api/admin/contacts/${key}`, { method: 'PUT', body: JSON.stringify({ value }) });
}

export function deleteContact(key: string) {
  return request(`/api/admin/contacts/${key}`, { method: 'DELETE' });
}

export function getStats() {
  return request('/api/admin/stats');
}
