const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg0: #070B14;
    --bg1: #0D1321;
    --bg2: #111827;
    --bg3: #1a2332;
    --bg4: #1e2d42;
    --accent-blue: #00D4FF;
    --accent-purple: #7C3AED;
    --accent-green: #00FF88;
    --accent-red: #FF4466;
    --accent-amber: #FFAA00;
    --text-primary: #E8F4FF;
    --text-secondary: #8BA8C4;
    --text-muted: #4A6280;
    --border: rgba(0,212,255,0.12);
    --border-bright: rgba(0,212,255,0.3);
    --glow-blue: 0 0 20px rgba(0,212,255,0.15);
    --glow-purple: 0 0 20px rgba(124,58,237,0.2);
    --radius: 10px;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  
  body { background: var(--bg0); color: var(--text-primary); font-family: var(--font-display); overflow-x: hidden; }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg1); }
  ::-webkit-scrollbar-thumb { background: var(--accent-blue); opacity: 0.3; border-radius: 2px; }
  
  .app { display: flex; min-height: 100vh; }
  
  /* SIDEBAR */
  .sidebar {
    width: 240px; min-height: 100vh; background: var(--bg1);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; z-index: 100; transition: transform 0.3s ease;
  }
  .sidebar.collapsed { transform: translateX(-240px); }
  .sidebar-logo {
    padding: 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .logo-icon {
    width: 36px; height: 36px; background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;
  }
  .logo-text { font-size: 15px; font-weight: 700; color: var(--accent-blue); letter-spacing: -0.3px; }
  .logo-sub { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }
  .sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-section { padding: 8px 16px 4px; font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); letter-spacing: 1px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 16px; cursor: pointer;
    color: var(--text-secondary); font-size: 13px; transition: all 0.2s; position: relative;
    border-left: 2px solid transparent;
  }
  .nav-item:hover { color: var(--text-primary); background: rgba(0,212,255,0.05); }
  .nav-item.active {
    color: var(--accent-blue); background: rgba(0,212,255,0.08);
    border-left-color: var(--accent-blue);
  }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto; background: var(--accent-red); color: white;
    font-size: 9px; padding: 1px 5px; border-radius: 10px; font-family: var(--font-mono);
  }
  .sidebar-footer {
    padding: 12px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .user-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
    display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700;
    flex-shrink: 0;
  }
  .user-name { font-size: 12px; font-weight: 500; }
  .user-role { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }
  
  /* MAIN */
  .main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .main.expanded { margin-left: 0; }
  
  /* TOPBAR */
  .topbar {
    height: 56px; background: var(--bg1); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 24px; gap: 16px; position: sticky;
    top: 0; z-index: 50;
  }
  .menu-btn {
    background: none; border: none; color: var(--text-secondary); cursor: pointer;
    font-size: 20px; padding: 4px; transition: color 0.2s;
  }
  .menu-btn:hover { color: var(--text-primary); }
  .topbar-title { font-size: 16px; font-weight: 600; flex: 1; }
  .topbar-actions { display: flex; align-items: center; gap: 10px; }
  .status-dot {
    width: 7px; height: 7px; border-radius: 50%; background: var(--accent-green);
    animation: pulse-green 2s infinite;
  }
  .status-label { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); }
  @keyframes pulse-green {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
    50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(0,255,136,0); }
  }
  
  /* PAGE */
  .page { padding: 24px; max-width: 1400px; width: 100%; }
  .page-header { margin-bottom: 24px; }
  .page-title { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
  .page-subtitle { font-size: 13px; color: var(--text-secondary); margin-top: 4px; font-family: var(--font-mono); }
  
  /* CARDS */
  .card {
    background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .card:hover { border-color: var(--border-bright); }
  .card-glass {
    background: rgba(13,19,33,0.7); backdrop-filter: blur(12px);
    border: 1px solid var(--border); border-radius: var(--radius);
  }
  .card-title { font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }
  
  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 18px; position: relative; overflow: hidden; cursor: default;
    transition: border-color 0.2s, transform 0.2s;
  }
  .stat-card:hover { border-color: var(--border-bright); transform: translateY(-2px); }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .stat-card.blue::before { background: var(--accent-blue); }
  .stat-card.purple::before { background: var(--accent-purple); }
  .stat-card.green::before { background: var(--accent-green); }
  .stat-card.red::before { background: var(--accent-red); }
  .stat-icon { font-size: 22px; margin-bottom: 10px; }
  .stat-value { font-size: 28px; font-weight: 800; font-family: var(--font-mono); letter-spacing: -1px; }
  .stat-value.blue { color: var(--accent-blue); }
  .stat-value.purple { color: var(--accent-purple); }
  .stat-value.green { color: var(--accent-green); }
  .stat-value.red { color: var(--accent-red); }
  .stat-label { font-size: 11px; color: var(--text-muted); margin-top: 4px; font-family: var(--font-mono); }
  .stat-change { font-size: 11px; margin-top: 6px; font-family: var(--font-mono); }
  .stat-change.up { color: var(--accent-green); }
  .stat-change.down { color: var(--accent-red); }
  
  /* SCANNER */
  .scanner-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
  @media (max-width: 900px) { .scanner-container { grid-template-columns: 1fr; } }
  .query-textarea {
    width: 100%; min-height: 160px; background: var(--bg0); border: 1px solid var(--border);
    border-radius: var(--radius); color: var(--text-primary); font-family: var(--font-mono);
    font-size: 13px; padding: 14px; resize: vertical; transition: border-color 0.2s;
    outline: none;
  }
  .query-textarea:focus { border-color: var(--accent-blue); box-shadow: 0 0 0 3px rgba(0,212,255,0.1); }
  .btn {
    display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
    border-radius: var(--radius); font-family: var(--font-display); font-size: 13px;
    font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; text-decoration: none;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--accent-blue), #0096cc);
    color: #070B14;
  }
  .btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-outline {
    background: transparent; border: 1px solid var(--border-bright);
    color: var(--text-primary);
  }
  .btn-outline:hover { background: rgba(0,212,255,0.08); border-color: var(--accent-blue); }
  .btn-danger { background: rgba(255,68,102,0.15); border: 1px solid rgba(255,68,102,0.3); color: var(--accent-red); }
  .btn-success { background: rgba(0,255,136,0.12); border: 1px solid rgba(0,255,136,0.25); color: var(--accent-green); }
  
  /* RESULT CARD */
  .result-card { border-radius: var(--radius); padding: 20px; border: 1px solid; transition: all 0.3s; }
  .result-card.safe { background: rgba(0,255,136,0.06); border-color: rgba(0,255,136,0.3); }
  .result-card.malicious { background: rgba(255,68,102,0.06); border-color: rgba(255,68,102,0.3); }
  .result-card.warning { background: rgba(255,170,0,0.06); border-color: rgba(255,170,0,0.3); }
  .result-label { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
  .result-label.safe { color: var(--accent-green); }
  .result-label.malicious { color: var(--accent-red); }
  .result-label.warning { color: var(--accent-amber); }
  
  .confidence-bar-wrap { margin: 12px 0; }
  .confidence-bar-track { height: 6px; background: var(--bg0); border-radius: 3px; overflow: hidden; }
  .confidence-bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
  
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
  .detail-item { background: var(--bg0); border-radius: 8px; padding: 10px 12px; }
  .detail-key { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); text-transform: uppercase; }
  .detail-val { font-size: 13px; font-weight: 600; margin-top: 2px; font-family: var(--font-mono); }
  
  .severity-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
    font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.5px;
  }
  .severity-critical { background: rgba(255,68,102,0.2); color: var(--accent-red); border: 1px solid rgba(255,68,102,0.3); }
  .severity-high { background: rgba(255,102,0,0.2); color: #FF6600; border: 1px solid rgba(255,102,0,0.3); }
  .severity-medium { background: rgba(255,170,0,0.2); color: var(--accent-amber); border: 1px solid rgba(255,170,0,0.3); }
  .severity-low { background: rgba(0,212,255,0.1); color: var(--accent-blue); border: 1px solid rgba(0,212,255,0.2); }
  .severity-safe { background: rgba(0,255,136,0.1); color: var(--accent-green); border: 1px solid rgba(0,255,136,0.2); }
  
  /* HISTORY TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; padding: 10px 12px; color: var(--text-muted); font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1px solid var(--border); }
  td { padding: 11px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); font-family: var(--font-mono); vertical-align: middle; }
  tr:hover td { background: rgba(0,212,255,0.03); }
  .query-cell { max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-secondary); }
  
  /* CHARTS */
  .charts-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }
  @media (max-width: 900px) { .charts-grid { grid-template-columns: 1fr; } }
  
  /* LOADING */
  .loading-scan {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 40px; gap: 16px;
  }
  .scan-ring {
    width: 60px; height: 60px; border-radius: 50%;
    border: 3px solid var(--bg3); border-top-color: var(--accent-blue);
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .scan-text { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); }
  
  /* TOAST */
  .toast-container { position: fixed; top: 16px; right: 16px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
  .toast {
    background: var(--bg2); border-radius: var(--radius); padding: 12px 16px; min-width: 240px;
    border-left: 3px solid; font-size: 13px; animation: slideIn 0.3s ease; display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }
  .toast.success { border-color: var(--accent-green); }
  .toast.error { border-color: var(--accent-red); }
  .toast.info { border-color: var(--accent-blue); }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  
  /* PATTERNS */
  .attack-type-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .attack-type-bar { height: 4px; border-radius: 2px; background: var(--accent-blue); transition: width 0.8s ease; }
  .attack-type-label { font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); min-width: 100px; }
  .attack-type-pct { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); margin-left: auto; }
  
  /* HOME HERO */
  .hero {
    min-height: calc(100vh - 56px); display: flex; align-items: center; justify-content: center;
    padding: 60px 24px; position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,255,0.08) 0%, transparent 60%),
                radial-gradient(ellipse 50% 40% at 80% 80%, rgba(124,58,237,0.06) 0%, transparent 50%);
  }
  .hero-content { position: relative; text-align: center; max-width: 700px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px; background: rgba(0,212,255,0.08);
    border: 1px solid rgba(0,212,255,0.2); border-radius: 20px; padding: 6px 14px;
    font-size: 11px; color: var(--accent-blue); font-family: var(--font-mono); margin-bottom: 24px;
  }
  .hero-title {
    font-size: clamp(32px, 6vw, 56px); font-weight: 800; line-height: 1.05;
    letter-spacing: -2px; margin-bottom: 20px;
  }
  .hero-gradient { background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-desc { font-size: 16px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 32px; }
  .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 60px; }
  .feature-card {
    background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; transition: all 0.2s;
  }
  .feature-card:hover { border-color: var(--border-bright); transform: translateY(-3px); }
  .feature-icon { font-size: 24px; margin-bottom: 12px; }
  .feature-title { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
  .feature-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.6; }
  
  /* LOG ENTRY */
  .log-entry {
    background: var(--bg2); border: 1px solid var(--border); border-radius: 8px;
    padding: 14px 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 14px;
    cursor: pointer; transition: border-color 0.2s;
  }
  .log-entry:hover { border-color: var(--border-bright); }
  .log-query { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .log-time { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); white-space: nowrap; }
  
  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal {
    background: var(--bg2); border: 1px solid var(--border-bright); border-radius: 14px;
    padding: 28px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto;
    animation: modalIn 0.3s ease;
  }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
  .modal-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
  .modal-close { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 20px; }
  
  /* AUTH */
  .auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg0); padding: 20px; }
  .auth-card { background: var(--bg1); border: 1px solid var(--border); border-radius: 16px; padding: 36px; width: 100%; max-width: 400px; }
  .auth-logo { text-align: center; margin-bottom: 28px; }
  .auth-title { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 4px; }
  .auth-sub { font-size: 12px; color: var(--text-muted); text-align: center; font-family: var(--font-mono); margin-bottom: 24px; }
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; font-family: var(--font-mono); }
  .field input {
    width: 100%; background: var(--bg0); border: 1px solid var(--border); border-radius: 8px;
    color: var(--text-primary); font-family: var(--font-mono); font-size: 13px;
    padding: 10px 14px; outline: none; transition: border-color 0.2s;
  }
  .field input:focus { border-color: var(--accent-blue); box-shadow: 0 0 0 3px rgba(0,212,255,0.1); }
  .field-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .link-text { font-size: 12px; color: var(--accent-blue); cursor: pointer; font-family: var(--font-mono); }
  .link-text:hover { text-decoration: underline; }
  .auth-footer { text-align: center; margin-top: 20px; font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); }
  
  /* API TESTER */
  .api-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 800px) { .api-grid { grid-template-columns: 1fr; } }
  
  /* HEALTH */
  .health-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .health-item:last-child { border-bottom: none; }
  .health-indicator { width: 8px; height: 8px; border-radius: 50%; margin-right: 10px; display: inline-block; }
  .health-green { background: var(--accent-green); box-shadow: 0 0 6px rgba(0,255,136,0.5); }
  .health-red { background: var(--accent-red); }
  .health-amber { background: var(--accent-amber); }
  
  /* MINI CHART */
  .mini-chart { display: flex; align-items: flex-end; gap: 3px; height: 40px; }
  .mini-bar { flex: 1; border-radius: 2px 2px 0 0; min-width: 4px; transition: height 0.5s ease; }
  
  /* RESPONSIVE */
  @media (max-width: 768px) {
    .sidebar { width: 220px; }
    .main { margin-left: 0; }
    .topbar { padding: 0 16px; }
    .page { padding: 16px; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    .detail-grid { grid-template-columns: 1fr; }
    .charts-grid { grid-template-columns: 1fr; }
  }
`;

export default STYLES;
