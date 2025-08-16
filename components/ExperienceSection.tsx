interface Experience {
  id: number
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}

interface ExperienceProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="mb-20">
      <h2 className="section-heading">Work Experience</h2>
      
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border" />
        
        {experiences.map((exp, index) => (
          <div key={exp.id} className={`relative flex items-center mb-8 ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}>
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full border-2 border-background" />
            
            {/* Content card */}
            <div className={`ml-6 md:ml-0 flex-1 ${
              index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
            }`}>
              <div className="bg-secondary p-4 rounded-lg">
                <div className={`${index % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                  <h3 className="font-semibold text-base mb-1">{exp.role}</h3>
                  <p className="text-accent font-medium text-sm mb-1">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                  <p className="text-xs leading-relaxed mb-2">{exp.description}</p>
                  
                  {exp.highlights.length > 0 && (
                    <ul className={`text-xs space-y-0.5 ${
                      index % 2 === 0 ? 'md:text-right' : ''
                    }`}>
                      {exp.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`text-accent mr-1 ${
                            index % 2 === 0 ? 'md:order-2 md:ml-1 md:mr-0' : ''
                          }`}>•</span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {/* Spacer for alternating layout */}
            <div className="hidden md:block flex-1" />
          </div>
        ))}
      </div>
    </section>
  )
}