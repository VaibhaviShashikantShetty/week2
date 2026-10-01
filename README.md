# Week 2 Backend Projects & Assignments

This repository contains the complete solutions for **Week 2 backend web development assignments and mini project**, built with Node.js, Express, MongoDB/Mongoose, bcryptjs, and JSON Web Tokens (JWT).

---

## Folder Structure

```
week2/
├── 1-todo-list-api/            # Project 1: To-Do List REST API
│   ├── config/db.js            # MongoDB connection
│   ├── models/Task.js          # Mongoose Task schema
│   ├── routes/taskRoutes.js    # CRUD endpoints (Add, Update, Delete, Get)
│   ├── postman/                # Pre-configured Postman collection
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── 2-user-auth-api/            # Project 2: User Authentication API
│   ├── config/db.js
│   ├── models/User.js          # User schema with email validation
│   ├── middleware/authMiddleware.js # JWT verification middleware
│   ├── routes/authRoutes.js    # Register, Login, and Protected Profile
│   ├── postman/                # Postman collection
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── 3-notes-app-backend/        # Mini Project: Notes App Backend
    ├── config/db.js
    ├── models/User.js          # User model
    ├── models/Note.js          # Note model (tied to user ID)
    ├── middleware/authMiddleware.js
    ├── routes/authRoutes.js    # Register & Login
    ├── routes/noteRoutes.js    # Protected CRUD routes with search & filter
    ├── postman/                # Complete Postman test collection
    ├── server.js
    ├── package.json
    └── README.md
```

---

## 1. To-Do List REST API
- **Endpoints**:
  - `GET /api/tasks` - Get all tasks
  - `GET /api/tasks/:id` - Get task by ID
  - `POST /api/tasks` - Add new task
  - `PUT /api/tasks/:id` - Update task (title, completed, priority)
  - `DELETE /api/tasks/:id` - Delete task
- **Database**: MongoDB (Mongoose)
- **Postman Testing**: Import `1-todo-list-api/postman/todo_api.postman_collection.json`

---

## 2. User Authentication API
- **Endpoints**:
  - `POST /api/auth/register` - User registration with encrypted password (bcryptjs)
  - `POST /api/auth/login` - User login with password verification & JWT generation
  - `GET /api/auth/me` - Protected profile route using Bearer token
- **Security**: Password hashing with salt (10 rounds) + JWT signed token expiration
- **Postman Testing**: Import `2-user-auth-api/postman/auth_api.postman_collection.json`

---

## 3. Notes App Backend (Mini Project)
- **Features**:
  - Full CRUD operations for personal notes.
  - Secured with JWT: Each note is tied to the logged-in user (`req.user._id`).
  - Search query support (`GET /api/notes?search=keyword`).
  - Category filter support (`GET /api/notes?category=study`).
  - Pinning notes (`isPinned: true`).
- **Postman Testing**: Import `3-notes-app-backend/postman/notes_api.postman_collection.json`

---

## Quick Start Guide

### Prerequisites
- Node.js installed (v18+)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a free MongoDB Atlas connection string.

### Running any project:
1. Navigate to the project directory:
   ```bash
   cd 1-todo-list-api   # or 2-user-auth-api or 3-notes-app-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure environment variables in `.env` (or copy from `.env.example`).
4. Run the server:
   ```bash
   npm start
   ```
