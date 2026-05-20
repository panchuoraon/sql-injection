export default function Analytics() {
  const monthlyData = [
    { m: "Aug", scans: 1240, blocked: 88 },
    { m: "Sep", scans: 1480, blocked: 112 },
    { m: "Oct", scans: 1320, blocked: 95 },
    { m: "Nov", scans: 1890, blocked: 167 },
    { m: "Dec", scans: 2100, blocked: 201 },
    { m: "Jan", scans: 2847, blocked: 189 },
  ];
  const maxScans = Math.max(...monthlyData.map((x) => x.scans));

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Reports & Analytics</div>
        <div className="page-subtitle">// historical trends and threat intelligence</div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: "Total Scans (6mo)", value: "10,877", color: "blue" },
          { label: "Total Blocked", value: "852", color: "red" },
          { label: "False Positive Rate", value: "0.6%", color: "green" },
          { label: "Avg Severity Score", value: "7.2/10", color: "purple" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-value ${s.color}`}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="card">
          <div className="card-title">Monthly Scan Volume vs Threats Blocked</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160, padding: "8px 0" }}>
            {monthlyData.map((d) => (
              <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, width: "100%", justifyContent: "center" }}>
                  <div style={{ width: "42%", height: `${(d.scans / maxScans) * 100}%`, background: "var(--accent-blue)", borderRadius: "3px 3px 0 0", opacity: 0.7 }} />
                  <div style={{ width: "42%", height: `${(d.blocked / maxScans) * 100}%`, background: "var(--accent-red)", borderRadius: "3px 3px 0 0", opacity: 0.8 }} />
                </div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{d.m}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {[["var(--accent-blue)", "Scans"], ["var(--accent-red)", "Blocked"]].map(([bg, label]) => (
              <span key={label} style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, background: bg, borderRadius: 2, display: "inline-block" }} />{label}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Severity Distribution</div>
          {[
            { label: "Critical", pct: 22, color: "var(--accent-red)" },
            { label: "High", pct: 31, color: "#FF6600" },
            { label: "Medium", pct: 19, color: "var(--accent-amber)" },
            { label: "Low", pct: 9, color: "var(--accent-blue)" },
            { label: "Safe", pct: 19, color: "var(--accent-green)" },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{s.label}</span>
                <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: s.color, fontWeight: 600 }}>{s.pct}%</span>
              </div>
              <div style={{ height: 6, background: "var(--bg0)", borderRadius: 3 }}>
                <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card">
          <div className="card-title">Top Source IPs</div>
          {[
            { ip: "203.0.113.22", attacks: 47, country: "🇷🇺" },
            { ip: "192.168.1.44", attacks: 38, country: "🇨🇳" },
            { ip: "198.51.100.14", attacks: 31, country: "🇧🇷" },
            { ip: "172.16.0.99", attacks: 24, country: "🇮🇳" },
            { ip: "10.0.0.201", attacks: 18, country: "🇺🇸" },
          ].map((ip, i) => (
            <div key={ip.ip} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "var(--font-mono)", width: 16 }}>#{i + 1}</span>
              <span style={{ fontSize: 16 }}>{ip.country}</span>
              <span style={{ flex: 1, fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--accent-blue)" }}>{ip.ip}</span>
              <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--accent-red)" }}>{ip.attacks} attacks</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">System Health</div>
          {[
            { name: "AI Detection Engine", status: "green", value: "99.4% accuracy" },
            { name: "Rule-Based Engine", status: "green", value: "Operational" },
            { name: "ML Model (v2.3)", status: "green", value: "Loaded" },
            { name: "MongoDB Atlas", status: "green", value: "12ms latency" },
            { name: "Rate Limiter", status: "green", value: "Active" },
            { name: "Log Pipeline", status: "amber", value: "High volume" },
          ].map((h) => (
            <div key={h.name} className="health-item">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className={`health-indicator health-${h.status}`} />
                <span style={{ fontSize: 13 }}>{h.name}</span>
              </div>
              <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{h.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
