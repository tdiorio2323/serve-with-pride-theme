# Repository Guidelines

## Project Structure & Module Organization
The application code lives in `src/`, with `main.tsx` bootstrapping the Vite + React stack and `App.tsx` wiring routes through React Router. Feature pages belong in `src/pages/` and are lazy-loaded; shared views sit in `src/components/`, while low-level primitives from shadcn/ui are in the top-level `components/` directory (`components/ui`, `components/cart`, etc.). Reusable logic belongs in `src/hooks/` or `lib/utils/`. Content files that drive copy and policy pages are under `content/`, and static assets should go in `public/`. Keep `dist/` build artifacts untouched; `scripts/` houses maintenance scripts such as `scripts/audit-routes.ts`.

## Build, Test, and Development Commands
Use `npm run dev` to start the Vite dev server on port 5173. Ship production bundles with `npm run build`; `npm run preview` serves the built output for QA. Run `npm run lint` for ESLint, `npm run lint:strict` to enforce zero warnings, and `npm run typecheck` for TypeScript validation. `npm run analyze:bundle` and `npm run analyze:routes` support performance audits when needed.

## Coding Style & Naming Conventions
Code is formatted with Prettier defaults surfaced via ESLint; favor 2-space indentation and single quotes within JSX attributes when literals require it. Name React components in PascalCase, hooks in camelCase starting with `use`, and Tailwind utility bundles belong in class strings rather than CSS files. Import application modules through the `@/` alias (configured in `tsconfig.json`) instead of relative paths. Keep UI state colocated with components and move sharable utilities to `lib/utils/`.

## Testing Guidelines
Automated tests are not yet provisioned. Before opening a PR, run `npm run lint`, `npm run lint:strict`, and `npm run typecheck`, and smoke-test via `npm run preview`. When adding tests, colocate files as `ComponentName.test.tsx` alongside the component and consider Vitest + React Testing Library to maintain parity with the Vite toolchain. Capture edge cases around lazy-loading and cart context interactions.

## Commit & Pull Request Guidelines
Follow the existing Conventional Commit style (`feat:`, `fix(ui):`, `chore:`). Write one-line summaries in the imperative mood. PRs should include: high-level intent, notable implementation notes, linked issues or TODO references, and screenshots or screen recordings for visual changes. Ensure checks are passing and reference any manual steps taken so reviewers can reproduce them quickly.
