import { useState } from 'react'
import { SITE_URL, SITE_AUTHOR } from '../../lib/site'

interface CitationProps {
  slug: string
  title: string
  date: string
  locale: 'en' | 'ko'
}

const MONTHS_SHORT = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

function citationKey(slug: string, year: number) {
  const lastName = SITE_AUTHOR.name.split(' ').pop()?.toLowerCase() ?? 'anon'
  const firstWord = slug.split(/[-_]/)[0]
  return `${lastName}${year}${firstWord}`
}

function buildBibTeX({ slug, title, date, locale }: CitationProps) {
  const d = new Date(date)
  const year = d.getUTCFullYear()
  const month = MONTHS_SHORT[d.getUTCMonth()]
  const url = `${SITE_URL}${locale === 'ko' ? '/blog/ko/' : '/blog/'}${slug}/`
  const key = citationKey(slug, year)
  return [
    `@misc{${key},`,
    `  title  = {${title}},`,
    `  author = {Suk, Juyoung},`,
    `  year   = {${year}},`,
    `  month  = {${month}},`,
    `  url    = {${url}},`,
    `  note   = {Blog post}`,
    `}`,
  ].join('\n')
}

export default function Citation(props: CitationProps) {
  const [copied, setCopied] = useState(false)
  const bibtex = buildBibTeX(props)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Older browsers / insecure contexts: do nothing. The text is already
      // selectable via the rendered <pre>.
    }
  }

  const heading = props.locale === 'ko' ? '인용' : 'Cite'
  const copyLabel = props.locale === 'ko' ? '복사' : 'Copy'
  const copiedLabel = props.locale === 'ko' ? '복사됨' : 'Copied'

  return (
    <aside
      className="citation mt-16 border-t border-border pt-6 text-sm"
      aria-label={heading}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {heading}
        </h2>
        <button
          type="button"
          onClick={handleCopy}
          className="quiet-link font-mono text-[11px] uppercase tracking-[0.12em]"
          aria-live="polite"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-sm bg-muted/40 p-4 text-[12.5px] leading-5 text-foreground">
        <code>{bibtex}</code>
      </pre>
    </aside>
  )
}
