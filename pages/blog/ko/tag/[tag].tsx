import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import BlogTagListView from '../../../../components/blog/BlogTagListView'
import {
  getPostsByTag,
  getTagIndex,
  type BlogPostMeta,
} from '../../../../lib/blog'

interface TagPageKoProps {
  tagSlug: string
  tagLabel: string
  posts: BlogPostMeta[]
}

const TagPageKo: NextPage<TagPageKoProps> = props => (
  <BlogTagListView locale="ko" {...props} />
)

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getTagIndex('ko').map(t => ({ params: { tag: t.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<TagPageKoProps> = async ({
  params,
}) => {
  const tagSlug = String(params?.tag)
  const entry = getTagIndex('ko').find(t => t.slug === tagSlug)
  return {
    props: {
      tagSlug,
      tagLabel: entry?.label ?? tagSlug,
      posts: getPostsByTag(tagSlug, 'ko'),
    },
  }
}

export default TagPageKo
