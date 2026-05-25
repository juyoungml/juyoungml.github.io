import type { ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
  label?: string
}

export default function Callout({ children, label = 'Note' }: CalloutProps) {
  return (
    <aside className="my-6 rounded-md border border-border bg-muted px-5 py-4 text-[14px] leading-6">
      <p className="mb-1 text-xs text-muted-foreground">{label}</p>
      <div className="text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  )
}
