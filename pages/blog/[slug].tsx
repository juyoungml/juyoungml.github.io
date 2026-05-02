import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type React from 'react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import Navigation from '../../components/Navigation'
import { getAllBlogPosts, getBlogPost, type BlogPostMeta } from '../../lib/blog'

interface BlogPostPageProps {
  post: BlogPostMeta
  source: MDXRemoteSerializeResult
}

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, source }) => {
  return (
    <>
      <Head>
        <title>{post.title} - Juyoung Suk</title>
        <meta name="description" content={post.description} />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name="Juyoung Suk" />

        <main className="max-width-container section-padding py-16">
          <article className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-10 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              ← Back to blog
            </Link>

            <header className="mb-12">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="mb-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {post.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {post.description}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllBlogPosts().map(post => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = String(params?.slug)
  const post = getBlogPost(slug)
  const source = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: {
              className: ['heading-anchor'],
            },
          },
        ],
      ],
    },
  })

  return {
    props: {
      post,
      source,
    },
  }
}

export default BlogPostPage
