# Books API – Authentication & Security Edition (Sprint 3.08)

Welcome to the evolved version of the **Books API**. Building upon the solid foundation of Sprint 3.06, this branch introduces a complete **Authentication and Security layer** using **Passport.js** and **JWT (JSON Web Tokens)**. 

The project now follows a strict modular architecture where access to sensitive operations is guarded by custom security strategies and type-safe implementations.

---

## Key Features (Updated)

- **Full CRUD Operations**: Manage a digital book catalog with ease.
- **JWT Authentication**: Secure login system that issues 1-hour expiration tokens for authorized users.
- **Protected Routes**: Critical endpoints (`POST`, `PATCH`, `DELETE`) are now guarded and require a valid **Bearer Token**.
- **Custom Auth Guards**: Specialized `JwtAuthGuard` implementation to ensure clean, type-safe code and resolve ESLint warnings.
- **Strict Data Validation**: Global `ValidationPipe` integrated with `class-validator` (including real ISBN verification).
- **Interactive Documentation**: Auto-generated **Swagger** UI with full support for **Bearer Auth** testing.
- **Environment Safety**: Sensitive data (MongoDB URI, JWT Secret) protected via `.env` configuration.

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Language**: TypeScript
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Security**: [Passport.js](http://www.passportjs.org/) & [JWT](https://jwt.io/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **API Docs**: Swagger / OpenAPI
- **Validation**: class-validator & class-transformer

---

## Installation & Getting Started

### 1. Clone the repository

git clone <your-repository-url>
cd book-api

### 2. Install dependencies

npm install

### 3. Set up Environment Variables  

Create a file named .env in the root folder and add the following:

 `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/book-api`  
 `PORT=3000`  
 `JWT_SECRET=your_super_secret_key_here`  
 `JWT_EXPIRATION_TIME=1h`  

### 4. Launch the Server  
  
#Watch mode (recommended for development)   
npm run start:dev

---

## API Documentation (Swagger)  
Once the server is running, explore and test the API directly from your browser:  
URL: http://localhost:3000/api

### How to test protected routes:  

1. Register or Login via `/auth` endpoints to receive a JWT Token.

2. Click the green "Authorize" button at the top of the Swagger page.

3. Paste your token in the value field and click Authorize.

4. Now you can access `POST`, `PATCH`, and `DELETE` methods (look for the closed lock icon 🔒).

---

## Technical Decisions & Architecture
This sprint focused on transforming the API into a production-grade service by applying advanced NestJS patterns:

- Custom JwtAuthGuard: To avoid ESLint "unsafe-call" errors caused by using `AuthGuard('jwt')` directly as a decorator, we implemented a dedicated `JwtAuthGuard` class. This ensures the project is 100% compliant with strict linting rules.

- Strong Typing (Type Safety): We eliminated unsafe `any` assignments in the `AuthModule` by explicitly using `JwtSignOptions` for the token expiration logic. This makes the codebase robust and easier to maintain.

- Domain-Driven Modules: The logic is separated into three distinct "floors":

    - AuthModule (The Lobby): Handles identification and token issuance.

    - UsersModule (The Vault): Manages internal user data and credentials.

    - BooksModule (The Library): Manages the book catalog, protected by security guards.

---

## Project Structure
src/auth/: JWT strategies, login logic, and custom security guards.

src/users/: User schema and service for database persistence.

src/books/: Core book logic (Controller, Service, Schema).

src/books/dto/: Validation rules (DTOs) for incoming book data.

postman/: Exported JSON collection for quick API testing.

---

##### Author: Irene V. Sahun – GitHub: isahun
##### Created as part of the IT Academy Frontend bootcamp.