import { useEffect, useRef, useState } from 'react'
import type { TocHeading } from '../../lib/blog'

interface TocProps {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: TocProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '')
  const lockedUntilRef = useRef<number>(0)

  useEffect(() => {
    if (headings.length === 0) return

    const compute = () => {
      // Skip recomputation while a click-induced smooth scroll is settling.
      if (Date.now() < lockedUntilRef.current) return

      const threshold = 120 // px from top
      let current = headings[0].id
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= threshold) {
          current = h.id
        } else {
          break
        }
      }
      setActiveId(current)
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [headings])

  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    // Immediately reflect intent; ignore scroll-driven updates for ~700ms
    // while the smooth scroll settles.
    setActiveId(id)
    lockedUntilRef.current = Date.now() + 700
  }

  return (
    <nav aria-label="Table of contents" className="font-sans text-sm">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        contents
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map(h => {
          const isActive = activeId === h.id
          return (
            <li
              key={h.id}
              style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
              className="-ml-px"
            >
              <a
                href={`#${h.id}`}
                onClick={() => handleClick(h.id)}
                className={`-ml-px block border-l-2 py-1 pl-3 font-sans text-[13px] leading-snug transition-colors ${
                  isActive
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
