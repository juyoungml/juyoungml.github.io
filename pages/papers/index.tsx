import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import SEO from '../../components/SEO'
import AuthorList from '../../components/papers/AuthorList'
import { getAllPapers, type PaperMeta } from '../../lib/papers'

interface PapersIndexProps {
  papers: PaperMeta[]
}

const PapersIndex: NextPage<PapersIndexProps> = ({ papers }) => {
  return (
    <>
      <SEO
        title="Papers"
        description="Papers and preprints co-authored by Juyoung Suk on foundation models, evaluation, and multilingual NLP."
        path="/papers"
        ogType="website"
        locale="en"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Papers', path: '/papers/' },
        ]}
      />

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-12"
        >
          <header className="mb-12">
            <h1 className="mb-4 text-xl text-foreground">papers</h1>
            <p className="max-w-2xl text-[15px] leading-6 text-muted-foreground">
              Papers and preprints I&apos;ve co-authored on foundation models,
              evaluation, and multilingual NLP. Each page links to the arXiv
              listing, code, and a copy-pasteable BibTeX entry.
            </p>
          </header>

          <section>
            <ul className="space-y-6">
              {papers.map(paper => (
                <li key={paper.slug}>
                  <article className="grid gap-1 text-sm sm:grid-cols-[70px_1fr]">
                    <time
                      className="text-muted-foreground"
                      dateTime={paper.date}
                    >
                      {paper.year}
                    </time>
                    <div>
                      <Link
                        href={`/papers/${paper.slug}`}
                        className="work-link font-medium"
                      >
                        {paper.title}
                      </Link>
                      <div className="mt-1">
                        <AuthorList authors={paper.authors} />
                      </div>
                      <p className="mt-1 text-xs italic text-muted-foreground">
                        {paper.venue}
                        {paper.award ? (
                          <span className="not-italic text-accent">
                            {' '}
                            · {paper.award}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PapersIndexProps> = async () => ({
  props: { papers: getAllPapers() },
})

export default PapersIndex
