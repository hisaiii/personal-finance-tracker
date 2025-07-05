
# 💸 FinSight - Personal Finance Tracker

**FinSight** is a full-featured personal finance tracker built using the **MERN stack**. It allows users to manage incomes, expenses, visualize spending trends, and collaborate via Splitwise integration.

> 🔗 Live: [Render Deployment](https://personal-finance-tracker-8tdm.onrender.com)

---

## ⚙️ Key Features

- ✅ User Signup/Login (JWT Auth + bcrypt)
- 📥 Add / Edit / Delete Income and Expenses
- 📊 Visual Analytics using Recharts
- 📤 Upload proofs with Multer + Cloudinary
- 😊 Emoji support for categories
- 🔁 Splitwise Integration for group expenses
- 📁 Export all transactions as Excel (.xlsx)
- 🔒 Secure Routes with JWT
- 📱 Responsive design for all devices

---

## 🧱 Tech Stack

| Tech | Description |
|------|-------------|
| MongoDB | NoSQL Database |
| Express.js | Backend API |
| React.js | Frontend UI |
| Node.js | Runtime |
| JWT & bcrypt | Auth System |
| Multer & Cloudinary | File Uploads |
| Splitwise API | Shared Expenses |
| xlsx | Excel Export |
| Recharts | Graphs & Charts |
| emoji-picker-react | Emoji input |
| Render | Hosting (client + server) |

---

## 🗂 Folder Structure

```
/frontend     --> React frontend (client)
/backend      --> Express backend (API)
```

---

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hisaiii/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Setup Environment Variables

Create `.env` files in both `/frontend` and `/backend` folders.

#### 📁 `/backend/.env`

```env
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

SPLITWISE_CONSUMER_KEY=your_splitwise_key
SPLITWISE_CONSUMER_SECRET=your_splitwise_secret
CALLBACK_URL=your_splitwise_callback_url
SESSION_SECRET=your_splitwise_session_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLIENT_URL=http://localhost:5173
```

#### 📁 `/frontend/.env`

```env
REACT_APP_API_URL=http://localhost:8000
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run App Locally

```bash
# In terminal 1
cd backend
npm run dev

# In terminal 2
cd frontend
npm run dev
```

Open browser: [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Preview

### 🔐 Signup  
![Signup](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751703266/Screenshot_2025-07-05_134407_wukerh.png)

### 🔑 Login  
![Login](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751703299/Screenshot_2025-07-05_134444_sy79f3.png)

### 🏠 Dashboard (Without Splitwise)  
![Dashboard](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751722296/Screenshot_2025-07-05_181949_d2aym4.png)

### 🔁 Dashboard (With Splitwise)  
![Dashboard](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751722296/Screenshot_2025-07-05_182010_kfe9k6.png)

### ➕ Expense Form  
![Expense Form](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751722295/Screenshot_2025-07-05_182053_subazv.png)

### 💸 Income Page  
![Income](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721846/Screenshot_2025-07-05_182039_p8gv8f.png)

### 🧾 Expense Page  
![Expense](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721836/Screenshot_2025-07-05_182157_x3dvby.png)

### 🔁 Splitwise Integration Page  
![Splitwise](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721839/Screenshot_2025-07-05_182227_v66uw2.png)


### 📋 All Transactions Page  
![Transactions](https://res.cloudinary.com/dlrzvbtoh/image/upload/v1751721851/Screenshot_2025-07-05_182213_jedqxq.png)
---

## 👨‍💻 Author

Made by [Sai Hiware](https://github.com/hisaiii) with loads of debugging ,coffee and ❤️

---


