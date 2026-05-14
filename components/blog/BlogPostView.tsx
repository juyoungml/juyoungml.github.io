import Head from 'next/head'
import Link from 'next/link'
import type React from 'react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Navigation from '../Navigation'
import TableOfContents from './TableOfContents'
import Figure from './Figure'
import Callout from './Callout'
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

  return (
    <>
      <Head>
        <title>{`${meta.title} - Juyoung Suk`}</title>
        <meta name="description" content={meta.description} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main
          className="research-container section-padding relative py-12"
          lang={locale}
        >
          <Link href="/blog" className="quiet-link mb-10 inline-flex text-sm">
            back to blog
          </Link>

          <aside
            className="absolute top-12 hidden w-48 xl:block"
            style={{ right: 'calc(100% + 2rem)' }}
          >
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          <article>
            <header className="mb-14">
              <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <time dateTime={meta.date}>
                  {new Date(meta.date).toLocaleDateString(dateLocale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{meta.readingTime}</span>
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
              <p className="text-[15px] leading-6 text-muted-foreground">
                {meta.description}
              </p>
            </header>

            <div className="prose-research">
              <MDXRemote {...source} components={components} />
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
