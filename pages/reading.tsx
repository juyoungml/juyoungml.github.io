import type { GetStaticProps, NextPage } from 'next'
import ContentPageView, {
  type ContentPageViewProps,
} from '../components/ContentPageView'
import { getContentPageProps } from '../lib/content'

const ReadingPage: NextPage<ContentPageViewProps> = props => (
  <ContentPageView {...props} />
)

export const getStaticProps: GetStaticProps<
  ContentPageViewProps
> = async () => ({
  props: await getContentPageProps('reading'),
})

export default ReadingPage
