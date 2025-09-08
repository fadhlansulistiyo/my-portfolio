"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface ProjectData {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category: "web" | "mobile" | "desktop" | "fullstack" | "other"
  status: "completed" | "in-progress" | "planned"
  year: number
}

interface ProjectCardProps {
  project: ProjectData
  className?: string
  variant?: "default" | "featured" | "compact"
  showActions?: boolean
}

export function ProjectCard({ 
  project, 
  className,
  variant = "default",
  showActions = true 
}: ProjectCardProps) {
  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"
  
  return (
    <Card 
      className={cn(
        "card-interactive group overflow-hidden",
        isFeatured && "ring-2 ring-primary/20",
        className
      )}
    >
      {/* Project Image */}
      <div className={cn(
        "relative overflow-hidden",
        isCompact ? "aspect-video" : "aspect-[4/3]"
      )}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={
              project.status === "completed" ? "default" : 
              project.status === "in-progress" ? "secondary" : 
              "outline"
            }
            className="text-xs"
          >
            {project.status.replace("-", " ")}
          </Badge>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="text-xs">
              Featured
            </Badge>
          </div>
        )}

        {/* Quick Actions Overlay */}
        {showActions && (project.liveUrl || project.githubUrl) && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            {project.liveUrl && (
              <Button asChild size="sm" variant="secondary" className="gap-2">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4" />
                  Preview
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild size="sm" variant="outline" className="gap-2 bg-background/90">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <CardHeader className={cn(isCompact ? "p-4" : "p-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <CardTitle className={cn(
              "line-clamp-2",
              isCompact ? "text-lg" : "text-xl"
            )}>
              {project.title}
            </CardTitle>
            {!isCompact && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{project.year}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {project.category}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn(isCompact ? "p-4 pt-0" : "p-6 pt-0")}>
        <CardDescription className={cn(
          "line-clamp-3 leading-relaxed",
          isCompact ? "text-sm" : "text-base"
        )}>
          {project.description}
        </CardDescription>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, isCompact ? 3 : 6).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > (isCompact ? 3 : 6) && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - (isCompact ? 3 : 6)} more
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardFooter className={cn(
          "border-t bg-muted/30",
          isCompact ? "p-4" : "p-6"
        )}>
          <div className="flex w-full gap-2">
            {project.liveUrl && (
              <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Source
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}