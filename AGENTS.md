<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands (exact)
- Dev: `npm run dev` (Next 16.2.6, React 19)
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint` (ESLint 9, `eslint-config-next`)
- Test: `npm run test` (Vitest 4, jsdom, setup `tests/setup.ts`, alias `@/*` -> repo root)
- DB: `npm run db:generate` / `npm run db:push` / `npm run db:studio` (Drizzle Kit)

## Architecture (repo-specific)
- App Router: `app/` (`layout.tsx`, `page.tsx`, `provider.tsx`, `api/`, `dashboard/`, `workspace/`, `sign-in/`, `sign-up/`)
- Auth: Clerk. `proxy.ts` uses `clerkMiddleware` protecting `"/dashboard/:path*"` and `"/dashboard"` (matcher skips static/_next; runs on `/api/(.*)`). If Clerk keys missing, middleware falls back to `NextResponse.next()` and `app/layout.tsx` skips `ClerkProvider`.
- DB: Neon Postgres via `@neondatabase/serverless` + Drizzle ORM. Schema in `db/schema.ts` (tables: `users`, `projects` (unique `projectId`/`projectName`), `whiteboard` with `elements/appState/files` jsonb referencing `projects.projectId`). Config in `drizzle.config.ts` (schema `./db/schema.ts`, out `./drizzle`, `DATABASE_URL` falls back to placeholder).
- UI: Tailwind v4, shadcn/ui components in `components/`, `components.json`. `@excalidraw/excalidraw` for whiteboard. Path alias `@/*` (see `tsconfig.json`/`vitest.config.ts`).
- Env: copy `.env.example` (needs `DATABASE_URL`, Clerk keys, `GEMINI_API_KEY`, `NEXT_PUBLIC_APP_URL`). Images allow `img.clerk.com` in `next.config.ts`.

## Gotchas
- Middleware file is `proxy.ts` (not `middleware.ts`) — Next.js will still use it per its config/matcher; don't rename unless you verify.
- Auth is conditionally enabled; local/dev may run without Clerk keys (routes behave differently). Tests/mock accordingly.
- Tests run with Vitest jsdom + `@testing-library/jest-dom`; see `tests/CreateNewBoardDialog.test.tsx` for patterns (axios mocked, `next/navigation` mocked).
- Drizzle `dbCredentials.url` has a hard placeholder fallback — ensure `DATABASE_URL` is set for generate/push/studio in real environments.
