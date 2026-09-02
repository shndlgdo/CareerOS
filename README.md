# CareerOS

**Your career, remembered.**

CareerOS is a private career operating system for day-to-day work, meetings, projects, impact, career proof, resources, and professional positioning.

This repository rebuilds the CareerOS Sites prototype as a maintainable Next.js application.

## Current build

The first GitHub build intentionally starts with **no demo or placeholder records**.

Included now:

- Home command center
- Working task completion checkboxes
- Dedicated Tasks page
- Dedicated Meetings page and `All meetings` path from Home
- Projects page
- Impact dashboard with horizontal scorecards
- Win capture
- Archive and restore behavior
- Remove/delete controls
- Brand HQ foundation
- Vault foundation
- Settings and local reset
- Responsive desktop/mobile app shell
- Browser persistence with `localStorage` while the backend is being connected

## Product loop

**Plan → Work → Capture → Reflect → Build Proof → Reuse**

## Stack

- Next.js 16 / App Router
- React 19
- TypeScript
- CSS design system
- Supabase planned as the persistent backend
- Vercel-ready structure

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

```text
/
/tasks
/meetings
/projects
/impact
/brand
/vault
/archive
/settings
```

## Data behavior right now

V1.1 stores records in the browser so the interface can be used immediately without seeded content or backend credentials. This is deliberately temporary.

The next backend slice will replace browser persistence with Supabase Auth + Postgres while preserving the interface and user-entered data model.

## Next build slice

1. Connect Supabase authentication and persistent user-owned records.
2. Add project detail views and project-linked tasks/meetings/wins.
3. Add meeting notes, decisions, attendees, and action items.
4. Add KPI history and richer career-proof flags.
5. Add Weekly Review and reflection.
6. Add Opportunities / Interview Mode.
7. Add integrations for Calendar, Gmail, Drive, and meeting transcripts.

## Privacy principle

CareerOS is designed to be private by default. Secrets and environment files are excluded from Git through `.gitignore`; never commit Supabase service keys or other private credentials.
