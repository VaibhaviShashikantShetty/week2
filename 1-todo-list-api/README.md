# Project 1: To-Do List REST API

A simple, beginner-friendly REST API for managing tasks with MongoDB and Express.

## Features
- **Endpoints**: Add, update, delete, and list tasks.
- **Database**: MongoDB via Mongoose ODM.
- **Testing**: Pre-configured Postman collection included in `postman/`.

## Endpoints

| Method | Endpoint | Description | Sample Request Body |
|---|---|---|---|
| `GET` | `/api/tasks` | Get all tasks | None |
| `GET` | `/api/tasks/:id` | Get single task | None |
| `POST` | `/api/tasks` | Create new task | `{ "title": "Buy groceries", "priority": "high" }` |
| `PUT` | `/api/tasks/:id` | Update task | `{ "completed": true }` |
| `DELETE` | `/api/tasks/:id` | Delete task | None |

## How to Run
1. Navigate to this folder:
   ```bash
   cd 1-todo-list-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up `.env` (optional, default connects to `mongodb://127.0.0.1:27017/todo_db`):
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Testing with Postman
1. Open Postman.
2. Click **Import** and select `postman/todo_api.postman_collection.json`.
3. Execute the pre-configured requests to test adding, reading, updating, and deleting tasks.
