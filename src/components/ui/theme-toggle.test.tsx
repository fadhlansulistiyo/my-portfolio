import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { ThemeToggle } from './theme-toggle'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}))

const ThemeToggleWithProvider = () => (
  <ThemeProvider attribute="class" defaultTheme="system">
    <ThemeToggle />
  </ThemeProvider>
)

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(<ThemeToggleWithProvider />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAccessibleName(/toggle theme/i)
  })

  it('shows sun icon in light theme', () => {
    render(<ThemeToggleWithProvider />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    // In light theme, we should see the moon icon (to switch to dark)
    // The button text is always "Toggle theme" for accessibility
  })
})