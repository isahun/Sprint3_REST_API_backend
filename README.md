# Books API – Role-Based Authorization (Sprint 3.08)

This branch introduces **Role-Based Access Control (RBAC)** to the Books API. While the previous sprint focused on *Authentication* (who you are), this sprint focuses on *Authorization* (what you are allowed to do).

We have implemented a dual-layer security system where users are assigned roles that determine their permissions within the library system.

---

## 🔐 Authorization Features

- **Role-Based Access Control (RBAC)**: Users now have a `roles` property (stored as an array in MongoDB).
- **Custom `@Roles` Decorator**: A metadata-driven approach to specify which roles are required for each API endpoint.
- **RolesGuard**: A global-ready guard that intercepts requests, checks the user's roles against the route metadata, and grants or denies access.
- **Route Protection**: 
  - **Public/User Access**: `GET /books` and `GET /books/:id` remain accessible to everyone or authenticated users.
  - **Admin Access Only**: `POST`, `PUT`, and `DELETE` operations are strictly restricted to users with the **ADMIN** role.

---

## 👥 Demo Credentials & Testing

To test the different permission levels, you can use the following pre-configured account (if using the provided database) or register a new one:

### **Admin Account (Full Access)**
- **Username:** `adminuser`
- **Password:** `adminpass`
- **Privileges:** Can Create, Update, and Delete books.

### **Testing "403 Forbidden"**
1. Register a new user via `/auth/register`. By default, all new users are assigned the `USER` role.
2. Log in to get a JWT token.
3. Try to `DELETE` a book via Swagger or Postman. You will receive a **403 Forbidden** response because a regular user lacks Admin permissions.

---

## 🧠 Technical Implementation

- **Enum-based Roles**: We used a TypeScript `enum` for `UserRole` (ADMIN/USER) to avoid "magic strings" and ensure consistency across the app.
- **Manual Admin Promotion**: For security reasons, there is no public "Register as Admin" endpoint. Promotion must be done manually via database administration (e.g., MongoDB Compass).
- **Refined Guards**: The `RolesGuard` works in tandem with our `JwtAuthGuard`. It extracts the user object from the request (injected by Passport) and verifies the `roles` array.
- **ESLint Compliance**: All decorators and guards have been written to avoid "unsafe-call" or "any" warnings, maintaining 100% type safety.

---

## 🛠 How to Manually Promote a User to Admin  

If you want to promote a standard user to Administrator:  
1. Open **MongoDB Compass** and connect to your cluster.  
2. Find the user document in the `users` collection.  
3. Edit the `roles` array: change `["user"]` to `["admin"]`.  
4. The user must log in again (or provide a new token) to reflect the changes in the `RolesGuard`.  

---

## 📂 Project Structure Changes
    
- `src/auth/decorators/roles.decorator.ts`: Custom metadata decorator.
- `src/auth/guards/roles.guard.ts`: The authorization logic.
- `src/users/schemas/user.schema.ts`: Updated with `roles` property and `UserRole` enum.
- `src/books/books.controller.ts`: Secured with `@Roles(UserRole.ADMIN)`.

---

**Author**: Irene V. Sahun  
**GitHub**: [isahun](https://github.com/isahun)  
*Sprint 3 - Authorization - Frontend Bootcamp - IT Academy.*
