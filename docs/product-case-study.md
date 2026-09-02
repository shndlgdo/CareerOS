# CareerOS — Product Case Study

## Overview

CareerOS is a personal career operating system designed to connect everyday execution with long-term professional proof.

The core premise is simple: the information needed for a resume, interview, portfolio, performance review, or promotion conversation already exists in day-to-day work—but it is usually scattered across tools and difficult to reconstruct later.

CareerOS creates a structured path from **work happening now** to **evidence that can be reused later**.

## Problem

Career information is fragmented across task managers, calendars, documents, messages, screenshots, notes, and memory.

Most tools optimize for a single moment:

- task managers help you finish work;
- calendars help you attend meetings;
- note apps help you capture information;
- resumes summarize the past.

What is missing is the connective layer between them.

The product question became:

> How might a career system capture the context and evidence around everyday work without making the user maintain another heavy database?

## Product principle

**Capture close to the moment. Reuse when it matters.**

The system is designed around:

**Plan → Work → Capture → Reflect → Build Proof → Reuse**

A project can contain tasks and meetings. A completed initiative can produce a win. A win can contain measurable impact. That evidence can later become a resume bullet, interview story, portfolio case, or review input.

## Information architecture

CareerOS currently organizes the product into:

- **Home** — current priorities and quick capture
- **Tasks** — active execution
- **Meetings** — meeting context and future action items
- **Projects** — larger bodies of work
- **Impact** — wins and measurable outcomes
- **Brand HQ** — professional positioning and reusable language
- **Vault** — resources and assets
- **Archive** — inactive records that should remain recoverable
- **Settings** — product/data controls

The architecture deliberately separates **activity** from **proof**. Completing a task is not automatically a career achievement; the user decides which outcomes are worth preserving.

## UX decisions

### Empty by default

CareerOS ships without fabricated dashboard data. The product should demonstrate its value through the user's real records rather than a polished but misleading demo state.

### Meetings are not calendar events

A calendar captures time. CareerOS is intended to capture the meaning around that time: notes, decisions, attendees, follow-ups, and relationships to projects.

### Archive is different from delete

Career information is often useful later. Archive removes records from the active workspace while preserving their future value.

### Impact is designed for scanning

Key metrics are presented as horizontal scorecards so results can be understood quickly, rather than buried in a vertically stacked activity feed.

### The home screen is a command center

Home prioritizes what matters now rather than trying to expose every record in the system at once.

## Prototype → production workflow

The first version was developed as a rapid product prototype in ChatGPT Sites. That environment was useful for testing product structure, flows, layouts, and interaction requirements without prematurely committing to backend architecture.

After the product model stabilized, the project moved into GitHub as a Next.js / TypeScript application.

This separation allowed the project to answer product questions before engineering questions.

## Technical direction

Current:

- Next.js 16
- React 19
- TypeScript
- custom CSS system
- localStorage persistence

Next:

- Supabase Auth
- Postgres-backed user records
- relational project/task/meeting/win data
- deployment on Vercel

Future integrations may include Calendar, Gmail, Google Drive, and meeting transcripts.

## AI-assisted development

AI is used as an implementation and iteration partner across prototyping, code generation, QA, documentation, and product exploration.

The product concept, prioritization, information architecture, requirements, UX decisions, evaluation, and final direction remain human-owned.

The project is intentionally documented this way because the goal is not to present AI-assisted work as manually typed code. The value demonstrated is the ability to define a useful product, direct the build, make tradeoffs, evaluate outputs, and move from idea to working software.

## Next product milestone

The next major milestone is replacing local browser persistence with authenticated Supabase data while maintaining the existing user experience.
