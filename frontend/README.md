# RCAEMS — Rotaract Attendance & Event Management System

A premium, dark glass-morphic web console built for the **Rotaract Club of Atria IT** — one codebase serving two portals: an **Admin console** (dashboard, live attendance/QR check-in, event management, member directory, reports) and a **Member portal** (personal QR ID, attendance ring, RSVPs, profile, badges).

Implemented from the RCAEMS Claude Design project (`RCAEMS.dc.html` / `Sidebar.dc.html`) as a real, running Next.js application — not a static mockup.

## Stack

| Layer              | Choice                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Framework          | [Next.js 16](https://nextjs.org) (App Router, Turbopack) + TypeScript                             |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com) with a custom RCAEMS design-token theme                |
| UI components      | [shadcn/ui](https://ui.shadcn.com) (Radix primitives)                                             |
| Icons              | [lucide-react](https://lucide.dev)                                                                |
| Charts             | [Recharts](https://recharts.org)                                                                  |
| Tables             | [TanStack Table](https://tanstack.com/table) v8                                                   |
| Forms & validation | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)                           |
| State              | [Zustand](https://zustand-demo.pmnd.rs) (persisted session + app data)                            |
| Data fetching      | [TanStack Query](https://tanstack.com/query) (provider wired in; ready for a real API)            |
| Notifications      | [Sonner](https://sonner.emilkowal.ski)                                                            |
| Dates              | [date-fns](https://date-fns.org)                                                                  |
| Theming            | [next-themes](https://github.com/pacocoursey/next-themes) (dark by default; light theme included) |
| Tooling            | ESLint (flat config), Prettier + `prettier-plugin-tailwindcss`, Husky + lint-staged               |

> **Note:** TanStack Table is pinned to the stable **v8** API (`useReactTable`/`getCoreRowModel`). v9 shipped as a ground-up rewrite with a different "features" architecture; v8 was the safer, well-documented choice for this build.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in from the login screen — pick **Admin portal** or **Member portal**, any username/password works (it's a seeded demo, no backend).

- **Admin demo persona:** Ananya Rao · President
- **Member demo persona:** Rohan Mehta · Secretary

Other scripts:

```bash
npm run build        # production build
npm run lint          # eslint
npm run format         # prettier --write
npm run format:check    # prettier --check
```

A Husky `pre-commit` hook runs `lint-staged` (ESLint + Prettier) on staged files.

## Structure

```
src/
  app/
    page.tsx                 # Login (portal picker, RHF+Zod, password toggle)
    (admin)/                 # Admin shell + guard (portal === "admin")
      admin/                 # Dashboard — stats, charts, live counter, calendar, FAB
      attendance/             # QR/Scanner/Manual/Self check-in tabs, live log
      events/                  # Filterable event grid + Create Event dialog
      members/                  # TanStack Table directory + Add Member dialog
      reports/                   # Analytics, skeleton-loading reload, PDF export
    (member)/                # Member shell + guard (portal === "member")
      me/                      # Home — attendance ring, QR ID, RSVPs, achievements
      profile/                  # Hero, stats, editable details, badges, timeline
      my-attendance/, browse-events/   # Coming-soon placeholders
    (shared)/                # Routes shared by both portals (adaptive sidebar)
      certificates/, notifications/, settings/
  components/
    layout/                  # Sidebar, bottom nav, topbar, shells, session guard
    charts/                  # Recharts wrappers (attendance trend, growth)
    dashboard/               # Mini calendar, quick-action FAB
    ui/                      # shadcn/ui primitives
    qr-code.tsx              # Deterministic decorative QR generator
  lib/
    data.ts                  # Seed data (members, events, reports, nav)
    store/                   # Zustand stores (auth session, app data — persisted)
```

## Design system

Colors, type and layout follow the RCAEMS source design 1:1, expressed as CSS custom properties in `src/app/globals.css` and mapped into Tailwind's `@theme`:

- **Background** `#0B0B0B` · **Surface** `#161616`
- **Accent** `#9E1B47` (deep burgundy) → **Hover** `#C1275A`
- **Gold** `#E7C063` (champagne accent)
- **Display font** Poppins · **Body font** Inter
- 20–24px card radii, frosted-glass panels (`backdrop-blur` + translucent borders)

The 8 screens from the source mockup (Login, Admin Dashboard, Attendance/QR, Event Management, Members, Reports, Member Dashboard, Profile) are real, responsive, interactive routes — not fixed-width desktop/mobile frames. Each is genuinely responsive: a persistent sidebar on desktop collapses to a bottom nav on mobile.

## What's real vs. demo

Everything is client-side and seeded — there's no backend. Login accepts any credentials, and these are **fully functional**:

- Live-ticking attendance counter, animated QR scanner, simulated check-ins
- Create Event / Add Member dialogs (persisted to `localStorage` via Zustand)
- Sortable/searchable member table, filterable event grid
- RSVP toggle, editable member profile, Reports "Reload" skeleton state
- "Export PDF" triggers the browser print dialog with print-safe styling

Certificates, Notifications and Settings are wired into navigation but intentionally show a "coming soon" state — they weren't part of the 8 designed screens.
