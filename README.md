# 🛒 Ecommerce CMS Backend

This is the **backend service** for the React Ecommerce CMS project.  
It provides secure **REST APIs** to manage users, products, orders, banners, feedback, and analytics for the ecommerce system.  
The backend integrates with **MongoDB** for data persistence and **Firebase Storage** for product image storage.

## 🚀 Features

- **Authentication & Authorization**
    - Admin login with JWT-based authentication.
    - Role-based access control for protected routes.

- **User Management**
    - CRUD operations for users.
    - Track new user registrations.

- **Product Management**
    - CRUD operations for products.
    - Store product images in **Firebase Storage**.

- **Transaction Management**
    - Record and manage customer orders.
    - Track new and completed transactions.

- **Banner Management**
    - Upload and manage promotional banners.

- **Feedback Management**
    - Collect and view customer feedback.

- **Analytics**
    - Monthly revenue statistics.
    - Total products sold.
    - New users count.
    - Latest transactions.

## 🧰 Tech Stack

- **Node.js + Express.js** – Backend framework
- **MongoDB + Mongoose** – Database
- **Firebase Storage** – Image storage
- **JWT (JSON Web Tokens)** – Authentication
- **bcrypt.js** – Password hashing
- **Cors & Helmet** – Security  