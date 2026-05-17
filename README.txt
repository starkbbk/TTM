# 🚀 Team Task Manager

A **full-stack collaborative team task management application** where users can create projects, assign tasks, manage team members, and track progress — similar to Trello or Asana.

> **🌐 Live Demo:** [https://teamtaskmanager-production-starkbbk.up.railway.app](https://teamtaskmanager-production-starkbbk.up.railway.app)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Local Setup](#-local-setup)
- [Deployment (Railway)](#-deployment-railway)
- [Environment Variables](#-environment-variables)

---

## ✨ Features

### 🔐 Authentication
- User **Signup** with Name, Email, Password & Role selection (Admin/Member)
- Secure **Login** with JWT token-based authentication
- Passwords hashed using **bcryptjs** with salt rounds
- Protected routes — unauthorized users redirected to login

### 📁 Project Management
- **Create** new projects (creator becomes Admin automatically)
- **Edit** & **Delete** projects (Admin only)
- **Add members** by email (Admin only)
- **Remove members** from project (Admin only)
- Members can view all projects they belong to

### ✅ Task Management
- **Create tasks** with Title, Description, Due Date, Priority (Admin only)
- **Assign tasks** to project members
- **Update task status**: `To Do` → `In Progress` → `Done`
- **Edit** & **Delete** tasks (Admin only)
- **Priority levels**: Low, Medium, High
- **Overdue detection** — tasks past due date are highlighted

### 🔒 Role-Based Access Control
| Permission | Admin | Member |
|---|---|---|
| Create/Edit/Delete Project | ✅ | ❌ |
| Add/Remove Members | ✅ | ❌ |
| Create/Edit/Delete Tasks | ✅ | ❌ |
| Update Task Status | ✅ | ✅ (assigned tasks) |
| View Project & Tasks | ✅ | ✅ |

### 📊 Dashboard & Analytics
- **Dashboard** — Project overview, interactive task distribution bars, team members, overdue count, completion rate
- **Interactive Stat Boxes** — Clickable stats (`Pending`, `Overdue`, `Done`) that instantly filter tasks on navigation
- **Analytics** — Task distribution chart, completion rate circle, stat cards
- **All Tasks View** — Table of all tasks across all projects with status/priority badges and filters

### 🎨 UI/UX
- Modern **glassmorphism** design with rich gradients and warm amber accents
- **Dark/Light mode** toggle with smooth circle transition animation
- **Responsive layout** — fully optimized for desktop, tablet, and mobile
- Toast notifications for all actions
- Polished loading states and tailored empty states

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **Deployment** | Railway |
| **Other** | Axios, React Router, Lucide Icons, React Hot Toast, date-fns |

---

## 📂 Project Structure

```
Team-Task-Manager/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── hero.png                 # Auth page hero image
│   │   └── vite.svg                 # Favicon
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js             # Axios instance & API functions
│   │   ├── components/
│   │   │   ├── Modal.jsx            # Reusable modal component
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── Sidebar.jsx          # Left sidebar navigation
│   │   │   └── TaskCard.jsx         # Task card with status/actions
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state management
│   │   │   └── ThemeContext.jsx     # Dark/Light mode state
│   │   ├── pages/
│   │   │   ├── Analytics.jsx        # Analytics & charts page
│   │   │   ├── Dashboard.jsx        # Main dashboard
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── ProjectDetail.jsx    # Single project view (tasks, members)
│   │   │   ├── Projects.jsx         # All projects list
│   │   │   ├── Signup.jsx           # Signup page with role selection
│   │   │   └── Tasks.jsx            # All tasks table view
│   │   ├── App.jsx                  # Routes & layout
│   │   ├── index.css                # Global styles
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── prisma/
│   │   ├── migrations/              # Database migration files
│   │   │   └── 20240101000000_init/ # Initial migration
│   │   └── schema.prisma            # Database schema
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js    # Signup, Login, GetMe
│   │   │   ├── projectController.js # CRUD Projects, Members
│   │   │   ├── taskController.js    # CRUD Tasks, Status updates
│   │   │   └── dashboardController.js # Dashboard statistics
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification middleware
│   │   │   └── roleCheck.js         # Admin/Member role enforcement
│   │   ├── routes/
│   │   │   ├── auth.js              # Auth routes
│   │   │   ├── projects.js          # Project routes
│   │   │   ├── tasks.js             # Task routes
│   │   │   └── dashboard.js         # Dashboard routes
│   │   ├── lib/
│   │   │   └── prisma.js            # Prisma client singleton
│   │   └── index.js                 # Express app entry point
│   ├── .env.example
│   └── package.json
│
├── railway.toml                     # Railway deployment config
├── package.json                     # Root scripts (build, start)
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

```
┌──────────────┐       ┌────────────────┐       ┌──────────────┐
│     User     │       │ ProjectMember  │       │   Project    │
├──────────────┤       ├────────────────┤       ├──────────────┤
│ id (PK)      │◄──────│ userId (FK)    │       │ id (PK)      │
│ name         │       │ email (UQ)     │       │ description  │
│ password     │       │ role           │       │ ownerId (FK) │
│ role         │       │ joinedAt       │       │ createdAt    │
│ createdAt    │       └────────────────┘       │ updatedAt    │
│ updatedAt    │                                └──────────────┘
└──────────────┘       ┌──────────────┐                │
       │               │    Task      │                │
       │               ├──────────────┤                │
       └──────────────►│ id (PK)      │                │
                       │ assigneeId   │                │
                       │ projectId    │◄───────────────┘
                       │ title        │
                       │ description  │
                       │ priority     │
                       │ status       │
                       │ dueDate      │
                       │ createdAt    │
                       │ updatedAt    │
                       └──────────────┘

Roles: ADMIN, MEMBER
Priorities: LOW, MEDIUM, HIGH
Statuses: TODO, IN_PROGRESS, DONE
```

---

## 🔌 API Endpoints

### Auth (Public)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register new user (name, email, password, role) |
| `POST` | `/api/auth/login` | Login (email, password) → JWT token |
| `GET` | `/api/auth/me` | Get current logged-in user profile |

### Projects (Protected — requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Get all projects for current user |
| `POST` | `/api/projects` | Create new project (creator = Admin) |
| `GET` | `/api/projects/:id` | Get project details with members & tasks |
| `PUT` | `/api/projects/:id` | Update project name/description (Admin) |
| `DELETE` | `/api/projects/:id` | Delete project and all tasks (Admin) |
| `POST` | `/api/projects/:id/members` | Add member by email (Admin) |
| `DELETE` | `/api/projects/:id/members/:userId` | Remove member (Admin) |

### Tasks (Protected — requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks/project/:projectId` | Get all tasks for a project |
| `POST` | `/api/tasks/project/:projectId` | Create task (Admin) |
| `PUT` | `/api/tasks/:taskId` | Update task (status, details) |
| `DELETE` | `/api/tasks/:taskId` | Delete task (Admin) |

### Dashboard (Protected — requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Get stats (projects, tasks by status, overdue) |
| `GET` | `/api/health` | Server health check |

---

## 🖼️ Screenshots

> Visit the live demo to see all pages in action:  
> **[https://teamtaskmanager-production-starkbbk.up.railway.app](https://teamtaskmanager-production-starkbbk.up.railway.app)**

**Pages:**
- 🔑 **Signup** — Role selection (Admin/Member), premium glassmorphism form
- 🔐 **Login** — Email & password authentication with success animation
- 📊 **Dashboard** — Stats, projects, interactive task distribution, clickable stat boxes
- 📁 **Projects** — Grid view of all projects with member/task count
- 📝 **Project Detail** — Members list, task board with filters, CRUD
- 📋 **Tasks** — Table view of all tasks across projects with priority badges
- 📈 **Analytics** — Charts, completion rate, task distribution

---

## 💻 Local Setup

### Prerequisites
- **Node.js** 18+ installed
- **PostgreSQL** database running (local or cloud)

### Step 1 — Clone
```bash
git clone https://github.com/starkbbk/TTM.git
cd TTM
```

### Step 2 — Install Dependencies
Run the root install script to automatically install dependencies for root, server, and client:
```bash
npm run install:all
```

### Step 3 — Environment Configuration
Create `server/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/team_task_manager"
JWT_SECRET="your-super-secret-key-here"
PORT=5000
FRONTEND_URL="http://localhost:5173"
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### Step 4 — Database Setup & Start Server
Open a terminal and start the backend server:
```bash
cd server
npx prisma db push
npm run dev
# Server runs on http://localhost:5000
```

### Step 5 — Start Frontend
Open a second terminal and start the React frontend:
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

Visit **http://localhost:5173** in your browser to explore the app!

---

## 🚢 Deployment (Railway)

This application is fully optimized for seamless deployment on **Railway** as a monolith — the Express server serves both the API endpoints and the static React frontend build.

### Steps:
1. Push your repository to GitHub (`https://github.com/starkbbk/TTM.git`).
2. Create a new project on **Railway**.
3. Add the **PostgreSQL** plugin from the Railway dashboard.
4. Add a new service → Connect your GitHub repository.
5. Set the following **Environment Variables** in your Railway service settings:

| Variable | Value |
|---|---|
| `DATABASE_URL` | *Auto-provided by Railway PostgreSQL plugin* |
| `JWT_SECRET` | Any strong random string |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Railway app URL |

6. Railway automatically detects `railway.toml` and executes the root scripts:
   - **Build (`npm run build`):** Installs all dev/prod dependencies and builds both client and server.
   - **Start (`npm start`):** Automatically applies database migrations (`npx prisma db push`) and starts the Express server (`node src/index.js`).

7. Done! Your app is live. 🎉

---

## 🔑 Environment Variables

### Server (`server/.env`)
| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens |
| `PORT` | ❌ | Server port (default: 5000) |
| `NODE_ENV` | ❌ | `development` or `production` |
| `FRONTEND_URL` | ❌ | Frontend URL for CORS |

### Client (`client/.env`)
| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ❌ | Backend URL (empty in production = same origin) |

---

## 👨‍💻 Author

**StarKBBK** — [GitHub](https://github.com/starkbbk)

---

## 📄 License

MIT License — free to use, modify, and distribute.
