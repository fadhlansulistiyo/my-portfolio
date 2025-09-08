"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionWrapperProps {
  id?: string
  className?: string
  children: ReactNode
  variant?: "default" | "centered" | "full-width" | "constrained"
  background?: "default" | "muted" | "card" | "gradient"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  container?: boolean
}

const backgroundVariants = {
  default: "bg-background",
  muted: "bg-muted/30",
  card: "bg-card",
  gradient: "bg-gradient-to-br from-background to-muted/20"
} as const

const paddingVariants = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16 lg:py-20",
  lg: "py-16 md:py-24 lg:py-32", 
  xl: "py-24 md:py-32 lg:py-40"
} as const

export function SectionWrapper({
  id,
  className,
  children,
  variant = "default",
  background = "default",
  padding = "lg",
  container = true
}: SectionWrapperProps) {
  const containerClasses = container ? "container mx-auto container-padding" : ""
  
  const variantClasses = {
    default: "",
    centered: "text-center",
    "full-width": "w-full",
    constrained: "max-w-4xl mx-auto"
  }

  return (
    <section
      id={id}
      className={cn(
        "w-full transition-colors duration-300",
        backgroundVariants[background],
        paddingVariants[padding],
        className
      )}
    >
      <div className={cn(containerClasses, variantClasses[variant])}>
        {children}
      </div>
    </section>
  )
}

// Section header component for consistent title styling
interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = false,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "space-y-4 mb-12",
      centered && "text-center mx-auto max-w-3xl",
      className
    )}>
      {subtitle && (
        <p className={cn(
          "text-sm font-medium text-primary tracking-wider uppercase",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
      
      <h2 className={cn(
        "heading-2 text-balance",
        titleClassName
      )}>
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          "body-large text-muted-foreground text-balance max-w-2xl",
          centered && "mx-auto",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
      
      <div className={cn(
        "w-20 h-1 bg-primary rounded-full",
        centered && "mx-auto"
      )} />
    </div>
  )
}

// Hero section wrapper with special styling
interface HeroSectionProps {
  id?: string
  className?: string
  children: ReactNode
  background?: "default" | "gradient" | "image"
  overlay?: boolean
  minHeight?: "screen" | "large" | "medium" | "small"
}

export function HeroSection({
  id = "hero",
  className,
  children,
  background = "default",
  overlay = false,
  minHeight = "large"
}: HeroSectionProps) {
  const minHeightClasses = {
    screen: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]", 
    small: "min-h-[40vh]"
  }

  const backgroundClasses = {
    default: "bg-background",
    gradient: "bg-gradient-to-br from-background via-background to-primary/5",
    image: "bg-background relative"
  }

  return (
    <section
      id={id}
      className={cn(
        "relative w-full flex items-center justify-center",
        minHeightClasses[minHeight],
        backgroundClasses[background],
        className
      )}
    >
      {overlay && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
      )}
      
      <div className="container mx-auto container-padding relative z-20">
        <div className="flex items-center justify-center min-h-full">
          {children}
        </div>
      </div>
    </section>
  )
}

// Grid section for displaying items in a grid layout
interface GridSectionProps {
  id?: string
  title?: string
  subtitle?: string
  description?: string
  children: ReactNode
  className?: string
  headerClassName?: string
  gridClassName?: string
  background?: "default" | "muted" | "card"
  padding?: "sm" | "md" | "lg" | "xl"
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function GridSection({
  id,
  title,
  subtitle,
  description,
  children,
  className,
  headerClassName,
  gridClassName,
  background = "default",
  padding = "lg",
  columns = { default: 1, sm: 2, lg: 3 }
}: GridSectionProps) {
  const gridClasses = cn(
    "grid gap-6",
    columns.default === 1 && "grid-cols-1",
    columns.default === 2 && "grid-cols-2", 
    columns.default === 3 && "grid-cols-3",
    columns.default === 4 && "grid-cols-4",
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    gridClassName
  )

  return (
    <SectionWrapper
      id={id}
      background={background}
      padding={padding}
      className={className}
    >
      {(title || subtitle || description) && (
        <SectionHeader
          title={title || ""}
          subtitle={subtitle}
          description={description}
          centered
          className={headerClassName}
        />
      )}
      
      <div className={gridClasses}>
        {children}
      </div>
    </SectionWrapper>
  )
}

// Two column section layout
interface TwoColumnSectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: [ReactNode, ReactNode] // Exactly two children
  className?: string
  background?: "default" | "muted" | "card"
  padding?: "sm" | "md" | "lg" | "xl"
  reverse?: boolean
  verticalAlign?: "start" | "center" | "end"
  gap?: "sm" | "md" | "lg" | "xl"
}

export function TwoColumnSection({
  id,
  title,
  subtitle,
  children,
  className,
  background = "default", 
  padding = "lg",
  reverse = false,
  verticalAlign = "center",
  gap = "lg"
}: TwoColumnSectionProps) {
  const [leftContent, rightContent] = children

  const alignClasses = {
    start: "items-start",
    center: "items-center", 
    end: "items-end"
  }

  const gapClasses = {
    sm: "gap-8",
    md: "gap-12",
    lg: "gap-16",
    xl: "gap-24"
  }

  return (
    <SectionWrapper
      id={id}
      background={background}
      padding={padding}
      className={className}
    >
      {(title || subtitle) && (
        <SectionHeader
          title={title || ""}
          subtitle={subtitle}
          centered
        />
      )}
      
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2",
        alignClasses[verticalAlign],
        gapClasses[gap],
        reverse && "lg:grid-flow-col-dense [&>:first-child]:lg:col-start-2"
      )}>
        <div>{leftContent}</div>
        <div>{rightContent}</div>
      </div>
    </SectionWrapper>
  )
}

// Contact section with special styling
interface ContactSectionProps {
  id?: string
  title?: string
  subtitle?: string
  description?: string
  children: ReactNode
  className?: string
  background?: "default" | "muted" | "gradient"
}

export function ContactSection({
  id = "contact",
  title = "Get In Touch",
  subtitle = "Contact",
  description,
  children,
  className,
  background = "muted"
}: ContactSectionProps) {
  return (
    <SectionWrapper
      id={id}
      background={background}
      padding="xl"
      className={className}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
          centered
        />
        
        <div className="mt-12">
          {children}
        </div>
      </div>
    </SectionWrapper>
  )
}