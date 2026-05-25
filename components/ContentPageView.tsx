import Head from 'next/head'
import type React from 'react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import Navigation from './Navigation'
import SEO from './SEO'
import type { ContentPageMeta } from '../lib/content'
import type { PostLocale } from '../lib/blog'

const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
}

export interface ContentPageViewProps {
  slug: string
  path: string
  meta: ContentPageMeta
  source: MDXRemoteSerializeResult
  needsKatex?: boolean
  locale?: PostLocale
}

export default function ContentPageView({
  path,
  meta,
  source,
  needsKatex = false,
  locale = 'en',
}: ContentPageViewProps) {
  const dateLocale = locale === 'ko' ? 'ko-KR' : 'en'
  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        path={path}
        ogType="website"
        locale={locale}
      />
      {needsKatex && (
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
            crossOrigin="anonymous"
          />
        </Head>
      )}

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-12"
          lang={locale}
        >
          <header className="mb-14">
            <h1 className="mb-4 text-xl text-foreground">{meta.title}</h1>
            {meta.description && (
              <p className="max-w-2xl text-[15px] leading-6 text-muted-foreground">
                {meta.description}
              </p>
            )}
            {meta.updated && (
              <p className="mt-3 text-xs text-muted-foreground">
                {locale === 'ko' ? '최근 업데이트 ' : 'Last updated '}
                <time dateTime={meta.updated}>
                  {new Date(meta.updated).toLocaleDateString(dateLocale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </p>
            )}
          </header>

          <article className="prose-research">
            <MDXRemote {...source} components={mdxComponents} />
          </article>
        </main>
      </div>
    </>
  )
}
