import type { ReactNode } from 'react'

interface FigureProps {
  children: ReactNode
  caption?: ReactNode
  number?: number | string
}

export default function Figure({ children, caption, number }: FigureProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-md border border-border bg-card">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] leading-snug text-muted-foreground">
          {number !== undefined && (
            <strong className="text-foreground">Figure {number}. </strong>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
