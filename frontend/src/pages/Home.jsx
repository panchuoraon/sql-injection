import { useState, useEffect } from "react";

export default function HomePage({ navigate }) {
  const features = [
    { icon: "🛡️", title: "AI-Powered Detection", desc: "Claude AI analyzes queries for injection patterns with >99% accuracy" },
    { icon: "⚡", title: "Real-time Scanning", desc: "Sub-second analysis with live threat feed and instant blocking" },
    { icon: "📊", title: "Attack Analytics", desc: "Comprehensive dashboards with trend analysis and severity breakdowns" },
    { icon: "🔐", title: "RBAC Auth System", desc: "JWT-based auth with admin/user roles and session management" },
    { icon: "🌐", title: "API Protection", desc: "Middleware layer scanning all DB-bound requests automatically" },
    { icon: "📋", title: "Audit Reports", desc: "Exportable CSV/PDF logs with full forensic trace" },
  ];

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const liveStats = [
    "14 threats blocked today",
    "3 IPs banned",
    "99.4% detection accuracy",
    "2.1ms avg scan time",
  ];

  return (
    <div className="hero">
      <div className="hero-bg" />
      <div style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ textAlign: "center" }}>
          <div className="hero-badge">
            <span className="status-dot" />
            {liveStats[tick % liveStats.length]}
          </div>
          <h1 className="hero-title">
            Stop SQL Injections
            <br />
            <span className="hero-gradient">Before They Strike</span>
          </h1>
          <p className="hero-desc">
            Enterprise-grade SQL injection detection powered by Claude AI. Real-time analysis,
            <br />
            hybrid ML/rule-based detection, and complete attack forensics.
          </p>
          <div className="hero-actions">
            {/* <button
              type="button"
              className="btn btn-primary"
              id="hero-scan-btn"
              onClick={() => navigate("scanner")}
              style={{ padding: "12px 28px", fontSize: 14 }}
            >
              🔍 Scan a Query
            </button> */}
            {/* <button
              type="button"
              className="btn btn-outline"
              id="hero-dashboard-btn"
              onClick={() => navigate("dashboard")}
              style={{ padding: "12px 28px", fontSize: 14 }}
            >
              📊 View Dashboard
            </button> */}
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[
              ["99.4%", "Detection Rate"],
              ["2.1ms", "Avg Response"],
              ["50K+", "Queries Scanned"],
              ["Zero", "False Negatives"],
            ].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent-blue)", fontFamily: "var(--font-mono)" }}>{v}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
