<div align="center">

<h1>🔗 URL Shortener</h1>

<p><strong>Create, Manage & Track Short URLs with Powerful Analytics</strong></p>

<p><em>A modern full-stack URL shortening platform inspired by Bitly, built using React, Vite, Node.js, Express, and SQLite. The application enables users to generate custom short links, track click analytics, and manage URLs through a clean and responsive interface.</em></p>

<br/>

<img src="https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/Architecture-REST%20API-FF6F00?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Active-00C853?style=for-the-badge" />

</div>

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Prerequisites](#-prerequisites)
* [Dependencies](#-dependencies)
* [Installation & Setup](#️-installation--setup)
* [Environment Configuration](#-environment-configuration)
* [API Documentation](#-api-documentation)
* [Database Schema](#️-database-schema)
* [Future Enhancements](#-future-enhancements)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)

---

## 📖 Overview

**URL Shortener** is a full-stack web application that transforms long URLs into short, shareable links while providing analytics and management capabilities.

Inspired by platforms like **Bitly**, the application offers:

* Custom aliases for branded URLs
* Click tracking and analytics
* URL search and filtering
* Fast redirection handling
* Persistent SQLite storage
* Modern React-based user interface

The project demonstrates practical implementation of backend engineering concepts such as REST API design, URL encoding, database management, analytics tracking, and client-server communication.

---

## ✨ Features

### 🔗 URL Shortening Module

* Generate unique 6-character short URLs
* Collision-resistant code generation using NanoID
* Fast and reliable URL creation
* Automatic validation of submitted URLs

### ✏️ Custom Alias Module

* Create personalized short links
* Branded URLs for marketing campaigns
* Duplicate alias prevention
* User-friendly alias management

### 📊 Analytics Module

* Track total clicks per URL
* Daily click statistics
* URL performance monitoring
* Analytics API endpoints

### 📋 URL Management Module

* View all created URLs
* Search and filter links instantly
* Copy short URLs with one click
* Delete unwanted URLs

### ⚡ Fast Redirection System

* Optimized URL lookup
* Instant redirection workflow
* Lightweight Express routing
* Low-latency request handling

### 💾 Persistent Storage

* SQLite database integration
* Zero external database setup
* Fast local storage access
* Reliable data persistence

---

## 🛠️ Tech Stack

| Layer           | Technology     |
| --------------- | -------------- |
| Frontend        | React 18       |
| Build Tool      | Vite           |
| Styling         | CSS3           |
| Backend         | Node.js        |
| API Framework   | Express.js     |
| Database        | SQLite         |
| Database Driver | better-sqlite3 |
| ID Generation   | NanoID         |
| Architecture    | REST API       |
| Version Control | Git & GitHub   |
| IDE             | VS Code        |

---

## 🏗️ Architecture

The application follows a modern full-stack architecture.

```text
React + Vite Client
        │
        ▼
Node.js + Express API
        │
        ▼
SQLite Database
```

### Request Flow

```text
User
 │
 ▼
React Frontend
 │
 ▼
REST API
 │
 ▼
SQLite Database
 │
 ▼
Response
 │
 ▼
Frontend UI
```

### URL Redirection Flow

```text
Short URL Request
        │
        ▼
Express Route Handler
        │
        ▼
Lookup Code in SQLite
        │
        ▼
Update Analytics
        │
        ▼
Redirect to Original URL
```

---

## 📂 Project Structure

```text
url-shortener/
│
├── server/
│   │
│   ├── index.js                 # Express server entry point
│   ├── routes/                  # API routes
│   ├── controllers/             # Request handlers
│   ├── database/                # SQLite configuration
│   ├── package.json
│   └── .env.example
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/          # Reusable UI components
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Styling
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package-lock.json
```

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

| Tool    | Minimum Version | Download                      |
| ------- | --------------- | ----------------------------- |
| Node.js | 18+             | https://nodejs.org            |
| npm     | Latest          | Bundled with Node.js          |
| Git     | Latest          | https://git-scm.com           |
| VS Code | Optional        | https://code.visualstudio.com |

---

## 📦 Dependencies

### Backend

```json
{
  "express": "^4.x",
  "better-sqlite3": "^9.x",
  "dotenv": "^16.x",
  "cors": "^2.x",
  "nanoid": "^5.x"
}
```

### Frontend

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "vite": "^5.x"
}
```

---

## ⚙️ Installation & Setup

### Step 1 — Clone the Repository

```bash
git clone https://github.com/KaRtHiK-030/url-shortener.git

cd url-shortener
```

---

### Step 2 — Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

---

### Step 3 — Create Environment Variables

Create a `.env` file:

```env
PORT=5000

BASE_URL=http://localhost:5000

CLIENT_URL=http://localhost:5173
```

---

### Step 4 — Start Backend Server

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

### Step 5 — Frontend Setup

Open a new terminal:

```bash
cd client

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🌍 Environment Configuration

### `.env`

```env
PORT=5000

BASE_URL=http://localhost:5000

CLIENT_URL=http://localhost:5173
```

| Variable   | Description                       |
| ---------- | --------------------------------- |
| PORT       | Backend server port               |
| BASE_URL   | Base URL used for generated links |
| CLIENT_URL | Frontend application URL          |

---

## 🔌 API Documentation

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

Response:

```json
{
  "shortUrl": "http://localhost:5000/my-link"
}
```

---

### Fetch All URLs

```http
GET /api/links
```

---

### Delete URL

```http
DELETE /api/links/:code
```

---

### Get Analytics

```http
GET /api/links/:code/analytics
```

---

### Redirect

```http
GET /:code
```

Automatically redirects to the original URL.

---

## 🗄️ Database Schema

### `links` Table

```sql
CREATE TABLE links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    custom_alias TEXT,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Example Record

```text
id: 1
original_url: https://github.com/KaRtHiK-030
short_code: aB12Cd
custom_alias: github
clicks: 25
created_at: 2026-06-20
```

---

## 📸 Screenshots

<div align="center">

<img src="screenshots/home.png" width="300"/>

<img src="screenshots/dashboard.png" width="300"/>

<img src="screenshots/analytics.png" width="300"/>

</div>

---

## 📈 Future Enhancements

| Feature                 | Description                  |
| ----------------------- | ---------------------------- |
| ⚡ Redis Caching         | Faster URL lookups           |
| 🔐 User Authentication  | User-specific dashboards     |
| 📱 QR Code Generation   | QR code for every short URL  |
| ⏳ URL Expiration        | Auto-expiring links          |
| 🚫 Rate Limiting        | Abuse prevention             |
| 📊 Advanced Dashboard   | Rich analytics visualization |
| 🌎 Geo Analytics        | Visitor location tracking    |
| 📈 Real-Time Statistics | Live click monitoring        |
| ☁️ Cloud Database       | PostgreSQL/MySQL support     |

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository

```bash
git fork
```

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "feat: add QR code support"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is developed for educational and learning purposes.

All rights reserved by the author.

---

## 👨‍💻 Author

<div align="center">

### Karthik Naik

**BE in Computer Science Engineering**

Backend Developer · Full Stack Developer · Java Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-KaRtHiK--030-181717?style=for-the-badge\&logo=github)](https://github.com/KaRtHiK-030)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Karthik%20Naik-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/karthik-naik-/)

</div>

---

<div align="center">
  <sub>If you found this project helpful, please consider giving it a ⭐ on GitHub!</sub>
</div>
