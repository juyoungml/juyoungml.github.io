import Link from 'next/link'

interface Publication {
  id: number
  title: string
  authors: string
  venue: string
  year: number
  abstract: string
  links: {
    paper?: string
    code?: string
    arxiv?: string
    slides?: string
  }
}

interface PublicationsProps {
  publications: Publication[]
}

function highlightAuthorName(authorString: string, targetName: string): JSX.Element {
  // Split the author string by commas and highlight target name
  const authors = authorString.split(',').map(author => author.trim())
  
  // Find the index of the target author (Juyoung Suk)
  const targetIndex = authors.findIndex(author => 
    author.toLowerCase().includes('juyoung suk') || 
    author.toLowerCase().includes('j suk') || 
    author.toLowerCase().includes('juyoung')
  )
  
  // If author list is too long (>6 authors), show first few, target author, and "..."
  if (authors.length > 6) {
    let displayAuthors = []
    
    if (targetIndex <= 3) {
      // Target is in first few, show first 4 + "..."
      displayAuthors = authors.slice(0, 4)
      displayAuthors.push('...')
    } else {
      // Target is later, show first 2, target, "..."
      displayAuthors = authors.slice(0, 2)
      if (targetIndex > 2) {
        displayAuthors.push(authors[targetIndex])
      }
      displayAuthors.push('...')
    }
    
    return (
      <span>
        {displayAuthors.map((author, index) => {
          const isTarget = author !== '...' && (
            author.toLowerCase().includes('juyoung suk') || 
            author.toLowerCase().includes('j suk') || 
            author.toLowerCase().includes('juyoung')
          )
          return (
            <span key={index}>
              {isTarget ? <strong>{author}</strong> : author}
              {index < displayAuthors.length - 1 && ', '}
            </span>
          )
        })}
      </span>
    )
  }
  
  // Normal case: show all authors
  return (
    <span>
      {authors.map((author, index) => {
        const isTarget = author.toLowerCase().includes('juyoung suk') || 
                        author.toLowerCase().includes('j suk') || 
                        author.toLowerCase().includes('juyoung')
        return (
          <span key={index}>
            {isTarget ? <strong>{author}</strong> : author}
            {index < authors.length - 1 && ', '}
          </span>
        )
      })}
    </span>
  )
}

export default function PublicationsSection({ publications }: PublicationsProps) {
  // Sort publications by year (most recent first)
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year)

  return (
    <section id="publications" className="mb-20">
      <h2 className="section-heading">Publications</h2>
      <div className="space-y-4">
        {sortedPublications.map((pub) => (
          <article key={pub.id} className="bg-card border border-border rounded-lg p-5 card-hover">
            <div className="flex items-start gap-4">
              {/* Paper Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mt-1">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-foreground mb-2 leading-snug hover:text-accent cursor-pointer transition-colors">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {highlightAuthorName(pub.authors, 'Juyoung Suk')}
                </p>
                <p className="text-sm text-accent font-medium mb-3">
                  <span className="italic">{pub.venue}</span> • {pub.year}
                </p>
                
                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  {pub.links.arxiv && (
                    <Link 
                      href={pub.links.arxiv} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-md text-sm font-medium hover:bg-accent/20 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      arXiv
                    </Link>
                  )}
                  {pub.links.paper && (
                    <Link 
                      href={pub.links.paper} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/60 text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Paper
                    </Link>
                  )}
                  {pub.links.code && (
                    <Link 
                      href={pub.links.code} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/60 text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </Link>
                  )}
                  {pub.links.slides && (
                    <Link 
                      href={pub.links.slides} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/60 text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                      </svg>
                      Slides
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}