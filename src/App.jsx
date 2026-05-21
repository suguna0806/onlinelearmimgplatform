import { useState, useEffect } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const COURSES_DATA = [
  {
    id: 1, category: "Web Dev", color: "#f97316",
    title: "Full Stack Java & Spring Boot",
    description: "Build enterprise-grade web apps with Java, Spring MVC, REST APIs, and MySQL from scratch.",
    duration: "12 weeks", level: "Intermediate", rating: 4.8, students: 3241,
    instructor: "Dr. Anita Rao",
    lessons: [
      { id: 1, title: "Java OOP Fundamentals", duration: "45 min" },
      { id: 2, title: "Spring MVC Architecture", duration: "60 min" },
      { id: 3, title: "JDBC & MySQL Integration", duration: "55 min" },
      { id: 4, title: "REST API Design", duration: "50 min" },
      { id: 5, title: "Security & Authentication", duration: "65 min" },
      { id: 6, title: "Deploying to Production", duration: "40 min" },
    ]
  },
  {
    id: 2, category: "Frontend", color: "#6366f1",
    title: "Modern React & JavaScript",
    description: "Master React hooks, state management, and build responsive UIs with real-world projects.",
    duration: "8 weeks", level: "Beginner", rating: 4.9, students: 5120,
    instructor: "Rahul Sharma",
    lessons: [
      { id: 1, title: "JavaScript ES6+", duration: "50 min" },
      { id: 2, title: "React Components & JSX", duration: "45 min" },
      { id: 3, title: "State & Props", duration: "55 min" },
      { id: 4, title: "Hooks Deep Dive", duration: "70 min" },
      { id: 5, title: "Routing & Navigation", duration: "40 min" },
    ]
  },
  {
    id: 3, category: "Database", color: "#10b981",
    title: "SQL & Database Design",
    description: "Learn relational database design, complex queries, indexing, and performance tuning.",
    duration: "6 weeks", level: "Beginner", rating: 4.7, students: 2890,
    instructor: "Priya Menon",
    lessons: [
      { id: 1, title: "Relational Model Basics", duration: "40 min" },
      { id: 2, title: "SQL SELECT & Joins", duration: "60 min" },
      { id: 3, title: "Normalization", duration: "50 min" },
      { id: 4, title: "Indexes & Performance", duration: "55 min" },
    ]
  },
  {
    id: 4, category: "DevOps", color: "#ec4899",
    title: "Docker & Kubernetes Fundamentals",
    description: "Containerize applications, orchestrate microservices, and ship code faster with CI/CD.",
    duration: "10 weeks", level: "Advanced", rating: 4.6, students: 1780,
    instructor: "Vikram Nair",
    lessons: [
      { id: 1, title: "Docker Basics", duration: "55 min" },
      { id: 2, title: "Building Images", duration: "50 min" },
      { id: 3, title: "Kubernetes Pods & Services", duration: "70 min" },
      { id: 4, title: "Deployments & Scaling", duration: "65 min" },
      { id: 5, title: "CI/CD Pipelines", duration: "60 min" },
    ]
  },
  {
    id: 5, category: "Data Science", color: "#f59e0b",
    title: "Python for Data Science",
    description: "Analyze data, build ML models, and visualize insights using Python, Pandas, and Scikit-learn.",
    duration: "10 weeks", level: "Intermediate", rating: 4.8, students: 4300,
    instructor: "Sonal Gupta",
    lessons: [
      { id: 1, title: "Python Refresher", duration: "45 min" },
      { id: 2, title: "NumPy & Pandas", duration: "65 min" },
      { id: 3, title: "Data Visualization", duration: "55 min" },
      { id: 4, title: "ML with Scikit-learn", duration: "80 min" },
      { id: 5, title: "Model Evaluation", duration: "50 min" },
    ]
  },
  {
    id: 6, category: "Cloud", color: "#0ea5e9",
    title: "AWS Cloud Practitioner",
    description: "Get certified in AWS fundamentals: compute, storage, networking, IAM, and cloud economics.",
    duration: "7 weeks", level: "Beginner", rating: 4.7, students: 3670,
    instructor: "Arun Pillai",
    lessons: [
      { id: 1, title: "Cloud Concepts", duration: "40 min" },
      { id: 2, title: "EC2 & Compute", duration: "55 min" },
      { id: 3, title: "S3 & Storage", duration: "45 min" },
      { id: 4, title: "IAM & Security", duration: "60 min" },
      { id: 5, title: "Billing & Pricing", duration: "35 min" },
    ]
  },
];

const STORAGE_KEY = "olp_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { enrolled: {}, progress: {}, user: null };
  } catch { return { enrolled: {}, progress: {}, user: null }; }
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = {
  Book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>,
  Award: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="40" height="40"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Grid: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="3" width="6" height="6" rx="1"/><rect x="2" y="13" width="6" height="8" rx="1"/><rect x="10" y="3" width="12" height="4" rx="1"/><rect x="10" y="11" width="12" height="10" rx="1"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  LogOut: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Play: () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>,
  ArrowLeft: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
};

// ── STYLES ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0b0f1a; --surface: #131929; --surface2: #1a2236;
    --border: #1e2d45; --text: #e8edf5; --muted: #7a8fa8;
    --accent: #38bdf8; --accent2: #818cf8;
    --font-head: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
    --radius: 14px; --shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-size: 15px; }
  input, button, select, textarea { font-family: var(--font-body); }
  button { cursor: pointer; border: none; outline: none; }
  a { text-decoration: none; color: inherit; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(11,15,26,0.85); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border); padding: 0 32px; height: 64px; display: flex; align-items: center; gap: 24px; }
  .nav-logo { font-family: var(--font-head); font-weight: 800; font-size: 20px; letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-links { display: flex; gap: 4px; flex: 1; }
  .nav-btn { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 9px;
    font-size: 14px; font-weight: 500; color: var(--muted); background: transparent; transition: all 0.2s; }
  .nav-btn:hover { color: var(--text); background: var(--surface2); }
  .nav-btn.active { color: var(--accent); background: rgba(56,189,248,0.08); }
  .nav-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
  .nav-user { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: var(--muted); }
  .avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #0b0f1a; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 20px; border-radius: 10px;
    font-size: 14px; font-weight: 600; transition: all 0.2s; }
  .btn-primary { background: var(--accent); color: #0b0f1a; }
  .btn-primary:hover { background: #7dd3fc; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(56,189,248,0.3); }
  .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border); }
  .btn-outline:hover { background: var(--surface2); border-color: var(--accent); }
  .btn-ghost { background: transparent; color: var(--muted); padding: 8px 14px; }
  .btn-ghost:hover { color: var(--text); }
  .btn-sm { padding: 6px 14px; font-size: 13px; border-radius: 8px; }
  .btn-danger { background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
  .btn-danger:hover { background: rgba(239,68,68,0.2); }

  /* SEARCH */
  .search-wrap { position: relative; }
  .search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }
  .search-input { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px;
    padding: 9px 14px 9px 38px; color: var(--text); font-size: 14px; width: 220px; transition: all 0.2s; }
  .search-input:focus { outline: none; border-color: var(--accent); width: 280px; box-shadow: 0 0 0 3px rgba(56,189,248,0.1); }
  .search-input::placeholder { color: var(--muted); }

  /* PAGE */
  .page { flex: 1; padding: 40px 32px; max-width: 1200px; margin: 0 auto; width: 100%; }
  .page-sm { max-width: 900px; }

  /* HERO */
  .hero { text-align: center; padding: 60px 20px 48px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(56,189,248,0.08);
    border: 1px solid rgba(56,189,248,0.2); color: var(--accent); font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 100px; margin-bottom: 28px; letter-spacing: 0.5px; }
  .hero h1 { font-family: var(--font-head); font-size: clamp(32px, 5vw, 56px); font-weight: 800;
    line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 16px; }
  .hero h1 span { background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 17px; color: var(--muted); max-width: 560px; margin: 0 auto 32px; line-height: 1.65; }
  .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  /* STATS BAR */
  .stats-bar { display: flex; justify-content: center; gap: 48px; padding: 24px; border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border); margin-bottom: 48px; }
  .stat { text-align: center; }
  .stat-num { font-family: var(--font-head); font-size: 26px; font-weight: 800; color: var(--text); }
  .stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px; }

  /* SECTION */
  .section-title { font-family: var(--font-head); font-size: 22px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
  .section-title span { font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--muted); }

  /* FILTER */
  .filter-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; align-items: center; }
  .filter-chip { padding: 6px 14px; border-radius: 100px; font-size: 13px; font-weight: 500; border: 1px solid var(--border);
    background: transparent; color: var(--muted); transition: all 0.2s; }
  .filter-chip:hover, .filter-chip.active { background: var(--accent); border-color: var(--accent); color: #0b0f1a; }

  /* GRID */
  .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }

  /* CARD */
  .course-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden; cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; }
  .course-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: rgba(56,189,248,0.2); }
  .card-banner { height: 8px; }
  .card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .card-category { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; opacity: 0.85; }
  .card-title { font-family: var(--font-head); font-size: 17px; font-weight: 700; line-height: 1.3; }
  .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; flex: 1; }
  .card-meta { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
  .meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--muted); }
  .rating { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #fbbf24; }
  .level-badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; }
  .card-footer { padding: 14px 20px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .instructor { font-size: 12px; color: var(--muted); }
  .enrolled-indicator { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #34d399; }

  /* PROGRESS BAR */
  .prog-bar-wrap { background: var(--border); border-radius: 100px; overflow: hidden; }
  .prog-bar { height: 100%; border-radius: 100px; transition: width 0.5s ease; }
  .prog-bar-sm { height: 5px; }
  .prog-bar-md { height: 8px; }
  .prog-bar-lg { height: 12px; }

  /* DASHBOARD */
  .dash-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .dash-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .dash-card-title { font-family: var(--font-head); font-size: 16px; font-weight: 700; margin-bottom: 8px; cursor: pointer; }
  .dash-card-title:hover { color: var(--accent); }
  .dash-prog-label { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
  .dash-prog-pct { font-weight: 700; }
  .dash-lessons { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
  .lesson-row { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px;
    background: var(--surface2); cursor: pointer; transition: all 0.15s; font-size: 13px; }
  .lesson-row:hover { background: var(--border); }
  .lesson-check { width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--border); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .lesson-check.done { background: #34d399; border-color: #34d399; }
  .lesson-title { flex: 1; line-height: 1.3; }
  .lesson-dur { color: var(--muted); font-size: 11px; flex-shrink: 0; }

  /* DETAIL */
  .detail-header { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: start; margin-bottom: 32px; }
  .detail-lessons { display: flex; flex-direction: column; gap: 10px; }
  .detail-lesson-row { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 10px;
    background: var(--surface); border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; }
  .detail-lesson-row:hover { border-color: rgba(56,189,248,0.3); background: var(--surface2); }
  .detail-lesson-row.done { border-color: rgba(52,211,153,0.3); }
  .lesson-num { width: 28px; height: 28px; border-radius: 50%; background: var(--surface2); display: flex; align-items: center;
    justify-content: center; font-size: 12px; font-weight: 700; color: var(--muted); flex-shrink: 0; }
  .lesson-num.done { background: #34d399; color: #0b0f1a; }

  /* AUTH */
  .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: var(--bg); }
  .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 40px; width: 100%; max-width: 420px; }
  .auth-title { font-family: var(--font-head); font-size: 28px; font-weight: 800; margin-bottom: 6px; }
  .auth-sub { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 13px; font-weight: 600; display: block; margin-bottom: 8px; color: var(--muted); }
  .form-input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px;
    padding: 11px 14px; color: var(--text); font-size: 14px; transition: all 0.2s; }
  .form-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(56,189,248,0.1); }
  .form-input::placeholder { color: var(--muted); }
  .auth-switch { text-align: center; font-size: 13px; color: var(--muted); margin-top: 20px; }
  .auth-link { color: var(--accent); font-weight: 600; cursor: pointer; }
  .auth-link:hover { text-decoration: underline; }
  .error-msg { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #f87171;
    font-size: 13px; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; }

  /* CERTIFICATE */
  .cert-wrap { text-align: center; padding: 40px 20px; }
  .cert-box { background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
    border: 2px solid var(--accent); border-radius: 20px; padding: 40px; max-width: 560px; margin: 0 auto;
    box-shadow: 0 0 60px rgba(56,189,248,0.15); }
  .cert-icon { color: var(--accent); margin-bottom: 20px; display: flex; justify-content: center; }
  .cert-title { font-family: var(--font-head); font-size: 28px; font-weight: 800; margin-bottom: 8px; }
  .cert-sub { color: var(--muted); font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
  .cert-name { font-family: var(--font-head); font-size: 20px; font-weight: 700; color: var(--accent); margin: 8px 0; }

  /* EMPTY STATE */
  .empty { text-align: center; padding: 60px 20px; }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty h3 { font-family: var(--font-head); font-size: 20px; margin-bottom: 8px; }
  .empty p { color: var(--muted); font-size: 14px; max-width: 300px; margin: 0 auto 20px; }

  /* TOAST */
  .toast { position: fixed; bottom: 28px; right: 28px; z-index: 9999; background: var(--surface2);
    border: 1px solid var(--border); border-radius: 12px; padding: 14px 20px; font-size: 14px;
    box-shadow: var(--shadow); display: flex; align-items: center; gap: 10px;
    animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: none; opacity: 1; } }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; flex-shrink: 0; }

  @media (max-width: 640px) {
    .nav { padding: 0 16px; gap: 8px; }
    .page { padding: 24px 16px; }
    .detail-header { grid-template-columns: 1fr; }
    .stats-bar { gap: 24px; flex-wrap: wrap; }
    .hero { padding: 40px 16px 32px; }
  }
`;

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [appState, setAppState] = useState(loadState);
  const [page, setPage] = useState("home"); // home | courses | dashboard | detail | auth | cert
  const [detailId, setDetailId] = useState(null);
  const [certId, setCertId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => { saveState(appState); }, [appState]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const navigate = (p, extra) => {
    setPage(p);
    if (extra?.id) setDetailId(extra.id);
    if (extra?.certId) setCertId(extra.certId);
    window.scrollTo(0, 0);
  };

  const enroll = (id) => {
    if (!appState.user) { setPage("auth"); return; }
    setAppState(s => {
      const enrolled = { ...s.enrolled, [id]: true };
      const progress = { ...s.progress, [id]: s.progress[id] || {} };
      showToast("Enrolled successfully! 🎉");
      return { ...s, enrolled, progress };
    });
  };

  const toggleLesson = (courseId, lessonId) => {
    setAppState(s => {
      const cp = { ...(s.progress[courseId] || {}) };
      cp[lessonId] = !cp[lessonId];
      const progress = { ...s.progress, [courseId]: cp };
      // Check if all lessons done
      const course = COURSES_DATA.find(c => c.id === courseId);
      const doneCount = Object.values(cp).filter(Boolean).length;
      if (doneCount === course.lessons.length) {
        setTimeout(() => navigate("cert", { certId: courseId }), 600);
      }
      return { ...s, progress };
    });
  };

  const logout = () => {
    setAppState(s => ({ ...s, user: null }));
    setPage("home");
  };

  const getProgress = (courseId) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    const done = Object.values(appState.progress[courseId] || {}).filter(Boolean).length;
    return Math.round((done / course.lessons.length) * 100);
  };

  const handleAuth = () => {
    setAuthError("");
    if (!authForm.email || !authForm.password) { setAuthError("Please fill all fields."); return; }
    if (authMode === "signup" && !authForm.name) { setAuthError("Name is required."); return; }
    const name = authMode === "signup" ? authForm.name : authForm.email.split("@")[0];
    setAppState(s => ({ ...s, user: { name, email: authForm.email } }));
    setPage("home");
    showToast(`Welcome, ${name}! 👋`);
  };

  const categories = ["All", ...new Set(COURSES_DATA.map(c => c.category))];
  const enrolledCourses = COURSES_DATA.filter(c => appState.enrolled[c.id]);
  const filteredCourses = COURSES_DATA.filter(c => {
    const matchQ = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchF = filter === "All" || c.category === filter;
    return matchQ && matchF;
  });

  // ── RENDER AUTH ─────────────────────────────────────────────────────────────
  if (page === "auth") {
    return (
      <>
        <style>{css}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div className="auth-title">{authMode === "login" ? "Welcome back" : "Create account"}</div>
            <div className="auth-sub">{authMode === "login" ? "Sign in to continue learning." : "Start your learning journey today."}</div>
            {authError && <div className="error-msg">{authError}</div>}
            {authMode === "signup" && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" placeholder="Your name" value={authForm.name}
                  onChange={e => setAuthForm(f => ({ ...f, name: e.target.value }))} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@email.com" value={authForm.email}
                onChange={e => setAuthForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={authForm.password}
                onChange={e => setAuthForm(f => ({ ...f, password: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleAuth()} />
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }} onClick={handleAuth}>
              {authMode === "login" ? "Sign In" : "Create Account"}
            </button>
            <div className="auth-switch">
              {authMode === "login" ? <>No account? <span className="auth-link" onClick={() => setAuthMode("signup")}>Sign up free</span></> :
                <>Already have one? <span className="auth-link" onClick={() => setAuthMode("login")}>Sign in</span></>}
            </div>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button className="btn-ghost btn" onClick={() => setPage("home")} style={{ fontSize: 13 }}>← Back to home</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── RENDER CERTIFICATE ──────────────────────────────────────────────────────
  if (page === "cert") {
    const course = COURSES_DATA.find(c => c.id === certId);
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <Nav {...{ page, navigate, appState, logout, search, setSearch }} />
          <div className="page">
            <div className="cert-wrap">
              <div className="cert-box">
                <div className="cert-icon"><Icon.Award /></div>
                <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "var(--accent)", fontWeight: 700, marginBottom: 12 }}>Certificate of Completion</div>
                <div className="cert-title">Congratulations! 🎉</div>
                <div className="cert-sub">This is to certify that</div>
                <div className="cert-name">{appState.user?.name || "Learner"}</div>
                <div className="cert-sub">has successfully completed</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 700, margin: "8px 0 24px" }}>{course?.title}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 28 }}>Issued on {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button className="btn btn-outline btn-sm" onClick={() => navigate("dashboard")}>Back to Dashboard</button>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate("courses")}>Explore More Courses</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── RENDER COURSE DETAIL ────────────────────────────────────────────────────
  if (page === "detail") {
    const course = COURSES_DATA.find(c => c.id === detailId);
    const isEnrolled = !!appState.enrolled[course.id];
    const prog = isEnrolled ? getProgress(course.id) : 0;
    const lessonDone = appState.progress[course.id] || {};

    return (
      <>
        <style>{css}</style>
        <div className="app">
          <Nav {...{ page, navigate, appState, logout, search, setSearch }} />
          <div className="page page-sm">
            <button className="btn btn-ghost" style={{ marginBottom: 20, paddingLeft: 0 }} onClick={() => navigate("courses")}>
              <Icon.ArrowLeft /> Back to Courses
            </button>
            <div className="detail-header">
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                  <span className="card-category" style={{ color: course.color }}>{course.category}</span>
                  <LevelBadge level={course.level} />
                </div>
                <h1 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 12, letterSpacing: -0.5 }}>{course.title}</h1>
                <p style={{ color: "var(--muted)", lineHeight: 1.65, marginBottom: 16, fontSize: 15 }}>{course.description}</p>
                <div className="card-meta" style={{ marginBottom: 20 }}>
                  <span className="rating"><Icon.Star /> {course.rating}</span>
                  <span className="meta-item"><Icon.Users /> {course.students.toLocaleString()} students</span>
                  <span className="meta-item"><Icon.Clock /> {course.duration}</span>
                  <span className="meta-item"><Icon.Book /> {course.lessons.length} lessons</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Instructor: <strong style={{ color: "var(--text)" }}>{course.instructor}</strong></div>
                {!isEnrolled && <button className="btn btn-primary" onClick={() => enroll(course.id)}>Enroll Now — Free</button>}
              </div>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, minWidth: 200, textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--surface2)", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: course.color }}>{prog}%</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{isEnrolled ? "Progress" : "Not enrolled"}</div>
              </div>
            </div>

            {isEnrolled && (
              <div style={{ marginBottom: 32 }}>
                <div className="prog-bar-wrap prog-bar-md" style={{ marginBottom: 8 }}>
                  <div className="prog-bar prog-bar-md" style={{ width: `${prog}%`, background: prog === 100 ? "#34d399" : `linear-gradient(90deg, ${course.color}, var(--accent))` }} />
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{Object.values(lessonDone).filter(Boolean).length} of {course.lessons.length} lessons completed</div>
              </div>
            )}

            <div className="section-title">Lessons</div>
            <div className="detail-lessons">
              {course.lessons.map((lesson, i) => {
                const done = !!lessonDone[lesson.id];
                return (
                  <div key={lesson.id} className={`detail-lesson-row${done ? " done" : ""}`}
                    onClick={() => isEnrolled && toggleLesson(course.id, lesson.id)}>
                    <div className={`lesson-num${done ? " done" : ""}`}>
                      {done ? <Icon.Check /> : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{lesson.title}</div>
                      <div className="meta-item" style={{ marginTop: 3 }}><Icon.Clock /> {lesson.duration}</div>
                    </div>
                    {isEnrolled
                      ? <span style={{ fontSize: 12, color: done ? "#34d399" : "var(--accent)", fontWeight: 600 }}>{done ? "Done" : "Mark done"}</span>
                      : <span style={{ fontSize: 12, color: "var(--muted)" }}>Enroll to start</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── RENDER DASHBOARD ────────────────────────────────────────────────────────
  if (page === "dashboard") {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <Nav {...{ page, navigate, appState, logout, search, setSearch }} />
          <div className="page">
            <div className="section-title" style={{ marginBottom: 8 }}>My Learning Dashboard</div>
            <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 14 }}>Track your progress and continue where you left off.</p>
            {enrolledCourses.length === 0
              ? <div className="empty"><div className="empty-icon">📚</div><h3>No courses yet</h3><p>Browse our catalogue and enroll in your first course!</p><button className="btn btn-primary" onClick={() => navigate("courses")}>Browse Courses</button></div>
              : <>
                <div style={{ display: "flex", gap: 16, margin: "0 0 28px", flexWrap: "wrap" }}>
                  <StatBox label="Enrolled" value={enrolledCourses.length} />
                  <StatBox label="Completed" value={enrolledCourses.filter(c => getProgress(c.id) === 100).length} />
                  <StatBox label="In Progress" value={enrolledCourses.filter(c => getProgress(c.id) > 0 && getProgress(c.id) < 100).length} />
                </div>
                <div className="dash-grid">
                  {enrolledCourses.map(course => {
                    const prog = getProgress(course.id);
                    const lessonDone = appState.progress[course.id] || {};
                    return (
                      <div key={course.id} className="dash-card">
                        <div style={{ height: 4, borderRadius: 4, background: course.color, marginBottom: 16 }} />
                        <div className="dash-card-title" onClick={() => navigate("detail", { id: course.id })}>{course.title}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>{course.instructor}</div>
                        <div className="dash-prog-label">
                          <span style={{ color: "var(--muted)", fontSize: 12 }}>Progress</span>
                          <span className="dash-prog-pct" style={{ color: prog === 100 ? "#34d399" : "var(--text)" }}>{prog}%</span>
                        </div>
                        <div className="prog-bar-wrap prog-bar-md">
                          <div className="prog-bar prog-bar-md" style={{ width: `${prog}%`, background: prog === 100 ? "#34d399" : `linear-gradient(90deg, ${course.color}, var(--accent))` }} />
                        </div>
                        {prog === 100 && (
                          <button className="btn btn-sm" style={{ marginTop: 12, background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}
                            onClick={() => navigate("cert", { certId: course.id })}>View Certificate 🏆</button>
                        )}
                        <div className="dash-lessons">
                          {course.lessons.map(l => {
                            const done = !!lessonDone[l.id];
                            return (
                              <div key={l.id} className="lesson-row" onClick={() => toggleLesson(course.id, l.id)}>
                                <div className={`lesson-check${done ? " done" : ""}`}>{done && <Icon.Check />}</div>
                                <span className="lesson-title">{l.title}</span>
                                <span className="lesson-dur">{l.duration}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            }
          </div>
        </div>
      </>
    );
  }

  // ── RENDER COURSES ──────────────────────────────────────────────────────────
  if (page === "courses") {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <Nav {...{ page, navigate, appState, logout, search, setSearch }} />
          <div className="page">
            <div className="section-title">All Courses <span>{filteredCourses.length} courses</span></div>
            <div className="filter-row">
              {categories.map(cat => (
                <button key={cat} className={`filter-chip${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
              ))}
            </div>
            {filteredCourses.length === 0
              ? <div className="empty"><div className="empty-icon">🔍</div><h3>No results</h3><p>Try adjusting your search or filter.</p></div>
              : <div className="courses-grid">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} enrolled={!!appState.enrolled[course.id]}
                    progress={appState.enrolled[course.id] ? getProgress(course.id) : null}
                    onEnroll={() => enroll(course.id)} onView={() => navigate("detail", { id: course.id })} />
                ))}
              </div>
            }
          </div>
        </div>
      </>
    );
  }

  // ── RENDER HOME ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app">
        <Nav {...{ page, navigate, appState, logout, search, setSearch }} />
        <div className="hero">
          <div className="hero-badge">🚀 Full Stack Java Project</div>
          <h1>Learn to <span>Build</span><br />Real-World Apps</h1>
          <p>Master Java, Spring Boot, React, SQL, and cloud technologies through hands-on projects and interactive lessons.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate("courses")}>Browse Courses</button>
            {appState.user
              ? <button className="btn btn-outline" onClick={() => navigate("dashboard")}>My Dashboard</button>
              : <button className="btn btn-outline" onClick={() => { setAuthMode("signup"); setPage("auth"); }}>Sign Up Free</button>}
          </div>
        </div>
        <div className="stats-bar">
          <div className="stat"><div className="stat-num">6</div><div className="stat-label">Courses</div></div>
          <div className="stat"><div className="stat-num">20K+</div><div className="stat-label">Students</div></div>
          <div className="stat"><div className="stat-num">5★</div><div className="stat-label">Avg. Rating</div></div>
          <div className="stat"><div className="stat-num">Free</div><div className="stat-label">Always</div></div>
        </div>
        <div className="page">
          <div className="section-title">Featured Courses</div>
          <div className="courses-grid">
            {COURSES_DATA.slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} enrolled={!!appState.enrolled[course.id]}
                progress={appState.enrolled[course.id] ? getProgress(course.id) : null}
                onEnroll={() => enroll(course.id)} onView={() => navigate("detail", { id: course.id })} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button className="btn btn-outline" onClick={() => navigate("courses")}>View All Courses →</button>
          </div>
        </div>
        {toast && <div className="toast"><div className="toast-dot" />{toast}</div>}
      </div>
    </>
  );
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function Nav({ page, navigate, appState, logout, search, setSearch }) {
  return (
    <nav className="nav">
      <div className="nav-logo" style={{ cursor: "pointer" }} onClick={() => navigate("home")}>LearnHub</div>
      <div className="nav-links">
        <button className={`nav-btn${page === "home" ? " active" : ""}`} onClick={() => navigate("home")}><Icon.Home />Home</button>
        <button className={`nav-btn${page === "courses" ? " active" : ""}`} onClick={() => navigate("courses")}><Icon.Grid />Courses</button>
        <button className={`nav-btn${page === "dashboard" ? " active" : ""}`} onClick={() => navigate("dashboard")}><Icon.Dashboard />My Learning</button>
      </div>
      <div className="nav-right">
        <div className="search-wrap">
          <Icon.Search />
          <input className="search-input" placeholder="Search courses…" value={search} onChange={e => setSearch(e.target.value)} onClick={() => navigate("courses")} />
        </div>
        {appState.user
          ? <div className="nav-user">
            <div className="avatar">{appState.user.name[0].toUpperCase()}</div>
            <span style={{ display: "none" }}>{appState.user.name}</span>
            <button className="btn btn-ghost btn-sm" onClick={logout} title="Log out"><Icon.LogOut /></button>
          </div>
          : <button className="btn btn-primary btn-sm" onClick={() => navigate("auth")}>Sign In</button>
        }
      </div>
    </nav>
  );
}

function CourseCard({ course, enrolled, progress, onEnroll, onView }) {
  return (
    <div className="course-card" onClick={onView}>
      <div className="card-banner" style={{ background: course.color }} />
      <div className="card-body">
        <div className="card-category" style={{ color: course.color }}>{course.category}</div>
        <div className="card-title">{course.title}</div>
        <div className="card-desc">{course.description}</div>
        <div className="card-meta">
          <span className="rating"><Icon.Star /> {course.rating}</span>
          <span className="meta-item"><Icon.Clock /> {course.duration}</span>
          <span className="meta-item"><Icon.Book /> {course.lessons.length} lessons</span>
          <LevelBadge level={course.level} />
        </div>
        {enrolled && progress !== null && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginBottom: 5 }}>
              <span>Progress</span><span style={{ fontWeight: 700, color: progress === 100 ? "#34d399" : "var(--text)" }}>{progress}%</span>
            </div>
            <div className="prog-bar-wrap prog-bar-sm">
              <div className="prog-bar prog-bar-sm" style={{ width: `${progress}%`, background: progress === 100 ? "#34d399" : `linear-gradient(90deg, ${course.color}, var(--accent))` }} />
            </div>
          </div>
        )}
      </div>
      <div className="card-footer">
        <span className="instructor">{course.instructor}</span>
        {enrolled
          ? <div className="enrolled-indicator"><Icon.Check /> Enrolled</div>
          : <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); onEnroll(); }}>Enroll Free</button>
        }
      </div>
    </div>
  );
}

function LevelBadge({ level }) {
  const colors = { Beginner: ["rgba(52,211,153,0.12)", "#34d399"], Intermediate: ["rgba(251,191,36,0.12)", "#fbbf24"], Advanced: ["rgba(239,68,68,0.12)", "#f87171"] };
  const [bg, fg] = colors[level] || colors.Beginner;
  return <span className="level-badge" style={{ background: bg, color: fg }}>{level}</span>;
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 24px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
    </div>
  );
}