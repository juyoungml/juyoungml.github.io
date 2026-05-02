import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import { getAllBlogPosts, type BlogPostMeta } from '../../lib/blog'

interface BlogIndexProps {
  posts: BlogPostMeta[]
}

const BlogIndex: NextPage<BlogIndexProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog - Juyoung Suk</title>
        <meta
          name="description"
          content="Research notes and technical writing by Juyoung Suk."
        />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main className="research-container section-padding py-10">
          <header className="mb-10">
            <h1 className="mb-3 text-2xl font-semibold tracking-tight">Blog</h1>
            <p className="max-w-2xl leading-7 text-muted-foreground">
              Research notes, implementation details, and technical writeups.
              Mostly language models, evaluation, training, and systems.
            </p>
          </header>

          <section>
            <h2 className="research-heading">recent posts</h2>
            {posts.length > 0 ? (
              <div className="space-y-3">
                {posts.map(post => (
                  <article
                    key={post.slug}
                    className="grid gap-1 sm:grid-cols-[120px_1fr]"
                  >
                    <time
                      className="text-sm text-muted-foreground"
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
                        className="text-link font-medium"
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
