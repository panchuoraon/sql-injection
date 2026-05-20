import { useState } from "react";
import { USERS } from "../utils/hooks";

const ENDPOINTS = [
  "POST /api/scanner/scan",
  "GET /api/scanner/history",
  "POST /api/auth/login",
  "GET /api/admin/users",
  "GET /api/admin/analytics",
  "POST /api/admin/block-ip",
];

const MOCK_RESPONSES = {
  "POST /api/scanner/scan": { status: 200, data: { success: true, result: { is_malicious: true, severity: "critical", confidence: 97.8, attack_types: ["UNION-Based", "Auth Bypass"] } } },
  "GET /api/scanner/history": { status: 200, data: { scans: [{ query: "admin'--", severity: "high", ts: "2025-01-15T14:23:00Z" }], total: 142 } },
  "POST /api/auth/login": { status: 200, data: { success: true, token: "eyJhbGci..." } },
  "GET /api/admin/users": { status: 200, data: { users: USERS.map((u) => ({ ...u, password: undefined })), total: 5 } },
  "GET /api/admin/analytics": { status: 200, data: { totalScans: 10877, blocked: 852, accuracy: 99.4 } },
  "POST /api/admin/block-ip": { status: 200, data: { success: true, message: "IP blocked" } },
};

export default function APITester({ toast }) {
  const [endpoint, setEndpoint] = useState(ENDPOINTS[0]);
  const [payload, setPayload] = useState(`{\n  "query": "SELECT * FROM users WHERE id = '1' OR '1'='1'"\n}`);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setResponse(MOCK_RESPONSES[endpoint] || { status: 404, data: { error: "Endpoint not found" } });
    setLoading(false);
    toast.add("API response received", "info");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">API Tester</div>
        <div className="page-subtitle">// inspect and test all system endpoints</div>
      </div>

      <div className="api-grid">
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-title">Endpoint</div>
            <select
              id="api-endpoint-select"
              style={{ width: "100%", background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: 13, padding: "10px 12px", outline: "none", marginBottom: 16 }}
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            >
              {ENDPOINTS.map((e) => <option key={e}>{e}</option>)}
            </select>
            <div className="card-title">Request Body</div>
            <textarea
              className="query-textarea"
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              style={{ minHeight: 120, marginBottom: 12 }}
            />
            <button id="api-send-btn" className="btn btn-primary" onClick={simulate} disabled={loading} style={{ width: "100%" }}>
              {loading ? "⏳ Sending..." : "▶ Send Request"}
            </button>
          </div>

          <div className="card">
            <div className="card-title">Available Endpoints</div>
            {ENDPOINTS.map((e) => (
              <div key={e}
                style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", cursor: "pointer" }}
                onClick={() => setEndpoint(e)}>
                <span style={{ color: e.startsWith("POST") ? "var(--accent-amber)" : e.startsWith("DELETE") ? "var(--accent-red)" : "var(--accent-green)", marginRight: 8 }}>{e.split(" ")[0]}</span>
                {e.split(" ")[1]}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title">Response</div>
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 20 }}>
                <div className="scan-ring" style={{ width: 24, height: 24, borderWidth: 2 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)" }}>Waiting for response…</span>
              </div>
            )}
            {response && !loading && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: response.status === 200 ? "var(--accent-green)" : "var(--accent-red)" }}>{response.status}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>OK • 42ms • application/json</span>
                </div>
                <pre style={{ background: "var(--bg0)", borderRadius: 8, padding: 14, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", overflow: "auto", whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            )}
            {!response && !loading && (
              <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)", fontSize: 13, fontFamily: "var(--font-mono)" }}>
                No response yet. Send a request.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
