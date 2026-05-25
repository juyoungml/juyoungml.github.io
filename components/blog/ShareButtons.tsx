import { useEffect, useRef, useState } from 'react'
import { absoluteUrl } from '../../lib/site'
import type { PostLocale } from '../../lib/blog'

interface ShareButtonsProps {
  slug: string
  title: string
  locale: PostLocale
}

export default function ShareButtons({
  slug,
  title,
  locale,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const path = locale === 'ko' ? `/blog/ko/${slug}/` : `/blog/${slug}/`
  const url = absoluteUrl(path)

  const xUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    },
    []
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const heading = locale === 'ko' ? '공유' : 'Share'
  const copyLabel = locale === 'ko' ? '링크 복사' : 'Copy link'
  const copiedLabel = locale === 'ko' ? '복사됨' : 'Copied'

  return (
    <div
      className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
      aria-label={heading}
    >
      <span>{heading}:</span>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="quiet-link"
      >
        X
      </a>
      <span aria-hidden="true">·</span>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="quiet-link"
      >
        LinkedIn
      </a>
      <span aria-hidden="true">·</span>
      <button
        type="button"
        onClick={handleCopy}
        className="quiet-link"
        aria-live="polite"
      >
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  )
}
