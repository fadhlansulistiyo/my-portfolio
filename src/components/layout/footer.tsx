import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaEnvelope, FaInstagram } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand & Description */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Portfolio</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Full-stack developer passionate about creating meaningful
                digital experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#projects"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="#experience"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experience
                </Link>
                <Link
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Connect</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/fadhlansulistiyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SiGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/fadhlansulistiyo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SiLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://www.instagram.com/fadhlansulistiyo.h/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaInstagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="mailto:fadhlansulistiyo@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaEnvelope className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Fadhlan Sulistiyo | Portfolio. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
