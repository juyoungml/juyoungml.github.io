import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import SEO from '../../components/SEO'
import {
  getAllBlogPosts,
  getTagIndex,
  type BlogPostMeta,
  type TagEntry,
} from '../../lib/blog'
import { tagSlug as toTagSlug } from '../../lib/tags'

const PagefindSearch = dynamic(
  () => import('../../components/blog/PagefindSearch'),
  { ssr: false }
)

interface BlogIndexProps {
  posts: BlogPostMeta[]
  tags: TagEntry[]
}

const BlogIndex: NextPage<BlogIndexProps> = ({ posts, tags }) => {
  return (
    <>
      <SEO
        title="Blog"
        description="Research notes and technical writing by Juyoung Suk on foundation models, evaluation, and training systems."
        path="/blog"
        ogType="website"
        locale="en"
      />

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main
          id="main-content"
          tabIndex={-1}
          className="research-container section-padding py-12"
        >
          <header className="mb-14">
            <h1 className="mb-4 text-xl text-foreground">blog</h1>
            <p className="max-w-2xl text-[15px] leading-6 text-muted-foreground">
              Research notes, implementation details, and technical writeups.
              Mostly language models, evaluation, training, and systems.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="research-heading sr-only">search</h2>
            <PagefindSearch locale="en" />
          </section>

          {tags.length > 0 && (
            <section className="mb-10">
              <h2 className="research-heading">tags</h2>
              <ul className="flex flex-wrap gap-2 text-xs">
                {tags.map(tag => (
                  <li key={tag.slug}>
                    <Link
                      href={`/blog/tag/${tag.slug}`}
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
            <h2 className="research-heading">recent posts</h2>
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
                      {new Date(post.date).toLocaleDateString('en', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <div>
                      <Link
                        href={`/blog/${post.slug}`}
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
                              href={`/blog/tag/${toTagSlug(tag)}`}
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
              <p className="text-sm text-muted-foreground">
                No public posts yet. Add an MDX file in{' '}
                <code>content/blog</code> and remove <code>draft: true</code>.
              </p>
            )}
          </section>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => ({
  props: {
    posts: getAllBlogPosts(),
    tags: getTagIndex('en'),
  },
})

export default BlogIndex
