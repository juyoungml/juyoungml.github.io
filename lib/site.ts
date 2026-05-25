export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juyoung.site'

export const SITE_NAME = 'Juyoung Suk'

export const SITE_DESCRIPTION =
  'Juyoung Suk works on foundation models, evaluation, and training systems.'

// ORCID is intentionally left null until a registered iD is provided; including
// a placeholder would let Google Scholar / search engines index the wrong
// person. Set NEXT_PUBLIC_ORCID (or hardcode the URL) once registered.
const ORCID_URL: string | null = null

export const SITE_AUTHOR = {
  name: 'Juyoung Suk',
  jobTitle: 'Member of Technical Staff',
  affiliation: 'Trillion Labs',
  twitter: '@juyoungml',
  orcid: ORCID_URL,
  semanticScholar:
    'https://www.semanticscholar.org/author/Juyoung-Suk/2299329316',
  sameAs: [
    'https://github.com/juyoungml',
    'https://scholar.google.com/citations?user=mENsLCkAAAAJ',
    'https://www.semanticscholar.org/author/Juyoung-Suk/2299329316',
    'https://www.linkedin.com/in/juyoung-suk-b5175a192/',
    ...(ORCID_URL ? [ORCID_URL] : []),
  ],
}

export const DEFAULT_OG_IMAGE = '/profile.jpeg'

export const SUPPORTED_LOCALES = ['en', 'ko'] as const
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number]

// Treat anything with a file extension in the last segment as a file URL
// (skip trailing-slash normalization). Pages always get a trailing slash to
// match next.config.js `trailingSlash: true`.
const FILE_EXTENSION = /\.[a-z0-9]{2,5}$/i

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return SITE_URL
  if (FILE_EXTENSION.test(normalized)) return `${SITE_URL}${normalized}`
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`
  return `${SITE_URL}${withSlash}`
}
