import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { ContentPageViewProps } from '../components/ContentPageView'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface ContentPageMeta {
  title: string
  description: string
  updated?: string
}

export interface ContentPageSource {
  meta: ContentPageMeta
  content: string
}

function normalizeUpdated(updated: unknown, slug: string): string | undefined {
  if (!updated) return undefined
  if (updated instanceof Date) return updated.toISOString().slice(0, 10)
  if (typeof updated === 'string' && updated.trim()) {
    const trimmed = updated.trim()
    if (Number.isNaN(Number(new Date(trimmed)))) {
      throw new Error(`Invalid "updated" date for ${slug}: ${trimmed}`)
    }
    return trimmed
  }
  return undefined
}

export function getContentPage(slug: string): ContentPageSource {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(source)
  const fm = parsed.data as Partial<ContentPageMeta> & { updated?: unknown }

  const title = fm.title?.trim()
  if (!title) throw new Error(`Missing title for content page: ${slug}`)

  return {
    meta: {
      title,
      description: fm.description?.trim() ?? '',
      updated: normalizeUpdated(fm.updated, slug),
    },
    content: parsed.content,
  }
}

export async function getContentPageProps(
  slug: string
): Promise<ContentPageViewProps> {
  const { meta, content } = getContentPage(slug)
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { behavior: 'wrap', properties: { className: ['heading-anchor'] } },
        ],
      ],
    },
  })
  return { slug, path: `/${slug}`, meta, source }
}
