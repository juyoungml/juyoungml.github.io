import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'
import { getAllBlogPosts } from '../lib/blog'

interface MyDocumentProps extends DocumentInitialProps {
  koSlugs: string[]
  needsPretendard: boolean
}

const PRETENDARD_HREF =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const koSlugs = getAllBlogPosts({ includeDrafts: true })
      .filter(p => p.availableLocales.includes('ko'))
      .map(p => p.slug)
    // Pretendard is only needed where Korean glyphs render. Today that's
    // /blog/ko/[slug] only — EN pages either stay English or redirect to a
    // KO URL (separate document load) before any Korean is painted.
    const needsPretendard = ctx.pathname?.startsWith('/blog/ko') ?? false
    return { ...initialProps, koSlugs, needsPretendard }
  }

  render() {
    // Pre-hydration redirect. Runs synchronously in <head> before any DOM is
    // painted, so Korean visitors never see the English page flash. Matches
    // /blog/<slug>/? URLs only; KO URLs and other routes are untouched.
    const redirectScript = `(function(){try{
var m=location.pathname.match(/^\\/blog\\/([^\\/]+)\\/?$/);
if(!m)return;
var slug=m[1];
var ko=${JSON.stringify(this.props.koSlugs)};
if(ko.indexOf(slug)===-1)return;
var stored=null;try{stored=localStorage.getItem('blog-locale')}catch(e){}
var pref=stored||(((navigator.language||'').toLowerCase().indexOf('ko')===0)?'ko':'en');
if(pref==='ko')location.replace('/blog/ko/'+slug+'/');
}catch(e){}})();`

    // Pretendard is only used for Korean glyphs. Loading it as a render-blocking
    // stylesheet causes a blank first paint on cold cache. We download with
    // media="print" (non-blocking) and flip to media="all" once loaded.
    const fontSwapScript = `(function(){var l=document.getElementById('font-pretendard');if(!l)return;function on(){l.media='all'}if(l.sheet){on()}else{l.addEventListener('load',on)}})();`

    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#c2410c" />
          <link
            rel="preconnect"
            href="https://cdn.jsdelivr.net"
            crossOrigin=""
          />
          <link
            id="font-pretendard"
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
            media="print"
          />
          <script dangerouslySetInnerHTML={{ __html: fontSwapScript }} />
          <noscript>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
