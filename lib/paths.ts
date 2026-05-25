import type { PostLocale } from './blog-types'

export function blogPostPath(
  slug: string,
  locale: PostLocale,
  { trailingSlash = false }: { trailingSlash?: boolean } = {}
): string {
  const base = locale === 'ko' ? `/blog/ko/${slug}` : `/blog/${slug}`
  return trailingSlash ? `${base}/` : base
}
