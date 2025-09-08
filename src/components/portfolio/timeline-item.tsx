"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ExternalLink, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface TimelineData {
  id: string
  title: string
  company: string
  location: string
  type: "work" | "education" | "project" | "achievement"
  startDate: Date
  endDate?: Date | "present"
  description: string
  highlights?: string[]
  skills?: string[]
  url?: string
  logo?: string
  current?: boolean
}

interface TimelineItemProps {
  item: TimelineData
  className?: string
  variant?: "default" | "compact" | "detailed"
  showConnector?: boolean
  isLast?: boolean
}

export function TimelineItem({
  item,
  className,
  variant = "default",
  showConnector = true,
  isLast = false
}: TimelineItemProps) {
  const isCompact = variant === "compact"
  
  const formatDate = (date: Date | "present") => {
    if (date === "present") return "Present"
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      year: "numeric" 
    })
  }

  const getDuration = () => {
    const end = item.endDate === "present" ? new Date() : item.endDate
    if (!end) return ""
    
    const start = item.startDate
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`
    }
    
    const years = Math.floor(diffMonths / 12)
    const months = diffMonths % 12
    
    if (months === 0) {
      return `${years} year${years > 1 ? 's' : ''}`
    }
    
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
  }

  const typeColors = {
    work: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    education: "bg-green-500/10 text-green-700 border-green-500/20", 
    project: "bg-purple-500/10 text-purple-700 border-purple-500/20",
    achievement: "bg-orange-500/10 text-orange-700 border-orange-500/20"
  }

  const typeIcons = {
    work: Building,
    education: Calendar,
    project: ExternalLink,
    achievement: Calendar
  }

  const Icon = typeIcons[item.type]

  return (
    <div className={cn("relative", className)}>
      {/* Timeline connector */}
      {showConnector && (
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border">
          {!isLast && (
            <div className="absolute top-8 w-px h-full bg-border" />
          )}
        </div>
      )}

      {/* Timeline dot */}
      {showConnector && (
        <div className={cn(
          "absolute left-2 top-6 w-4 h-4 rounded-full border-2 bg-background",
          item.current ? "border-primary bg-primary/20" : "border-border"
        )}>
          <div className={cn(
            "absolute inset-1 rounded-full",
            item.current ? "bg-primary" : "bg-muted"
          )} />
        </div>
      )}

      {/* Content */}
      <div className={cn("ml-8", showConnector && "pl-4")}>
        <Card className={cn(
          "transition-all duration-200 hover:shadow-md",
          item.current && "ring-2 ring-primary/20"
        )}>
          <CardHeader className={cn(isCompact ? "p-4" : "p-6")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs capitalize", typeColors[item.type])}
                  >
                    {item.type}
                  </Badge>
                  {item.current && (
                    <Badge variant="default" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>

                <CardTitle className={cn(
                  isCompact ? "text-lg" : "text-xl"
                )}>
                  {item.title}
                </CardTitle>
                
                <CardDescription className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    {item.company}
                    {item.url && (
                      <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(item.startDate)} - {formatDate(item.endDate || "present")}
                      </span>
                      <span className="text-muted-foreground">
                        ({getDuration()})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className={cn(isCompact ? "p-4 pt-0" : "p-6 pt-0")}>
            <div className="space-y-4">
              <p className={cn(
                "leading-relaxed",
                isCompact ? "text-sm" : "text-base"
              )}>
                {item.description}
              </p>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && !isCompact && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Key Highlights
                  </h5>
                  <ul className="space-y-1 text-sm">
                    {item.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {item.skills && item.skills.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-muted-foreground">
                    Technologies & Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Timeline container component
interface TimelineProps {
  items: TimelineData[]
  className?: string
  variant?: "default" | "compact" | "detailed"
  title?: string
}

export function Timeline({
  items,
  className,
  variant = "default",
  title
}: TimelineProps) {
  const sortedItems = items.sort((a, b) => {
    const aDate = a.endDate === "present" ? new Date() : (a.endDate || a.startDate)
    const bDate = b.endDate === "present" ? new Date() : (b.endDate || b.startDate)
    return bDate.getTime() - aDate.getTime()
  })

  return (
    <div className={cn("space-y-6", className)}>
      {title && (
        <div className="space-y-2">
          <h3 className="heading-3">{title}</h3>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </div>
      )}
      
      <div className="space-y-6">
        {sortedItems.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            variant={variant}
            isLast={index === sortedItems.length - 1}
          />
        ))}
      </div>
    </div>
  )
}