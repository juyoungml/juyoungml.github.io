import type { GetStaticProps, NextPage } from 'next'
import HomeView, { type HomeViewProps } from '../components/HomeView'
import { getAllBlogPosts } from '../lib/blog'
import { getAllPapers } from '../lib/papers'

const Home: NextPage<HomeViewProps> = props => <HomeView {...props} />

export const getStaticProps: GetStaticProps<HomeViewProps> = async () => ({
  props: {
    locale: 'en',
    posts: getAllBlogPosts(),
    papers: getAllPapers(),
  },
})

export default Home
