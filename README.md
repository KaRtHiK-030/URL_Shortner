# 🔗 URL Shortener

A full-stack URL shortener built with **Node.js + Express** (backend) and **React + Vite** (frontend). Uses SQLite for persistent storage — no external database required.

## Features

- ✂️ Shorten any URL with a random 6-character code
- ✏️ Custom aliases (e.g. `localhost:5000/my-brand`)
- 📊 Click tracking with per-day analytics chart
- 🗑️ Delete links
- 🔍 Search and filter your links
- 📋 One-click copy to clipboard
- 💾 SQLite database — zero config, single file

---

## Project Structure

```
url-shortener/
├── server/          # Express API + SQLite
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env    # edit if needed
npm run dev             # starts on http://localhost:5000
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev             # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Environment Variables (`server/.env`)

| Variable     | Default                    | Description                          |
|-------------|----------------------------|--------------------------------------|
| `PORT`      | `5000`                     | Port the API runs on                 |
| `BASE_URL`  | `http://localhost:5000`    | Public base URL used for short links |
| `CLIENT_URL`| `http://localhost:5173`    | Frontend URL for CORS                |

---

## API Endpoints

| Method   | Endpoint                          | Description                   |
|----------|-----------------------------------|-------------------------------|
| `POST`   | `/api/shorten`                    | Create a short link           |
| `GET`    | `/api/links`                      | List all links                |
| `DELETE` | `/api/links/:code`                | Delete a link                 |
| `GET`    | `/api/links/:code/analytics`      | Click history for a link      |
| `GET`    | `/:code`                          | Redirect to the original URL  |

### POST `/api/shorten`

```json
{
  "url": "https://your-long-url.com",
  "customCode": "optional-alias"
}
```

---

## Deployment

### Deploy backend to Railway / Render / Fly.io

1. Push repo to GitHub.
2. Create a new web service pointing to the `server/` folder.
3. Set `BASE_URL` to your live domain (e.g. `https://myapp.railway.app`).
4. Set `CLIENT_URL` to your frontend domain.

### Deploy frontend to Vercel / Netlify

1. Set the root directory to `client/`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `VITE_API_URL` if your API is on a different domain (update `API` constant in `App.jsx`).

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | React 18, Vite              |
| Backend  | Node.js, Express            |
| Database | SQLite via better-sqlite3   |
| IDs      | nanoid                      |

---

## License

MIT
