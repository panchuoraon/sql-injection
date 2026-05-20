export default function About() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">About This System</div>
        <div className="page-subtitle">// architecture, detection engine, and security model</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Detection Architecture</div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            The system uses a <strong style={{ color: "var(--accent-blue)" }}>three-layer hybrid approach</strong>:
          </p>
          <div style={{ marginTop: 14 }}>
            {[
              { n: "01", t: "Rule-Based Engine", d: "Regex patterns matching 200+ known SQLi signatures including UNION, OR 1=1, stacked queries, comment injection, tautology attacks." },
              { n: "02", t: "ML Model (TF-IDF + RF)", d: "Scikit-learn Random Forest trained on 65,000 labeled queries. TF-IDF vectorization extracts syntactic features for ensemble classification." },
              { n: "03", t: "Claude AI Reasoning", d: "LLM-based semantic analysis understands novel attack vectors and provides contextual risk analysis beyond pattern matching." },
            ].map((l) => (
              <div key={l.n} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent-blue)", width: 24, flexShrink: 0, paddingTop: 2 }}>{l.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{l.t}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{l.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Tech Stack</div>
          {[
            { cat: "Frontend", items: ["React.js + Vite", "Tailwind CSS", "Framer Motion", "Recharts", "React Query"] },
            { cat: "Backend", items: ["Node.js + Express", "JWT Auth", "Socket.io", "Helmet + CORS", "bcrypt"] },
            { cat: "ML Service", items: ["Python Flask", "Scikit-learn", "TF-IDF Vectorizer", "Random Forest", "Joblib"] },
            { cat: "Infrastructure", items: ["MongoDB Atlas", "Firebase Auth", "Cloudinary", "Vercel + Render"] },
          ].map((block) => (
            <div key={block.cat} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "var(--accent-blue)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>{block.cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {block.items.map((i) => (
                  <span key={i} style={{ background: "var(--bg0)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Attack Types Detected</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { type: "UNION-Based", icon: "🔗", desc: "Combines result sets to extract data" },
            { type: "Boolean Blind", icon: "🎯", desc: "True/false responses to infer data" },
            { type: "Time-Based Blind", icon: "⏱️", desc: "SLEEP/WAITFOR conditional delays" },
            { type: "Stacked Queries", icon: "📚", desc: "Multiple statements via semicolon" },
            { type: "Auth Bypass", icon: "🔓", desc: "OR 1=1, admin'-- patterns" },
            { type: "Error-Based", icon: "❌", desc: "DB error messages leak schema" },
            { type: "Out-of-Band", icon: "📡", desc: "DNS/HTTP exfiltration channels" },
            { type: "Tautology", icon: "♾️", desc: "Always-true conditions in WHERE" },
          ].map((a) => (
            <div key={a.type} style={{ background: "var(--bg0)", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: "var(--accent-blue)" }}>{a.type}</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
