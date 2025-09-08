"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Generic loading spinner
export function LoadingSpinner({ 
  className, 
  size = "md" 
}: { 
  className?: string
  size?: "sm" | "md" | "lg" | "xl" 
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  }

  return (
    <div 
      className={cn(
        "animate-spin rounded-full border-2 border-muted border-t-primary",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Page loading overlay
export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" />
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      </div>
    </div>
  )
}

// Section loading state
export function SectionLoader({ 
  className,
  message = "Loading content..."
}: { 
  className?: string
  message?: string 
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 space-y-4", className)}>
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">
        {message}
      </p>
    </div>
  )
}

// Project card skeleton
export function ProjectCardSkeleton({ 
  className,
  variant = "default" 
}: { 
  className?: string
  variant?: "default" | "featured" | "compact"
}) {
  const isCompact = variant === "compact"
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      {/* Image skeleton */}
      <Skeleton className={cn(
        "w-full",
        isCompact ? "aspect-video" : "aspect-[4/3]"
      )} />
      
      <CardHeader className={cn(isCompact ? "p-4" : "p-6")}>
        <div className="space-y-2">
          <Skeleton className={cn("h-6 w-3/4", isCompact && "h-5")} />
          {!isCompact && (
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={cn(isCompact ? "p-4 pt-0" : "p-6 pt-0")}>
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: isCompact ? 3 : 5 }, (_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={cn("border-t bg-muted/30", isCompact ? "p-4" : "p-6")}>
        <div className="flex gap-2 w-full">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardFooter>
    </Card>
  )
}

// Timeline item skeleton
export function TimelineItemSkeleton({ 
  className,
  showConnector = true 
}: { 
  className?: string
  showConnector?: boolean
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline connector */}
      {showConnector && (
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      )}
      
      {/* Timeline dot */}
      {showConnector && (
        <div className="absolute left-2 top-6 w-4 h-4 rounded-full border-2 border-border bg-background">
          <div className="absolute inset-1 rounded-full bg-muted" />
        </div>
      )}
      
      {/* Content */}
      <div className={cn("ml-8", showConnector && "pl-4")}>
        <Card>
          <CardHeader className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-7 w-2/3" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Skill badge skeleton
export function SkillBadgeSkeleton({ 
  className,
  count = 8 
}: { 
  className?: string
  count?: number
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
  )
}

// Skills group skeleton
export function SkillsGroupSkeleton({ 
  className 
}: { 
  className?: string 
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-4 w-32" />
      <SkillBadgeSkeleton />
    </div>
  )
}

// Hero section skeleton
export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("text-center space-y-8", className)}>
      <div className="space-y-4">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <div className="space-y-2 max-w-2xl mx-auto">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5 mx-auto" />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

// Grid skeleton for project/content grids
export function GridSkeleton({
  className,
  itemComponent: ItemComponent = ProjectCardSkeleton,
  itemCount = 6,
  itemProps = {}
}: {
  className?: string
  itemComponent?: React.ComponentType<{ 
    className?: string
    variant?: "default" | "featured" | "compact"
  }>
  itemCount?: number
  itemProps?: Record<string, unknown>
}) {
  return (
    <div className={cn(
      "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
      className
    )}>
      {Array.from({ length: itemCount }, (_, i) => (
        <ItemComponent key={i} {...itemProps} />
      ))}
    </div>
  )
}

// Error state component
export function ErrorState({
  className,
  title = "Something went wrong",
  message = "We encountered an error while loading this content.",
  retry,
  retryLabel = "Try again"
}: {
  className?: string
  title?: string
  message?: string
  retry?: () => void
  retryLabel?: string
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 space-y-4 text-center",
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <span className="text-2xl">⚠️</span>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {message}
        </p>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {retryLabel}
        </button>
      )}
    </div>
  )
}

// Empty state component
export function EmptyState({
  className,
  title = "No items found",
  message = "There are no items to display at the moment.",
  action,
  actionLabel
}: {
  className?: string
  title?: string
  message?: string
  action?: () => void
  actionLabel?: string
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 space-y-4 text-center",
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <span className="text-2xl text-muted-foreground">📭</span>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {message}
        </p>
      </div>
      {action && actionLabel && (
        <button
          onClick={action}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}