interface ResearchArea {
  id: number
  title: string
  description: string
  icon: string
}

interface ResearchProps {
  research: ResearchArea[]
}

export default function ResearchSection({ research }: ResearchProps) {
  return (
    <section id="research" className="mb-20">
      <h2 className="section-heading">Current Research</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {research.map((area) => (
          <div key={area.id} className="p-6 border border-border rounded-lg hover:border-accent transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{area.icon}</span>
              <div>
                <h3 className="font-semibold mb-2">{area.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}