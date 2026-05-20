import { useState } from "react";

export default function Login({ onLogin, showSignupInitial = false }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(showSignupInitial);

  const login = async () => {
    if (!email || !pw) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    onLogin({ name: email.split("@")[0], role: email.includes("admin") ? "admin" : "user" });
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 12px" }}>🛡️</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>AI SQL INJECTION DETECTOR</div>
        </div>

        <div className="auth-title">{showSignup ? "Create Account" : "Welcome Back"}</div>
        <div className="auth-sub">{showSignup ? "// register to access the platform" : "// login to your security console"}</div>

        {showSignup && (
          <div className="field">
            <label>Full Name</label>
            <input id="signup-name" type="text" placeholder="Security Engineer" />
          </div>
        )}

        <div className="field">
          <label>Email Address</label>
          <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@corp.io" />
        </div>

        <div className="field">
          <div className="field-row">
            <label>Password</label>
            {!showSignup && <span className="link-text">Forgot password?</span>}
          </div>
          <input id="login-password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••••" />
        </div>

        <button
          id="login-submit-btn"
          className="btn btn-primary"
          style={{ width: "100%", padding: 12, justifyContent: "center", fontSize: 14, marginTop: 4 }}
          onClick={login}
          disabled={loading}
        >
          {loading ? "⏳ Authenticating…" : showSignup ? "Create Account" : "Sign In →"}
        </button>

        <div className="auth-footer">
          {showSignup ? "Already have an account? " : "Don't have an account? "}
          <span className="link-text" onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? "Sign in" : "Sign up"}
          </span>
        </div>

        <div style={{ marginTop: 20, padding: "12px 0", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 8 }}>Demo credentials</div>
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>admin@corp.io / any password</div>
        </div>
      </div>
    </div>
  );
}
