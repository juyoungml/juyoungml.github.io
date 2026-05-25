import Head from 'next/head'
import Link from 'next/link'
import type React from 'react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Navigation from '../Navigation'
import SEO from '../SEO'
import TableOfContents from './TableOfContents'
import Figure from './Figure'
import Callout from './Callout'
import Citation from './Citation'
import Comments from './Comments'
import NewsletterSignup from '../NewsletterSignup'
import ShareButtons from './ShareButtons'
import ReadingProgress from './ReadingProgress'
import ViewCount from './ViewCount'
import Video from './Video'
import LanguageToggle from '../LanguageToggle'
import { postComponents } from './posts'
import type { BlogPostMeta, PostLocale, TocHeading } from '../../lib/blog'

const sharedComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  Figure,
  Callout,
  Video,
}

export interface BlogPostViewProps {
  slug: string
  locale: PostLocale
  availableLocales: PostLocale[]
  meta: BlogPostMeta
  source: MDXRemoteSerializeResult
  headings: TocHeading[]
}

export default function BlogPostView({
  slug,
  locale,
  availableLocales,
  meta,
  source,
  headings,
}: BlogPostViewProps) {
  const dateLocale = locale === 'ko' ? 'ko-KR' : 'en'
  const components = {
    ...sharedComponents,
    ...(postComponents[slug] ?? {}),
  }

  const path = locale === 'ko' ? `/blog/ko/${slug}` : `/blog/${slug}`
  const alternateLocales = availableLocales.map(loc => ({
    locale: loc,
    path: loc === 'ko' ? `/blog/ko/${slug}` : `/blog/${slug}`,
  }))
  const ogImage = locale === 'ko' ? `/og/${slug}.ko.png` : `/og/${slug}.png`

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        path={path}
        ogImage={ogImage}
        ogType="article"
        locale={locale}
        alternateLocales={availableLocales.length > 1 ? alternateLocales : []}
        publishedTime={meta.date}
        tags={meta.tags}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="min-h-screen bg-background">
        <ReadingProgress />
        <Navigation name="Juyoung Suk" />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding relative py-12"
          lang={locale}
        >
          <Link href="/blog" className="quiet-link mb-10 inline-flex text-sm">
            back to blog
          </Link>

          <aside
            className="absolute bottom-0 top-12 hidden w-48 xl:block"
            style={{ right: 'calc(100% + 2rem)' }}
          >
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          <article data-pagefind-body lang={locale}>
            <header className="mb-14">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={meta.date}>
                  {new Date(meta.date).toLocaleDateString(dateLocale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{meta.readingTime}</span>
                <ViewCount slug={slug} locale={locale} />
                {availableLocales.length > 1 && (
                  <>
                    <span>·</span>
                    <LanguageToggle
                      slug={slug}
                      currentLocale={locale}
                      availableLocales={availableLocales}
                    />
                  </>
                )}
              </div>
              <h1 className="mb-5 text-3xl leading-tight text-foreground">
                {meta.title}
              </h1>
              <p className="mb-5 text-[15px] leading-6 text-muted-foreground">
                {meta.description}
              </p>
              <div data-pagefind-ignore>
                <ShareButtons slug={slug} title={meta.title} locale={locale} />
              </div>
            </header>

            <div className="prose-research">
              <MDXRemote {...source} components={components} />
            </div>

            <div data-pagefind-ignore>
              <Citation
                slug={slug}
                title={meta.title}
                date={meta.date}
                locale={locale}
              />
            </div>

            <div data-pagefind-ignore>
              <NewsletterSignup locale={locale} />
            </div>

            <Comments locale={locale} />
          </article>
        </main>
      </div>
    </>
  )
}
