import Link from 'next/link'
import type { PostLocale } from '../lib/blog'

const LABEL: Record<PostLocale, string> = { en: 'EN', ko: 'KO' }

interface Props {
  slug: string
  currentLocale: PostLocale
  availableLocales: PostLocale[]
}

function hrefFor(slug: string, locale: PostLocale) {
  return locale === 'ko' ? `/blog/ko/${slug}` : `/blog/${slug}`
}

function persist(locale: PostLocale) {
  try {
    window.localStorage.setItem('blog-locale', locale)
  } catch {
    /* ignore */
  }
}

export default function LanguageToggle({
  slug,
  currentLocale,
  availableLocales,
}: Props) {
  if (availableLocales.length < 2) return null

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em]"
    >
      {availableLocales.map((l, i) => (
        <span key={l} className="contents">
          {i > 0 && <span className="text-border">/</span>}
          <Link
            href={hrefFor(slug, l)}
            onClick={() => persist(l)}
            aria-current={currentLocale === l ? 'page' : undefined}
            className={`transition-colors ${
              currentLocale === l
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {LABEL[l]}
          </Link>
        </span>
      ))}
    </div>
  )
}
