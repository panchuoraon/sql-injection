// ─── AI DETECTION ENGINE ──────────────────────────────────────────────────────
// Calls the backend proxy at /api/scan/ai — never the Anthropic API directly
// (browser → direct Anthropic calls are blocked by CORS and expose the API key)

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function detectSQLInjection(query) {
  const resp = await fetch(`${API_BASE}/scan/ai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || `Server error ${resp.status}`);
  }

  return resp.json();
}
