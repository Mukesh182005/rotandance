# Rotaract Club Management System (RCAEMS)

Enterprise Attendance, Event, and Member Management System for Rotaract Club of Atria IT.

## Architecture

- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS, TanStack Query, Zustand)
- **Backend**: NestJS (TypeScript, Prisma ORM, PostgreSQL/Supabase, Redis, Passport JWT)
- **Database**: PostgreSQL (Supabase)
- **Storage**: Cloudinary & Google Drive

## Quick Start

### 1. Install Dependencies & Run Development Mode

Run both Frontend and Backend concurrently from the root directory:

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

## Folder Structure

```
Rotaract-Club-Management-System/
├── frontend/                # Next.js Frontend
├── backend/                 # NestJS Backend
├── docs/                    # Architecture, API & User Documentation
├── database/                # ER Diagrams, SQL Scripts & Backups
├── docker/                  # Docker & Nginx Configurations
├── scripts/                 # Utility Automation Scripts
├── .github/                 # GitHub Actions Workflows
├── storage/                 # Local Media Storage
├── docker-compose.yml
└── package.json             # Workspace Script Launcher
```
