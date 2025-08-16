import Image from 'next/image'

interface HeroProps {
  name: string
  title: string
  bio: string
  profileImage: string
  email: string
}

export default function HeroSection({ name, title, bio, profileImage, email }: HeroProps) {
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
            <p className="text-lg md:text-xl text-accent font-medium mb-4">
              {title}
            </p>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
            {bio}
          </p>
          
          {/* Call to Action */}
          <div className="flex flex-wrap gap-2 mt-6">
            <a 
              href={`mailto:${email}`}
              className="px-4 py-1.5 bg-accent text-accent-foreground rounded text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              Contact
            </a>
            <a 
              href="/juyoung-cv.pdf"
              download
              className="px-4 py-1.5 border border-accent text-accent rounded text-sm font-medium hover:bg-accent/10 transition-colors duration-200 inline-flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}