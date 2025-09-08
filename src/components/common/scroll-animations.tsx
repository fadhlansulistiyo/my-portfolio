"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

// Reading progress indicator
export function ReadingProgress({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setProgress(progress)
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-1 bg-muted/30 z-50",
        className
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Scroll to top button
export function ScrollToTop({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!isVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 z-40 shadow-lg transition-all duration-300",
        "hover:shadow-xl hover:scale-110",
        className
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}

// Fade in animation hook
export function useFadeInAnimation(options?: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (options?.triggerOnce !== false) {
            observer.unobserve(entry.target)
          }
        } else if (options?.triggerOnce === false) {
          setIsVisible(false)
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "0px"
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return { ref, isVisible }
}

// Fade in animation component
interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  threshold?: number
  triggerOnce?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  threshold = 0.1,
  triggerOnce = true
}: FadeInProps) {
  const { ref, isVisible } = useFadeInAnimation({ 
    threshold, 
    triggerOnce 
  })

  const directionClasses = {
    up: "translate-y-8",
    down: "translate-y-[-2rem]",
    left: "translate-x-[-2rem]", 
    right: "translate-x-8",
    none: ""
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        !isVisible && [
          "opacity-0",
          direction !== "none" && directionClasses[direction]
        ],
        isVisible && "opacity-100 translate-x-0 translate-y-0",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Stagger animation for lists
interface StaggerProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  initialDelay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function Stagger({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  direction = "up"
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeIn
          key={index}
          delay={initialDelay + index * staggerDelay}
          direction={direction}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

// Parallax scroll effect
interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
}

export function Parallax({ 
  children, 
  className, 
  speed = 0.5,
  offset = 0 
}: ParallaxProps) {
  const [offsetY, setOffsetY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY
        const rate = scrollY * speed
        setOffsetY(rate + offset)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, offset])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offsetY}px)`
      }}
    >
      {children}
    </div>
  )
}

// Scroll reveal component with multiple animation options
interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  animation?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "flip"
  delay?: number
  duration?: number
  threshold?: number
  triggerOnce?: boolean
  distance?: number
}

export function ScrollReveal({
  children,
  className,
  animation = "fade",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  distance = 50
}: ScrollRevealProps) {
  const { ref, isVisible } = useFadeInAnimation({ 
    threshold, 
    triggerOnce 
  })

  const getAnimationClasses = () => {
    const baseClasses = "transition-all ease-out"
    
    if (!isVisible) {
      switch (animation) {
        case "fade":
          return `${baseClasses} opacity-0`
        case "slide-up":
          return `${baseClasses} opacity-0 translate-y-[${distance}px]`
        case "slide-down":
          return `${baseClasses} opacity-0 translate-y-[-${distance}px]`
        case "slide-left":
          return `${baseClasses} opacity-0 translate-x-[${distance}px]`
        case "slide-right":
          return `${baseClasses} opacity-0 translate-x-[-${distance}px]`
        case "zoom":
          return `${baseClasses} opacity-0 scale-95`
        case "flip":
          return `${baseClasses} opacity-0 rotateX-90`
        default:
          return `${baseClasses} opacity-0`
      }
    }
    
    return `${baseClasses} opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0`
  }

  return (
    <div
      ref={ref}
      className={cn(getAnimationClasses(), className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Section navigation dots
interface SectionDotsProps {
  sections: { id: string; name: string }[]
  className?: string
}

export function SectionDots({ sections, className }: SectionDotsProps) {
  const [activeSection, setActiveSection] = useState("")

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

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
      })
    }
  }

  return (
    <nav className={cn(
      "fixed right-8 top-1/2 transform -translate-y-1/2 z-40",
      "hidden lg:flex flex-col space-y-3",
      className
    )}>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={cn(
            "w-3 h-3 rounded-full border-2 transition-all duration-200",
            "hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            activeSection === section.id
              ? "bg-primary border-primary"
              : "bg-background border-muted-foreground/30 hover:border-primary"
          )}
          aria-label={`Go to ${section.name} section`}
          title={section.name}
        />
      ))}
    </nav>
  )
}

// Mouse follower animation (decorative)
export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50",
        "transition-all duration-100 ease-out",
        !isVisible && "opacity-0 scale-0"
      )}
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
      }}
    />
  )
}