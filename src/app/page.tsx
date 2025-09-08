import { MainLayout } from "@/components/layout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Full-stack developer passionate about creating innovative digital
              experiences with modern web technologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Placeholder sections for future development */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
          <p className="text-center text-muted-foreground">
            This section will be developed in Phase 3: Core Content Pages
          </p>
        </div>
      </section>

      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
          <p className="text-center text-muted-foreground">
            Project showcase will be implemented in Phase 3: Core Content Pages
          </p>
        </div>
      </section>

      <section id="experience" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
          <p className="text-center text-muted-foreground">
            Experience timeline will be added in Phase 3: Core Content Pages
          </p>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Contact</h2>
          <p className="text-center text-muted-foreground">
            Contact form will be implemented in Phase 4: Interactive Features
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
