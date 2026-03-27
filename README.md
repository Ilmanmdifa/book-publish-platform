# 📚 Publishing Platform (Fullstack Monorepo)

Simple app to manage **Books, Authors, Publishers**.

---

## 🚀 Stack

Backend: Express + Prisma + PostgreSQL + JWT
Frontend: Next.js + Tailwind + Context API

---

## 📁 Structure

```
apps/
├── backend/
├── frontend/
postman/
```

---

## ⚙️ Setup

```bash
# backend
cd apps/backend
npm install
cp .env.example .env   # or Copy-Item on Windows
npx prisma migrate dev
npm run seed
npm run dev

# frontend (new terminal)
cd apps/frontend
npm install
cp .env.example .env
npm run dev
```

---

## 🌐 URL

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

---

## 📬 API

Postman: `/postman/publishing-platform.postman_collection.json`

---

## 📄 Docs

- backend → apps/backend/README.md
- frontend → apps/frontend/README.md

---

## ❗ Notes

- run backend first
- make sure postgres is running

---

## 👨‍💻 Author

my name
