# Performance Optimization Strategy

## Core Web Vitals Optimization

### Performance Goals
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5 seconds
- **Total Blocking Time (TBT)**: < 200 milliseconds

## Next.js 15 Performance Features

### 1. **Turbopack Integration**
```javascript
// next.config.ts - Already configured
const nextConfig = {
  experimental: {
    turbo: {
      // Turbopack configuration for dev and build
    }
  }
}
```

**Benefits:**
- 10x faster builds than Webpack
- Incremental compilation
- Optimized hot reload
- Better tree shaking

### 2. **App Router Optimizations**
```typescript
// app/layout.tsx - Streaming and progressive loading
import { Suspense } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevents FOIT (Flash of Invisible Text)
  preload: true
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<LoadingSkeleton />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
```

### 3. **Static Generation (SSG) Strategy**
```typescript
// app/projects/page.tsx - Static generation for project listings
import { projects } from '@/lib/data/projects'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Static metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  
  return {
    title: project?.title,
    description: project?.description,
    openGraph: {
      images: [project?.image],
    },
  }
}
```

## Image Optimization

### 1. **Next.js Image Component**
```typescript
// components/project-card.tsx
import Image from 'next/image'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-lg">
      <Image
        src={project.image}
        alt={project.title}
        width={400}
        height={300}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // Low quality placeholder
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={project.featured} // Prioritize featured images
      />
    </div>
  )
}
```

### 2. **Image Format Strategy**
```typescript
// lib/utils/image.ts
export function getOptimizedImageUrl(src: string, width: number, quality = 75) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_CDN || ''
  return `${baseUrl}/${src}?w=${width}&q=${quality}&format=webp`
}

// Usage in components
<Image
  src={getOptimizedImageUrl(project.image, 800)}
  alt={project.title}
  width={800}
  height={600}
/>
```

### 3. **Progressive Image Loading**
```typescript
// components/progressive-image.tsx
import { useState, useCallback } from 'react'
import Image from 'next/image'

interface ProgressiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ProgressiveImage({ src, alt, width, height, className }: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={handleLoad}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
```

## Code Splitting and Lazy Loading

### 1. **Dynamic Imports**
```typescript
// components/project-modal.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components
const ProjectDetails = dynamic(() => import('./project-details'), {
  loading: () => <ProjectDetailsSkeleton />,
  ssr: false // Only load on client if not needed for SEO
})

const ContactForm = dynamic(() => import('./contact-form'), {
  loading: () => <FormSkeleton />
})

export function ProjectModal({ project }: { project: Project }) {
  return (
    <div>
      <h2>{project.title}</h2>
      <Suspense fallback={<ProjectDetailsSkeleton />}>
        <ProjectDetails project={project} />
      </Suspense>
    </div>
  )
}
```

### 2. **Route-Based Code Splitting**
```typescript
// app/(marketing)/projects/page.tsx
import dynamic from 'next/dynamic'

// Lazy load non-critical sections
const ProjectFilters = dynamic(() => import('@/components/project-filters'), {
  loading: () => <FiltersSkeleton />
})

const ProjectGrid = dynamic(() => import('@/components/project-grid'))

export default function ProjectsPage() {
  return (
    <div>
      <h1>My Projects</h1>
      <ProjectFilters />
      <ProjectGrid />
    </div>
  )
}
```

### 3. **Component-Level Splitting**
```typescript
// hooks/use-lazy-component.ts
import { lazy, ComponentType } from 'react'

export function useLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>
) {
  return lazy(importFn)
}

// Usage
const LazyChart = useLazyComponent(() => import('@/components/charts/project-stats'))
```

## Bundle Optimization

### 1. **Tree Shaking Configuration**
```javascript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts'
    ]
  },
  // Enable bundle analyzer in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization.providedExports = true
      config.optimization.usedExports = true
    }
    return config
  }
}
```

### 2. **Selective Imports**
```typescript
// ❌ Bad - imports entire library
import * as Icons from 'lucide-react'

// ✅ Good - tree-shakeable imports
import { Github, ExternalLink, Mail } from 'lucide-react'

// ❌ Bad - imports entire date library
import moment from 'moment'

// ✅ Good - lighter alternative
import { format } from 'date-fns'
```

### 3. **Bundle Analysis**
```bash
# Package.json scripts
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "build:analyze": "cross-env BUNDLE_ANALYZE=both next build"
  }
}
```

```javascript
// Bundle analyzer configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

## Component Performance

### 1. **React.memo Optimization**
```typescript
// components/project-card.tsx
import { memo } from 'react'

interface ProjectCardProps {
  project: Project
  onSelect?: (project: Project) => void
}

export const ProjectCard = memo(function ProjectCard({ 
  project, 
  onSelect 
}: ProjectCardProps) {
  return (
    <div onClick={() => onSelect?.(project)}>
      {/* Component content */}
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for optimization
  return (
    prevProps.project.id === nextProps.project.id &&
    prevProps.project.updatedAt === nextProps.project.updatedAt
  )
})
```

### 2. **useMemo for Expensive Calculations**
```typescript
// components/project-stats.tsx
import { useMemo } from 'react'

export function ProjectStats({ projects }: { projects: Project[] }) {
  const stats = useMemo(() => {
    return {
      total: projects.length,
      byCategory: projects.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      totalLinesOfCode: projects.reduce((sum, p) => sum + (p.linesOfCode || 0), 0)
    }
  }, [projects])

  return (
    <div>
      <p>Total Projects: {stats.total}</p>
      <p>Total Lines of Code: {stats.totalLinesOfCode.toLocaleString()}</p>
      {/* Render category stats */}
    </div>
  )
}
```

### 3. **useCallback for Event Handlers**
```typescript
// components/project-filter.tsx
import { useCallback, useState } from 'react'

export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const handleFilterClick = useCallback((filter: string) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }, [onFilterChange])

  return (
    <div>
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={activeFilter === filter.id ? 'active' : ''}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
```

## Loading States and Skeletons

### 1. **Skeleton Components**
```typescript
// components/skeletons/project-card-skeleton.tsx
export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 rounded w-16" />
          <div className="h-6 bg-gray-300 rounded w-20" />
        </div>
      </div>
    </div>
  )
}

// components/skeletons/project-grid-skeleton.tsx
export function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}
```

### 2. **Streaming with Suspense**
```typescript
// app/projects/page.tsx
import { Suspense } from 'react'
import { ProjectGrid } from '@/components/project-grid'
import { ProjectGridSkeleton } from '@/components/skeletons'

export default function ProjectsPage() {
  return (
    <div>
      <h1>My Projects</h1>
      <Suspense fallback={<ProjectGridSkeleton />}>
        <ProjectGrid />
      </Suspense>
    </div>
  )
}
```

### 3. **Progressive Enhancement**
```typescript
// components/project-search.tsx
import { useState, useDeferredValue } from 'react'

export function ProjectSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    onSearch(deferredQuery)
  }, [deferredQuery, onSearch])

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search projects..."
      className="w-full px-4 py-2 border rounded-lg"
    />
  )
}
```

## Font Optimization

### 1. **Next.js Font Optimization**
```typescript
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false // Only preload primary font
})
```

### 2. **Font Loading Strategy**
```css
/* app/globals.css */
@font-face {
  font-family: 'Geist';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Prevents FOIT */
  src: url('/fonts/geist-400.woff2') format('woff2');
}

/* Font loading optimization */
.font-loading {
  font-family: system-ui, -apple-system, sans-serif;
}

.font-loaded {
  font-family: 'Geist', system-ui, -apple-system, sans-serif;
}
```

## CSS Performance

### 1. **Tailwind CSS Optimization**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {}
  },
  corePlugins: {
    // Disable unused core plugins
    float: false,
    objectFit: false,
    objectPosition: false,
  }
}
```

### 2. **CSS-in-JS Optimization**
```typescript
// components/optimized-styles.tsx
import { cva } from 'class-variance-authority'

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
```

### 3. **Critical CSS Inlining**
```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .hero-section {
              min-height: 100vh;
              display: flex;
              align-items: center;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Monitoring and Analytics

### 1. **Web Vitals Measurement**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 2. **Performance Monitoring**
```typescript
// lib/analytics.ts
export function reportWebVitals(metric: any) {
  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    console.log(metric)
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_category: 'Web Vitals',
    //   non_interaction: true,
    // })
  }
}
```

### 3. **Lighthouse CI Integration**
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'npm run start',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}],
      },
    },
  },
}
```

## Performance Testing

### 1. **Load Testing**
```bash
# Package.json scripts
{
  "scripts": {
    "perf:lighthouse": "lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json",
    "perf:bundle": "npm run build && npx bundle-analyzer .next/static/**/*.js",
    "perf:webpagetest": "webpagetest test http://localhost:3000 --key=YOUR_API_KEY"
  }
}
```

### 2. **Performance Budget**
```javascript
// next.config.ts
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Set performance budgets
      config.performance = {
        maxAssetSize: 250000,
        maxEntrypointSize: 250000,
        hints: 'warning'
      }
    }
    return config
  }
}
```

## Implementation Checklist

### Initial Setup
- [ ] Configure Turbopack for development and build
- [ ] Set up Next.js Image component with proper sizing
- [ ] Implement font optimization with `next/font`
- [ ] Configure bundle analyzer for monitoring

### Component Optimization
- [ ] Add React.memo to expensive components
- [ ] Implement useMemo for heavy calculations
- [ ] Use useCallback for event handlers
- [ ] Create loading skeletons for all major components

### Asset Optimization
- [ ] Convert images to WebP format
- [ ] Implement progressive image loading
- [ ] Optimize icon usage with selective imports
- [ ] Set up image CDN if needed

### Monitoring
- [ ] Integrate Web Vitals tracking
- [ ] Set up Lighthouse CI
- [ ] Configure performance budgets
- [ ] Implement error boundary reporting

This performance optimization strategy ensures your portfolio website loads quickly, provides an excellent user experience, and maintains high performance as it scales.