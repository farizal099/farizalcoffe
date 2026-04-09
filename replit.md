# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## FARIZAL COFFE Website (`artifacts/farizal-coffe`)

- **Type**: React + Vite, frontend-only, no backend
- **Preview path**: `/` (root)
- **Framework**: React 18, TailwindCSS v4, Framer Motion, Wouter routing
- **Theme**: Dark brown (#3E2723), Cream (#F5E6CA), Coffee Gold (#C69C6D)
- **Fonts**: Playfair Display (serif headings) + Inter (body)
- **Pages**:
  - `/` — Homepage (hero, about, featured menu, why us, testimonials, CTA, footer)
  - `/menu` — Full menu with category filter tabs + search
  - `/order` — Cart/order page with quantity controls and checkout
  - `/contact` — Contact form, info cards, map placeholder, WhatsApp button
- **State**: Cart state managed via `src/hooks/use-cart.tsx` with React Context
- **Components**: `src/components/Layout.tsx` (sticky nav + footer shared across all pages)
