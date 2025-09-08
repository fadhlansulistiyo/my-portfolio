"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionWrapper, SectionHeader } from "./section-wrapper"
import { Timeline } from "@/components/portfolio/timeline-item"
import { SkillsGroup } from "@/components/portfolio/skill-badge"
import { personalInfo, timelineData, skillCategories } from "@/lib/data/portfolio-data"
import { User, Briefcase, GraduationCap, Award, Code, MapPin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AboutSectionProps {
  className?: string
}

export function AboutSection({ className }: AboutSectionProps) {
  const workExperience = timelineData.filter(item => item.type === "work")
  const education = timelineData.filter(item => item.type === "education")
  // const achievements = timelineData.filter(item => item.type === "achievement")

  return (
    <SectionWrapper 
      id="about"
      className={className}
      background="muted"
    >
      <SectionHeader
        title="About Me"
        subtitle="Get to know me better"
        centered
      />
      <div className="space-y-12">
        
        {/* Personal Introduction */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Story */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  My Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {personalInfo.summary}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      What Drives Me
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Creating intuitive user experiences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Writing clean, maintainable code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Learning new technologies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Collaborating with great teams</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      Current Focus
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>Microservices architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>AI/ML integration in web apps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>Performance optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>Team mentorship</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Link 
                      href={`mailto:${personalInfo.email}`} 
                      className="hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{personalInfo.title}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <Link href={personalInfo.social.resume} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      Download Resume
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fun Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coffee consumed</span>
                    <Badge variant="secondary">1,825+ cups</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Code commits</span>
                    <Badge variant="secondary">5,000+ commits</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stack Overflow</span>
                    <Badge variant="secondary">Top 10%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Side projects</span>
                    <Badge variant="secondary">12 projects</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              {skillCategories.map((category) => (
                <SkillsGroup
                  key={category.key}
                  title={category.label}
                  skills={category.skills}
                  variant="default"
                  showProficiency={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Timeline */}
        <Tabs defaultValue="work" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="work" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="work" className="mt-8">
            <Timeline 
              items={workExperience}
              title="Professional Experience"
              variant="detailed"
            />
          </TabsContent>
          
          <TabsContent value="education" className="mt-8">
            <Timeline 
              items={education}
              title="Educational Background"
              variant="detailed"
            />
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-8">
            <div className="text-center py-12 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Achievements section coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SectionWrapper>
  )
}