import Link from 'next/link'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()
    
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-border/20 z-40">
      <div 
        className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

const navItems = [
  { href: '#news', label: 'News', isPage: false },
  { href: '#projects', label: 'Projects', isPage: false },
  { href: '#publications', label: 'Publications', isPage: false },
  { href: '#experience', label: 'Experience', isPage: false },
]

export default function Navigation({ name }: { name: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}>
        <div className="max-width-container section-padding py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className={`text-lg font-serif font-semibold transition-colors duration-200 hover:text-accent ${
                isScrolled ? 'text-foreground' : 'text-foreground'
              }`}
            >
              {name}
            </Link>
            
            {/* Desktop Navigation - Simplified */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm transition-colors duration-200 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => smoothScrollTo(item.href)}
                    className={`px-3 py-2 text-sm transition-colors duration-200 rounded-md ${
                      activeSection === item.href.substring(1)
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation Controls */}
            <div className="md:hidden flex items-center space-x-1">
              <ThemeToggle />
              <button
                className="p-2 rounded-md hover:bg-muted/50 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-border/20 pt-4">
              {navItems.map((item) => (
                item.isPage ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block w-full text-left py-2 px-3 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => {
                      smoothScrollTo(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left py-2 px-3 text-sm rounded-md transition-colors ${
                      activeSection === item.href.substring(1)
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          )}
        </div>
      </nav>
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Spacer to prevent content from being hidden under fixed nav */}
      <div className="h-16" />
    </>
  )
}