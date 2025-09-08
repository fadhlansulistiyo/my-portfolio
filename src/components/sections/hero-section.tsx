"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { personalInfo, heroData } from "@/lib/data/portfolio-data";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={cn("relative p-10 lg:p-16", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

      {/* Content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Greeting & Introduction */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Available for work</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-muted-foreground">
                    {heroData.greeting}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    {heroData.name}
                  </span>
                </h1>

                <div className="flex items-center gap-3 mt-4">
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {heroData.title}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {heroData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group gap-2"
                onClick={() => scrollToSection(heroData.cta.primary.href)}
              >
                {heroData.cta.primary.text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => scrollToSection(heroData.cta.secondary.href)}
              >
                {heroData.cta.secondary.text}
                <Mail className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="lg" className="gap-2" asChild>
                <Link
                  href={personalInfo.social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Connect with me:
              </span>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="p-2" asChild>
                  <Link
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="ghost" size="sm" className="p-2" asChild>
                  <Link
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="ghost" size="sm" className="p-2" asChild>
                  <Link
                    href={`mailto:${personalInfo.email}`}
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {heroData.stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Achievement */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium text-primary">
                      Latest Achievement
                    </span>
                  </div>
                  <h3 className="font-semibold">
                    Led migration to microservices architecture
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Successfully improved system scalability by 300% at current
                    role
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Let&apos;s work together</h4>
                  <p className="text-sm text-muted-foreground">
                    I&apos;m always interested in new opportunities and exciting
                    projects.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => scrollToSection("#contact")}
                  >
                    <Mail className="h-4 w-4" />
                    Let&apos;s talk
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
