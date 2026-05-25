import { useEffect, useState } from 'react'
import type { PostLocale } from '../../lib/blog'

interface ViewCountProps {
  slug: string
  locale: PostLocale
}

export default function ViewCount({ slug, locale }: ViewCountProps) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/views.json')
      .then(r => (r.ok ? r.json() : {}))
      .then((data: unknown) => {
        if (cancelled) return
        if (!data || typeof data !== 'object' || Array.isArray(data)) return
        const key = locale === 'ko' ? `ko:${slug}` : slug
        const value = (data as Record<string, unknown>)[key]
        if (typeof value === 'number' && value > 0) setCount(value)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug, locale])

  if (count === null) return null
  const label = locale === 'ko' ? '회 조회' : `view${count === 1 ? '' : 's'}`
  const sep = locale === 'ko' ? '' : ' '
  return (
    <>
      <span aria-hidden="true">·</span>
      <span>
        {count.toLocaleString()}
        {sep}
        {label}
      </span>
    </>
  )
}
