import { useState } from "react";
import { SeverityBadge } from "../components/UI";
import { ATTACK_LOGS } from "../utils/hooks";

export default function AttackLogs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const filtered = ATTACK_LOGS.filter((l) => {
    const matchSearch = !search || l.query.toLowerCase().includes(search.toLowerCase()) || l.ip.includes(search);
    const matchFilter = filter === "all" || l.severity === filter;
    return matchSearch && matchFilter;
  });

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Attack Logs</div>
        <div className="page-subtitle">// complete record of all detected injection attempts</div>
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            id="logs-search"
            style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: 12, padding: "8px 12px", outline: "none", flex: 1, minWidth: 200 }}
            placeholder="Search queries or IPs..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <select
            id="logs-filter"
            style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: 12, padding: "8px 12px", outline: "none" }}
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="safe">Safe</option>
          </select>
          <button className="btn btn-outline" style={{ fontSize: 12 }}>📥 Export CSV</button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>#</th><th>Query</th><th>IP</th><th>Attack Type</th><th>Severity</th><th>Confidence</th><th>Timestamp</th><th>Blocked</th></tr>
            </thead>
            <tbody>
              {paginated.map((log) => (
                <tr key={log.id}>
                  <td style={{ color: "var(--text-muted)" }}>{log.id}</td>
                  <td className="query-cell">{log.query}</td>
                  <td style={{ color: "var(--accent-blue)" }}>{log.ip}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{log.type}</td>
                  <td><SeverityBadge sev={log.severity} /></td>
                  <td style={{ color: log.confidence > 70 ? "var(--accent-red)" : "var(--accent-green)" }}>{log.confidence}%</td>
                  <td style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>{log.ts}</td>
                  <td>
                    {log.blocked
                      ? <span style={{ color: "var(--accent-red)" }}>🔴 Yes</span>
                      : <span style={{ color: "var(--accent-green)" }}>🟢 No</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} entries
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`btn ${p === page ? "btn-primary" : "btn-outline"}`} style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
