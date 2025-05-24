# 🎯 GoalTracker – Smart Personal & Public Goal Management Tool

GoalTracker is a full-stack application built with **NestJS**, **Angular**, and **MongoDB** that allows users to create, manage, and share hierarchical goals with deadlines and visibility controls.

---

## 🚀 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Frontend Framework:** Angular (to be implemented)
- **Documentation:** Swagger UI
- **Dev Tools:** Docker + Docker Compose

---

## 🛠 Features

### ✅ Core Features

- JWT-based **authentication** (`/auth/register`, `/auth/login`)
- **Hierarchical goals** with 2-level nesting (root > child > sub-child not allowed)
- Full **CRUD operations** on goals
- Toggle goals as **public or private**
- Auto-generated **public share links**
- **Browse** all public goals (`/public-goals`)
- **View** a shared goal and its children by public link (`/public-goals/:publicId`)
- Global **input validation** with `class-validator`
- Interactive **Swagger docs** at `/api`

### ✨ Bonus Features

- Swagger for auto-documentation
- DTOs for cleaner request validation
- Docker support (optional)

---

## 📦 Installation

```bash
git clone https://github.com/seifhassan/goal-tracker-backEnd.git
cd goal-tracker
npm install
