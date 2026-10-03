# AI Resource Library for TMAHS

A curated library of research-grounded AI resources for the educators of Thurgood Marshall Academic High School: practical tools, ethical frameworks, and project-based learning templates, with a path of short courses that help teachers bring AI into PBL classrooms on their own terms.

## What's inside

| Area | Where it lives |
|------|----------------|
| Introductions: what AI is, and why it matters for teaching | `src/pages/WhatIsAI.tsx`, `src/pages/WhyAIMatters.tsx` |
| Prompt engineering | `src/pages/PromptEngineering.tsx` |
| Classroom resources | `src/pages/ClassroomResources.tsx` |
| Ethics | `src/pages/ethics/` |
| Learning Studio | `src/pages/LearningStudio.tsx` |
| Community board, backed by a `moderate-content` edge function | `src/pages/Community.tsx`, `src/components/community/` |
| Certificates and certificate verification | `src/pages/Certificate.tsx`, `src/pages/Verify.tsx` |
| Sign-in and an admin area | `src/pages/Auth.tsx`, `src/pages/admin/` |

## The course framework

[`COURSE_EXPECTATIONS.md`](COURSE_EXPECTATIONS.md) lays out the micro-courses: ten short courses in three tiers, each tier ending in something a teacher actually uses.

1. **AI Classroom Constitution**: the classroom context and project architecture that make every later prompt specific.
2. **A complete PBL unit**, built on that constitution.
3. **A classroom AI policy**: norms and activities for student AI use.

The document gives each course its learning outcome, deliverable, checks for understanding, and the misconceptions it addresses.

## Tech stack

- React and TypeScript on Vite
- Tailwind CSS with shadcn/ui components
- Supabase: SQL migrations in `supabase/migrations/` and edge functions in `supabase/functions/` (`moderate-content`, `search-assistant`)
- Built with [Lovable](https://lovable.dev): edits made there land here as commits, and commits pushed here sync back

## Running locally

Requires Node.js and npm.

```sh
npm install
npm run dev       # dev server with hot reload
npm run build     # production build into dist/
npm run lint
npm run preview   # serve the production build
```

## Project layout

```
src/pages/        one file per page
src/components/   shared components, the community board, and shadcn/ui primitives
supabase/         project config, edge functions, and database migrations
docs/             voice guide and planning notes
public/           static assets
```
