import type { PaperLinks as PaperLinksType } from '../../lib/papers'

interface PaperLinksProps {
  links: PaperLinksType
}

const LINK_LABELS: Record<keyof PaperLinksType, string> = {
  arxiv: 'arXiv',
  pdf: 'PDF',
  code: 'Code',
  hf: 'Hugging Face',
  slides: 'Slides',
  openreview: 'OpenReview',
  paper: 'Paper',
  blog: 'Blog',
  project: 'Project',
}

const LINK_ORDER: (keyof PaperLinksType)[] = [
  'arxiv',
  'pdf',
  'paper',
  'openreview',
  'code',
  'hf',
  'slides',
  'project',
  'blog',
]

export default function PaperLinks({ links }: PaperLinksProps) {
  const entries = LINK_ORDER.filter(key => Boolean(links[key])).map(key => ({
    key,
    label: LINK_LABELS[key],
    href: links[key] as string,
  }))

  if (entries.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
      {entries.map(entry => (
        <li key={entry.key}>
          <a
            className="quiet-link"
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entry.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
