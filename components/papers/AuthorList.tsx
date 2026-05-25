import type { PaperAuthor } from '../../lib/papers'

interface AuthorListProps {
  authors: PaperAuthor[]
  highlight?: string
}

export default function AuthorList({
  authors,
  highlight = 'Juyoung Suk',
}: AuthorListProps) {
  const target = highlight.toLowerCase()
  return (
    <p className="text-sm leading-6 text-muted-foreground">
      {authors.map((author, i) => {
        const isTarget = author.name.toLowerCase().includes(target)
        const sep = i < authors.length - 1 ? ', ' : ''
        const body = author.url ? (
          <a className="quiet-link" href={author.url}>
            {author.name}
          </a>
        ) : (
          author.name
        )
        return (
          <span key={`${author.name}-${i}`}>
            {isTarget ? (
              <strong className="text-foreground">{body}</strong>
            ) : (
              body
            )}
            {sep}
          </span>
        )
      })}
    </p>
  )
}
