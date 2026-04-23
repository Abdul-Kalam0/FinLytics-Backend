# 🚀 FinLytics — AI-Powered Financial Analytics Backend

FinLytics is a production-ready backend system for tracking, analyzing, and understanding personal financial data. It combines secure authentication, role-based access control, advanced analytics, and AI-powered insights to deliver a complete financial intelligence platform.

---

## 🧠 Features

### 🔐 Authentication & Security

* JWT-based authentication with HTTP-only cookies
* Password hashing using bcrypt (Mongoose hooks)
* Rate limiting for secure API access

---

### 👥 Role-Based Access Control (RBAC)

* Roles: **Admin, Analyst, Viewer**
* Secure role assignment (admin-only)
* Protected routes based on user roles

---

### 📊 Records Management (CRUD)

* Create, update, delete financial records
* Track income and expenses
* Ownership-based access control (user-specific data)

---

### 🔍 Filtering & Pagination

* Filter records by:

  * Type (income/expense)
  * Category
  * Date range
* Pagination support for scalability

---

### 📈 Analytics Module (MongoDB Aggregation)

* Total Income, Expense, Net Balance
* Category-wise breakdown
* Monthly trends (grouped by year & month)
* Optimized queries using aggregation pipelines

---

### 🤖 AI Module (Gemini API)

* **AI Insights API** → Generates financial recommendations
* **AI Chatbot** → Ask questions like:

  * “How much did I spend on food?”
  * “Am I saving enough?”
* Smart prompt engineering using aggregated data

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT, Cookies
* **AI Integration:** Google Gemini API
* **Other:** bcrypt, rate-limiter

---

## 📂 Project Structure

```
src/
 ├── controllers/
 │     ├── authController.js
 │     ├── recordController.js
 │     ├── userController.js
 │     └── aiController.js
 │
 ├── models/
 │     ├── User.js
 │     └── Record.js
 │
 ├── routes/
 │     ├── authRoutes.js
 │     ├── userRoutes.js
 │     ├── recordRoutes.js
 │     └── aiRoutes.js
 │
 ├── middleware/
 │     ├── authMiddleware.js
 │     ├── authorize.js
 │     └── rateLimiter.js
 │
 └── app.js
```

---

## 🚀 API Highlights

### 🔐 Auth

* `POST /api/register`
* `POST /api/login`
* `POST /api/logout`

---

### 📊 Records

* `POST /api/records`
* `GET /api/records`
* `PATCH /api/records/:id`
* `DELETE /api/records/:id`

---

### 📈 Analytics

* `GET /api/records/summary`
* `GET /api/records/category-totals`
* `GET /api/records/monthly-trends`

---

### 🤖 AI

* `GET /api/ai/insights`
* `POST /api/ai/chat`

---

## 🧠 Key Concepts Implemented

* Aggregation pipelines for analytics
* Data isolation in multi-user systems
* Role-based authorization middleware
* Secure API design and validation
* AI integration with structured prompts

---

## 💡 Future Enhancements

* Redis caching for analytics & AI responses
* Export reports (CSV/PDF)
* Dashboard-ready API responses
* Real-time notifications

---

## 💬 Why This Project?

This project demonstrates the ability to build scalable backend systems with:

* Clean architecture
* Secure authentication
* Advanced database queries
* Real-world AI integration

---

## 📬 Contact

Feel free to connect for feedback or collaboration!
