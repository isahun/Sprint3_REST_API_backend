# Books API – NestJS + MongoDB Atlas

A REST API to manage a digital book catalog, built with **NestJS**, **TypeScript** and **Mongoose**. It includes JWT authentication, role-based access control (RBAC) and Google sign-in (OAuth 2.0), and it is documented and deployed.

**Live demo:** [sprint3-rest-api-backend.vercel.app](https://sprint3-rest-api-backend.vercel.app/) (opens the Swagger documentation)

> The API runs as a serverless function, so the first request after a period of inactivity can take a few seconds.

---

## ✨ Features

- **Full CRUD** for books (create, read, update, delete).
- **Cloud persistence** with MongoDB Atlas through Mongoose.
- **Strict validation** with `class-validator`, including real ISBN verification.
- **Conflict handling**: duplicated ISBNs return `409 Conflict`.
- **Authentication**: local registration/login and Google sign-in, both returning a JWT.
- **Authorization**: role-based access (`USER` / `ADMIN`) enforced with guards and a custom `@Roles()` decorator.
- **Interactive documentation** with Swagger / OpenAPI, including the "Authorize" button for Bearer tokens.
- **Unit tests** with Jest, using mocked dependencies.

---

## 🧰 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | [NestJS](https://nestjs.com/) (Node.js) |
| Language | TypeScript |
| Database | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) + [Mongoose](https://mongoosejs.com/) |
| Auth | Passport.js (JWT and Google OAuth 2.0), bcrypt |
| Validation | class-validator, class-transformer |
| Docs | Swagger / OpenAPI |
| Testing | Jest |
| Deployment | Vercel |

---

## 🔐 Authentication & Authorization

### Local login (JWT)
1. Register a user and log in with username and password.
2. The API returns an `access_token` (JWT).
3. Send it in the `Authorization: Bearer <token>` header, or use the **Authorize** button in Swagger.

### Google login (OAuth 2.0)
1. Open `/auth/google` in the browser and sign in with a Google account.
2. Google redirects to `/auth/google/callback`.
3. The API looks for a user with that Google ID. If there is none, it creates one in the database.
4. The API returns `{ "access_token": "..." }`.

> While the Google OAuth app is in testing mode, only the accounts added as test users can sign in.

### Roles (RBAC)
| Access | Who | Endpoints |
| --- | --- | --- |
| Browse books | Public / any user | `GET /books`, `GET /books/:id` |
| Manage books | `ADMIN` only | `POST`, `PUT`, `DELETE` on `/books` |

Authentication (Passport strategies) and authorization (guards) are independent layers: `JwtAuthGuard` identifies the user and `RolesGuard` decides what that user can do.

### Security decisions
- Passwords are hashed with bcrypt, and the hash is **not selected by default**. It is only loaded during local login.
- JWTs are validated against the user **id**, and the full user document is never exposed with its password.
- `username`, `email` and `googleId` use unique **sparse** indexes, so Google users (without a username) and local users (without a Google ID) can coexist.

---

## 📚 Main Endpoints

The complete and always up-to-date list is in Swagger: [`/api-docs`](https://sprint3-rest-api-backend.vercel.app/api-docs).

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/books` | List all books | Public |
| GET | `/books/:id` | Get a book by ID | Public |
| POST | `/books` | Create a book | Admin |
| PUT | `/books/:id` | Update a book | Admin |
| DELETE | `/books/:id` | Delete a book | Admin |
| POST | `/auth/register` | Register a local user | Public |
| POST | `/auth/login` | Log in with username and password | Public |
| GET | `/auth/google` | Start Google sign-in | Public |
| GET | `/auth/google/callback` | Google callback, returns the JWT | Public |

**Sample body (`POST` / `PUT` on `/books`):**

```json
{
  "title": "One Hundred Years of Solitude",
  "author": "Gabriel García Márquez",
  "year": 1967,
  "isbn": "9780307474478"
}
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/isahun/Sprint3_REST_API_backend.git
cd Sprint3_REST_API_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (it is excluded from Git):

```dotenv
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/book-api
PORT=3000
JWT_SECRET=<a-long-random-string>
JWT_EXPIRATION_TIME=1h
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

- Generate a strong `JWT_SECRET` with:
  `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- Google credentials are created in the Google Cloud Console (Google Auth Platform → Clients → *Web application*). The client secret is only shown once, at creation. Add `GOOGLE_CALLBACK_URL` to the client's **Authorized redirect URIs**.
- In MongoDB Atlas, allow your IP in **Network Access**.

### 4. Run the server

```bash
npm run start:dev
```

Open `http://localhost:3000`: it redirects to the Swagger documentation at `/api-docs`.

### Useful scripts

| Command | What it does |
| --- | --- |
| `npm run start:dev` | Development server in watch mode |
| `npm run build` | Compile the project |
| `npm run start:prod` | Run the compiled build |
| `npm run test` | Run the unit tests |
| `npm run lint` | Check code style |
| `npm run lint:fix` | Fix code style automatically |

---

## 🧪 Testing the API

### Option A: Swagger (recommended)
1. Go to [`/api-docs`](https://sprint3-rest-api-backend.vercel.app/api-docs).
2. Call `POST /auth/login` to get a token, then click **Authorize** and paste it.
3. Try the protected endpoints (`POST`, `PUT`, `DELETE` on `/books`) with an admin token.

### Option B: Google login
Open `/auth/google` in the browser (locally: `http://localhost:3000/auth/google`) and sign in. You will receive an `access_token` as JSON.

### Demo admin account
- **Username:** `adminuser`
- **Password:** `adminpass`

---

## 📂 Project Structure

```
src/
├── main.ts                  # Entry point, global validation and Swagger setup
├── app.module.ts            # Root module (config, Mongoose, feature modules)
├── app.controller.ts        # Redirects "/" to the Swagger docs
├── books/                   # Controller, service, schema and DTOs for books
├── users/                   # Users service and schema (roles, googleId, email)
└── auth/
    ├── auth.controller.ts   # Login, register and Google endpoints
    ├── auth.service.ts      # Credential check, Google find-or-create, JWT signing
    ├── google.strategy.ts   # Google OAuth 2.0 strategy
    ├── jwt.strategy.ts      # JWT validation by user id
    ├── guards/              # JwtAuthGuard and RolesGuard
    └── decorators/          # @Roles() decorator
```

---

## 🌱 Project Evolution

The project was built step by step. Each branch keeps the history of one stage, and everything is now merged into `main`.

| Branch | Stage |
| --- | --- |
| `feature/authentication` | JWT authentication with Passport.js, registration and login |
| `feature/authorization-roles` | `ADMIN` / `USER` roles, `@Roles()` decorator and `RolesGuard` |
| `feature/google-oauth` | Google OAuth 2.0, Google users stored in the database |

---

## ⚙️ Deployment Notes

- Deployed on Vercel, which detects NestJS automatically and runs the app as a serverless function.
- Environment variables are configured in the Vercel project settings.
- Swagger UI assets are loaded from a CDN, because static files are not served from a serverless function.
- The production URL is added as an authorized redirect URI in the Google Cloud Console.

---

**Author:** Irene V. Sahun · [github.com/isahun](https://github.com/isahun)
*Created as part of the IT Academy Frontend Bootcamp.*
