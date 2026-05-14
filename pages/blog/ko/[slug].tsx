import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import BlogPostView, {
  type BlogPostViewProps,
} from '../../../components/blog/BlogPostView'
import {
  extractHeadings,
  getAllBlogPosts,
  getBlogPost,
} from '../../../lib/blog'

const BlogPostPageKo: NextPage<BlogPostViewProps> = props => (
  <BlogPostView {...props} />
)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllBlogPosts()
      .filter(post => post.availableLocales.includes('ko'))
      .map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostViewProps> = async ({
  params,
}) => {
  const slug = String(params?.slug)
  const post = getBlogPost(slug)
  const entry = post.byLocale.ko
  if (!entry) {
    throw new Error(`No Korean content for blog post: ${slug}`)
  }

  const source = await serialize(entry.content, {
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

  return {
    props: {
      slug,
      locale: 'ko',
      availableLocales: post.availableLocales,
      meta: entry.meta,
      source,
      headings: extractHeadings(entry.content),
    },
  }
}

export default BlogPostPageKo
