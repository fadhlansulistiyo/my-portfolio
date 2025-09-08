"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export interface SkillData {
  name: string
  category: "frontend" | "backend" | "database" | "devops" | "mobile" | "tools" | "soft-skills"
  proficiency: 1 | 2 | 3 | 4 | 5 // 1 = Beginner, 5 = Expert
  experience?: string // e.g., "2 years", "6 months"
  icon?: ReactNode
  description?: string
  projects?: number // number of projects used in
}

interface SkillBadgeProps {
  skill: SkillData
  variant?: "default" | "detailed" | "minimal" | "with-progress"
  showProficiency?: boolean
  showTooltip?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

const categoryColors = {
  frontend: "bg-blue-500/10 text-blue-700 border-blue-500/20 hover:bg-blue-500/20 dark:text-blue-300",
  backend: "bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20 dark:text-green-300",
  database: "bg-purple-500/10 text-purple-700 border-purple-500/20 hover:bg-purple-500/20 dark:text-purple-300",
  devops: "bg-orange-500/10 text-orange-700 border-orange-500/20 hover:bg-orange-500/20 dark:text-orange-300",
  mobile: "bg-pink-500/10 text-pink-700 border-pink-500/20 hover:bg-pink-500/20 dark:text-pink-300",
  tools: "bg-gray-500/10 text-gray-700 border-gray-500/20 hover:bg-gray-500/20 dark:text-gray-300",
  "soft-skills": "bg-indigo-500/10 text-indigo-700 border-indigo-500/20 hover:bg-indigo-500/20 dark:text-indigo-300",
} as const

const proficiencyLabels = {
  1: "Beginner",
  2: "Learning",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert"
} as const

const proficiencyColors = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-blue-500",
  5: "bg-green-500"
} as const

export function SkillBadge({
  skill,
  variant = "default",
  showProficiency = false,
  showTooltip = true,
  className,
  size = "md"
}: SkillBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  }

  const BadgeContent = () => {
    switch (variant) {
      case "minimal":
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "transition-colors cursor-default",
              categoryColors[skill.category],
              sizeClasses[size],
              className
            )}
          >
            <span className="flex items-center gap-2">
              {skill.icon && <span className="h-4 w-4">{skill.icon}</span>}
              {skill.name}
            </span>
          </Badge>
        )

      case "detailed":
        return (
          <div className={cn(
            "inline-flex flex-col gap-1 p-3 rounded-lg border transition-colors cursor-default",
            categoryColors[skill.category],
            className
          )}>
            <div className="flex items-center gap-2">
              {skill.icon && <span className="h-5 w-5">{skill.icon}</span>}
              <span className="font-medium">{skill.name}</span>
            </div>
            {showProficiency && (
              <div className="flex items-center gap-2 text-xs">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        i < skill.proficiency 
                          ? proficiencyColors[skill.proficiency]
                          : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {proficiencyLabels[skill.proficiency]}
                </span>
              </div>
            )}
            {skill.experience && (
              <span className="text-xs text-muted-foreground">
                {skill.experience}
              </span>
            )}
          </div>
        )

      case "with-progress":
        return (
          <div className={cn(
            "inline-flex flex-col gap-2 p-3 rounded-lg border transition-colors cursor-default min-w-[120px]",
            categoryColors[skill.category],
            className
          )}>
            <div className="flex items-center gap-2">
              {skill.icon && <span className="h-4 w-4">{skill.icon}</span>}
              <span className="font-medium text-sm">{skill.name}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">
                  {proficiencyLabels[skill.proficiency]}
                </span>
                <span className="text-muted-foreground">
                  {skill.proficiency}/5
                </span>
              </div>
              <Progress 
                value={skill.proficiency * 20} 
                className="h-1.5"
              />
            </div>
          </div>
        )

      default:
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "transition-colors cursor-default",
              categoryColors[skill.category],
              sizeClasses[size],
              showProficiency && "gap-2",
              className
            )}
          >
            <span className="flex items-center gap-2">
              {skill.icon && <span className="h-4 w-4">{skill.icon}</span>}
              {skill.name}
              {showProficiency && (
                <span className="flex gap-0.5">
                  {Array.from({ length: skill.proficiency }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        proficiencyColors[skill.proficiency]
                      )}
                    />
                  ))}
                </span>
              )}
            </span>
          </Badge>
        )
    }
  }

  const TooltipWrapper = ({ children }: { children: ReactNode }) => {
    if (!showTooltip) return <>{children}</>
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{skill.name}</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {skill.category.replace("-", " ")}
                </Badge>
              </div>
              
              {skill.description && (
                <p className="text-sm text-muted-foreground">
                  {skill.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Level: {proficiencyLabels[skill.proficiency]}</span>
                {skill.experience && <span>• {skill.experience}</span>}
                {skill.projects && (
                  <span>• Used in {skill.projects} projects</span>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipWrapper>
      <BadgeContent />
    </TooltipWrapper>
  )
}

// Utility component for grouping skills by category
interface SkillsGroupProps {
  skills: SkillData[]
  title: string
  variant?: "default" | "detailed" | "minimal" | "with-progress"
  showProficiency?: boolean
  className?: string
}

export function SkillsGroup({
  skills,
  title,
  variant = "default",
  showProficiency = false,
  className
}: SkillsGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            variant={variant}
            showProficiency={showProficiency}
          />
        ))}
      </div>
    </div>
  )
}