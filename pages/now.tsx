import type { GetStaticProps, NextPage } from 'next'
import ContentPageView, {
  type ContentPageViewProps,
} from '../components/ContentPageView'
import { getContentPageProps } from '../lib/content'

const NowPage: NextPage<ContentPageViewProps> = props => (
  <ContentPageView {...props} />
)

export const getStaticProps: GetStaticProps<
  ContentPageViewProps
> = async () => ({
  props: await getContentPageProps('now'),
})

export default NowPage
