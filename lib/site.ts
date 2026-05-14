export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juyoung.site'

export const SITE_NAME = 'Juyoung Suk'

export const SITE_DESCRIPTION =
  'Juyoung Suk works on foundation models, evaluation, and training systems.'

export const SITE_AUTHOR = {
  name: 'Juyoung Suk',
  twitter: '@juyoungml',
  sameAs: [
    'https://github.com/juyoungml',
    'https://scholar.google.com/citations?user=mENsLCkAAAAJ',
    'https://www.linkedin.com/in/juyoung-suk-b5175a192/',
  ],
}

export const DEFAULT_OG_IMAGE = '/profile.jpeg'

export const SUPPORTED_LOCALES = ['en', 'ko'] as const
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number]

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return SITE_URL
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`
  return `${SITE_URL}${withSlash}`
}
