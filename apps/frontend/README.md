# 📖 Publishing Platform Web

Frontend application for managing Books, Authors, and Publishers.

---

## 🚀 Tech Stack

- Next.js
- TailwindCSS
- Fetch API
- Context API

---

## ✨ Features

- Login / Logout
- JWT Authentication
- Protected Routes
- CRUD UI:
  - Homepage (Card)
  - Detail Page
  - Authors
  - Books
  - Publishers

- Pagination & Filtering
- Form Validation
- Error Handling

---

## ⚙️ Setup & Installation

### 1. Go to frontend folder

cd apps\frontend

### 2. Install dependencies

npm install

### 3. Setup environment

#### Linux / macOS

cp .env.example .env

#### Windows (PowerShell)

Copy-Item .env.example .env

Update `.env`:

NEXT_PUBLIC_API_URL=http://localhost:5001

---

### 4. Run development server

npm run dev

App runs at:
http://localhost:3000

---

## 🔗 API Integration

All requests use:

NEXT_PUBLIC_API_URL

Example:
GET /authors
POST /books

---

## 🔐 Authentication Flow

1. Login → get JWT token
2. Store token (localStorage / cookies)
3. Send token in Authorization header

---

## 📁 Project Structure

app/
├── (protected)/
│ ├── authors/
│ │ ├── [id]/
│ │ │ └── edit/
│ │ │ └── page.jsx
│ │ ├── create/
│ │ │ └── page.jsx
│ │ └── page.jsx
│ │
│ ├── books/
│ │ ├── [id]/
│ │ │ ├── edit/
│ │ │ │ └── page.jsx
│ │ │ └── page.jsx
│ │ ├── create/
│ │ │ └── page.jsx
│ │ └── page.jsx
│ │
│ ├── dashboard/
│ │ └── page.jsx
│ │
│ │ ├── [id]/
│ │ │ └── edit/
│ │ │ └── page.jsx
│ │ ├── create/
│ │ │ └── page.jsx
│ │ └── page.jsx
│ │
│ └── layout.jsx
│
├── auth/
│ ├── login/
│ │ └── page.jsx
│ └── register/
│ └── page.jsx
│
├── favicon.ico
├── globals.css
├── layout.jsx
└── page.jsx

---

## 🧪 Example Pages

- /login
- /authors
- /books
- /publishers

---

## ❗ Notes

- Backend must be running before frontend
- Ensure API URL is correct in `.env`

---

## 👨‍💻 Author

Ilman M Difa
