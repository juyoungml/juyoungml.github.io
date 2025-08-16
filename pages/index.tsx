import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import BackToTop from '../components/BackToTop'
import { portfolioData } from '../data/portfolio'

const Home: NextPage = () => {
  const { personal } = portfolioData

  return (
    <>
      <Head>
        <title>{personal.name} - {personal.title}</title>
        <meta name="description" content={`${personal.name} - M.S. Student in AI at KAIST. Research in language model evaluation, multilingual AI systems, and deep learning architectures.`} />
        <meta name="keywords" content="Machine Learning, AI, KAIST, Language Models, Multilingual AI, Deep Learning, Research" />
        <meta name="author" content={personal.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${personal.name} - ${personal.title}`} />
        <meta property="og:description" content="M.S. Student in AI at KAIST. Research in language model evaluation, multilingual AI systems, and deep learning architectures." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juyoungml.github.io" />
        <meta property="og:image" content="https://juyoungml.github.io/profile.jpeg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personal.name} - ${personal.title}`} />
        <meta name="twitter:description" content="M.S. Student in AI at KAIST. Research in language model evaluation, multilingual AI systems, and deep learning architectures." />
        <meta name="twitter:image" content="https://juyoungml.github.io/profile.jpeg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/profile.jpeg" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name={personal.name} />

        {/* Hero Landing */}
        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="max-width-container section-padding text-center">
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
              <Image
                src={personal.profileImage}
                alt={personal.name}
                fill
                className="rounded-lg object-cover object-bottom shadow-lg"
                priority
              />
            </div>

            {/* Main Content */}
            <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-4 text-foreground">
              {personal.name}
            </h1>
            <p className="text-xl md:text-2xl text-accent font-medium mb-6">
              {personal.title}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {personal.bio}
            </p>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/about" className="bg-card border border-border rounded-lg p-6 card-hover">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">Research, experience, publications, and projects</p>
                </div>
              </Link>

              <Link href="/blog" className="bg-card border border-border rounded-lg p-6 card-hover">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Blog</h3>
                  <p className="text-sm text-muted-foreground">Thoughts on AI research and machine learning</p>
                </div>
              </Link>

              <a href={`mailto:${personal.email}`} className="bg-card border border-border rounded-lg p-6 card-hover">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">Get in touch for collaborations</p>
                </div>
              </a>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center gap-4 mt-12">
              <a 
                href="/juyoung-cv.pdf"
                download
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors duration-200 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
              <a 
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-200 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/20">
          <div className="max-width-container section-padding py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} {personal.name}
                </p>
                <div className="flex items-center gap-3">
                  <a href={personal.github} className="text-muted-foreground hover:text-accent transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href={personal.linkedin} className="text-muted-foreground hover:text-accent transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>Built with Next.js & deployed on GitHub Pages</span>
                <span>•</span>
                <img 
                  src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fjuyoungml.github.io&count_bg=%23c2410c&title_bg=%23fefcf8&icon=&icon_color=%23E7E7E7&title=visitors&edge_flat=true" 
                  alt="Visitor counter" 
                  className="inline-block"
                />
              </div>
            </div>
          </div>
        </footer>
        
        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  )
}

export default Home