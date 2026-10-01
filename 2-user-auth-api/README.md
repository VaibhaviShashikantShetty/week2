# Project 2: User Authentication API

A simple, beginner-friendly Authentication API built with Node.js, Express, MongoDB, `bcryptjs` password hashing, and `jsonwebtoken` (JWT) authentication.

## Features
- **User Registration**: Encrypts plaintext passwords securely using bcrypt salt and hashing.
- **User Login**: Validates credentials and generates signed JWT tokens.
- **Protected Profile Route**: Demonstrates JWT authorization middleware using `Bearer <token>`.
- **Pre-made Postman Collection**: Ready-to-import tests in `postman/auth_api.postman_collection.json`.

## Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user and returns JWT token |
| `POST` | `/api/auth/login` | Public | Authenticate user and returns JWT token |
| `GET` | `/api/auth/me` | Protected | Returns authenticated user profile |

## How to Run
1. Navigate to this folder:
   ```bash
   cd 2-user-auth-api
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
1. Import `postman/auth_api.postman_collection.json` into Postman.
2. Send **2. User Registration** with a name, email, and password.
3. Copy the returned `token`.
4. In **4. Get Current User Profile**, paste the token in the `Authorization` header as:
   `Bearer <YOUR_TOKEN>`
5. Send the request to verify protected route access.
