interface NewsItem {
  id: number
  date: string
  content: string
  link?: string
}

interface NewsProps {
  news: NewsItem[]
}

export default function NewsSection({ news }: NewsProps) {
  return (
    <section id="news" className="mb-20">
      <h2 className="text-xl font-semibold mb-8 text-foreground">News</h2>
      <div className="space-y-4">
        {news.map(item => (
          <div key={item.id} className="flex gap-4 text-sm">
            <div className="shrink-0 text-muted-foreground whitespace-nowrap text-xs">
              {item.date}
            </div>
            <div className="min-w-0 text-foreground break-words">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {item.content}
                </a>
              ) : (
                item.content
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
