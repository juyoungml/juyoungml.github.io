import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
]

export default function Navigation({ name }: { name: string }) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/'
    }

    return router.pathname.startsWith(href)
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className="font-sans fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md"
      >
        <div className="research-container section-padding py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${name} — home`}
            >
              {name}
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`px-2 py-1 text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                className="rounded-md p-2 transition-colors hover:bg-muted/50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div
              id="mobile-nav"
              className="mt-4 space-y-1 border-t border-border/20 pt-4 md:hidden"
            >
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    isActive(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="h-16" />
    </>
  )
}
