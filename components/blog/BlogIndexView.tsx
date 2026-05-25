import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navigation from '../Navigation'
import SEO from '../SEO'
import type { BlogPostMeta, TagEntry } from '../../lib/blog'
import { tagSlug as toTagSlug } from '../../lib/tags'
import { SITE_URL, absoluteUrl, type SiteLocale } from '../../lib/site'

const PagefindSearch = dynamic(() => import('./PagefindSearch'), { ssr: false })

const STRINGS = {
  en: {
    seoTitle: 'Blog',
    seoDescription:
      'Research notes and technical writing by Juyoung Suk on foundation models, evaluation, and training systems.',
    heading: 'blog',
    blurb:
      'Research notes, implementation details, and technical writeups. Mostly language models, evaluation, training, and systems.',
    tagsHeading: 'tags',
    recentHeading: 'recent posts',
    noPosts: (
      <>
        No public posts yet. Add an MDX file in <code>content/blog</code> and
        remove <code>draft: true</code>.
      </>
    ),
    dateLocale: 'en' as const,
  },
  ko: {
    seoTitle: '블로그',
    seoDescription:
      '석주영의 연구 노트와 기술 글. 주로 언어 모델, 평가, 학습, 시스템.',
    heading: '블로그',
    blurb:
      '연구 노트, 구현 디테일, 기술 글. 주로 언어 모델, 평가, 학습, 시스템에 대한 글입니다.',
    tagsHeading: '태그',
    recentHeading: '최근 글',
    noPosts: <>아직 공개된 글이 없습니다.</>,
    dateLocale: 'ko-KR' as const,
  },
}

export interface BlogIndexViewProps {
  locale: SiteLocale
  posts: BlogPostMeta[]
  tags: TagEntry[]
}

export default function BlogIndexView({
  locale,
  posts,
  tags,
}: BlogIndexViewProps) {
  const s = STRINGS[locale]
  const base = locale === 'ko' ? '/blog/ko' : '/blog'
  const tagBase = locale === 'ko' ? '/blog/ko/tag' : '/blog/tag'

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${SITE_URL}${base}/#blog`,
    name: s.seoTitle,
    description: s.seoDescription,
    inLanguage: locale,
    url: absoluteUrl(`${base}/`),
    publisher: { '@id': `${SITE_URL}/#person` },
    blogPost: posts.slice(0, 20).map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: absoluteUrl(`${base}/${p.slug}/`),
      datePublished: p.date,
      inLanguage: locale,
      author: { '@id': `${SITE_URL}/#person` },
      keywords: p.tags.length ? p.tags.join(', ') : undefined,
    })),
  }

  return (
    <>
      <SEO
        title={s.seoTitle}
        description={s.seoDescription}
        path={`${base}/`}
        ogType="website"
        locale={locale}
        alternateLocales={[
          { locale: 'en', path: '/blog/' },
          { locale: 'ko', path: '/blog/ko/' },
        ]}
        breadcrumbs={[
          {
            name: locale === 'ko' ? '홈' : 'Home',
            path: locale === 'ko' ? '/ko/' : '/',
          },
          { name: locale === 'ko' ? '블로그' : 'Blog', path: `${base}/` },
        ]}
        extraJsonLd={[blogSchema]}
      />

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" locale={locale} />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-12"
          lang={locale}
        >
          <header className="mb-14">
            <h1 className="mb-4 text-xl text-foreground">{s.heading}</h1>
            <p className="max-w-2xl text-[15px] leading-6 text-muted-foreground">
              {s.blurb}
            </p>
          </header>

          <section className="mb-10">
            <h2 className="research-heading sr-only">search</h2>
            <PagefindSearch locale={locale} />
          </section>

          {tags.length > 0 && (
            <section className="mb-10">
              <h2 className="research-heading">{s.tagsHeading}</h2>
              <ul className="flex flex-wrap gap-2 text-xs">
                {tags.map(tag => (
                  <li key={tag.slug}>
                    <Link
                      href={`${tagBase}/${tag.slug}`}
                      className="inline-flex items-center rounded-full border border-border/70 px-2.5 py-1 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      #{tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="research-heading">{s.recentHeading}</h2>
            {posts.length > 0 ? (
              <div className="space-y-5">
                {posts.map(post => (
                  <article
                    key={post.slug}
                    className="grid gap-1 text-sm sm:grid-cols-[110px_1fr]"
                  >
                    <time
                      className="text-muted-foreground"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString(s.dateLocale, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <div>
                      <Link
                        href={`${base}/${post.slug}`}
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
                      {post.tags.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
                          {post.tags.map(tag => (
                            <Link
                              key={tag}
                              href={`${tagBase}/${toTagSlug(tag)}`}
                              className="text-muted-foreground/80 transition-colors hover:text-accent"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{s.noPosts}</p>
            )}
          </section>
        </main>
      </div>
    </>
  )
}
