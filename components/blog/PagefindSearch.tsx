import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import type { PostLocale } from '../../lib/blog'

interface PagefindResultData {
  url: string
  excerpt: string
  meta: { title?: string; description?: string; image?: string }
}

interface PagefindResult {
  id: string
  data: () => Promise<PagefindResultData>
}

interface PagefindApi {
  debouncedSearch: (
    query: string
  ) => Promise<{ results: PagefindResult[] } | null>
}

type LoadState = 'idle' | 'loading' | 'ready' | 'error'

interface PagefindSearchProps {
  locale?: PostLocale
}

const STRINGS = {
  en: {
    label: 'Search posts',
    placeholder: 'search posts…',
    empty: 'no matches',
    error: 'search unavailable',
    hint: 'index loads after first build',
  },
  ko: {
    label: '글 검색',
    placeholder: '글 검색…',
    empty: '일치하는 글이 없습니다',
    error: '검색을 사용할 수 없습니다',
    hint: '빌드 후에 인덱스를 사용할 수 있습니다',
  },
}

const MAX_RESULTS = 8

function normalizeUrl(url: string): string {
  return url.replace(/index\.html$/, '')
}

export default function PagefindSearch({ locale = 'en' }: PagefindSearchProps) {
  const strings = STRINGS[locale]
  const inputId = useId()

  const [query, setQuery] = useState('')
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [results, setResults] = useState<PagefindResultData[]>([])
  const apiRef = useRef<PagefindApi | null>(null)
  const requestIdRef = useRef(0)

  const ensureLoaded = async () => {
    if (apiRef.current || loadState === 'loading') return
    setLoadState('loading')
    try {
      const path = '/pagefind/pagefind.js'
      const mod = (await import(/* webpackIgnore: true */ path)) as {
        init?: () => Promise<void>
      } & PagefindApi
      if (typeof mod.init === 'function') await mod.init()
      apiRef.current = mod
      setLoadState('ready')
    } catch (err) {
      console.warn('PagefindSearch: failed to load pagefind', err)
      setLoadState('error')
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    let cancelled = false
    const id = ++requestIdRef.current
    ;(async () => {
      await ensureLoaded()
      if (cancelled || !apiRef.current) return
      const response = await apiRef.current.debouncedSearch(query)
      if (cancelled || !response || id !== requestIdRef.current) return
      const limited = response.results.slice(0, MAX_RESULTS)
      const hydrated = await Promise.all(limited.map(r => r.data()))
      if (!cancelled && id === requestIdRef.current) setResults(hydrated)
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const showResults = query.trim().length > 0
  const showError = loadState === 'error'

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        {strings.label}
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={ensureLoaded}
        placeholder={strings.placeholder}
        autoComplete="off"
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none"
      />

      {showError && (
        <p className="mt-2 text-xs text-muted-foreground">
          {strings.error} <span className="opacity-60">({strings.hint})</span>
        </p>
      )}

      {showResults && !showError && (
        <ul className="mt-4 space-y-3 text-sm">
          {results.length === 0 ? (
            <li className="text-muted-foreground">{strings.empty}</li>
          ) : (
            results.map(result => (
              <li key={result.url}>
                <Link
                  href={normalizeUrl(result.url)}
                  className="block rounded-md border border-border/40 px-3 py-2 transition-colors hover:border-accent/40"
                >
                  <span className="block font-medium text-foreground">
                    {result.meta.title ?? result.url}
                  </span>
                  <span
                    className="mt-1 block text-xs leading-5 text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
