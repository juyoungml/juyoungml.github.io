import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { MouseEvent } from 'react'
import Navigation from '../components/Navigation'
import { portfolioData } from '../data/portfolio'
import { getAllBlogPosts, type BlogPostMeta } from '../lib/blog'

interface HomeProps {
  posts: BlogPostMeta[]
}

const selectedWork = [
  {
    title: 'Tri-21B-Think',
    description:
      'Reasoning-enhanced 21B foundation model for agentic workflows, tool use, and long-horizon tasks.',
    href: 'https://artificialanalysis.ai/models/tri-21b-think-v0-5',
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
      'Fine-grained benchmark for evaluating language model generations.',
    href: 'https://arxiv.org/abs/2406.05761',
  },
]

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { personal } = portfolioData
  const obfuscatedEmail = `${personal.emailUser} [at] ${personal.emailDomain}`

  const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    window.location.href = `mailto:${personal.emailUser}@${personal.emailDomain}`
  }

  return (
    <>
      <Head>
        <title>{personal.name}</title>
        <meta
          name="description"
          content="Juyoung Suk works on foundation models, evaluation, and training systems."
        />
        <meta name="author" content={personal.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={personal.name} />
        <meta
          property="og:description"
          content="Research notes and selected work on foundation models, evaluation, and training systems."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://juyoungml.github.io" />
        <meta
          property="og:image"
          content="https://juyoungml.github.io/profile.jpeg"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name={personal.name} />

        <main className="research-container section-padding py-12">
          <header className="mb-14">
            <div className="mb-8">
              <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-sm border border-border/70">
                <Image
                  src={personal.profileImage}
                  alt={personal.name}
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>

              <h1 className="mb-1.5 text-xl text-foreground">
                {personal.name}
              </h1>
              <p className="mb-1 text-sm text-muted-foreground">
                ML engineer @ Trillion Labs
              </p>
              <p className="text-sm text-muted-foreground">{obfuscatedEmail}</p>
            </div>

            <div>
              <h2 className="research-heading">About</h2>
              <p className="mb-4 text-[15px] leading-6 text-muted-foreground">
                Hi, I&apos;m Juyoung, an ML engineer at Trillion Labs in Seoul.
                I work across long-context training, pretraining infrastructure,
                evals, and whatever else needs untangling on any given day.
              </p>
              <p className="mb-4 text-[15px] leading-6 text-muted-foreground">
                What I enjoy most is going deep. I like understanding systems
                from the bottom up, finding the mechanisms underneath the
                abstractions, and automating away the parts that shouldn&apos;t
                need a human in the loop. I tend to follow my curiosity wherever
                it leads, especially when an abstraction feels too convenient.
              </p>
              <p className="mb-4 text-[15px] leading-6 text-muted-foreground">
                Outside of work, I&apos;m a perpetual beginner at a lot of
                things. I love picking up something new and finding out how far
                I can take it: cooking, a bit of piano, fumbling my way through
                bass lines. I write here when I learn something worth holding
                onto.
              </p>
              <p className="text-sm text-muted-foreground">
                <a className="quiet-link" href="#" onClick={handleEmailClick}>
                  email
                </a>
                {' / '}
                <a className="quiet-link" href={personal.github}>
                  github
                </a>
                {' / '}
                <a className="quiet-link" href={personal.googleScholar}>
                  scholar
                </a>
                {' / '}
                <a className="quiet-link" href={personal.linkedin}>
                  linkedin
                </a>
              </p>
            </div>
          </header>

          <section className="mb-12">
            <h2 className="research-heading">
              <Link className="work-link" href="/blog">
                latest posts
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
                      {new Date(post.date).toLocaleDateString('en', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <Link className="work-link" href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No public notes yet. Drafts live in <code>content/blog</code>.
              </p>
            )}
          </section>

          <section id="work" className="mb-12">
            <h2 className="research-heading">selected work</h2>
            <ol className="space-y-4">
              {selectedWork.map(item => (
                <li key={item.title}>
                  {item.href ? (
                    <a
                      className="work-link text-sm font-medium"
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      posts: getAllBlogPosts(),
    },
  }
}

export default Home
