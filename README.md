<div align="center">

# 🔗 URL Shortener

### 🚀 A Modern Full-Stack URL Shortening Platform Inspired by Bitly

*URL Shortener is a scalable full-stack web application built with React, Vite, Node.js, Express, and SQLite. It allows users to create, manage, and track shortened URLs through a fast and intuitive interface while demonstrating backend system design concepts such as URL encoding, analytics tracking, and RESTful API development.*

<br/>

![Frontend](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Build Tool](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Framework](https://img.shields.io/badge/API-Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Database](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge\&logo=sqlite\&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

</div>

---

# 📋 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Core Functionality](#-core-functionality)
* [Prerequisites](#-prerequisites)
* [Installation & Setup](#️-installation--setup)
* [API Endpoints](#-api-endpoints)
* [Deployment](#-deployment)
* [Future Enhancements](#-future-enhancements)
* [Key Learnings](#-key-learnings)
* [Author](#-author)

---

# 📖 Overview

**URL Shortener** is a full-stack web application that converts long URLs into compact, shareable links while providing analytics and management capabilities.

Inspired by platforms like **Bitly**, the application offers custom aliases, click tracking, search functionality, and persistent storage through SQLite.

The project demonstrates practical implementation of:

* Full-Stack Development
* REST API Design
* URL Encoding & Decoding
* Analytics Tracking
* Database Integration
* Client-Server Architecture
* Frontend-Backend Communication

---

# ✨ Features

### ✂️ URL Shortening

* Generate unique 6-character short URLs
* Fast and reliable URL generation
* Collision-resistant code creation

### ✏️ Custom Aliases

* Create branded and memorable URLs
* User-defined custom short codes
* Alias validation support

### 📊 Analytics Tracking

* Track total clicks per URL
* Monitor daily traffic statistics
* Analytics endpoint for reporting

### 🔍 Search & Filtering

* Search saved URLs instantly
* Filter links efficiently
* Improved URL management experience

### 📋 Clipboard Support

* One-click URL copying
* Quick sharing workflow
* User-friendly interaction

### 🗑️ URL Management

* Delete unwanted links
* Persistent database storage
* Clean and organized dashboard

### ⚡ Fast Redirection

* Optimized redirect workflow
* Low-latency response handling
* Express-powered routing

---

# 🛠️ Tech Stack

| Layer                | Technology     |
| -------------------- | -------------- |
| Frontend             | React 18       |
| Build Tool           | Vite           |
| Styling              | CSS            |
| Backend              | Node.js        |
| Framework            | Express.js     |
| Database             | SQLite         |
| Database Driver      | better-sqlite3 |
| Unique ID Generation | nanoid         |
| Version Control      | Git & GitHub   |

---

# 🏗️ Architecture

The application follows a classic full-stack architecture.

```text
┌─────────────────────┐
│ React + Vite Client │
└──────────┬──────────┘
           │ HTTP Requests
           ▼
┌─────────────────────┐
│ Node.js + Express   │
│ REST API Server     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ SQLite Database     │
└─────────────────────┘
```

### Request Flow

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express REST API
 │
 ▼
SQLite Database
 │
 ▼
Response Returned
 │
 ▼
Frontend UI
```

---

# 📂 Project Structure

```text
url-shortener/
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙️ Core Functionality

### URL Creation Workflow

```text
User submits URL
        │
        ▼
API Validation
        │
        ▼
Generate Short Code
        │
        ▼
Store in SQLite
        │
        ▼
Return Short URL
```

### Redirection Workflow

```text
User visits Short URL
          │
          ▼
Find Code in Database
          │
          ▼
Update Click Analytics
          │
          ▼
Redirect to Original URL
```

---

# ✅ Prerequisites

Before running the project, ensure the following are installed:

| Tool    | Version  |
| ------- | -------- |
| Node.js | 18+      |
| npm     | Latest   |
| Git     | Latest   |
| VS Code | Optional |

Verify installation:

```bash
node -v
npm -v
```

---

# ⚙️ Installation & Setup

## Step 1 — Clone Repository

```bash
git clone https://github.com/KaRtHiK-030/url-shortener.git
cd url-shortener
```

---

## Step 2 — Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
BASE_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

Start backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## Step 3 — Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | `/api/shorten`               | Create a short URL       |
| GET    | `/api/links`                 | Fetch all URLs           |
| DELETE | `/api/links/:code`           | Delete a URL             |
| GET    | `/api/links/:code/analytics` | Fetch analytics          |
| GET    | `/:code`                     | Redirect to original URL |

---

# 📤 Example Request

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

# 🚀 Deployment

### Backend Hosting

Deploy easily on:

* Railway
* Render
* Fly.io
* VPS Servers

### Frontend Hosting

Deploy easily on:

* Vercel
* Netlify
* GitHub Pages

---

# 📈 Future Enhancements

| Feature                 | Description                  |
| ----------------------- | ---------------------------- |
| ⚡ Redis Caching         | Faster URL lookups           |
| 🔐 Authentication       | User accounts and dashboards |
| 📱 QR Code Generator    | Generate QR codes for links  |
| ⏳ URL Expiration        | Auto-expiring short links    |
| 🚫 Rate Limiting        | Protection against abuse     |
| 📊 Advanced Dashboard   | Rich analytics visualization |
| 🌎 Geo Analytics        | Visitor location tracking    |
| 📈 Real-Time Statistics | Live click monitoring        |

---

# 🎯 Key Learnings

Through this project, I gained practical experience with:

* Full-Stack Web Development
* REST API Design
* React Component Architecture
* Node.js Backend Development
* SQLite Database Integration
* URL Encoding Algorithms
* Analytics Tracking Systems
* Frontend-Backend Communication
* Deployment Workflows

---

# 👨‍💻 Author

<div align="center">

## Karthik Naik

**BE in Computer Science Engineering**

Backend Developer • Java Enthusiast • Full-Stack Learner

[![GitHub](https://img.shields.io/badge/GitHub-KaRtHiK--030-181717?style=for-the-badge\&logo=github)](https://github.com/KaRtHiK-030)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Karthik%20Naik-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/karthik-naik-/)

</div>

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub!

</div>
