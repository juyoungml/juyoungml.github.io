import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'
import { getAllBlogPosts } from '../lib/blog'
import { SUPPORT_KO_CHROME } from '../lib/site'

interface MyDocumentProps extends DocumentInitialProps {
  koSlugs: string[]
  needsPretendard: boolean
}

const PRETENDARD_HREF =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'

const UMAMI_SRC = 'https://umami-production-c1c9.up.railway.app/script.js'
const UMAMI_WEBSITE_ID = 'a2b1edb1-1f23-404a-b65a-a0253f85ca02'
const ENABLE_ANALYTICS = process.env.NODE_ENV === 'production'

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const koSlugs = getAllBlogPosts()
      .filter(p => p.availableLocales.includes('ko'))
      .map(p => p.slug)
    const pathname = ctx.pathname ?? ''
    const needsPretendard =
      pathname.startsWith('/blog/ko') || pathname.startsWith('/ko')
    return { ...initialProps, koSlugs, needsPretendard }
  }

  render() {
    // Synchronous redirect for KO visitors before first paint — async would flash EN.
    const redirectScript = `(function(){try{
var p=location.pathname;
var stored=null;try{stored=localStorage.getItem('site-locale')||localStorage.getItem('blog-locale')}catch(e){}
var pref=stored||(((navigator.language||'').toLowerCase().indexOf('ko')===0)?'ko':'en');
if(pref!=='ko')return;
if(p==='/'||p===''){location.replace('/ko/');return;}
var m=p.match(/^\\/blog\\/([^\\/]+)\\/?$/);
if(!m)return;
var slug=m[1];
var ko=${JSON.stringify(this.props.koSlugs)};
if(ko.indexOf(slug)===-1)return;
location.replace('/blog/ko/'+slug+'/');
}catch(e){}})();`

    // media="print" makes Pretendard load non-blocking; flip to "all" once parsed.
    const fontSwapScript = `(function(){var l=document.getElementById('font-pretendard');if(!l)return;function on(){l.media='all'}if(l.sheet){on()}else{l.addEventListener('load',on)}})();`

    // Apply theme before first paint to prevent light→dark FOUC.
    const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`

    const { needsPretendard } = this.props

    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          {SUPPORT_KO_CHROME && (
            <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
          )}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#fafafa"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#17120b"
          />
          {ENABLE_ANALYTICS && (
            <script defer src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} />
          )}
          {needsPretendard && (
            <>
              <link
                rel="preconnect"
                href="https://cdn.jsdelivr.net"
                crossOrigin=""
              />
              <link
                id="font-pretendard"
                rel="stylesheet"
                href={PRETENDARD_HREF}
                media="print"
              />
              <script dangerouslySetInnerHTML={{ __html: fontSwapScript }} />
              <noscript>
                <link rel="stylesheet" href={PRETENDARD_HREF} />
              </noscript>
            </>
          )}
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
