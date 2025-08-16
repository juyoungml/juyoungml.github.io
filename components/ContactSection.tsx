import Link from 'next/link'

interface ContactProps {
  email: string
  github: string
  linkedin: string
  googleScholar: string
}

export default function ContactSection({ email, github, linkedin, googleScholar }: ContactProps) {
  return (
    <section id="contact" className="mb-20">
      <h2 className="section-heading">Contact</h2>
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          Feel free to reach out for research collaborations or discussions.
        </p>
        <div className="flex flex-col space-y-2">
          <div>
            <span className="font-medium">Email:</span>{' '}
            <Link href={`mailto:${email}`} className="text-accent link-hover">
              {email}
            </Link>
          </div>
          <div>
            <span className="font-medium">GitHub:</span>{' '}
            <Link href={github} className="text-accent link-hover">
              {github.replace('https://', '')}
            </Link>
          </div>
          <div>
            <span className="font-medium">Google Scholar:</span>{' '}
            <Link href={googleScholar} className="text-accent link-hover">
              Scholar Profile
            </Link>
          </div>
          <div>
            <span className="font-medium">LinkedIn:</span>{' '}
            <Link href={linkedin} className="text-accent link-hover">
              LinkedIn Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}