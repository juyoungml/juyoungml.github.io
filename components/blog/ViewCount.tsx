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
      .then((data: Record<string, number>) => {
        if (cancelled) return
        const key = locale === 'ko' ? `ko:${slug}` : slug
        if (data[key] && data[key] > 0) setCount(data[key])
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
