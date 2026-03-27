# 📚 Publishing Platform API

Backend service for managing **Books, Authors, and Publishers**.

---

## 🚀 Tech Stack

- Node.js (Express.js)
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## ✨ Features

- 🔐 Authentication (Register, Login)
- 📖 CRUD Authors, Books, Publishers
- 📊 Pagination, Filtering, Sorting
- ✅ Input Validation
- 🛡️ Protected Routes (JWT)

---

## ⚙️ Setup & Installation

### 1. Clone Repository

git clone <your-repo-url>

---

### 2. Install Dependencies

cd apps/backend
npm install

---

### 3. Setup Environment Variables

#### Linux / macOS

cp .env.example .env

#### Windows (PowerShell)

Copy-Item .env.example .env

---

Update `.env`:

DATABASE_URL="your_database_url"
NODE_ENV=development
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
PORT=5001

---

### 4. Run Database Migration

npx prisma migrate dev

---

### 5. Seed Database

npm run seed

---

### 6. Start Server

npm run dev

Server will run at:
http://localhost:5001

---

## 🔐 Authentication

All protected routes require a Bearer Token:

Authorization: Bearer <token>

Get token from:

POST /auth/login

---

## 📬 API Testing

Postman collection is available in:

/postman/PublishPlatformAPI.postman_collection.json

---

## 📁 Project Structure

src/
├── config/
├── controllers/
├── middlewares/
├── routes/
├── utils/
├── validators/

prisma/
├── schema.prisma
├── seed.js

---

## 🧪 Example Endpoints

GET /authors?page=1&limit=5
POST /books
DELETE /publishers/:id

---

## ⚠️ Notes

- Public endpoints: `/auth/login`, `/auth/register`
- All other endpoints require authentication
- Uses consistent JSON response format

---

## 👨‍💻 Author

Ilman M Difa
