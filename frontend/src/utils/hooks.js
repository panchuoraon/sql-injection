import { useState } from "react";

// ─── useToast HOOK ────────────────────────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const add = (msg, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  return { toasts, add };
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
export const SAMPLE_QUERIES = [
  "SELECT * FROM users WHERE id = '1' OR '1'='1'",
  "admin'--",
  "1; DROP TABLE users;--",
  "SELECT username, password FROM users WHERE username='admin'",
  "' UNION SELECT null, username, password FROM users--",
  "SELECT * FROM products WHERE id=1 AND SLEEP(5)",
];

export const ATTACK_LOGS = [
  { id: 1, query: "' OR 1=1--", ip: "192.168.1.44", severity: "critical", type: "Union-Based", ts: "2025-01-15 14:23", blocked: true, confidence: 98.2 },
  { id: 2, query: "admin' --", ip: "10.0.0.201", severity: "high", type: "Auth Bypass", ts: "2025-01-15 14:18", blocked: true, confidence: 94.7 },
  { id: 3, query: "1; DROP TABLE users", ip: "172.16.0.99", severity: "critical", type: "Stacked Query", ts: "2025-01-15 13:55", blocked: true, confidence: 99.1 },
  { id: 4, query: "SELECT * FROM orders WHERE id=1", ip: "10.0.0.5", severity: "safe", type: "—", ts: "2025-01-15 13:40", blocked: false, confidence: 1.3 },
  { id: 5, query: "' UNION SELECT null, password FROM users--", ip: "203.0.113.22", severity: "critical", type: "UNION Attack", ts: "2025-01-15 13:12", blocked: true, confidence: 97.8 },
  { id: 6, query: "SELECT name FROM products WHERE id=42", ip: "10.0.0.7", severity: "safe", type: "—", ts: "2025-01-15 12:58", blocked: false, confidence: 2.1 },
  { id: 7, query: "1 AND SLEEP(5)--", ip: "198.51.100.14", severity: "high", type: "Blind SQLi", ts: "2025-01-15 12:33", blocked: true, confidence: 91.4 },
  { id: 8, query: "' OR 'x'='x", ip: "192.168.2.77", severity: "high", type: "Boolean-Based", ts: "2025-01-15 11:47", blocked: true, confidence: 88.9 },
];

export const USERS = [
  { id: 1, name: "Alice Chen", email: "alice@corp.io", role: "admin", status: "active", scans: 142, lastLogin: "2 min ago" },
  { id: 2, name: "Bob Patel", email: "bob@corp.io", role: "user", status: "active", scans: 38, lastLogin: "1 hr ago" },
  { id: 3, name: "Carlos Mendez", email: "carlos@corp.io", role: "user", status: "active", scans: 67, lastLogin: "3 hr ago" },
  { id: 4, name: "Diana Wu", email: "diana@corp.io", role: "user", status: "blocked", scans: 12, lastLogin: "2 days ago" },
  { id: 5, name: "Emma Scott", email: "emma@corp.io", role: "user", status: "active", scans: 89, lastLogin: "30 min ago" },
];
