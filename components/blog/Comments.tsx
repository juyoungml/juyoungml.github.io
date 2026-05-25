import { useEffect, useRef } from 'react'
import type { PostLocale } from '../../lib/blog'

const REPO = 'juyoungml/juyoungml.github.io'
const REPO_ID = 'R_kgDOOfuptQ'
const CATEGORY = 'General'
const CATEGORY_ID = 'DIC_kwDOOfuptc4C9y_i'

interface CommentsProps {
  locale: PostLocale
}

export default function Comments({ locale }: CommentsProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const heading = locale === 'ko' ? '댓글' : 'Comments'

  useEffect(() => {
    const host = ref.current
    if (!host) return
    host.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    const attrs: Record<string, string> = {
      'data-repo': REPO,
      'data-repo-id': REPO_ID,
      'data-category': CATEGORY,
      'data-category-id': CATEGORY_ID,
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'light',
      'data-lang': locale,
      'data-loading': 'lazy',
    }
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v)
    host.appendChild(script)
  }, [locale])

  return (
    <section
      aria-label={heading}
      className="mt-16 border-t border-border pt-8"
      data-pagefind-ignore
    >
      <h2 className="mb-4 text-xs text-muted-foreground">{heading}</h2>
      <div ref={ref} />
    </section>
  )
}
