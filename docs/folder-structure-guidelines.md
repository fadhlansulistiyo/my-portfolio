# Folder Structure & Organization Guidelines

## Project Overview

This document defines the complete folder structure for the Next.js 15 portfolio application, following industry best practices for scalability, maintainability, and developer experience.

## Root Directory Structure

```
my-portfolio/
├── .env.local                    # Local environment variables
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .eslintrc.json               # ESLint configuration
├── components.json               # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project documentation
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── docs/                        # Architecture documentation
├── public/                      # Static assets
└── src/                         # Source code
```

## Source Code Structure (`src/`)

### Complete Directory Layout

```
src/
├── app/                         # Next.js App Router
│   ├── (marketing)/            # Route group for marketing pages
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── api/                    # API routes
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── projects/
│   │       └── route.ts
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Global loading UI
│   ├── error.tsx               # Global error UI
│   ├── not-found.tsx           # 404 page
│   └── page.tsx                # Homepage
├── components/                  # React components
│   ├── ui/                     # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── popover.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   ├── layout/                 # Layout components
│   │   ├── header/
│   │   │   ├── index.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── footer/
│   │   │   ├── index.tsx
│   │   │   └── social-links.tsx
│   │   └── providers/
│   │       ├── theme-provider.tsx
│   │       └── toast-provider.tsx
│   ├── sections/               # Page sections
│   │   ├── hero/
│   │   │   ├── index.tsx
│   │   │   ├── hero-content.tsx
│   │   │   ├── hero-image.tsx
│   │   │   └── scroll-indicator.tsx
│   │   ├── about/
│   │   │   ├── index.tsx
│   │   │   ├── about-content.tsx
│   │   │   ├── skills-grid.tsx
│   │   │   └── experience-timeline.tsx
│   │   ├── projects/
│   │   │   ├── index.tsx
│   │   │   ├── project-grid.tsx
│   │   │   ├── project-card.tsx
│   │   │   ├── project-modal.tsx
│   │   │   ├── project-filter.tsx
│   │   │   └── featured-projects.tsx
│   │   ├── experience/
│   │   │   ├── index.tsx
│   │   │   ├── experience-card.tsx
│   │   │   └── timeline.tsx
│   │   └── contact/
│   │       ├── index.tsx
│   │       ├── contact-form.tsx
│   │       ├── contact-info.tsx
│   │       └── social-media.tsx
│   ├── forms/                  # Form components
│   │   ├── contact-form/
│   │   │   ├── index.tsx
│   │   │   ├── form-fields.tsx
│   │   │   └── form-validation.tsx
│   │   └── newsletter-form/
│   │       └── index.tsx
│   └── common/                 # Reusable components
│       ├── loading/
│       │   ├── spinner.tsx
│       │   ├── skeleton.tsx
│       │   └── page-loading.tsx
│       ├── error/
│       │   ├── error-boundary.tsx
│       │   └── error-fallback.tsx
│       ├── seo/
│       │   ├── meta-tags.tsx
│       │   └── structured-data.tsx
│       ├── animation/
│       │   ├── fade-in.tsx
│       │   ├── slide-in.tsx
│       │   └── scroll-reveal.tsx
│       └── utilities/
│           ├── container.tsx
│           ├── section-header.tsx
│           ├── back-to-top.tsx
│           └── scroll-progress.tsx
├── hooks/                      # Custom React hooks
│   ├── use-local-storage.ts    # LocalStorage hook
│   ├── use-session-storage.ts  # SessionStorage hook
│   ├── use-debounce.ts         # Debounce hook
│   ├── use-intersection.ts     # Intersection Observer hook
│   ├── use-media-query.ts      # Media query hook
│   ├── use-mobile.ts           # Mobile detection hook
│   ├── use-scroll-position.ts  # Scroll position hook
│   ├── use-theme.ts            # Theme management hook
│   ├── use-form.ts             # Form management hook
│   ├── use-modal.ts            # Modal state hook
│   ├── use-async.ts            # Async operations hook
│   └── use-clipboard.ts        # Clipboard operations hook
├── lib/                        # Utility functions and configurations
│   ├── utils.ts                # General utilities (cn function, etc.)
│   ├── constants.ts            # Application constants
│   ├── types.ts                # TypeScript type definitions
│   ├── validations/            # Validation schemas
│   │   ├── contact.ts          # Contact form validation
│   │   └── common.ts           # Common validation schemas
│   ├── data/                   # Static data and content
│   │   ├── projects.ts         # Projects data
│   │   ├── experience.ts       # Work experience data
│   │   ├── skills.ts           # Skills and technologies data
│   │   └── personal.ts         # Personal information
│   ├── api/                    # API utilities and clients
│   │   ├── client.ts           # HTTP client configuration
│   │   ├── endpoints.ts        # API endpoint definitions
│   │   └── types.ts            # API response types
│   ├── config/                 # Configuration files
│   │   ├── site.ts             # Site-wide configuration
│   │   ├── navigation.ts       # Navigation configuration
│   │   └── env.ts              # Environment variable validation
│   └── formatters/             # Data formatting utilities
│       ├── date.ts             # Date formatting
│       ├── currency.ts         # Currency formatting
│       └── string.ts           # String utilities
├── styles/                     # Additional CSS files
│   ├── components.css          # Component-specific styles
│   ├── utilities.css           # Custom Tailwind utilities
│   └── animations.css          # Custom animations
└── types/                      # Global TypeScript types
    ├── global.d.ts             # Global type definitions
    ├── api.ts                  # API-related types
    └── components.ts           # Component prop types
```

## Public Directory Structure (`public/`)

```
public/
├── images/                     # Image assets
│   ├── projects/              # Project screenshots
│   │   ├── project-1.webp
│   │   ├── project-2.webp
│   │   └── thumbnails/        # Optimized thumbnails
│   │       ├── project-1-thumb.webp
│   │       └── project-2-thumb.webp
│   ├── hero/                  # Hero section images
│   │   ├── profile.webp
│   │   └── background.webp
│   └── icons/                 # Custom icons
│       ├── logo.svg
│       └── favicon/
│           ├── favicon.ico
│           ├── icon-192.png
│           └── icon-512.png
├── documents/                 # Downloadable documents
│   ├── resume.pdf
│   └── portfolio.pdf
├── manifest.json              # PWA manifest
├── robots.txt                 # Search engine directives
└── sitemap.xml               # Site sitemap
```

## Documentation Directory (`docs/`)

```
docs/
├── architecture-overview.md        # High-level architecture
├── component-architecture.md       # Component design patterns
├── data-flow-state-management.md   # State management strategy
├── folder-structure-guidelines.md  # This document
├── performance-optimization.md     # Performance best practices
├── deployment-ci-cd.md            # Deployment and CI/CD
├── development-guidelines.md       # Development best practices
├── api-documentation.md           # API documentation
└── testing-strategy.md            # Testing approach
```

## Naming Conventions

### Files and Folders

#### Component Files
- **Components**: PascalCase (`HeroSection.tsx`, `ProjectCard.tsx`)
- **Hooks**: camelCase with "use" prefix (`useLocalStorage.ts`, `useForm.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `validateEmail.ts`)
- **Types**: camelCase (`userTypes.ts`, `apiTypes.ts`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`, `loading.tsx`)

#### Directory Names
- **Components**: kebab-case (`hero-section/`, `project-card/`)
- **Features**: kebab-case (`user-profile/`, `project-management/`)
- **Utilities**: kebab-case (`api-client/`, `form-validation/`)

### Variables and Functions

```typescript
// Variables: camelCase
const projectData = []
const isLoading = true
const userPreferences = {}

// Functions: camelCase
function fetchProjects() {}
function handleSubmit() {}
function validateForm() {}

// Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_FILE_SIZE = 1024 * 1024
const SUPPORTED_FORMATS = ['jpg', 'png', 'webp']

// Types and Interfaces: PascalCase
interface ProjectData {}
type UserRole = 'admin' | 'user'
```

## Import Organization

### Import Order and Grouping

```typescript
// 1. React and Next.js imports
import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

// 2. External library imports
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

// 3. Internal imports (absolute paths with @/)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'
import { Project } from '@/types/project'

// 4. Relative imports
import './component.css'
```

### Path Mapping Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

## Component Organization Patterns

### 1. **Feature-Based Organization**

```
components/
├── ui/                    # Reusable UI primitives
├── layout/                # App-wide layout components
├── sections/              # Page sections
│   ├── hero/
│   │   ├── index.tsx      # Main component export
│   │   ├── hero-content.tsx
│   │   ├── hero-image.tsx
│   │   └── types.ts       # Component-specific types
│   └── projects/
│       ├── index.tsx
│       ├── project-grid.tsx
│       ├── project-card.tsx
│       ├── project-filter.tsx
│       └── types.ts
└── forms/                 # Form-related components
```

### 2. **Component Index Pattern**

```typescript
// components/sections/hero/index.tsx
export { HeroSection as default } from './hero-section'
export { HeroContent } from './hero-content'
export { HeroImage } from './hero-image'

// Usage
import HeroSection, { HeroContent } from '@/components/sections/hero'
```

### 3. **Barrel Exports**

```typescript
// components/ui/index.ts
export { Button } from './button'
export { Card, CardContent, CardHeader } from './card'
export { Input } from './input'
export { Label } from './label'

// Usage
import { Button, Card, Input } from '@/components/ui'
```

## Asset Organization

### Image Management

```
public/images/
├── projects/              # Project-specific images
│   ├── ecommerce/
│   │   ├── hero.webp
│   │   ├── features-1.webp
│   │   └── features-2.webp
│   └── blog-app/
│       ├── dashboard.webp
│       └── editor.webp
├── profile/               # Personal photos
│   ├── avatar.webp
│   └── hero-bg.webp
└── icons/                 # SVG icons and logos
    ├── tech/
    │   ├── react.svg
    │   ├── nextjs.svg
    │   └── typescript.svg
    └── social/
        ├── github.svg
        ├── linkedin.svg
        └── twitter.svg
```

### Icon Organization Strategy

```typescript
// lib/icons.ts
export const TechIcons = {
  react: '/icons/tech/react.svg',
  nextjs: '/icons/tech/nextjs.svg',
  typescript: '/icons/tech/typescript.svg',
}

export const SocialIcons = {
  github: '/icons/social/github.svg',
  linkedin: '/icons/social/linkedin.svg',
  twitter: '/icons/social/twitter.svg',
}
```

## Configuration Files Organization

### Environment Variables

```bash
# .env.example
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Portfolio"

# Contact Form
CONTACT_EMAIL_TO=your-email@example.com
EMAIL_FROM=noreply@yourdomain.com

# Optional: External Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Site Configuration

```typescript
// lib/config/site.ts
export const siteConfig = {
  name: "Your Name",
  title: "Your Name - Full Stack Developer",
  description: "Portfolio website showcasing my work and experience",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: {
    name: "Your Name",
    email: "your-email@example.com",
    twitter: "@yourusername",
    github: "yourusername",
    linkedin: "yourprofile"
  },
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript"]
}
```

## Best Practices

### 1. **Consistent File Structure**
- Each component folder should have an `index.tsx` file as the main export
- Keep related files together (component, styles, tests, types)
- Use descriptive folder names that reflect the component's purpose

### 2. **Modular Organization**
- Group components by feature or domain, not by type
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks

### 3. **Import Efficiency**
- Use barrel exports for commonly imported modules
- Prefer absolute imports over relative imports for better maintainability
- Group imports logically and maintain consistent ordering

### 4. **Asset Management**
- Use WebP format for images with fallbacks
- Organize assets by feature or component
- Optimize images for different screen sizes

### 5. **Type Safety**
- Define types close to where they're used
- Use shared types for common data structures
- Leverage TypeScript's strict mode for better error catching

This folder structure provides a scalable foundation that can grow with your portfolio while maintaining clarity and organization throughout development.