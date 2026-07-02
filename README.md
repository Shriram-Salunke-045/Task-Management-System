# 📋 Task Management System

A full-stack Task Management System built using Node.js, Express.js, MySQL, Sequelize, React, and JWT Authentication.

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt

### Authorization
- Role-Based Access Control (Admin/User)

### Task Management
- Create Task
- View Tasks
- Update Task
- Delete Task
- Assign Multiple Users to Tasks

### Dashboard
- Total Users
- Total Tasks
- Completed Tasks
- Pending Tasks

### Activity Logs
- Track Task Creation
- Track Updates
- Track User Assignment

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT
- bcrypt

## Frontend
- React
- Vite
- Axios
- Bootstrap
- React Router

---

# 📂 Project Structure

```
Task-Management-System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── app.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── components
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Task-Management-System.git
```

## Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/task_manager
JWT_SECRET=your_secret_key
```

Run:

```bash
npm start
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard |

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/tasks |
| GET | /api/tasks/:id |
| POST | /api/tasks |
| PUT | /api/tasks/:id |
| DELETE | /api/tasks/:id |
| POST | /api/tasks/:id/assign |

---

# 🔐 Roles

### Admin

- Manage Users
- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Users

### User

- Login
- View Tasks
- Update Assigned Tasks

---

# 📸 Screenshots

Add screenshots here:

- Login Page
- Dashboard
- Task List
- Create Task
- Activity Logs

---

# 👨‍💻 Author

**Ram Shriram Salunke**

M.Tech (Computer Science & Information Security)

COEP Technological University
