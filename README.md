# Books API – OAuth 2.0 & Role-Based Authorization (Sprint 3.09)

This branch represents the final stage of the Security Sprint. It combines **Role-Based Access Control (RBAC)** with external identity providers using **OAuth 2.0 (Google)**. The goal is to provide a flexible and secure authentication system.

---

## 🔐 Key Security Features

### 1. External Authentication (OAuth 2.0)
- **Google Integration**: Users can now sign in using their Google accounts via `passport-google-oauth20`.
- **Google Strategy**: A custom strategy handles the redirection, validation, and safe extraction of user profiles.
- **Data Safety**: Implemented with strict TypeScript types (`Profile`) to ensure safe access to Google's nested data (emails, photos, etc.).

### 2. Role-Based Access Control (RBAC)
- **Authorization Guards**: A specialized `RolesGuard` ensures that authenticated users can only access resources permitted by their assigned roles.
- **Custom Decorators**: Using `@Roles()`, we declare required permissions directly on the controller endpoints.
- **Hierarchical Access**: 
  - **Public/User**: Browsing and viewing books.
  - **Admin**: Exclusive rights to Create, Update, and Delete.

---

## 🛠 Setup & Environment Variables

To run the Google OAuth flow, you must configure the following variables in your `.env` file:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 👥 Testing & Demo

### **Option A: Google Login (Social)**
1. Navigate to: `http://localhost:3000/auth/google`.
2. Log in with your Google Account.
3. Upon success, you will be redirected to the callback route, displaying your profile data as JSON.

### **Option B: Local Admin Login (RBAC)**
- **Username:** `adminuser`
- **Password:** `adminpass`
- **Privileges:** Use this token to test `POST`, `PUT`, and `DELETE` on `/books`.

---

## 🧠 Technical Implementation

- **Type-Safe Strategy**: The `GoogleStrategy` is designed to avoid `any` types. It validates the existence of environment variables before initializing the `super()` call and uses the `Profile` interface for data extraction.
- **Modular Security**: Authentication (Passport) and Authorization (Guards) work as independent layers. The `JwtAuthGuard` identifies the user, and the `RolesGuard` decides their fate.
- **Fail-Safe Mechanism**: Implemented **Optional Chaining** (`?.`) when accessing external profile data to prevent server crashes if certain Google fields are missing.

---

## 📂 Project Structure Changes

- `src/auth/google.strategy.ts`: Logic for Google OAuth authentication and profile extraction.
- `src/auth/guards/roles.guard.ts`: Interceptor that validates user roles for protected routes.
- `src/auth/decorators/roles.decorator.ts`: Metadata decorator for route authorization.
- `src/auth/auth.controller.ts`: Added `/auth/google` and `/auth/google/callback` endpoints.
- `src/users/schemas/user.schema.ts`: Expanded to support the `roles` property and `UserRole` enum.

---

**Author**: Irene V. Sahun  
**GitHub**: [isahun](https://github.com/isahun)  
*Sprint 3 - Advanced Security & OAuth - IT Academy.*