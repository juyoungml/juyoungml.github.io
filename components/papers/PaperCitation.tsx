import { useState } from 'react'

interface PaperCitationProps {
  bibtex: string
}

export default function PaperCitation({ bibtex }: PaperCitationProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // text remains selectable in the rendered <pre>
    }
  }

  return (
    <aside
      className="mt-10 border-t border-border pt-6 text-sm"
      aria-label="Cite"
    >
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <h2>Cite</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="quiet-link"
          aria-live="polite"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-sm bg-muted/40 p-4 text-[12.5px] leading-5 text-foreground">
        <code>{bibtex}</code>
      </pre>
    </aside>
  )
}
