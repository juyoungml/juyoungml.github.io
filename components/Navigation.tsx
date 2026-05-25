import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { STRINGS } from '../lib/i18n'
import { track } from '../lib/analytics'
import { SUPPORT_KO_CHROME, type SiteLocale } from '../lib/site'

interface NavigationProps {
  name: string
  locale?: SiteLocale
}

function persistSiteLocale(locale: SiteLocale) {
  try {
    window.localStorage.setItem('site-locale', locale)
  } catch {
    /* ignore */
  }
}

export default function Navigation({ name, locale = 'en' }: NavigationProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // When KO chrome is off, render English labels everywhere — the post body
  // still respects its own locale via lang attributes.
  const chromeLocale: SiteLocale = SUPPORT_KO_CHROME ? locale : 'en'
  const s = STRINGS[chromeLocale]

  const homeHref = chromeLocale === 'ko' ? '/ko' : '/'
  const blogHref = chromeLocale === 'ko' ? '/blog/ko' : '/blog'
  const otherHref = chromeLocale === 'ko' ? '/' : '/ko'
  const otherLocale: SiteLocale = chromeLocale === 'ko' ? 'en' : 'ko'
  const otherLabel = chromeLocale === 'ko' ? 'EN' : 'KO'

  const handleLocaleToggle = () => {
    persistSiteLocale(otherLocale)
    track('site-locale-toggle', { to: otherLocale })
  }
  const navItems = [
    { href: homeHref, label: s.navHome, exact: true },
    { href: blogHref, label: s.navBlog, exact: false },
  ]

  const isActive = (href: string, exact: boolean) =>
    exact ? router.pathname === href : router.pathname.startsWith(href)

  return (
    <>
      <nav
        aria-label="Primary"
        className="font-sans fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md"
      >
        <div className="research-container section-padding py-4">
          <div className="flex items-center justify-between">
            <Link
              href={homeHref}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${name} ${s.homeAriaSuffix}`}
            >
              {name}
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive(item.href, item.exact) ? 'page' : undefined
                  }
                  className={`px-2 py-1 text-sm transition-colors ${
                    isActive(item.href, item.exact)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {SUPPORT_KO_CHROME && (
                <Link
                  href={otherHref}
                  onClick={handleLocaleToggle}
                  className="px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`Switch to ${otherLabel}`}
                >
                  {otherLabel}
                </Link>
              )}
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
                  aria-current={
                    isActive(item.href, item.exact) ? 'page' : undefined
                  }
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    isActive(item.href, item.exact)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {SUPPORT_KO_CHROME && (
                <Link
                  href={otherHref}
                  onClick={() => {
                    handleLocaleToggle()
                    setMobileMenuOpen(false)
                  }}
                  className="block rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {otherLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="h-16" />
    </>
  )
}
