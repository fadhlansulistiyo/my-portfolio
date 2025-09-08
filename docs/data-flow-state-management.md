# Data Flow & State Management Architecture

## State Management Strategy

### State Classification

#### 1. **Server State**
Data fetched from external sources (APIs, CMS, files):

```typescript
// Types for server data
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
  featured: boolean
  category: string
  createdAt: string
}

interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
}

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  tags: string[]
}
```

**Management Approach:**
- Static data in JSON/MDX files for build-time optimization
- Custom hooks for data fetching and caching
- Error boundaries for graceful error handling

```typescript
// Custom hook for projects data
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, this could be an API call
        const response = await import('@/data/projects.json')
        setProjects(response.default)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProjects()
  }, [])
  
  return { projects, loading, error }
}
```

#### 2. **Client State**
Application state managed on the client side:

```typescript
// UI State
interface UIState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  activeSection: string
  searchQuery: string
  filterCategory: string
}

// Form State
interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
}

// Modal/Dialog State
interface ModalState {
  isOpen: boolean
  type: 'project' | 'contact' | 'about' | null
  data: any
}
```

## State Management Patterns

### 1. **Context + useReducer Pattern**
For complex global state that needs to be shared across components:

```typescript
// Theme State Management
interface ThemeState {
  theme: 'light' | 'dark' | 'system'
  systemPreference: 'light' | 'dark'
}

type ThemeAction = 
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_SYSTEM_PREFERENCE'; payload: 'light' | 'dark' }

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_SYSTEM_PREFERENCE':
      return { ...state, systemPreference: action.payload }
    default:
      return state
  }
}

// Theme Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'system',
    systemPreference: 'light'
  })
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      dispatch({
        type: 'SET_SYSTEM_PREFERENCE',
        payload: e.matches ? 'dark' : 'light'
      })
    }
    
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  const resolvedTheme = state.theme === 'system' 
    ? state.systemPreference 
    : state.theme
  
  const value = {
    theme: state.theme,
    resolvedTheme,
    setTheme: (theme: 'light' | 'dark' | 'system') =>
      dispatch({ type: 'SET_THEME', payload: theme })
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 2. **Custom Hooks Pattern**
For reusable stateful logic:

```typescript
// Local Storage Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])
  
  return [storedValue, setValue] as const
}

// Form Hook
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])
  
  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])
  
  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])
  
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setError,
    handleBlur,
    setIsSubmitting,
    reset
  }
}
```

### 3. **Modal/Dialog State Management**
Centralized modal management:

```typescript
interface ModalState {
  isOpen: boolean
  type: string | null
  props: Record<string, any>
}

type ModalAction = 
  | { type: 'OPEN_MODAL'; payload: { type: string; props?: Record<string, any> } }
  | { type: 'CLOSE_MODAL' }

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        type: action.payload.type,
        props: action.payload.props || {}
      }
    case 'CLOSE_MODAL':
      return {
        isOpen: false,
        type: null,
        props: {}
      }
    default:
      return state
  }
}

export function useModal() {
  const [state, dispatch] = useReducer(modalReducer, {
    isOpen: false,
    type: null,
    props: {}
  })
  
  const openModal = useCallback((type: string, props?: Record<string, any>) => {
    dispatch({ type: 'OPEN_MODAL', payload: { type, props } })
  }, [])
  
  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' })
  }, [])
  
  return { ...state, openModal, closeModal }
}
```

## Data Flow Architecture

### 1. **Unidirectional Data Flow**
```
Server Data → Custom Hooks → Components → UI Updates
     ↓              ↓             ↓
  Static Files → useProjects → ProjectGrid → Project Cards
```

### 2. **Event Flow Pattern**
```
User Interaction → Event Handler → State Update → Component Re-render
        ↓              ↓              ↓               ↓
   Button Click → onClick() → setSelectedProject → ProjectModal Opens
```

### 3. **Form Data Flow**
```
User Input → Form Hook → Validation → Submission → Success/Error State
     ↓           ↓           ↓           ↓              ↓
 Type Email → useForm → validate() → submitForm → Show Toast
```

## Error Handling Patterns

### 1. **Error Boundaries**
```typescript
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }
    
    return this.props.children
  }
}
```

### 2. **Async Error Handling**
```typescript
export function useAsyncOperation<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const execute = useCallback(async (operation: () => Promise<T>) => {
    try {
      setLoading(true)
      setError(null)
      const result = await operation()
      setData(result)
      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])
  
  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])
  
  return { data, loading, error, execute, reset }
}
```

## Data Persistence Patterns

### 1. **Local Storage for User Preferences**
```typescript
// Theme persistence
export function usePersistedTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system')
  
  useEffect(() => {
    const root = document.documentElement
    const resolvedTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [theme])
  
  return [theme, setTheme] as const
}

// Filter preferences persistence
export function usePersistedFilters() {
  const [filters, setFilters] = useLocalStorage('project-filters', {
    category: 'all',
    sortBy: 'date',
    search: ''
  })
  
  return [filters, setFilters] as const
}
```

### 2. **Session Storage for Temporary Data**
```typescript
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })
  
  const setStoredValue = useCallback((value: T) => {
    try {
      setValue(value)
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to sessionStorage:', error)
    }
  }, [key])
  
  return [value, setStoredValue] as const
}
```

## Performance Optimization Patterns

### 1. **Memoization Strategies**
```typescript
// Expensive computations
export function useFilteredProjects(projects: Project[], filters: FilterState) {
  return useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = filters.category === 'all' || project.category === filters.category
      const matchesSearch = project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          project.description.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesSearch
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }, [projects, filters])
}

// Component memoization
export const ProjectCard = memo(({ project }: { project: Project }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.project.id === nextProps.project.id
})
```

### 2. **Debounced Updates**
```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}

// Usage in search
function ProjectSearch() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  
  // Use debouncedSearch for actual filtering
  const filteredProjects = useFilteredProjects(projects, {
    ...filters,
    search: debouncedSearch
  })
  
  return (
    <input 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search projects..."
    />
  )
}
```

## Data Validation Patterns

### 1. **Schema Validation**
```typescript
// Zod schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional()
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function useContactForm() {
  const form = useForm<ContactFormData>({
    name: '',
    email: '',
    message: '',
    subject: ''
  })
  
  const validate = useCallback((data: ContactFormData) => {
    try {
      contactFormSchema.parse(data)
      return {}
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors
      }
      return { general: 'Validation failed' }
    }
  }, [])
  
  const submitForm = useCallback(async (data: ContactFormData) => {
    const errors = validate(data)
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        form.setError(field as keyof ContactFormData, message[0])
      })
      return false
    }
    
    form.setIsSubmitting(true)
    try {
      // Submit form data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      form.reset()
      return true
    } catch (error) {
      form.setError('general', 'Failed to send message. Please try again.')
      return false
    } finally {
      form.setIsSubmitting(false)
    }
  }, [form, validate])
  
  return { ...form, submitForm }
}
```

This data flow and state management architecture ensures predictable, maintainable, and performant state handling throughout the portfolio application while providing excellent developer experience and user experience.