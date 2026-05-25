import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import BlogTagListView from '../../../components/blog/BlogTagListView'
import {
  getPostsByTag,
  getTagIndex,
  type BlogPostMeta,
} from '../../../lib/blog'

interface TagPageProps {
  tagSlug: string
  tagLabel: string
  posts: BlogPostMeta[]
}

const TagPage: NextPage<TagPageProps> = props => (
  <BlogTagListView locale="en" {...props} />
)

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getTagIndex('en').map(t => ({ params: { tag: t.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<TagPageProps> = async ({
  params,
}) => {
  const tagSlug = String(params?.tag)
  const entry = getTagIndex('en').find(t => t.slug === tagSlug)
  return {
    props: {
      tagSlug,
      tagLabel: entry?.label ?? tagSlug,
      posts: getPostsByTag(tagSlug, 'en'),
    },
  }
}

export default TagPage
