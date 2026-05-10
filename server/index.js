require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// ── Database setup ──────────────────────────────────────────────
const db = new Database(path.join(__dirname, "links.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    code      TEXT UNIQUE NOT NULL,
    url       TEXT NOT NULL,
    clicks    INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS clicks (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    code       TEXT NOT NULL,
    clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    referrer   TEXT,
    user_agent TEXT
  );
`);

// ── Prepared statements ─────────────────────────────────────────
const stmts = {
  insert:    db.prepare("INSERT INTO links (code, url) VALUES (?, ?)"),
  findCode:  db.prepare("SELECT * FROM links WHERE code = ?"),
  allLinks:  db.prepare("SELECT * FROM links ORDER BY created_at DESC"),
  incClicks: db.prepare("UPDATE links SET clicks = clicks + 1 WHERE code = ?"),
  delete:    db.prepare("DELETE FROM links WHERE code = ?"),
  logClick:  db.prepare("INSERT INTO clicks (code, referrer, user_agent) VALUES (?, ?, ?)"),
  history:   db.prepare(`
    SELECT strftime('%Y-%m-%d', clicked_at) AS day, COUNT(*) AS count
    FROM clicks WHERE code = ?
    GROUP BY day ORDER BY day DESC LIMIT 30
  `),
};

// ── Middleware ──────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────

// POST /api/shorten  →  create short link
app.post("/api/shorten", (req, res) => {
  let { url, customCode } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required." });
  if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;
  if (!validUrl.isUri(url)) return res.status(400).json({ error: "Invalid URL." });

  const code = customCode?.trim() || nanoid(6);

  if (customCode && !/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
    return res.status(400).json({ error: "Custom alias must be 3-20 alphanumeric characters." });
  }

  const existing = stmts.findCode.get(code);
  if (existing) return res.status(409).json({ error: "That alias is already taken." });

  stmts.insert.run(code, url);
  const link = stmts.findCode.get(code);

  return res.status(201).json({ ...link, short: `${BASE_URL}/${code}` });
});

// GET /api/links  →  list all links
app.get("/api/links", (req, res) => {
  const links = stmts.allLinks.all().map((l) => ({
    ...l,
    short: `${BASE_URL}/${l.code}`,
  }));
  return res.json(links);
});

// DELETE /api/links/:code  →  delete a link
app.delete("/api/links/:code", (req, res) => {
  const { code } = req.params;
  const link = stmts.findCode.get(code);
  if (!link) return res.status(404).json({ error: "Link not found." });
  stmts.delete.run(code);
  return res.json({ success: true });
});

// GET /api/links/:code/analytics  →  click history
app.get("/api/links/:code/analytics", (req, res) => {
  const { code } = req.params;
  const link = stmts.findCode.get(code);
  if (!link) return res.status(404).json({ error: "Link not found." });
  const history = stmts.history.all(code);
  return res.json({ ...link, short: `${BASE_URL}/${link.code}`, history });
});

// GET /:code  →  redirect
app.get("/:code", (req, res) => {
  const { code } = req.params;
  const link = stmts.findCode.get(code);
  if (!link) return res.status(404).send("Short link not found.");

  stmts.incClicks.run(code);
  stmts.logClick.run(code, req.headers.referer || null, req.headers["user-agent"] || null);

  return res.redirect(301, link.url);
});

// ── Start ───────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running at ${BASE_URL}`);
});
