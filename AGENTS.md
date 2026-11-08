<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Fuente

Universal Sans (los tres TTF de `src/app/fonts/`) solo trae 67 glifos, iguales en los tres cortes: espacio, coma, guion, punto, dígitos `0-9`, `A-Z`, `a-z` y la comilla tipográfica `’` (U+2019).

Por esa limitación, el texto en español no se dibuja completo en esta tipografía. No existen `á é í ó ú Á É Í Ó Ú`, `ñ Ñ`, `ü Ü`, `¿ ¡`, ni ningún otro signo fuera de esa lista (por ejemplo `! ? : ; " ' ( ) /`). Esos caracteres salen en la fuente de respaldo (`ui-sans-serif`), no en Universal Sans.

Al agregar texto, hay que tenerlo en cuenta: cualquier carácter fuera de ese juego no se verá en Universal Sans.

## Imágenes

El archivo que entra al repo es el original, en la calidad en que llegó. No lo conviertas a JPG ni lo recomprimas antes de subirlo.

`next/image` optimiza una sola vez, al servir. Flyers, portadas y cualquier pieza con texto, código QR o fotografía usan `quality={90}`. El 75 de Next se queda para el resto.

En Next 16, `images.qualities` de `next.config.ts` tiene que incluir ese 90. Si no está en la lista, Next lo acerca a 75. No uses `unoptimized` para saltarte esa compresión.

## Next.js preferences

### Build UI once

Reusable UI has one file. Routes and features import that file.

- `src/components/ui` — small reusable building blocks (`Button`, `Input`, `Modal`) and components reused across features (`EmptyState`).
- `src/components/layout` — navigation, footer, and structural UI (`Navbar`, `Footer`), rendered from `src/app/layout.tsx` or a route-group layout.
- `src/components/providers.tsx` stays at that path.

Dashboard, login, product, and any later screen reuse these components. When a second feature needs one, move that file into `ui` or `layout` and import it. Do not copy it into a route, a feature, or a second folder.

### Folders

    src/
      app/                    routes, layouts, and special files; page.tsx and route.ts define the URL
        (group)/              shares a layout; the name is omitted from the URL
        <route>/
          _components/        UI used only by this route
          _lib/               helpers used only by this route
      components/
        ui/
        layout/
        providers.tsx
      features/
        <feature>/            one product area, one folder
      lib/                    infrastructure shared by features; cn is src/lib/utils.ts
    public/                   images, fonts, and icons, served from /

- Organize around what the app does. `auth` is login, register, and user management. `products` is listing, details, and management. `orders` is checkout, orders, and tracking. That folder holds the feature's components, hooks, actions, schema, services, types, and helpers.
- A hook, type, or helper used by one feature stays in that feature. One used by two features goes in `src/lib`.
- UI used by a single route stays in that route's `_components`.
- Two route groups must not resolve to the same URL.
- File names stay lowercase, matching `providers.tsx` and `utils.ts`.
- `.env.local` holds local secrets and stays untracked.
- Do not add `src/utils`, `src/hooks`, `src/types`, or `src/components/shared`.

## Dependencies preferences

- Use `class-variance-authority` (`cva`) for component variants.
- Use `clsx` + `tailwind-merge` for classes (helper `cn` in `src/lib/utils.ts`).
- Use `next-themes` to build dark mode.
- Use `sonner` to build toasts.
- Use `date-fns` for dates.
- Use `zod` for validation.
- Use `lucide-react` for icons.
- Use `oxlint` and `oxfmt` for linting and formatting.

## How to work in this repo

- Node 26 (`.nvmrc`; `engines` in `package.json` and Vercel use the same). Run `nvm use` and check `node -v` before `pnpm`. On Cursor cloud VMs `/exec-daemon/node` (Node 22) comes first in `PATH`: prepend nvm's v26 `bin` directory. Node 26 has no Corepack: `npm i -g pnpm@12.15.0` (the `packageManager` version).
- Verify with `pnpm dev`, `pnpm typecheck`, `pnpm lint`, `pnpm test:run`, and `pnpm format`.
- `next.config.ts` enables Cache Components, Partial Prefetching, and the React Compiler. Read the matching guide in `node_modules/next/dist/docs/` before using dynamic APIs, adding `use cache`, or changing link prefetching. Leave manual `memo` and `useMemo` out unless a measured case needs them.
- Dark mode is already wired. `Providers` wraps the root layout, `next-themes` sets `attribute="class"`, and `src/app/globals.css` defines the `dark` variant for that class. Keep a single `ThemeProvider`. The default theme is `dark`, not `system`.
- Unit tests are Vitest files named `*.test.ts` or `*.test.tsx`, colocated with the source or under `tests/`. Browser checks go through Playwright CLI and `.playwright/cli.config.json`.
- `.cursor/` is gitignored. Instructions that must survive a commit belong in this file.

## Agnostic guidelines

These are model and task-agnostic guidelines.

They apply to any domain (frontend, backend, API, CLI, etc.) and work for any agent or task.

## Context Management

- Before reading an entire file, use `grep` or `ripgrep (rg)` if it's available, to search for what you need and read only that.

- To explore the project, use a subagent and send me only the summary.

- Show me the diff, not the entire file.

- Don't repeat what we've already decided in this session.

- If switching tasks, use the available compact-summarize conversation commands (e.g. `/compact` in Claude Code, `/summarize` in Cursor) if those aren't available, search into the actual harness documentation for the equivalent command, or simply start a new session.

- Keep responses short by default.

## Worktrees

When working on multiple tasks or features in parallel, use Git worktrees to isolate changes.

- It's better to create a worktree rather than modify the main checkout.

- Each task should be in its own worktree or branch.
