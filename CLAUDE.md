# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Package Manager
This project uses npm as the package manager (has package-lock.json).

## Architecture

This is a Next.js 15 portfolio application using the App Router architecture with TypeScript and Tailwind CSS.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono
- **Bundler**: Turbopack (enabled for dev and build)

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui component library
- `src/lib/` - Utility functions (includes `cn()` for className merging)
- `src/hooks/` - Custom React hooks

### shadcn/ui Configuration
- **Style**: "new-york" variant
- **Base color**: zinc
- **CSS Variables**: enabled
- **Icon library**: lucide
- **Path aliases**: Uses `@/` prefix for imports

### Key Patterns
- All UI components use `cn()` utility for className merging with `clsx` and `tailwind-merge`
- Components follow Radix UI + Class Variance Authority (CVA) pattern for variants
- TypeScript strict mode enabled
- Path mapping configured for `@/*` to `./src/*`

### Styling Notes
- Using CSS variables for theming
- Tailwind CSS v4 with PostCSS configuration
- Global styles in `src/app/globals.css`