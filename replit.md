# Threadit

A full-stack Reddit-style social platform where users can post, comment, vote, join communities, and interact with each other.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API server on port 5000
- `pnpm --filter @workspace/reddit-app run dev` — React frontend on `$PORT`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/scripts run seed` — seed sample data into the DB
- Required env: `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SESSION_SECRET`
- Frontend env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Wouter + TanStack Query + shadcn/ui + Tailwind CSS
- API: Express 5, Pino logging
- Auth: Supabase Auth (JWT verify in middleware, local user upsert)
- DB: Replit PostgreSQL + Drizzle ORM (NOT Supabase DB)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec → React Query hooks)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/reddit-app/` — React frontend
- `artifacts/api-server/` — Express backend
- `lib/db/src/schema/` — Drizzle table definitions + relations (source of truth)
- `lib/api-spec/` — OpenAPI spec + Orval codegen config
- `lib/api-client-react/` — generated React Query hooks (do not edit manually)
- `scripts/src/seed.ts` — sample data seeder

## Architecture decisions

- **Supabase Auth only**: Supabase is used exclusively for authentication (JWT). The database is Replit PostgreSQL accessed via Drizzle. Auth middleware verifies JWT with Supabase service key and upserts local user record.
- **Contract-first API**: OpenAPI spec in `lib/api-spec/` drives `orval` codegen. All client API calls use generated hooks from `@workspace/api-client-react`.
- **Relational queries use plain joins**: After discovering Drizzle relational `orderBy` with `sql` templates causes errors in v0.45, comments use `db.select().leftJoin()` instead of `db.query`.
- **Dark mode default**: ThemeContext uses localStorage + `class` strategy on `<html>`. Primary brand color is orange (HSL 16 100% 55%).
- **Login/Register outside Layout**: Auth pages render without the sidebar/nav layout for a clean centered experience.

## Product

- Home feed with Hot/New/Top/Rising sort tabs
- Communities with join/leave, per-community post feed, creation
- Posts (text, image, link) with upvote/downvote, save, report, delete
- Nested comments with voting, reply threading, edit/delete
- User profiles with karma, post history, follow/unfollow
- Search across posts, communities, and users
- Notifications (post comments, replies, upvotes)
- Saved posts page
- Settings page for profile editing
- Admin dashboard with stats, user management, post moderation, report handling

## User preferences

- Dark mode by default
- Orange brand color throughout

## Gotchas

- Do NOT use `sql` template tags inside Drizzle `db.query` relational `orderBy` — use plain column expressions or switch to `db.select().join()` pattern.
- Comments router uses `mergeParams: true` and is mounted at both `/posts/:postId/comments` and `/comments`.
- `SUPABASE_URL` secret may be just the project ref; auth middleware constructs the full URL with `https://${ref}.supabase.co` if no `https://` prefix.
- Seed users have `supabaseId: "seed-user-X"` and cannot log in via Supabase auth — they're display data only.
- Run `pnpm --filter @workspace/db run push` before `seed` after schema changes.

## Pointers

- See `.local/skills/pnpm-workspace` for workspace structure, TypeScript setup, and package details
- See `.local/skills/react-vite` for Vite frontend conventions
