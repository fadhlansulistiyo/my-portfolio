import { render, screen } from '@testing-library/react'
import { Header } from './header'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}))

describe('Header', () => {
  it('renders the portfolio brand', () => {
    render(<Header />)
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Header />)
    
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /experience/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders theme toggle button', () => {
    render(<Header />)
    
    const themeToggle = screen.getByRole('button')
    expect(themeToggle).toBeInTheDocument()
  })

  it('has correct navigation link hrefs', () => {
    render(<Header />)
    
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact')
  })
})