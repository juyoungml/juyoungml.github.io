import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import SEO from '../../components/SEO'
import { getAllBlogPosts, type BlogPostMeta } from '../../lib/blog'

interface BlogIndexProps {
  posts: BlogPostMeta[]
}

const BlogIndex: NextPage<BlogIndexProps> = ({ posts }) => {
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

          <section>
            <h2 className="research-heading">recent posts</h2>
            {posts.length > 0 ? (
              <div className="space-y-4">
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

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  return {
    props: {
      posts: getAllBlogPosts(),
    },
  }
}

export default BlogIndex
