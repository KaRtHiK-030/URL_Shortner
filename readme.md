<div align="center">

# 🔗 URL Shortener

### A production-ready RESTful URL Shortener built with Java, Spring Boot, MySQL & Docker

<p>
A production-ready RESTful URL Shortener built with <b>Java 21</b>, <b>Spring Boot 3.5</b>, <b>MySQL</b>, and <b>Docker</b>, featuring custom aliases, QR code generation, click analytics, URL expiration, Swagger/OpenAPI documentation, and global exception handling.
</p>

<br>

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=springboot)
![Gradle](https://img.shields.io/badge/Gradle-8.x-02303A?style=for-the-badge&logo=gradle)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)
![Swagger](https://img.shields.io/badge/OpenAPI-Swagger-85EA2D?style=for-the-badge&logo=swagger)
![REST API](https://img.shields.io/badge/Architecture-REST_API-blue?style=for-the-badge)

</div>

---

# 📖 Overview

URL Shortener is a backend application built with **Java** and **Spring Boot** that transforms long URLs into short, easy-to-share links using a custom **Base62 encoding algorithm**.

Beyond basic shortening, the project is built as a fully-featured, production-style service. It includes:

- 🔢 **Base62 Encoding** for compact, collision-free short codes
- 📊 **Click Analytics** — click counts, creation time, and last-accessed time per URL
- 📱 **QR Code Generation** for every shortened URL
- ⏳ **URL Expiration** with automatic invalidation of expired links
- 🐳 **Docker & Docker Compose** for one-command deployment
- 📚 **Swagger / OpenAPI** interactive API documentation
- ✅ **Bean Validation** for request payloads and URL formats
- 🪵 **Structured Logging** via SLF4J
- 🛡 **Global Exception Handling** with meaningful, consistent error responses

The application exposes REST APIs for creating, managing, and redirecting shortened URLs. URL data is persisted in MySQL via Spring Data JPA, and the entire stack is containerized with Docker for easy deployment.

---

# ✨ Features

## Core Features
- ✅ URL Shortening
- ✅ Base62 Encoding
- ✅ Custom Alias
- ✅ URL Expiration
- ✅ Automatic Redirect

## Analytics
- ✅ Click Counter
- ✅ Last Access Time

## QR Code
- ✅ Generate QR
- ✅ PNG Response

## API
- ✅ REST APIs
- ✅ JSON Responses
- ✅ HTTP Status Codes

## Validation
- ✅ URL Validation
- ✅ Bean Validation
- ✅ Duplicate Alias Handling

## Exception Handling
- ✅ Global Exception Handler
- ✅ Custom Exceptions

## Monitoring
- ✅ Spring Boot Actuator

## Documentation
- ✅ Swagger UI

## Docker
- ✅ Docker Compose
- ✅ Environment Variables

---

# 📸 Screenshots

### Swagger UI
![Swagger UI](docs/images/swagger-ui.png)

### Create Short URL
![Create Short URL](docs/images/create-url.png)

### Get All URLs
![Get All URLs](docs/images/all-urls.png)

### URL Analytics
![URL Analytics](docs/images/analytics.png)

### QR Code Generation
![QR Code](docs/images/qr-code.png)

### Docker Containers Running
![Docker Compose PS](docs/images/docker-compose-ps.png)

### Docker Images
![Docker Images](docs/images/docker-images.png)

---

# 🏗 Architecture

```
                        Client
                          │
                          ▼
                REST Controller Layer
                          │
                          ▼
                   Service Layer
                          │
                          ▼
                  Repository Layer
                          │
                          ▼
                   MySQL Database

        Cross-cutting concerns applied throughout:
        ─────────────────────────────────────────
        • Global Exception Handler
        • Bean Validation
        • Swagger / OpenAPI
        • Spring Boot Actuator
```

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Language | Java 21 |
| Framework | Spring Boot 3.5 |
| Build Tool | Gradle |
| Database | MySQL 8.4 |
| ORM | Spring Data JPA (Hibernate) |
| Validation | Jakarta Bean Validation |
| API Documentation | OpenAPI / Swagger |
| QR Code Generation | ZXing |
| Logging | SLF4J |
| Monitoring | Spring Boot Actuator |
| Containerization | Docker & Docker Compose |
| API Style | REST |

---

# 📂 Project Structure

```
url-shortener
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com/karthik/urlshortener
│   │   │       ├── config
│   │   │       ├── controller
│   │   │       ├── dto
│   │   │       ├── entity
│   │   │       ├── exception
│   │   │       ├── repository
│   │   │       ├── service
│   │   │       ├── util
│   │   │       └── UrlShortenerApplication
│   │   │
│   │   └── resources
│   │
│   └── test
│
├── docs
│   └── images
│
├── docker-compose.yml
├── .env.example
├── schema.sql
├── build.gradle
└── README.md
```

---

# ✅ Prerequisites

Before running the project, ensure the following are installed:

- Java 21
- Gradle 8+
- MySQL 8+
- Docker Desktop (Optional, recommended)
- Git

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/KaRtHiK-030/url-shortener.git

cd url-shortener
```

## Configure Environment Variables

Copy the example environment file and fill in your own values:

```bash
cp .env.example .env
```

## Build Project

```bash
./gradlew clean build
```

## Run Application

```bash
./gradlew bootRun
```

Application runs at

```
http://localhost:8080
```

---

# 🔑 Environment Variables

The application is configured using environment variables, typically defined in a `.env` file.

| Variable | Description |
|-----------|-------------|
| `MYSQL_DATABASE` | Name of the MySQL database |
| `MYSQL_USER` | MySQL username |
| `MYSQL_PASSWORD` | MySQL password |
| `SPRING_DATASOURCE_URL` | JDBC URL used by Spring Boot to connect to MySQL |
| `SPRING_DATASOURCE_USERNAME` | Datasource username used by Spring Boot |
| `SPRING_DATASOURCE_PASSWORD` | Datasource password used by Spring Boot |

> 💡 Never commit your real `.env` file. Use `.env.example` as a template.

---

# 🐳 Docker Deployment

Build and start both containers (Spring Boot API + MySQL) using Docker Compose:

```bash
docker compose up -d --build
```

Check that both containers are healthy and running:

```bash
docker compose ps
```

![Docker Compose PS](docs/images/docker-compose-ps.png)

Stop and remove the containers:

```bash
docker compose down
```

## What gets built

| Container | Description |
|-----------|-------------|
| `urlshortener-springboot` | The Spring Boot REST API, packaged and run as a self-contained JAR |
| `mysqlurldb` | The MySQL 8.4 database used for persistent URL storage |

![Docker Images](docs/images/docker-images.png)

---

# 📚 Swagger / API Documentation

Interactive API documentation is available via Swagger UI once the application is running:

```
http://localhost:8080/swagger-ui/index.html
```

![Swagger UI](docs/images/swagger-ui.png)

From here you can explore and execute every endpoint directly in the browser, including creating short URLs, fetching analytics, and generating QR codes.

---

# 🔌 REST API

| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/v1/urls` | Create a short URL (with optional custom alias & expiration) |
| `GET` | `/{shortCode}` | Redirect to the original URL |
| `GET` | `/api/v1/urls` | Get all shortened URLs |
| `GET` | `/api/v1/urls/{id}/analytics` | Get analytics for a specific URL |
| `GET` | `/api/v1/urls/{shortCode}/qr` | Generate a QR code for a shortened URL |
| `GET` | `/actuator/health` | Application health check |

## Create Short URL

```
POST /api/v1/urls
```

Request

```json
{
    "fullUrl": "https://spring.io/projects/spring-boot",
    "customAlias": "springboot",
    "expiresAt": "2027-12-31T23:59:59"
}
```

Response

```json
{
    "shortUrl": "http://localhost:8080/springboot"
}
```

![Create Short URL](docs/images/create-url.png)

## Get All URLs

```
GET /api/v1/urls
```

![Get All URLs](docs/images/all-urls.png)

## Redirect

```
GET /{shortCode}
```

Redirects the user to the original URL and updates click analytics.

## Health Check

```
GET /actuator/health
```

Returns application health information.

---

# 📱 QR Code Generation

```
GET /api/v1/urls/{shortCode}/qr
```

Generates a PNG QR code that encodes the full shortened URL, so it can be scanned directly to redirect to the original link. Works with both generated short codes and custom aliases.

![QR Code](docs/images/qr-code.png)

---

# 📊 Analytics

```
GET /api/v1/urls/{id}/analytics
```

Returns tracking information for a given shortened URL, including:

- **Click Count** — number of times the short URL has been accessed
- **Created Date** — when the short URL was generated
- **Expiration Date** — when the short URL becomes invalid (if set)
- **Last Accessed** — timestamp of the most recent redirect

![URL Analytics](docs/images/analytics.png)

---

# 🗄 Database Schema

The application stores URL information inside MySQL.

Main entity fields include:

| Field | Description |
|--------|-------------|
| `id` | Unique identifier |
| `fullUrl` | Original URL |
| `shortCode` | Generated Base62 short code |
| `customAlias` | Optional user-defined alias |
| `createdAt` | Timestamp the URL was created |
| `expiresAt` | Optional expiration timestamp |
| `clickCount` | Number of times the short URL has been accessed |
| `lastAccessedAt` | Timestamp of the most recent access |

---

# 🛡 Exception Handling

The application uses a global exception handler to return consistent, meaningful error responses.

| Status Code | Meaning |
|--------------|---------|
| `400 Bad Request` | Invalid or malformed request payload |
| `404 Not Found` | Short URL / alias does not exist |
| `409 Conflict` | Custom alias already exists (`DuplicateAliasException`) |
| `410 Gone` | Short URL has expired |
| `500 Internal Server Error` | Unexpected server-side failure |

---

# 🔐 URL Shortening Algorithm

This project uses the **Base62 Encoding Algorithm** to generate short URLs.

### How it works

1. Store the original URL in the database.
2. Obtain the generated numeric ID.
3. Convert the numeric ID into a Base62 string.
4. Return the Base62 string as the short URL.

Base62 uses:

```
0-9
a-z
A-Z
```

Advantages:

- Short URLs
- Human readable
- Collision free
- Fast lookup
- Scalable

---

# 🚀 Future Enhancements

- JWT Authentication
- Redis Caching
- Rate Limiting
- API Keys
- CI/CD Pipeline
- Kubernetes Deployment
- Prometheus Metrics
- Grafana Dashboards

---

# 👨‍💻 Author

**Karthik Naik**

Backend Developer | Java Developer

[![GitHub](https://img.shields.io/badge/GitHub-KaRtHiK--030-181717?style=for-the-badge&logo=github)](https://github.com/KaRtHiK-030)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Karthik_Naik-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/karthik-naik-/)

---

# 📈 Repo Stats

![Last Commit](https://img.shields.io/github/last-commit/KaRtHiK-030/url-shortener?style=for-the-badge)
![License](https://img.shields.io/github/license/KaRtHiK-030/url-shortener?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/KaRtHiK-030/url-shortener?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/KaRtHiK-030/url-shortener?style=for-the-badge)

---

# ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**. It is also intended for educational and learning purposes.
