import { useState } from "react";
import { SeverityBadge, ConfidenceBar } from "../components/UI";
import { detectSQLInjection } from "../utils/detection";
import { SAMPLE_QUERIES } from "../utils/hooks";

export default function QueryScanner({ toast }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const scan = async () => {
    if (!query.trim()) { toast.add("Enter a SQL query to scan", "error"); return; }
    setLoading(true);
    setResult(null);
    try {
      const r = await detectSQLInjection(query);
      setResult(r);
      setHistory((h) => [
        { query: query.substring(0, 60) + "...", severity: r.severity, ts: new Date().toLocaleTimeString(), confidence: r.confidence },
        ...h.slice(0, 9),
      ]);
      toast.add(r.is_malicious ? "⚠️ Injection detected!" : "✅ Query is safe", r.is_malicious ? "error" : "success");
    } catch {
      toast.add("Scan failed — check API connection", "error");
    }
    setLoading(false);
  };

  const getResultClass = () => {
    if (!result) return "";
    if (result.severity === "safe") return "safe";
    if (["critical", "high"].includes(result.severity)) return "malicious";
    return "warning";
  };

  const barColor = result
    ? result.severity === "safe" ? "#00FF88" : result.severity === "critical" ? "#FF4466" : "#FFAA00"
    : "#00D4FF";

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">SQL Query Scanner</div>
        <div className="page-subtitle">// paste a query and run AI-powered injection analysis</div>
      </div>

      <div className="scanner-container">
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-title">Query Input</div>
            <textarea
              id="scanner-textarea"
              className="query-textarea"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Enter SQL query to analyze...\n\ne.g. SELECT * FROM users WHERE id = '1' OR '1'='1'`}
              spellCheck={false}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <button id="scan-btn" className="btn btn-primary" onClick={scan} disabled={loading}>
                {loading ? "⏳ Scanning..." : "🔍 Analyze Query"}
              </button>
              <button id="clear-btn" className="btn btn-outline" onClick={() => { setQuery(""); setResult(null); }}>
                Clear
              </button>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 8 }}>
                Quick test payloads:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SAMPLE_QUERIES.slice(0, 4).map((q, i) => (
                  <button key={i} className="btn btn-outline" style={{ fontSize: 10, padding: "4px 10px" }} onClick={() => setQuery(q)}>
                    {q.substring(0, 28)}…
                  </button>
                ))}
              </div>
            </div>
          </div>

          {history.length > 0 && (
            <div className="card">
              <div className="card-title">Scan History (this session)</div>
              {history.map((h, i) => (
                <div key={i} className="log-entry" style={{ cursor: "default" }}>
                  <div className="log-query">{h.query}</div>
                  <SeverityBadge sev={h.severity} />
                  <div className="log-time">{h.ts}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {loading && (
            <div className="card">
              <div className="loading-scan">
                <div className="scan-ring" />
                <div className="scan-text">🤖 Claude AI analyzing query…</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Checking patterns · ML inference · Rule engine
                </div>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className={`result-card ${getResultClass()}`}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div className={`result-label ${getResultClass()}`}>
                  {result.is_malicious ? "⚠️ INJECTION DETECTED" : "✅ QUERY SAFE"}
                </div>
                <SeverityBadge sev={result.severity} />
              </div>

              <ConfidenceBar value={result.confidence} color={barColor} />

              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-key">Severity</div>
                  <div className="detail-val" style={{ color: barColor }}>{result.severity?.toUpperCase()}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Attack Types</div>
                  <div className="detail-val" style={{ fontSize: 11 }}>{(result.attack_types || []).join(", ") || "None"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Detection Methods</div>
                  <div className="detail-val" style={{ fontSize: 11 }}>{(result.detection_methods || []).slice(0, 2).join(", ") || "—"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-key">Patterns Found</div>
                  <div className="detail-val" style={{ fontSize: 11 }}>{(result.patterns_found || []).length || 0}</div>
                </div>
              </div>

              {result.patterns_found?.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 8 }}>PATTERNS DETECTED</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {result.patterns_found.map((p, i) => (
                      <span key={i} style={{ background: "rgba(255,68,102,0.15)", color: "var(--accent-red)", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontFamily: "var(--font-mono)" }}>{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {result.risk_analysis && (
                <div style={{ marginTop: 14, background: "var(--bg0)", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>RISK ANALYSIS</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{result.risk_analysis}</div>
                </div>
              )}

              {result.suggested_fix && (
                <div style={{ marginTop: 12, background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: "var(--accent-green)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>💡 SUGGESTED FIX</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>{result.suggested_fix}</div>
                </div>
              )}
            </div>
          )}

          {!result && !loading && (
            <div className="card" style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>Results will appear here</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 8 }}>Enter a query and click Analyze</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
