# Deployment & CI/CD Strategy

## Deployment Platforms Overview

### Recommended Primary Platform: **Vercel**

**Why Vercel for Next.js Portfolio:**
- Native Next.js integration and optimization
- Automatic deployments from Git
- Edge network with global CDN
- Built-in analytics and performance monitoring
- Zero-configuration deployments
- Generous free tier for personal portfolios

### Alternative Platforms

#### 1. **Netlify**
- Strong static site hosting
- Built-in form handling
- Edge functions support
- Good for Jamstack workflows

#### 2. **GitHub Pages**
- Free hosting for public repositories
- Simple setup with GitHub Actions
- Best for static exports only

#### 3. **Railway/Render**
- Full-stack deployment capabilities
- Good for projects requiring backend services
- Database integration

## Vercel Deployment Configuration

### 1. **Project Setup**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "crons": [
    {
      "path": "/api/revalidate",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### 2. **Environment Variables Configuration**
```bash
# Production Environment Variables (.env.production)
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
NEXT_PUBLIC_SITE_NAME="Your Portfolio"
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Contact Form Configuration
CONTACT_EMAIL_TO=your-email@domain.com
EMAIL_FROM=noreply@yourdomain.com
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxx

# Optional: CMS Integration
CONTENTFUL_SPACE_ID=xxxxxxxxxxxxxxx
CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxxxxx

# Security
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourportfolio.com
```

### 3. **Build Optimization Settings**
```javascript
// next.config.ts
const nextConfig = {
  // Turbopack for faster builds
  experimental: {
    turbo: {}
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'your-cdn.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 hours
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

## GitHub Actions CI/CD Pipeline

### 1. **Complete Workflow Configuration**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  # Quality Checks
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run type checking
      run: npm run type-check
      
    - name: Run linting
      run: npm run lint
      
    - name: Run tests
      run: npm run test
      
    - name: Check build
      run: npm run build

  # Security Audit
  security:
    name: Security Audit
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Run security audit
      run: npm audit --audit-level moderate
      
    - name: Check for vulnerabilities
      run: npm audit --fix
      
  # Lighthouse Performance Testing
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: [quality]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      
    - name: Start server
      run: npm start &
      
    - name: Wait for server
      run: npx wait-on http://localhost:3000
      
    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli@latest
        lhci autorun
      env:
        LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

  # Preview Deployment (for PRs)
  preview-deploy:
    name: Preview Deployment
    runs-on: ubuntu-latest
    needs: [quality, security]
    if: github.event_name == 'pull_request'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Install Vercel CLI
      run: npm install --global vercel@latest
      
    - name: Pull Vercel Environment Information
      run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Build Project Artifacts
      run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Deploy Preview
      run: |
        DEPLOYMENT_URL=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
        echo "DEPLOYMENT_URL=$DEPLOYMENT_URL" >> $GITHUB_ENV
        
    - name: Comment PR with Preview URL
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: `🚀 Preview deployment ready!\n\n✨ Preview: ${{ env.DEPLOYMENT_URL }}`
          })

  # Production Deployment (main branch only)
  production-deploy:
    name: Production Deployment
    runs-on: ubuntu-latest
    needs: [quality, security, lighthouse]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Install Vercel CLI
      run: npm install --global vercel@latest
      
    - name: Pull Vercel Environment Information
      run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Build Project Artifacts
      run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
    - name: Deploy to Production
      run: |
        DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
        echo "DEPLOYMENT_URL=$DEPLOYMENT_URL" >> $GITHUB_ENV
        
    - name: Update deployment status
      run: |
        echo "🎉 Successfully deployed to production!"
        echo "🌍 Live URL: ${{ env.DEPLOYMENT_URL }}"
```

### 2. **Additional Workflow Jobs**

```yaml
# .github/workflows/performance-monitoring.yml
name: Performance Monitoring

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM UTC
  workflow_dispatch: # Manual trigger

jobs:
  lighthouse-audit:
    runs-on: ubuntu-latest
    
    steps:
    - name: Audit live site
      uses: treosh/lighthouse-ci-action@v10
      with:
        urls: |
          https://yourportfolio.com
          https://yourportfolio.com/projects
          https://yourportfolio.com/about
        configPath: './lighthouserc.json'
        uploadArtifacts: true
        temporaryPublicStorage: true
```

### 3. **Dependency Updates**
```yaml
# .github/workflows/dependency-update.yml
name: Dependency Updates

on:
  schedule:
    - cron: '0 10 * * 1' # Weekly on Monday at 10 AM UTC

jobs:
  update-dependencies:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Update dependencies
      run: |
        npx npm-check-updates -u
        npm install
        
    - name: Run tests
      run: npm test
      
    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v5
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        commit-message: 'chore: update dependencies'
        title: 'chore: automated dependency updates'
        body: |
          Automated dependency updates by GitHub Actions.
          
          Please review the changes and ensure all tests pass.
        branch: chore/dependency-updates
```

## Performance and Quality Gates

### 1. **Lighthouse Configuration**
```javascript
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/projects",
        "http://localhost:3000/about",
        "http://localhost:3000/contact"
      ],
      "startServerCommand": "npm start"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "categories:pwa": ["warn", {"minScore": 0.8}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 2. **ESLint Configuration for CI**
```javascript
// .eslintrc.js
module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    // Enforce performance best practices
    'react-hooks/exhaustive-deps': 'error',
    '@next/next/no-img-element': 'error',
    '@next/next/no-page-custom-font': 'error',
    
    // Code quality
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  overrides: [
    {
      files: ['**/*.test.{js,ts,jsx,tsx}'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
}
```

### 3. **TypeScript Strict Configuration**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Environment Management

### 1. **Environment-Specific Configurations**
```bash
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=
CONTACT_EMAIL_TO=dev@example.com

# .env.staging
NEXT_PUBLIC_SITE_URL=https://staging.yourportfolio.com
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
CONTACT_EMAIL_TO=staging@yourdomain.com

# .env.production
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
NEXT_PUBLIC_ANALYTICS_ID=G-YYYYYYYYYY
CONTACT_EMAIL_TO=contact@yourdomain.com
```

### 2. **Configuration Validation**
```typescript
// lib/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string(),
  CONTACT_EMAIL_TO: z.string().email(),
  EMAIL_FROM: z.string().email(),
  SENDGRID_API_KEY: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Type checking successful
- [ ] Linting clean
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Environment variables configured
- [ ] Domain/DNS configured

### Post-Deployment
- [ ] Site loads correctly
- [ ] Contact form working
- [ ] Analytics tracking active
- [ ] SEO meta tags correct
- [ ] Performance scores acceptable
- [ ] SSL certificate valid
- [ ] CDN caching configured

## Monitoring and Maintenance

### 1. **Uptime Monitoring**
```javascript
// api/health/route.ts
export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'development'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
```

### 2. **Error Tracking**
```typescript
// lib/monitoring.ts
export function reportError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service (Sentry, LogRocket, etc.)
    console.error('Error reported:', error, context)
  }
}
```

### 3. **Analytics Setup**
```typescript
// lib/analytics.ts
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties)
    }
  },
  
  page: (path: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: path,
      })
    }
  }
}
```

## Rollback Strategy

### 1. **Vercel Rollback**
```bash
# Via Vercel CLI
vercel rollback [deployment-url] --token=$VERCEL_TOKEN

# Via GitHub Actions (manual workflow)
gh workflow run rollback.yml -f deployment_id=abc123
```

### 2. **Rollback Workflow**
```yaml
# .github/workflows/rollback.yml
name: Emergency Rollback

on:
  workflow_dispatch:
    inputs:
      deployment_id:
        description: 'Deployment ID to rollback to'
        required: true
        type: string

jobs:
  rollback:
    runs-on: ubuntu-latest
    steps:
    - name: Rollback deployment
      run: |
        vercel rollback ${{ github.event.inputs.deployment_id }} --token=${{ secrets.VERCEL_TOKEN }}
        echo "Rolled back to deployment: ${{ github.event.inputs.deployment_id }}"
```

This comprehensive deployment and CI/CD strategy ensures reliable, automated deployments with proper quality gates, monitoring, and rollback capabilities for your Next.js portfolio.