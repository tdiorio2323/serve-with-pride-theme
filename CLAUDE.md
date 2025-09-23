# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a React application built with Vite, TypeScript, and shadcn/ui components. The project appears to be themed around military/veteran support services with donation tracking functionality.

**Tech Stack:**
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation

**Project Structure:**
- `src/components/` - Reusable UI components including Header, Hero, Footer, ProductGrid, DonationTracker, ServiceDiscount
- `src/components/ui/` - shadcn/ui component library
- `src/pages/` - Route components (Index, NotFound)
- `src/lib/` - Utility functions and configurations
- `src/hooks/` - Custom React hooks

**Key Components:**
- `App.tsx` - Main app setup with routing, query client, and toast providers
- `Index.tsx` - Main landing page assembling all components
- Components follow a pattern of being self-contained with their own styling

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Component Conventions

- Uses shadcn/ui component library extensively (@radix-ui components)
- All components are functional components using TypeScript
- Path alias `@` resolves to `src/` directory
- Components use Tailwind CSS for styling
- Form validation handled with React Hook Form + Zod

## Integration Notes

- This project integrates with Lovable platform for deployment
- Uses `lovable-tagger` in development mode for component tracking
- Configured for dual hosting on both `::` (IPv6) and port 8080
- React Router configured with future flags for v7 compatibility