# Mini Project: Notes App Backend

A complete Notes Taking REST API backend featuring CRUD operations and secured with JWT authentication.

## Features
- **User Authentication**: Register & Login with encrypted passwords (`bcryptjs`).
- **JWT Authorization**: Every note route is protected; users can only create, view, update, or delete their own notes.
- **Search & Category Filtering**: Query parameters to filter notes (`?category=Backend` or `?search=keyword`).
- **Pinned Notes**: Supports pinning important notes (`isPinned: true`).
- **Postman Ready**: Pre-made collection in `postman/notes_api.postman_collection.json`.

## Endpoints

### Authentication Endpoints (Public)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Notes Endpoints (Protected - requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | Get all notes belonging to logged-in user |
| `GET` | `/api/notes?search=keyword` | Search notes by title or content |
| `GET` | `/api/notes?category=study` | Filter notes by category |
| `GET` | `/api/notes/:id` | Get single note by ID |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update note by ID |
| `DELETE` | `/api/notes/:id` | Delete note by ID |

## How to Run
1. Navigate to this folder:
   ```bash
   cd 3-notes-app-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up `.env` (optional):
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Testing with Postman
1. Import `postman/notes_api.postman_collection.json`.
2. Register/Login to obtain your JWT `token`.
3. In any of the Notes requests, add your token under **Authorization** (Type: *Bearer Token*).
4. Create, search, update, and delete notes!
