import { useState } from "react";
import { USERS } from "../utils/hooks";

export default function AdminDashboard({ toast }) {
  const [users, setUsers] = useState(USERS);
  const [tab, setTab] = useState("users");

  const toggleBlock = (id) => {
    setUsers((u) =>
      u.map((x) => (x.id === id ? { ...x, status: x.status === "blocked" ? "active" : "blocked" } : x))
    );
    toast.add("User status updated", "success");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Admin Dashboard</div>
        <div className="page-subtitle">// system administration and user management</div>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: "1px solid var(--border)" }}>
        {[["users", "👥 Users"], ["ips", "🌐 Blocked IPs"], ["health", "💚 System Health"]].map(([k, l]) => (
          <button key={k} id={`admin-tab-${k}`} onClick={() => setTab(k)}
            style={{ background: "none", border: "none", color: tab === k ? "var(--accent-blue)" : "var(--text-secondary)", borderBottom: tab === k ? "2px solid var(--accent-blue)" : "2px solid transparent", padding: "10px 16px", cursor: "pointer", fontSize: 13, fontFamily: "var(--font-display)", transition: "all 0.2s" }}>
            {l}
          </button>
        ))}
      </div>

      {/* Users tab */}
      {tab === "users" && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>User Management ({users.length} users)</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Scans</th><th>Last Login</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{u.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: u.role === "admin" ? "var(--accent-purple)" : "var(--text-secondary)" }}>{u.role}</span></td>
                    <td><span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: u.status === "active" ? "var(--accent-green)" : "var(--accent-red)" }}>● {u.status}</span></td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>{u.scans}</td>
                    <td style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: 11 }}>{u.lastLogin}</td>
                    <td>
                      <button className={`btn ${u.status === "blocked" ? "btn-success" : "btn-danger"}`} style={{ fontSize: 11, padding: "5px 12px" }} onClick={() => toggleBlock(u.id)}>
                        {u.status === "blocked" ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blocked IPs tab */}
      {tab === "ips" && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: 16 }}>Blocked IP Addresses</div>
          {[
            { ip: "203.0.113.22", reason: "Mass injection attempts", blockedAt: "Jan 15, 2025" },
            { ip: "192.168.1.44", reason: "Auth bypass attacks", blockedAt: "Jan 14, 2025" },
            { ip: "198.51.100.14", reason: "Blind SQLi probing", blockedAt: "Jan 13, 2025" },
          ].map((ip) => (
            <div key={ip.ip} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent-red)", fontSize: 14 }}>{ip.ip}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 3 }}>{ip.reason}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{ip.blockedAt}</div>
                <button className="btn btn-success" style={{ fontSize: 11, padding: "4px 10px", marginTop: 6 }}>Unblock</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: 14, background: "var(--bg0)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 8 }}>Block new IP:</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input id="block-ip-input" style={{ flex: 1, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: 13, padding: "8px 12px", outline: "none" }} placeholder="192.168.x.x" />
              <button className="btn btn-danger" onClick={() => toast.add("IP blocked successfully", "success")}>Block IP</button>
            </div>
          </div>
        </div>
      )}

      {/* System Health tab */}
      {tab === "health" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { title: "API Service", items: [["Uptime", "99.97%", "green"], ["Req/sec", "342", "green"], ["Error Rate", "0.03%", "green"], ["Avg Latency", "12ms", "green"]] },
            { title: "ML Service", items: [["Model Version", "v2.3.1", "green"], ["Accuracy", "99.4%", "green"], ["Inference Time", "45ms", "green"], ["Queue Depth", "0", "green"]] },
            { title: "Database", items: [["Atlas Status", "Connected", "green"], ["Pool Size", "10/50", "green"], ["Write Ops", "120/s", "green"], ["Storage", "2.4GB / 512GB", "green"]] },
            { title: "Security", items: [["Rate Limiter", "Active", "green"], ["WAF", "Enabled", "green"], ["Failed Logins", "3 today", "amber"], ["Blocked IPs", "3 active", "red"]] },
          ].map((block) => (
            <div key={block.title} className="card">
              <div className="card-title">{block.title}</div>
              {block.items.map(([k, v, c]) => (
                <div key={k} className="health-item">
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{k}</span>
                  <span className="health-indicator" style={{ background: c === "green" ? "var(--accent-green)" : c === "amber" ? "var(--accent-amber)" : "var(--accent-red)", boxShadow: `0 0 6px ${c === "green" ? "rgba(0,255,136,0.5)" : c === "amber" ? "rgba(255,170,0,0.5)" : "rgba(255,68,102,0.5)"}`, width: 8, height: 8, borderRadius: "50%", display: "inline-block", marginLeft: "auto", marginRight: 8 }} />
                  <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)", minWidth: 80, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
