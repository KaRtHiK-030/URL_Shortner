# 🔗 URL Shortener

A full-stack URL Shortener application inspired by Bitly, built using **Node.js + Express** for the backend and **React + Vite** for the frontend.

The project focuses on scalable backend concepts such as:
- URL encoding
- Fast redirection
- Analytics tracking
- Persistent storage
- REST API design

Uses SQLite for lightweight persistent storage with zero external database setup.

---

## Features

- ✂️ Generate short URLs with unique 6-character codes
- ✏️ Custom aliases for branded short links
- 📊 Click tracking with per-day analytics
- 🔍 Search and filter saved URLs
- 📋 One-click copy to clipboard
- 🗑️ Delete shortened URLs
- ⚡ Fast redirection workflow
- 💾 SQLite-based persistent storage

---

## System Architecture

```text
Client (React + Vite)
        ↓
Node.js + Express API
        ↓
SQLite Database
```

---

## Project Structure

```text
url-shortener/
├── server/                 # Express API + SQLite
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/KaRtHiK-030/url-shortener.git
cd url-shortener
```

---

## Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/shorten` | Create short URL |
| `GET` | `/api/links` | Fetch all links |
| `DELETE` | `/api/links/:code` | Delete a link |
| `GET` | `/api/links/:code/analytics` | Fetch analytics |
| `GET` | `/:code` | Redirect to original URL |

---

## Example Request

### Create Short URL

```http
POST /api/shorten
```

Request Body:

```json
{
  "url": "https://example.com/very/long/url",
  "customCode": "my-link"
}
```

---

## Tech Stack

### Frontend
- React 18
- Vite
- CSS

### Backend
- Node.js
- Express.js

### Database
- SQLite (`better-sqlite3`)

### Utilities
- nanoid

---

## Deployment

### Backend Deployment
Can be deployed on:
- Railway
- Render
- Fly.io

### Frontend Deployment
Can be deployed on:
- Vercel
- Netlify

---

## Future Improvements

- Redis caching
- User authentication
- QR code generation
- URL expiration support
- Rate limiting
- Custom analytics dashboard

---

## Key Learnings

- REST API development
- Full-stack application architecture
- SQLite integration
- URL shortening logic
- Frontend-backend communication
- Analytics tracking implementation

---

## Author

Karthik Naik

- GitHub: https://github.com/KaRtHiK-030
- LinkedIn: https://www.linkedin.com/in/karthik-naik-/
