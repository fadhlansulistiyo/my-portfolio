"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionWrapper, SectionHeader } from "./section-wrapper"
import { ProjectCard } from "@/components/portfolio/project-card"
import { projectsData, projectCategories } from "@/lib/data/portfolio-data"
import { Filter, Grid, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectsSectionProps {
  className?: string
}

type ViewMode = "grid" | "list"

export function ProjectsSection({ className }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter)

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  return (
    <SectionWrapper 
      id="projects"
      className={className}
    >
      <SectionHeader
        title="My Projects"
        subtitle="Showcasing my latest work and technical expertise"
        centered
      />
      <div className="space-y-8">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex gap-2">
              {projectCategories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeFilter === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category.value)}
                  className="whitespace-nowrap"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {activeFilter !== "all" && (
              <span> in <Badge variant="outline" className="ml-1 text-xs">
                {projectCategories.find(c => c.value === activeFilter)?.label}
              </Badge></span>
            )}
          </p>
          
          {activeFilter !== "all" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveFilter("all")}
              className="text-xs"
            >
              Clear filter
            </Button>
          )}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="gap-1">
                ⭐ Featured Projects
              </Badge>
              <div className="flex-1 h-px bg-border" />
            </div>
            
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" 
                ? "md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant={viewMode === "list" ? "compact" : "featured"}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        {regularProjects.length > 0 && (
          <div className="space-y-6">
            {featuredProjects.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  All Projects
                </Badge>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}
            
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" 
                ? "md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {regularProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant={viewMode === "list" ? "compact" : "default"}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Filter className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No projects found</h3>
                  <p className="text-muted-foreground">
                    No projects match the current filter. Try selecting a different category.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveFilter("all")}
                >
                  Show all projects
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {projectsData.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Projects
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {projectsData.filter(p => p.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Completed
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {projectsData.filter(p => p.status === "in-progress").length}
              </div>
              <div className="text-sm text-muted-foreground">
                In Progress
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {[...new Set(projectsData.flatMap(p => p.technologies))].length}
              </div>
              <div className="text-sm text-muted-foreground">
                Technologies
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Interested in working together?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I&apos;m always looking for new challenges and exciting projects. 
                Let&apos;s discuss how we can bring your ideas to life.
              </p>
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Get In Touch
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}