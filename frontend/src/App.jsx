import { useState } from "react";
import STYLES from "./styles";
import { useToast } from "./utils/hooks";
import { ToastContainer } from "./components/UI";

// Pages
import HomePage from "./pages/Home";
import About from "./pages/About";
import DashboardPage from "./pages/UserDashboard";
import QueryScanner from "./pages/QueryScanner";
import AttackLogs from "./pages/AttackLogs";
import Analytics from "./pages/Analytics";
import APITester from "./pages/APITester";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "home",      label: "Home",        icon: "🏠", section: "MAIN" },
  { id: "about",     label: "About",       icon: "ℹ️" },
  { id: "dashboard", label: "Dashboard",   icon: "📊", auth: true, section: "SECURITY" },
  { id: "scanner",   label: "SQL Scanner", icon: "🔍" },
  { id: "logs",      label: "Attack Logs", icon: "📋", auth: true },
  { id: "analytics", label: "Analytics",   icon: "📈", auth: true },
  { id: "api",       label: "API Tester",  icon: "⚡", auth: true, section: "TOOLS" },
  { id: "admin",     label: "Admin Panel", icon: "🛠️", auth: true, admin: true },
];

const PAGE_TITLES = {
  home: "Home", about: "About", dashboard: "Dashboard", scanner: "SQL Scanner",
  logs: "Attack Logs", analytics: "Analytics", api: "API Tester", admin: "Admin Panel", login: "Authentication", signup: "Create Account",
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pendingPage, setPendingPage] = useState(null);
  const toast = useToast();

  const navigate = (p) => {
    if (p === "signup") {
      setPage("signup");
      return;
    }
    if (NAV.find((n) => n.id === p)?.auth && !user) {
      setPendingPage(p);
      setPage("login");
      return;
    }
    setPage(p);
  };

  // ── Login / signup screen (no sidebar/topbar) ───────────────────────────────
  if (page === "login" || page === "signup") {
    return (
      <>
        <style>{STYLES}</style>
        <Login
          showSignupInitial={page === "signup"}
          onLogin={(u) => {
            setUser(u);
            setPage(pendingPage || "dashboard");
            setPendingPage(null);
            toast.add(`Welcome, ${u.name}!`, "success");
          }}
        />
        <ToastContainer toasts={toast.toasts} />
      </>
    );
  }

  // ── Main shell ────────────────────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* ── Sidebar ── */}
        <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          <div className="sidebar-logo">
            <div className="logo-icon">🛡️</div>
            <div>
              <div className="logo-text">SQLDefend</div>
              <div className="logo-sub">AI SECURITY v2.3</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {NAV.map((item) => {
              if (item.admin && user?.role !== "admin") return null;
              return (
                <div key={item.id}>
                  {item.section && <div className="nav-section">{item.section}</div>}
                  <div
                    id={`nav-${item.id}`}
                    className={`nav-item ${page === item.id ? "active" : ""}`}
                    onClick={() => navigate(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {item.id === "logs" && <span className="nav-badge">8</span>}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            {user ? (
              <>
                <div className="user-avatar">{user.name[0].toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
                <button
                  id="signout-btn"
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 16 }}
                  onClick={() => { setUser(null); setPage("home"); toast.add("Signed out", "info"); }}
                >↩</button>
              </>
            ) : (
              <button className="btn btn-outline" id="signin-sidebar-btn" style={{ width: "100%", justifyContent: "center", fontSize: 12 }} onClick={() => setPage("login")}>
                🔐 Sign In
              </button>
            )}
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className={`main ${sidebarOpen ? "" : "expanded"}`}>
          <div className="topbar">
            <button id="menu-toggle-btn" className="menu-btn" onClick={() => setSidebarOpen((x) => !x)}>☰</button>
            <div className="topbar-title">{PAGE_TITLES[page] || page}</div>
            <div className="topbar-actions">
              {user ? (
                <>
                  <span className="status-dot" />
                  <span className="status-label">{user.name}</span>
                  <button className="btn btn-outline" onClick={() => { setUser(null); setPage("home"); toast.add("Signed out", "info"); }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline" onClick={() => setPage("login")}>Log in</button>
                  <button className="btn btn-primary" onClick={() => setPage("signup")}>Sign up</button>
                </>
              )}
            </div>
          </div>

          {page === "home"      && <HomePage navigate={navigate} />}
          {page === "about"     && <About />}
          {page === "dashboard" && <DashboardPage />}
          {page === "scanner"   && <QueryScanner toast={toast} />}
          {page === "logs"      && <AttackLogs />}
          {page === "analytics" && <Analytics />}
          {page === "api"       && <APITester toast={toast} />}
          {page === "admin"     && <AdminDashboard toast={toast} />}
        </main>
      </div>

      <ToastContainer toasts={toast.toasts} />
    </>
  );
}
