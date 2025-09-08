"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, Download, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/fadhlansulistiyo",
    icon: Github,
    external: true
  },
  {
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/fadhlansulistiyo",
    icon: Linkedin,
    external: true
  },
  {
    name: "Email",
    href: "mailto:fadhlansulistiyo@gmail.com",
    icon: Mail,
    external: false
  }
] as const

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section for navigation highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { 
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0.1 
      }
    )

    // Observe all sections
    navigationItems.forEach((item) => {
      const element = document.querySelector(item.href)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    
    // Smooth scroll to section
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        })
      }
    }
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        "border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        isScrolled && "shadow-sm bg-background/98"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 interactive"
              onClick={() => handleNavClick("#")}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">FS</span>
                </div>
                <span className="font-bold text-xl gradient-text">Portfolio</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  "interactive hover:bg-accent/50",
                  activeSection === item.href.slice(1) 
                    ? "text-primary bg-accent/30" 
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Resume
              </Link>
            </Button>
            
            <div className="flex items-center space-x-1">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.name}
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-9 h-9 p-0"
                  >
                    <Link 
                      href={link.href} 
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={link.name}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                )
              })}
            </div>

            <div className="w-px h-6 bg-border mx-2" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 h-9 p-0"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  {/* Navigation Links */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                          "interactive hover:bg-accent/50",
                          activeSection === item.href.slice(1)
                            ? "text-primary bg-accent/30"
                            : "text-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className="border-t" />

                  {/* Actions */}
                  <div className="space-y-4">
                    <Button
                      asChild
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                        Download Resume
                      </Link>
                    </Button>

                    {/* Social Links */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground px-4">
                        Connect with me
                      </p>
                      <div className="space-y-2">
                        {socialLinks.map((link) => {
                          const Icon = link.icon
                          return (
                            <Button
                              key={link.name}
                              asChild
                              variant="ghost"
                              className="w-full justify-start gap-3 h-auto py-3"
                            >
                              <Link 
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                              >
                                <Icon className="h-4 w-4" />
                                {link.name}
                                {link.external && (
                                  <span className="ml-auto text-xs text-muted-foreground">
                                    Opens in new tab
                                  </span>
                                )}
                              </Link>
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}