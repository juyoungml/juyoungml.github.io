import type { GetStaticProps, NextPage } from 'next'
import BlogIndexView, {
  type BlogIndexViewProps,
} from '../../../components/blog/BlogIndexView'
import { getAllBlogPosts, getTagIndex } from '../../../lib/blog'

const BlogIndexKo: NextPage<BlogIndexViewProps> = props => (
  <BlogIndexView {...props} />
)

export const getStaticProps: GetStaticProps<BlogIndexViewProps> = async () => ({
  props: {
    locale: 'ko',
    posts: getAllBlogPosts().filter(p => p.availableLocales.includes('ko')),
    tags: getTagIndex('ko'),
  },
})

export default BlogIndexKo
