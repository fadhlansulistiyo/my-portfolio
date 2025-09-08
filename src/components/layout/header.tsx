"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Portfolio</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#about" 
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link 
              href="#experience" 
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Experience
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}