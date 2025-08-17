import Image from 'next/image'

interface HeroProps {
  name: string
  title: string
  bio: string
  profileImage: string
  email: string
  github?: string
  linkedin?: string
  googleScholar?: string
}

export default function HeroSection({ name, title, bio, profileImage, email, github, linkedin, googleScholar }: HeroProps) {
  return (
    <section className="mb-24 pt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Profile Image */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="rounded-lg object-cover object-bottom shadow-lg"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold mb-3 text-foreground">
              {name}
            </h1>
            
            {/* Contact buttons below name */}
            <div className="flex flex-wrap gap-3 mt-3 mb-4 justify-center md:justify-start">
              <a 
                href={`mailto:${email}`}
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              {github && (
                <a 
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {googleScholar && (
                <a 
                  href={googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Google Scholar"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 16a8 8 0 017.162-2.56L24 9.5z"/>
                  </svg>
                </a>
              )}
              <a 
                href="/juyoung-cv.pdf"
                download
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Download CV"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
            
            <p className="text-lg md:text-xl text-accent font-medium">
              {title}
            </p>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
            {bio}
          </p>
        </div>
      </div>
    </section>
  )
}