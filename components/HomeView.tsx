import Link from 'next/link'
import Navigation from './Navigation'
import SEO from './SEO'
import { portfolioData } from '../data/portfolio'
import type { BlogPostMeta } from '../lib/blog'
import type { PaperMeta } from '../lib/papers'
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  type SiteLocale,
} from '../lib/site'
import { STRINGS } from '../lib/i18n'
import { track } from '../lib/analytics'

const selectedWork = [
  {
    title: 'Tri-21B-Think',
    description:
      'Reasoning-enhanced 21B foundation model for agentic workflows, tool use, and long-horizon tasks.',
    href: 'https://huggingface.co/trillionlabs/Tri-21B-Think',
  },
  {
    title: 'Prometheus-Eval',
    description:
      'Open-source evaluator models and tools for language model assessment.',
    href: 'https://github.com/prometheus-eval/prometheus-eval',
  },
  {
    title: 'BiGGen Bench',
    description:
      'Fine-grained benchmark for evaluating language model generations. NAACL 2025 Best Paper Award.',
    href: '/papers/biggen-bench',
  },
]

export interface HomeViewProps {
  locale: SiteLocale
  posts: BlogPostMeta[]
  papers: PaperMeta[]
}

export default function HomeView({ locale, posts, papers }: HomeViewProps) {
  const s = STRINGS[locale]
  const { personal } = portfolioData
  const obfuscatedEmail = `${personal.emailUser} [at] ${personal.emailDomain}`
  const emailHref = `mailto:${personal.emailUser}@${personal.emailDomain}`
  const blogBase = locale === 'ko' ? '/blog/ko' : '/blog'

  return (
    <>
      <SEO
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        path={locale === 'ko' ? '/ko/' : '/'}
        ogType="website"
        locale={locale}
        alternateLocales={[
          { locale: 'en', path: '/' },
          { locale: 'ko', path: '/ko/' },
        ]}
      />

      <div className="min-h-screen bg-background">
        <Navigation name={personal.name} locale={locale} />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-14"
          lang={locale}
        >
          <header className="mb-14">
            <div className="mb-10">
              <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-sm border border-border/70">
                <picture>
                  <source srcSet="/profile.avif?v=2" type="image/avif" />
                  <source srcSet="/profile.webp?v=2" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={personal.profileImage}
                    alt={personal.name}
                    width={240}
                    height={320}
                    decoding="async"
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </picture>
              </div>

              <h1 className="mb-2 text-2xl leading-tight text-foreground">
                {personal.name}
              </h1>
              <p className="mb-1 text-sm text-muted-foreground">{s.jobTitle}</p>
              <address className="not-italic text-sm text-muted-foreground">
                {obfuscatedEmail}
              </address>
            </div>

            <div>
              <h2 className="research-heading">{s.aboutHeading}</h2>
              <p className="mb-4 text-[16px] leading-7 text-foreground">
                {s.bioP1}
              </p>
              <p className="mb-4 text-[16px] leading-7 text-foreground">
                {s.bioP2}
              </p>
              <p className="mb-4 text-[16px] leading-7 text-foreground">
                {s.bioP3}
              </p>
              <p className="text-sm text-muted-foreground">
                <a
                  className="quiet-link"
                  href={emailHref}
                  onClick={() => track('click-email')}
                >
                  {s.linkEmail}
                </a>
                {' / '}
                <a
                  className="quiet-link"
                  href={personal.github}
                  onClick={() => track('click-github')}
                >
                  {s.linkGithub}
                </a>
                {' / '}
                <a
                  className="quiet-link"
                  href={personal.googleScholar}
                  onClick={() => track('click-scholar')}
                >
                  {s.linkScholar}
                </a>
                {' / '}
                <a
                  className="quiet-link"
                  href={SITE_AUTHOR.semanticScholar}
                  onClick={() => track('click-semantic-scholar')}
                >
                  {s.linkSemanticScholar}
                </a>
                {' / '}
                <a
                  className="quiet-link"
                  href={personal.linkedin}
                  onClick={() => track('click-linkedin')}
                >
                  {s.linkLinkedin}
                </a>
              </p>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="research-heading">
              <Link className="work-link" href={blogBase}>
                {s.latestPostsHeading}
              </Link>
            </h2>
            {posts.length > 0 ? (
              <div className="space-y-2">
                {posts.slice(0, 6).map(post => (
                  <div
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
                    <Link
                      className="work-link"
                      href={`${blogBase}/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{s.noPosts}</p>
            )}
          </section>

          <section className="mb-12">
            <h2 className="research-heading">
              <Link className="work-link" href="/papers">
                {s.papersHeading}
              </Link>
            </h2>
            {papers.length > 0 ? (
              <div className="space-y-2">
                {papers.slice(0, 6).map(paper => (
                  <div
                    key={paper.slug}
                    className="grid gap-1 text-sm sm:grid-cols-[70px_1fr]"
                  >
                    <span
                      className="text-muted-foreground"
                      aria-label={`Year ${paper.year}`}
                    >
                      {paper.year}
                    </span>
                    <Link className="work-link" href={`/papers/${paper.slug}`}>
                      {paper.title}
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </section>

          <section id="work" className="mb-12">
            <h2 className="research-heading">{s.selectedWorkHeading}</h2>
            <ol className="space-y-4">
              {selectedWork.map(item => (
                <li key={item.title}>
                  {item.href ? (
                    <a
                      className="work-link text-[15px] font-medium"
                      href={item.href}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-medium">{item.title}</span>
                  )}
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </main>

        <footer className="research-container section-padding border-t border-border py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}
        </footer>
      </div>
    </>
  )
}
