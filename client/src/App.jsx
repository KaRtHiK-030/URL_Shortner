import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = "/api";

// ── Helpers ──────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return "just now";
}

function CopyIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

// ── Toast ────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "#f0f0f0", color: "#0f0f0f", padding: "8px 20px",
      borderRadius: 99, fontSize: 13, fontWeight: 500, zIndex: 999,
      animation: "fadeInUp 0.2s ease",
      whiteSpace: "nowrap",
    }}>{msg}</div>
  );
}

// ── Analytics Modal ──────────────────────────────────────────────
function AnalyticsModal({ link, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/links/${link.code}/analytics`)
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [link.code]);

  const maxCount = data?.history?.length ? Math.max(...data.history.map(d => d.count)) : 1;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: 24, width: "100%", maxWidth: 500,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{link.short}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, wordBreak: "break-all" }}>{link.url}</div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "var(--muted)",
            fontSize: 20, lineHeight: 1, padding: "0 4px", cursor: "pointer",
          }}>×</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total clicks", value: link.clicks },
            { label: "Created", value: timeAgo(link.created_at) },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--surface2)", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "var(--font-mono)" }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>Clicks — last 30 days</div>
        {loading ? (
          <div style={{ color: "var(--muted)", fontSize: 13 }}>Loading…</div>
        ) : data?.history?.length ? (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
            {data.history.slice().reverse().map(d => (
              <div key={d.day} title={`${d.day}: ${d.count}`} style={{
                flex: 1, background: "var(--accent)", borderRadius: 3,
                height: `${Math.max(6, (d.count / maxCount) * 100)}%`,
                opacity: 0.85,
              }} />
            ))}
          </div>
        ) : (
          <div style={{ color: "var(--muted)", fontSize: 13 }}>No click data yet.</div>
        )}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [fetching, setFetching] = useState(true);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const fetchLinks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/links`);
      setLinks(data);
    } catch {
      showToast("Could not load links.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  const handleShorten = async () => {
    if (!url.trim()) { setError("Please enter a URL."); return; }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/shorten`, {
        url: url.trim(),
        customCode: customCode.trim() || undefined,
      });
      setLinks(prev => [data, ...prev]);
      setUrl("");
      setCustomCode("");
      setShowCustom(false);
      showToast("Link created!");
    } catch (e) {
      setError(e.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await axios.delete(`${API}/links/${code}`);
      setLinks(prev => prev.filter(l => l.code !== code));
      showToast("Deleted.");
    } catch {
      showToast("Could not delete.");
    }
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link.short).then(() => {
      setCopiedCode(link.code);
      showToast("Copied!");
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  const filtered = links.filter(l =>
    !search || l.url.toLowerCase().includes(search.toLowerCase()) || l.short.toLowerCase().includes(search.toLowerCase())
  );

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .link-card:hover { border-color: var(--border2) !important; }
        .icon-btn:hover { background: var(--surface2) !important; }
        .icon-btn.danger:hover { background: var(--danger-bg) !important; color: var(--danger) !important; }
        .shorten-btn:hover:not(:disabled) { background: #d97706 !important; }
        input:focus { outline: none; border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(245,158,11,0.15); }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--accent-bg)", color: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><LinkIcon /></div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px" }}>URL Shortener</h1>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Shorten, share, and track your links.</p>
        </div>

        {/* Shorten form */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: 20, marginBottom: 24,
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: error ? 8 : 0 }}>
            <input
              value={url}
              onChange={e => { setUrl(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleShorten()}
              placeholder="https://your-long-url.com/goes/here"
              style={{
                flex: 1, background: "var(--surface2)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "10px 14px", color: "var(--text)",
                fontFamily: "var(--font-mono)", fontSize: 13,
              }}
            />
            <button
              className="shorten-btn"
              onClick={handleShorten}
              disabled={loading}
              style={{
                background: "var(--accent)", color: "#0f0f0f", border: "none",
                borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14,
                transition: "background 0.15s", whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1,
              }}
            >{loading ? "Shortening…" : "Shorten →"}</button>
          </div>

          {error && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6 }}>{error}</div>}

          <button
            onClick={() => setShowCustom(v => !v)}
            style={{
              background: "none", border: "none", color: "var(--muted)",
              fontSize: 12, padding: "8px 0 0", cursor: "pointer",
            }}
          >{showCustom ? "▲ Hide custom alias" : "▼ Add custom alias (optional)"}</button>

          {showCustom && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--muted)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>
                {window.location.host}/
              </span>
              <input
                value={customCode}
                onChange={e => setCustomCode(e.target.value)}
                placeholder="my-custom-alias"
                maxLength={20}
                style={{
                  flex: 1, background: "var(--surface2)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: "8px 12px", color: "var(--text)",
                  fontFamily: "var(--font-mono)", fontSize: 13,
                }}
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total links", value: links.length },
            { label: "Total clicks", value: totalClicks },
            { label: "Avg clicks", value: links.length ? Math.round(totalClicks / links.length) : "—" },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--accent-text)" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        {links.length > 0 && (
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search links…"
            style={{
              width: "100%", background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontSize: 13,
              marginBottom: 14,
            }}
          />
        )}

        {/* Link list header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : "Your links"}
          </span>
        </div>

        {/* Links */}
        {fetching ? (
          <div style={{ color: "var(--muted)", fontSize: 14, textAlign: "center", padding: "40px 0" }}>Loading…</div>
        ) : !links.length ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>🔗</div>
            <div style={{ fontSize: 14 }}>No links yet — shorten your first URL above.</div>
          </div>
        ) : !filtered.length ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--muted)", fontSize: 14 }}>
            No links match your search.
          </div>
        ) : (
          filtered.map(link => (
            <div
              key={link.code}
              className="link-card"
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "14px 16px", marginBottom: 10,
                display: "flex", alignItems: "center", gap: 12,
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "var(--accent-text)" }}>
                  {link.short}
                </div>
                <div style={{
                  fontSize: 12, color: "var(--muted)", marginTop: 2,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{link.url}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                  <span style={{
                    fontSize: 11, padding: "2px 8px", borderRadius: 99,
                    background: "var(--info-bg)", color: "var(--info)", fontWeight: 500,
                  }}>{link.clicks} click{link.clicks !== 1 ? "s" : ""}</span>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>{timeAgo(link.created_at)}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[
                  {
                    title: "Analytics", icon: <ChartIcon />, cls: "",
                    onClick: () => setAnalytics(link),
                  },
                  {
                    title: copiedCode === link.code ? "Copied!" : "Copy",
                    icon: <CopyIcon />, cls: "",
                    onClick: () => handleCopy(link),
                    style: copiedCode === link.code ? { color: "var(--success)" } : {},
                  },
                  {
                    title: "Delete", icon: <TrashIcon />, cls: "danger",
                    onClick: () => handleDelete(link.code),
                  },
                ].map((btn, i) => (
                  <button
                    key={i}
                    className={`icon-btn ${btn.cls}`}
                    title={btn.title}
                    onClick={btn.onClick}
                    style={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid var(--border)", borderRadius: 8, background: "transparent",
                      color: "var(--muted)", transition: "background 0.15s, color 0.15s",
                      ...(btn.style || {}),
                    }}
                  >{btn.icon}</button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {analytics && <AnalyticsModal link={analytics} onClose={() => setAnalytics(null)} />}
      <Toast msg={toast} />
    </>
  );
}
