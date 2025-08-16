import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  paper?: string
  featured: boolean
}

interface ProjectsProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="mb-20">
      <h2 className="section-heading">Projects</h2>
      
      {/* Featured Projects */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {featuredProjects.map((project) => (
          <div key={project.id} className="bg-card border border-border rounded-lg p-6 card-hover">
            {/* Project Preview Placeholder */}
            <div className="w-full h-32 bg-gradient-to-br from-accent/10 to-accent/20 rounded-md mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {project.description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex space-x-4">
              {project.github && (
                <Link href={project.github} className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </Link>
              )}
              {project.demo && (
                <Link href={project.demo === '#' ? '#projects' : project.demo} className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {project.demo === '#' ? 'Coming Soon' : 'Demo'}
                </Link>
              )}
              {project.paper && (
                <Link href={project.paper === '#' ? '#publications' : project.paper} className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {project.paper === '#' ? 'Paper' : 'Paper'}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <>
          <h3 className="font-semibold mb-4">Other Projects</h3>
          <div className="grid gap-4">
            {otherProjects.map((project) => (
              <div key={project.id} className="border-l-2 border-border pl-4 hover:border-accent transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex space-x-4">
                      {project.github && (
                        <Link href={project.github} className="text-sm text-accent link-hover">
                          GitHub
                        </Link>
                      )}
                      {project.demo && (
                        <Link href={project.demo} className="text-sm text-accent link-hover">
                          Demo
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}