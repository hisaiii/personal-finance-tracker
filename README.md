# 💸 FinSight - Personal Finance Tracker

**FinSight** is a full-featured personal finance tracker built using the **MERN stack**. It helps users manage income, expenses, visualize spending patterns, collaborate via Splitwise integration, and optimize performance through Redis caching and asynchronous background processing.

> 🔗 Live Demo: https://personal-finance-tracker-8tdm.onrender.com

---

## ⚙️ Key Features

* ✅ User Signup/Login (JWT Authentication + bcrypt)
* 📥 Add / Edit / Delete Income and Expenses
* 📊 Interactive Analytics Dashboard with Recharts
* 📤 Upload transaction proofs using Multer + Cloudinary
* 😊 Emoji support for transaction categories
* 🔁 Splitwise Integration for shared expenses
* 📁 Export transactions to Excel (.xlsx)
* ⚡ Redis-based caching for faster API responses
* 🔄 Bull Queue powered background job processing
* 🔒 Protected Routes with JWT Authentication
* 📱 Fully Responsive UI
* 🐳 Dockerized deployment with Docker Compose support

---

## 🧱 Tech Stack

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| MongoDB Atlas  | Cloud Database                |
| Express.js     | Backend API                   |
| React.js       | Frontend                      |
| Node.js        | Runtime Environment           |
| Redis          | Caching & Session Storage     |
| Bull Queue     | Background Job Processing     |
| Docker         | Containerization              |
| Docker Compose | Multi-Container Orchestration |
| JWT & bcrypt   | Authentication & Security     |
| Cloudinary     | Media Storage                 |
| Splitwise API  | Shared Expense Integration    |
| Recharts       | Data Visualization            |
| Multer         | File Upload Handling          |
| Render         | Deployment                    |

---

## 🏗️ System Architecture

```text
Browser
   │
   ▼
React Frontend
   │
   ▼
Express Backend
   │
   ├── Redis Cache
   │
   ├── Bull Queue Jobs
   │
   └── MongoDB Atlas
```

---

## 📂 Project Structure

```text
personal-finance-tracker/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── jobs/
│   └── config/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/hisaiii/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Configure Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

SPLITWISE_CONSUMER_KEY=your_splitwise_key
SPLITWISE_CONSUMER_SECRET=your_splitwise_secret
CALLBACK_URL=your_callback_url

SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
npm install
npm install --prefix frontend
```

### 4. Run Application

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8000
```

---

## 🐳 Docker Support

FinSight is fully containerized using Docker and Docker Compose.

### Run with Docker

```bash
git clone https://github.com/hisaiii/personal-finance-tracker.git

cd personal-finance-tracker

docker compose up
```

### Docker Hub Image

```bash
docker pull saihiware/finesight:v1
```

Docker Hub Repository:

https://hub.docker.com/repository/docker/saihiware/finesight/general

### Docker Services

* Backend Container (Node.js + Express)
* Redis Container
* MongoDB Atlas
* Shared Docker Network

### Docker Architecture

```text
Browser
   │
   ▼
Backend Container
   │
   ├── Redis Container
   │
   └── MongoDB Atlas
```

---

## ⚡ Backend Architecture & Performance

### Redis Integration

Redis is used for:

* API response caching
* Session storage
* Dashboard optimization
* Faster retrieval of frequently accessed data
* Reduced database load

### Bull Queue Processing

Bull Queue is used for:

* Asynchronous background jobs
* Retry handling
* Exponential backoff strategy
* Queue-based task execution
* Improved API responsiveness
* Separation of long-running tasks from the request-response cycle

### Performance Optimizations

* Dashboard API latency reduced from ~350ms to ~8ms on cache hits
* Reduced repeated MongoDB queries using Redis
* Improved scalability through background job processing
* Lower database load under repeated requests

---

## 📈 Scalability Features

* Redis caching for high-frequency API endpoints
* Bull Queue for asynchronous background processing
* Session management using Redis
* Optimized MongoDB query patterns
* Containerized deployment using Docker
* Service orchestration using Docker Compose

---

## 🖼️ Application Preview

### 🔐 Signup

![Signup](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751703266/Screenshot_2025-07-05_134407_wukerh.png)

### 🔑 Login

![Login](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751703299/Screenshot_2025-07-05_134444_sy79f3.png)

### 🏠 Dashboard

![Dashboard](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751722296/Screenshot_2025-07-05_181949_d2aym4.png)

### 💸 Income Management

![Income](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721846/Screenshot_2025-07-05_182039_p8gv8f.png)

### 🧾 Expense Management

![Expense](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721836/Screenshot_2025-07-05_182157_x3dvby.png)

### 🔁 Splitwise Integration

![Splitwise](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721839/Screenshot_2025-07-05_182227_v66uw2.png)

### 📋 Transaction History

![Transactions](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721851/Screenshot_2025-07-05_182213_jedqxq.png)

---

## 🧠 Technical Highlights

* JWT Authentication & Authorization
* Redis-Based Caching Layer
* Bull Queue Background Job Processing
* Retry Handling & Exponential Backoff
* Docker Containerization
* Docker Compose Orchestration
* MongoDB Atlas Integration
* Splitwise OAuth2 Integration
* Cloudinary Media Storage
* RESTful API Design
* Responsive React Frontend
* Performance-Oriented Backend Architecture

---

## 🚀 Future Enhancements

* GitHub Actions CI/CD Pipeline
* Automated Docker Image Builds
* Kubernetes Deployment
* AI-based Expense Categorization
* Expense Forecasting & Insights
* Real-time Notifications

---

## 👨‍💻 Author

**Sai Hiware**

GitHub: https://github.com/hisaiii

Made with lots of debugging, coffee ☕, Docker 🐳, and ❤️.
