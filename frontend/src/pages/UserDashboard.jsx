import { useState, useEffect } from "react";
import { SeverityBadge } from "../components/UI";
import { ATTACK_LOGS } from "../utils/hooks";

export default function DashboardPage() {
  const [scanCount, setScanCount] = useState(2847);
  const [blockedCount, setBlockedCount] = useState(189);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.7) setScanCount((x) => x + 1);
      if (Math.random() > 0.85) setBlockedCount((x) => x + 1);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const weekData = [42, 67, 31, 88, 55, 73, 48];
  const recentLogs = ATTACK_LOGS.slice(0, 5);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Security Dashboard</div>
        <div className="page-subtitle">// real-time threat intelligence overview</div>
      </div>

      <div className="stats-grid">
        {[
          { label: "Total Scans", value: scanCount.toLocaleString(), icon: "🔍", color: "blue", change: "+12% this week", dir: "up" },
          { label: "Threats Blocked", value: blockedCount, icon: "🛡️", color: "red", change: "+3 today", dir: "up" },
          { label: "Detection Rate", value: "99.4%", icon: "🎯", color: "green", change: "↑ 0.2%", dir: "up" },
          { label: "Avg Confidence", value: "94.7%", icon: "🧠", color: "purple", change: "±0.3%", dir: "up" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div className={`stat-value ${s.color}`}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.dir}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="card">
          <div className="card-title">Attack Volume — Past 7 Days</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, padding: "8px 0" }}>
            {weekData.map((v, i) => {
              const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${(v / 88) * 100}%`,
                        background: v > 70 ? "var(--accent-red)" : "var(--accent-blue)",
                        borderRadius: "3px 3px 0 0",
                        opacity: 0.8,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{days[i]}</div>
                  <div style={{ fontSize: 10, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{v}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Attack Type Breakdown</div>
          {[
            { name: "UNION-Based", pct: 32, color: "var(--accent-red)" },
            { name: "Auth Bypass", pct: 24, color: "#FF6600" },
            { name: "Stacked Query", pct: 18, color: "var(--accent-amber)" },
            { name: "Blind SQLi", pct: 15, color: "var(--accent-purple)" },
            { name: "Boolean", pct: 11, color: "var(--accent-blue)" },
          ].map((a) => (
            <div key={a.name} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{a.name}</span>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{a.pct}%</span>
              </div>
              <div style={{ height: 4, background: "var(--bg0)", borderRadius: 2 }}>
                <div style={{ width: `${a.pct}%`, height: "100%", background: a.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 14 }}>Recent Attack Logs</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Query</th><th>IP Address</th><th>Type</th><th>Severity</th><th>Confidence</th><th>Time</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => (
                <tr key={log.id}>
                  <td className="query-cell">{log.query}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{log.ip}</td>
                  <td style={{ color: "var(--accent-blue)" }}>{log.type}</td>
                  <td><SeverityBadge sev={log.severity} /></td>
                  <td style={{ color: log.confidence > 70 ? "var(--accent-red)" : "var(--accent-green)" }}>{log.confidence}%</td>
                  <td style={{ color: "var(--text-muted)" }}>{log.ts}</td>
                  <td>
                    {log.blocked
                      ? <span style={{ color: "var(--accent-red)", fontSize: 11, fontFamily: "var(--font-mono)" }}>🔴 BLOCKED</span>
                      : <span style={{ color: "var(--accent-green)", fontSize: 11, fontFamily: "var(--font-mono)" }}>🟢 PASSED</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
