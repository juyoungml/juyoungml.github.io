import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import SEO from '../components/SEO'
import { portfolioData } from '../data/portfolio'
import { getAllBlogPosts, type BlogPostMeta } from '../lib/blog'
import { SITE_DESCRIPTION, SITE_NAME } from '../lib/site'

interface HomeProps {
  posts: BlogPostMeta[]
}

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
      'Fine-grained benchmark for evaluating language model generations.',
    href: 'https://arxiv.org/abs/2406.05761',
  },
]

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { personal } = portfolioData
  const obfuscatedEmail = `${personal.emailUser} [at] ${personal.emailDomain}`

  const handleEmailClick = () => {
    window.location.href = `mailto:${personal.emailUser}@${personal.emailDomain}`
  }

  return (
    <>
      <SEO
        title={SITE_NAME}
        description={SITE_DESCRIPTION}
        path="/"
        ogType="website"
        locale="en"
      />

      <div className="min-h-screen bg-background">
        <Navigation name={personal.name} />

        <main className="research-container section-padding py-14">
          <header className="mb-14">
            <div className="mb-10">
              <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-sm border border-border/70">
                <Image
                  src={personal.profileImage}
                  alt={personal.name}
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>

              <h1 className="mb-2 text-2xl leading-tight text-foreground">
                {personal.name}
              </h1>
              <p className="mb-1 text-sm text-muted-foreground">
                ML engineer @ Trillion Labs
              </p>
              <p className="text-sm text-muted-foreground">{obfuscatedEmail}</p>
            </div>

            <div>
              <h2 className="research-heading">About</h2>
              <p className="mb-4 text-[16px] leading-7 text-foreground">
                Hi, I&apos;m Juyoung, an ML engineer at Trillion Labs in Seoul.
                I work across long-context training, pretraining infrastructure,
                evals, and whatever else needs untangling on any given day.
              </p>
              <p className="mb-4 text-[16px] leading-7 text-foreground">
                What I enjoy most is going deep. I like understanding systems
                from the bottom up, finding the mechanisms underneath the
                abstractions, and automating away the parts that shouldn&apos;t
                need a human in the loop. I tend to follow my curiosity wherever
                it leads, especially when an abstraction feels too convenient.
              </p>
              <p className="mb-4 text-[16px] leading-7 text-foreground">
                Outside of work, I&apos;m a perpetual beginner at a lot of
                things. I love picking up something new and finding out how far
                I can take it: cooking, a bit of piano, fumbling my way through
                bass lines. I write here when I learn something worth holding
                onto.
              </p>
              <p className="text-sm text-muted-foreground">
                <button
                  className="quiet-link"
                  type="button"
                  onClick={handleEmailClick}
                >
                  email
                </button>
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      posts: getAllBlogPosts(),
    },
  }
}

export default Home
