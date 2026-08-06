# Rotaract Club Management System (RCAEMS)

Enterprise Attendance, Event, and Member Management System for Rotaract Club of Atria IT.

---

## 🛠 Tech Stack & Deployment Architecture

| Layer | Recommended Platform / Tool | Details |
| :--- | :--- | :--- |
| **Frontend Hosting** | ⭐ **Vercel** | Next.js 16 (App Router, Tailwind CSS, TanStack Query, Zustand) |
| **Backend Hosting** | **Render (Free Tier)** | NestJS Backend API (TypeScript, Prisma ORM, Passport JWT) |
| **Database** | ⭐ **Supabase** | PostgreSQL Database + Connection Pooling |
| **Storage** | ⭐ **Supabase Storage** & **Cloudinary** | Images, Media Optimization & Documents |
| **Authentication** | ⭐ **Supabase Auth** & **Passport JWT** | Authentication & RBAC Access Control |

---

## 🚀 Quick Start (Local Development)

### 1. Run Development Mode
Run both Frontend and Backend concurrently from the root workspace directory:

```bash
npm run dev
```

- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:4000/api/v1`

### 2. Environment Setup

Copy `.env.example` to `backend/.env` and `frontend/.env.local`:

```bash
cp .env.example backend/.env
cp .env.example frontend/.env.local
```

---

## 📁 Directory Structure

```
rotandance/
├── frontend/                # Next.js 16 Frontend
├── backend/                 # NestJS Backend API
├── docs/                    # Architecture, API & Security Docs
├── database/                # ER Diagrams, SQL Scripts & Backups
├── docker/                  # Docker & Nginx Configurations
├── scripts/                 # Utility Automation Scripts
├── .github/                 # GitHub Actions CI/CD Workflows
├── storage/                 # Local Media Storage
├── docker-compose.yml       # Container Orchestration
└── package.json             # Workspace Script Launcher
```
