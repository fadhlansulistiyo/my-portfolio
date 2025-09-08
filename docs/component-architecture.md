# Component Architecture Guide

## Component Hierarchy & Organization

### Component Categories

#### 1. **UI Primitives (`src/components/ui/`)**
These are the foundational components from shadcn/ui, built on Radix UI primitives:

```typescript
// Example: Button Component
interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

// Features:
// - Type-safe variants with CVA (Class Variance Authority)
// - Accessible by default (Radix UI)
// - Customizable with Tailwind classes
// - Consistent styling across the application
```

**Available UI Components:**
- Layout: `Card`, `Separator`, `Sheet`, `Dialog`
- Navigation: `Breadcrumb`, `NavigationMenu`, `Menubar`, `Tabs`
- Form: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`
- Feedback: `Alert`, `Badge`, `Progress`, `Skeleton`, `Tooltip`
- Data Display: `Avatar`, `Table`, `Chart`, `AspectRatio`
- Interaction: `Accordion`, `Collapsible`, `Dropdown`, `Popover`, `HoverCard`

#### 2. **Portfolio Components (`src/components/portfolio/`)**
Business logic components specific to the portfolio website:

```
src/components/portfolio/
├── layout/
│   ├── Header.tsx          # Navigation and branding
│   ├── Footer.tsx          # Contact links and social media
│   └── Navigation.tsx      # Mobile/desktop navigation
├── sections/
│   ├── HeroSection.tsx     # Landing area with introduction
│   ├── AboutSection.tsx    # Personal background and skills
│   ├── ProjectsSection.tsx # Portfolio projects showcase
│   ├── ExperienceSection.tsx # Work history and education
│   └── ContactSection.tsx  # Contact form and information
├── project/
│   ├── ProjectCard.tsx     # Individual project display
│   ├── ProjectModal.tsx    # Detailed project view
│   └── ProjectGrid.tsx     # Projects layout container
├── common/
│   ├── ThemeToggle.tsx     # Dark/light mode switcher
│   ├── ScrollIndicator.tsx # Page scroll progress
│   └── BackToTop.tsx       # Smooth scroll to top
└── forms/
    ├── ContactForm.tsx     # Contact form with validation
    └── NewsletterForm.tsx  # Email subscription (optional)
```

#### 3. **Layout Components**
Application-wide layout and structure components:

```typescript
// Root Layout Pattern
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontMono.variable)}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
```

## Component Design Patterns

### 1. **Compound Components Pattern**
For complex UI elements that work together:

```typescript
// Navigation Component Family
export const Navigation = {
  Root: NavigationRoot,
  Item: NavigationItem,
  Trigger: NavigationTrigger,
  Content: NavigationContent,
}

// Usage
<Navigation.Root>
  <Navigation.Item>
    <Navigation.Trigger>Projects</Navigation.Trigger>
    <Navigation.Content>
      {/* Dropdown content */}
    </Navigation.Content>
  </Navigation.Item>
</Navigation.Root>
```

### 2. **Render Props Pattern**
For flexible, reusable data visualization:

```typescript
interface ProjectGridProps {
  children: (project: Project) => ReactNode
  projects: Project[]
  layout?: "grid" | "list" | "masonry"
}

export function ProjectGrid({ children, projects, layout = "grid" }: ProjectGridProps) {
  return (
    <div className={cn("grid gap-6", layoutClasses[layout])}>
      {projects.map((project) => (
        <div key={project.id}>{children(project)}</div>
      ))}
    </div>
  )
}
```

### 3. **Hook-Based State Management**
For component-level state and side effects:

```typescript
// Custom hook for project filtering
export function useProjectFilter(projects: Project[]) {
  const [filter, setFilter] = useState<string>("all")
  const [search, setSearch] = useState<string>("")
  
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = filter === "all" || project.category === filter
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [projects, filter, search])
  
  return {
    filter,
    setFilter,
    search,
    setSearch,
    filteredProjects,
  }
}
```

## Component Composition Strategies

### 1. **Section-Based Architecture**
Each major section of the portfolio is a self-contained component:

```typescript
// Page composition
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}

// Section component structure
export function ProjectsSection() {
  const { filteredProjects, ...filterProps } = useProjectFilter(projects)
  
  return (
    <section className="py-20">
      <Container>
        <SectionHeader title="Projects" description="My recent work" />
        <ProjectFilter {...filterProps} />
        <ProjectGrid projects={filteredProjects}>
          {(project) => <ProjectCard project={project} />}
        </ProjectGrid>
      </Container>
    </section>
  )
}
```

### 2. **Container/Presenter Pattern**
Separate data logic from presentation:

```typescript
// Container: Handles data and logic
export function ProjectsContainer() {
  const { data: projects, isLoading, error } = useProjects()
  
  if (isLoading) return <ProjectsSkeleton />
  if (error) return <ErrorBoundary error={error} />
  
  return <ProjectsPresenter projects={projects} />
}

// Presenter: Pure UI component
export function ProjectsPresenter({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

## Component Communication Patterns

### 1. **Props Down, Events Up**
Standard React data flow pattern:

```typescript
// Parent component
function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  return (
    <>
      <ProjectGrid 
        projects={projects}
        onProjectSelect={setSelectedProject}
      />
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
```

### 2. **Context for Global State**
For theme, user preferences, etc.:

```typescript
// Theme context
const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>()

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }, [])
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 3. **Custom Hooks for Reusable Logic**
Shared stateful logic across components:

```typescript
// Intersection observer hook
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    )
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, options])
  
  return isIntersecting
}
```

## Component Testing Strategies

### 1. **Unit Testing Components**
```typescript
import { render, screen } from '@testing-library/react'
import { ProjectCard } from './ProjectCard'

describe('ProjectCard', () => {
  it('displays project information correctly', () => {
    const mockProject = {
      id: '1',
      title: 'Test Project',
      description: 'A test project',
      technologies: ['React', 'TypeScript']
    }
    
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test project')).toBeInTheDocument()
  })
})
```

### 2. **Integration Testing**
```typescript
describe('ProjectsSection Integration', () => {
  it('filters projects correctly', async () => {
    render(<ProjectsSection />)
    
    // Test filter functionality
    fireEvent.click(screen.getByText('React'))
    
    await waitFor(() => {
      expect(screen.getAllByTestId('project-card')).toHaveLength(3)
    })
  })
})
```

## Performance Optimization

### 1. **React.memo for Expensive Components**
```typescript
export const ProjectCard = React.memo(function ProjectCard({ project }: ProjectCardProps) {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.project.id === nextProps.project.id
})
```

### 2. **useMemo for Expensive Calculations**
```typescript
function ProjectsGrid({ projects, searchTerm }: ProjectsGridProps) {
  const filteredProjects = useMemo(() => {
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [projects, searchTerm])
  
  return (
    <div className="grid">
      {filteredProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### 3. **Code Splitting with Dynamic Imports**
```typescript
// Lazy load heavy components
const ProjectModal = lazy(() => import('./ProjectModal'))
const ContactForm = lazy(() => import('./ContactForm'))

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <ProjectModal project={selectedProject} />
</Suspense>
```

## Accessibility Best Practices

### 1. **Semantic HTML Structure**
```typescript
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card">
      <header>
        <h3>{project.title}</h3>
      </header>
      <p>{project.description}</p>
      <footer>
        <a href={project.url} aria-label={`View ${project.title} project`}>
          View Project
        </a>
      </footer>
    </article>
  )
}
```

### 2. **Keyboard Navigation**
```typescript
function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }
  
  return (
    <nav onKeyDown={handleKeyDown}>
      {/* Navigation items */}
    </nav>
  )
}
```

### 3. **ARIA Attributes**
```typescript
function SearchInput({ onSearch }: SearchInputProps) {
  return (
    <div role="search">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        placeholder="Search projects..."
        aria-describedby="search-help"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div id="search-help" className="sr-only">
        Type to search through projects by title or technology
      </div>
    </div>
  )
}
```

## Component Documentation

### 1. **JSDoc Comments**
```typescript
/**
 * ProjectCard component displays a project with its basic information
 * 
 * @param project - The project data to display
 * @param onSelect - Callback when project is selected for detailed view
 * @param variant - Visual variant of the card
 * 
 * @example
 * <ProjectCard 
 *   project={project} 
 *   onSelect={handleProjectSelect}
 *   variant="featured"
 * />
 */
export function ProjectCard({ project, onSelect, variant = "default" }: ProjectCardProps) {
  // Implementation
}
```

### 2. **TypeScript Interfaces**
```typescript
interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  github?: string
  demo?: string
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  onSelect?: (project: Project) => void
  variant?: "default" | "featured" | "compact"
  className?: string
}
```

This component architecture provides a scalable, maintainable foundation for the portfolio website while ensuring excellent performance, accessibility, and developer experience.