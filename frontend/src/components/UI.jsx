// ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────

export function SeverityBadge({ sev }) {
  const map = {
    critical: "severity-critical",
    high: "severity-high",
    medium: "severity-medium",
    low: "severity-low",
    safe: "severity-safe",
  };
  return <span className={`severity-badge ${map[sev] || "severity-low"}`}>{sev}</span>;
}

export function ConfidenceBar({ value, color }) {
  const barColor =
    color || (value > 70 ? "#FF4466" : value > 40 ? "#FFAA00" : "#00FF88");
  return (
    <div className="confidence-bar-wrap">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          marginBottom: 5,
        }}
      >
        <span style={{ color: "var(--text-secondary)" }}>Confidence</span>
        <span style={{ color: barColor }}>{value.toFixed(1)}%</span>
      </div>
      <div className="confidence-bar-track">
        <div
          className="confidence-bar-fill"
          style={{ width: `${value}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

export function ToastContainer({ toasts }) {
  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{icons[t.type]}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
