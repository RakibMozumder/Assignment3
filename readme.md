# Library Management System API

A RESTful API for managing a library system — built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**.

## Features

- Add, update, delete, and retrieve books
- Borrow books with availability check
- Summary of borrowed books using MongoDB aggregation
- Input validation using Mongoose schema
- Global error handling
- Environment-based configuration

---

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (with Mongoose)
- **Tools**: Postman, Nodemon, ts-node

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/RakibMozumder/Assignment3.git
cd library-management-api
```

### 2. Install dependencies

```bash
npm init -y
npm install express mongoose cors dotenv
npm install -D typescript ts-node nodemon @types/node
npm i --save-dev @types/express
npx tsc --init
```

### 3. Create `.env` file at the root

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
```

### 4. Run the server (development)

```bash
npx ts-node src/server.ts
# or if using nodemon
npx nodemon src/server.ts
```

Server will run at: `http://localhost:5000`

---

## API Endpoints

### Books

- `POST /api/books` — Create a new book
- `GET /api/books` — Get all books (supports filter, sort, limit)
- `GET /api/books/:bookId` — Get book by ID
- `PUT /api/books/:bookId` — Update a book
- `DELETE /api/books/:bookId` — Delete a book

### Borrow

- `POST /api/borrow` — Borrow a book (deduct copies, toggle availability)
- `GET /api/borrow` — Summary of borrowed books with total quantity

---

## Author

**Rakib Mozumder** — [rakib.muzumder@gmail.com]

---
