import type { GetStaticProps, NextPage } from 'next'
import BlogIndexView, {
  type BlogIndexViewProps,
} from '../../components/blog/BlogIndexView'
import { getAllBlogPosts, getTagIndex } from '../../lib/blog'

const BlogIndex: NextPage<BlogIndexViewProps> = props => (
  <BlogIndexView {...props} />
)

export const getStaticProps: GetStaticProps<BlogIndexViewProps> = async () => ({
  props: {
    locale: 'en',
    posts: getAllBlogPosts(),
    tags: getTagIndex('en'),
  },
})

export default BlogIndex
