import Link from 'next/link'
import Navigation from '../Navigation'
import SEO from '../SEO'
import type { BlogPostMeta, PostLocale } from '../../lib/blog'

const STRINGS = {
  en: {
    backLabel: 'back to blog',
    tagLabel: 'tag',
    countLine: (n: number, label: string) => (
      <>
        {n} post{n === 1 ? '' : 's'} tagged <code>{label}</code>.
      </>
    ),
    seoTitle: (label: string) => `Tagged: ${label}`,
    seoDescription: (label: string) =>
      `Blog posts by Juyoung Suk tagged "${label}".`,
    dateLocale: 'en' as const,
  },
  ko: {
    backLabel: '블로그로 돌아가기',
    tagLabel: '태그',
    countLine: (n: number, label: string) => (
      <>
        <code>{label}</code> 태그가 달린 글 {n}개.
      </>
    ),
    seoTitle: (label: string) => `태그: ${label}`,
    seoDescription: (label: string) =>
      `Juyoung Suk 의 "${label}" 태그 글 모음.`,
    dateLocale: 'ko-KR' as const,
  },
}

interface BlogTagListViewProps {
  locale: PostLocale
  tagSlug: string
  tagLabel: string
  posts: BlogPostMeta[]
}

export default function BlogTagListView({
  locale,
  tagSlug,
  tagLabel,
  posts,
}: BlogTagListViewProps) {
  const s = STRINGS[locale]
  const basePath = locale === 'ko' ? '/blog/ko' : '/blog'

  return (
    <>
      <SEO
        title={s.seoTitle(tagLabel)}
        description={s.seoDescription(tagLabel)}
        path={`${basePath}/tag/${tagSlug}`}
        ogType="website"
        locale={locale}
      />

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-12"
          lang={locale}
        >
          <Link href="/blog" className="quiet-link mb-10 inline-flex text-sm">
            {s.backLabel}
          </Link>

          <header className="mb-14">
            <p className="mb-2 text-xs text-muted-foreground">{s.tagLabel}</p>
            <h1 className="mb-4 text-xl text-foreground">{tagLabel}</h1>
            <p className="max-w-2xl text-[15px] leading-6 text-muted-foreground">
              {s.countLine(posts.length, tagLabel)}
            </p>
          </header>

          <section>
            <div className="space-y-4">
              {posts.map(post => (
                <article
                  key={post.slug}
                  className="grid gap-1 text-sm sm:grid-cols-[110px_1fr]"
                >
                  <time className="text-muted-foreground" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(s.dateLocale, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <div>
                    <Link
                      href={`${basePath}/${post.slug}`}
                      className="work-link font-medium"
                    >
                      {post.title}
                    </Link>
                    {post.description && (
                      <span className="text-muted-foreground">
                        {' '}
                        : {post.description}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
