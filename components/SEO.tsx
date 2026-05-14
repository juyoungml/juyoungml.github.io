import Head from 'next/head'
import {
  DEFAULT_OG_IMAGE,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  type SiteLocale,
} from '../lib/site'

export interface AlternateLocale {
  locale: SiteLocale
  path: string
}

export interface SEOProps {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: 'website' | 'article'
  locale?: SiteLocale
  alternateLocales?: AlternateLocale[]
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  noindex?: boolean
}

const LOCALE_OG: Record<SiteLocale, string> = {
  en: 'en_US',
  ko: 'ko_KR',
}

export default function SEO({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  locale = 'en',
  alternateLocales = [],
  publishedTime,
  modifiedTime,
  author = SITE_AUTHOR.name,
  tags = [],
  noindex = false,
}: SEOProps) {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} · ${SITE_NAME}`
  const canonical = absoluteUrl(path)
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage)

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <link rel="canonical" href={canonical} />

      {alternateLocales.map(alt => (
        <link
          key={`hreflang-${alt.locale}`}
          rel="alternate"
          hrefLang={alt.locale}
          href={absoluteUrl(alt.path)}
        />
      ))}
      {alternateLocales.length > 0 && (
        <link
          key="hreflang-x-default"
          rel="alternate"
          hrefLang="x-default"
          href={absoluteUrl(
            alternateLocales.find(a => a.locale === 'en')?.path ?? path
          )}
        />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={LOCALE_OG[locale]} />
      {alternateLocales
        .filter(a => a.locale !== locale)
        .map(a => (
          <meta
            key={a.locale}
            property="og:locale:alternate"
            content={LOCALE_OG[a.locale]}
          />
        ))}

      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' &&
        tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_AUTHOR.twitter} />
      <meta name="twitter:creator" content={SITE_AUTHOR.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      <link
        key="rss-en"
        rel="alternate"
        type="application/rss+xml"
        title={`${SITE_NAME} — Blog`}
        href={`${SITE_URL}/rss.xml`}
      />
      <link
        key="rss-ko"
        rel="alternate"
        type="application/rss+xml"
        title={`${SITE_NAME} — Blog (한국어)`}
        href={`${SITE_URL}/rss.ko.xml`}
      />
    </Head>
  )
}
