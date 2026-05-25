import { useEffect, useRef } from 'react'

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let docHeight = document.documentElement.scrollHeight - window.innerHeight
    let ticking = false

    const recalc = () => {
      docHeight = document.documentElement.scrollHeight - window.innerHeight
    }

    const apply = () => {
      const pct =
        docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`
      }
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', recalc)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recalc)
    }
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-accent transition-[width] duration-75 ease-out"
        style={{ width: '0%' }}
      />
    </div>
  )
}
