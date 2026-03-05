# Books API – NestJS + MongoDB Atlas (Sprint 3.06)

Welcome to the **Books API**, a robust backend service designed to manage a digital book catalog. This project was built using **NestJS** and **Mongoose**, focusing on clean architecture, cloud database integration, and strict data validation.

---

## Key Features

- **Full CRUD Operations**: Create, Read, Update, and Delete books.
- **Cloud Persistence**: Fully connected to **MongoDB Atlas**.
- **Smart Validation**: Integrated `class-validator` to ensure data integrity (including real ISBN verification).
- **Interactive Documentation**: Auto-generated **Swagger** UI for easy API testing.
- **Conflict Handling**: Built-in detection for duplicate ISBNs (409 Conflict).
- **Environment Safety**: Sensitive data protected via `.env` configuration.

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Language**: TypeScript
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **API Docs**: Swagger / OpenAPI
- **Validation**: class-validator & class-transformer

---

## Installation & Getting Started

Follow these steps to get the project running on your local machine (Windows, macOS, or Linux).

### 1. Clone the repository  
Open your terminal and run:

git clone <your-repository-url>

### 2. Enter the project folder  
**Note on Ambiguity:** Depending on how you cloned the repo (e.g., via VS Code interface), you might already be inside the correct folder.

**Check**: If you see the src folder and package.json in your sidebar, skip this step.

Otherwise, run: 

cd book-api

### 3. Install dependencies
This will download all necessary libraries (NestJS, Mongoose, etc.): 

npm install

### 4. Set up Environment Variables
The .env file is excluded from Git for security. You must create a new one in the root folder:  
  - Create a file named .env.  
  - Add your MongoDB Atlas connection string:  

    `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/book-api`  
    `PORT=3000`  

### 5. Launch the Server  
#Watch mode (recommended for development)  

npm run start:dev

---

## API Documentation (Swagger)  
Once the server is running, explore and test the API directly from your browser: 
http://localhost:3000/api-docs

---

## Available Endpoints  

### Method ------- Endpoint ------- Description  
GET -------------- /books --------- Get all books in the database.

GET ------------- /books/:id ------ Get details of a specific book by its ID.

POST ------------ /books ---------- Add a new book (requires valid JSON body).

PUT ------------- /books/:id ------ Update an existing book's information.

DELETE ---------- /books/:id ------ Remove a book from the catalog.  


### Sample Request Body (POST/PUT):  
#### JSON

`{`

  `"title": "One Hundred Years of Solitude",`

  `"author": "Gabriel García Márquez",`

  `"year": 1967,`

  `"isbn": "9780307474478"`

`}`

---

## Project Structure
- src/main.ts: Application entry point and Swagger setup.
- src/app.module.ts: Root module connecting database and features.
- src/books/: Core logic (Controller, Service, Schema, and DTOs).
- src/books/dto/: Validation rules for incoming data.

---

## Project Evolution & Branches

This repository is organized into branches to reflect the learning progress and feature implementation:

#### [Branch: `feature/authentication`](https://github.com/isahun/Sprint3_REST_API_backend/tree/feature/authentication)(Latest)
This branch contains the **full security implementation** (Sprint 3.07). 
**Key additions over `main`:**
- **JWT-based Authentication**: Secure login and registration.
- **Role-based Security**: Specialized `AuthGuards` to protect sensitive routes.
- **Passport.js Integration**: Industry-standard authentication strategies.
- **Enhanced Type Safety**: Refactored code to eliminate ESLint `any` warnings and ensure robust type definitions.
- **Swagger Security**: Interactive documentation now includes "Authorize" functionality for Bearer Tokens.

> **Note:** To test the most advanced version of this API with all security features active, please **switch to the `feature/authentication` branch**.

---

##### Author Irene V. Sahun - GitHub: isahun 

##### Created as part of the IT Academy Frontend BootCamp.