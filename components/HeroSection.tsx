import Image from 'next/image'

interface HeroProps {
  name: string
  title: string
  bio: string
  profileImage: string
}

export default function HeroSection({ name, title, bio, profileImage }: HeroProps) {
  return (
    <section className="mb-24 pt-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Profile Image */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-amber-100 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shadow-sm">
              <span className="text-4xl md:text-5xl font-serif font-medium">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          {/* Future: Replace with actual image */}
          {/* <Image
            src={profileImage}
            alt={name}
            fill
            className="rounded-full object-cover shadow-lg"
            priority
          /> */}
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
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              Get in Touch
            </button>
            <button 
              onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 border border-border text-foreground rounded-md font-medium hover:bg-muted transition-colors duration-200"
            >
              View Publications
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}