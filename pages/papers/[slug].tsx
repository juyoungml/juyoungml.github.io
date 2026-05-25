import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import Navigation from '../../components/Navigation'
import SEO from '../../components/SEO'
import AuthorList from '../../components/papers/AuthorList'
import PaperCitation from '../../components/papers/PaperCitation'
import PaperLinks from '../../components/papers/PaperLinks'
import { getAllPapers, getPaper, type PaperMeta } from '../../lib/papers'
import { SITE_URL, absoluteUrl } from '../../lib/site'

interface PaperPageProps {
  meta: PaperMeta
  source: MDXRemoteSerializeResult
}

function buildScholarlyArticle(meta: PaperMeta) {
  const canonical = absoluteUrl(`/papers/${meta.slug}`)
  return {
    '@type': 'ScholarlyArticle',
    '@id': `${canonical}#article`,
    headline: meta.title,
    name: meta.title,
    description: meta.description || undefined,
    inLanguage: 'en',
    datePublished: meta.date,
    isPartOf: meta.venue
      ? { '@type': 'Periodical', name: meta.venue }
      : undefined,
    author: meta.authors.map(a => ({
      '@type': 'Person',
      name: a.name,
      ...(a.url ? { url: a.url } : {}),
    })),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
    sameAs: [
      meta.links.arxiv,
      meta.links.openreview,
      meta.links.paper,
      meta.arxiv ? `https://arxiv.org/abs/${meta.arxiv}` : undefined,
    ].filter(Boolean),
    keywords: meta.tags.length ? meta.tags.join(', ') : undefined,
    award: meta.award || undefined,
  }
}

const PaperPage: NextPage<PaperPageProps> = ({ meta, source }) => {
  const canonical = `${SITE_URL}/papers/${meta.slug}/`
  const pdfUrl =
    meta.links.pdf ||
    (meta.arxiv ? `https://arxiv.org/pdf/${meta.arxiv}` : undefined)
  const arxivAbs =
    meta.links.arxiv ||
    (meta.arxiv ? `https://arxiv.org/abs/${meta.arxiv}` : undefined)

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        path={`/papers/${meta.slug}`}
        ogType="article"
        locale="en"
        publishedTime={meta.date}
        author={meta.authors.map(a => a.name).join(', ')}
        tags={meta.tags}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Papers', path: '/papers/' },
          { name: meta.title, path: `/papers/${meta.slug}/` },
        ]}
        extraJsonLd={[buildScholarlyArticle(meta)]}
      />
      <Head>
        <meta name="citation_title" content={meta.title} />
        {meta.authors.map((a, i) => (
          <meta key={`auth-${i}`} name="citation_author" content={a.name} />
        ))}
        <meta name="citation_publication_date" content={meta.date} />
        <meta name="citation_journal_title" content={meta.venue} />
        <meta name="citation_language" content="en" />
        <meta name="citation_abstract_html_url" content={canonical} />
        {pdfUrl && <meta name="citation_pdf_url" content={pdfUrl} />}
        {meta.arxiv && <meta name="citation_arxiv_id" content={meta.arxiv} />}
        {arxivAbs && <meta name="citation_public_url" content={arxivAbs} />}
        {meta.tags.map((t, i) => (
          <meta key={`kw-${i}`} name="citation_keywords" content={t} />
        ))}
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-12"
        >
          <Link href="/papers" className="quiet-link mb-10 inline-flex text-sm">
            back to papers
          </Link>

          <article>
            <header className="mb-10">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="italic">{meta.venue}</span>
                <span>·</span>
                <time dateTime={meta.date}>{meta.year}</time>
                {meta.award && (
                  <>
                    <span>·</span>
                    <span className="text-accent">{meta.award}</span>
                  </>
                )}
              </div>
              <h1 className="mb-4 text-2xl leading-snug text-foreground sm:text-3xl">
                {meta.title}
              </h1>
              <div className="mb-5">
                <AuthorList authors={meta.authors} />
              </div>
              <PaperLinks links={meta.links} />
            </header>

            <div className="prose-research">
              <MDXRemote {...source} />
            </div>

            <PaperCitation bibtex={meta.bibtex} />
          </article>
        </main>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPapers().map(p => ({ params: { slug: p.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<PaperPageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug)
  const { meta, content } = getPaper(slug)
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        [
          rehypeAutolinkHeadings,
          { behavior: 'wrap', properties: { className: ['heading-anchor'] } },
        ],
      ],
    },
  })
  return { props: { meta, source } }
}

export default PaperPage
