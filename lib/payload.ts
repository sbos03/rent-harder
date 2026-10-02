import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const getPayload = () =>
  getPayloadInstance({
    config,
  })

/**
 * Convert a Lexical richText value to an HTML string on the server, so client
 * components can render it directly without pulling the converter into the
 * browser bundle. Returns '' for empty/invalid input.
 */
function richTextToHtml(value: any): string {
  if (!value || typeof value !== 'object' || !value.root) return ''
  try {
    return convertLexicalToHTML({ data: value })
  } catch {
    return ''
  }
}

/**
 * Walks a page's `sections` array and, for every seoContent block, pre-renders
 * each article's richText `body` into a `bodyHtml` string. Runs server-side.
 */
function renderRichTextSections(sections: any[] | undefined | null): any[] {
  if (!Array.isArray(sections)) return []
  return sections.map((block) => {
    // seoContent: each article's richText body → bodyHtml
    if (block?.blockType === 'seoContent' && Array.isArray(block.articles)) {
      return {
        ...block,
        articles: block.articles.map((article: any) => ({
          ...article,
          bodyHtml: richTextToHtml(article?.body),
        })),
      }
    }

    // textColumns: each column's richText richBody → richBodyHtml
    if (block?.blockType === 'textColumns' && Array.isArray(block.columns)) {
      return {
        ...block,
        columns: block.columns.map((col: any) => ({
          ...col,
          richBodyHtml: richTextToHtml(col?.richBody),
        })),
      }
    }

    // featureColumns: richSubtitle → subtitleHtml, each column richDescription → descriptionHtml
    if (block?.blockType === 'featureColumns') {
      return {
        ...block,
        subtitleHtml: richTextToHtml(block?.richSubtitle),
        columns: Array.isArray(block.columns)
          ? block.columns.map((col: any) => ({
              ...col,
              descriptionHtml: richTextToHtml(col?.richDescription),
            }))
          : block.columns,
      }
    }

    // centeredStatement: richBody → richBodyHtml
    if (block?.blockType === 'centeredStatement') {
      return {
        ...block,
        richBodyHtml: richTextToHtml(block?.richBody),
      }
    }

    return block
  })
}

/**
 * Walks any data structure and, for every media object (has a `url` and
 * `updatedAt`), appends a cache-busting version query param.
 * This ensures a re-uploaded image always renders the new file instead of
 * a browser/Next.js-cached copy.
 */
function bustImageCache(node: any): any {
  if (!node || typeof node !== 'object') return node

  if (Array.isArray(node)) {
    return node.map(bustImageCache)
  }

  const out: any = { ...node }

  // A media doc: has url + updatedAt -> add ?v=timestamp
  if (typeof out.url === 'string' && out.updatedAt) {
    const version = new Date(out.updatedAt).getTime()
    out.url = out.url.includes('?') ? `${out.url}&v=${version}` : `${out.url}?v=${version}`
    // Also version the resized variants (thumbnail, card, hero, portrait)
    if (out.sizes && typeof out.sizes === 'object') {
      const sizes: any = {}
      for (const key of Object.keys(out.sizes)) {
        const size = out.sizes[key]
        if (size && typeof size.url === 'string') {
          sizes[key] = {
            ...size,
            url: size.url.includes('?') ? `${size.url}&v=${version}` : `${size.url}?v=${version}`,
          }
        } else {
          sizes[key] = size
        }
      }
      out.sizes = sizes
    }
  }

  // Recurse into nested objects
  for (const key of Object.keys(out)) {
    if (key !== 'sizes' && out[key] && typeof out[key] === 'object') {
      out[key] = bustImageCache(out[key])
    }
  }

  return out
}

/**
 * Turn a page's `sections` blocks array into a lookup keyed by blockType.
 * e.g. { heroSection: {...}, introSection: {...} }
 * If a block type appears more than once, values become an array.
 */
export function sectionsToMap(sections: any[] | undefined | null) {
  const map: Record<string, any> = {}
  if (!sections) return map
  for (const block of sections) {
    const type = block.blockType
    const busted = bustImageCache(block)
    if (map[type]) {
      map[type] = Array.isArray(map[type]) ? [...map[type], busted] : [map[type], busted]
    } else {
      map[type] = busted
    }
  }
  return map
}

/**
 * Fetch homepage content from Payload.
 * Falls back to null if CMS is empty or unavailable.
 */
export async function getHomePageContent() {
  try {
    const payload = await getPayload()

    const [pages, partners, episodes, settings] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        limit: 1,
        depth: 2,
      }),
      payload.find({
        collection: 'partners',
        where: { published: { equals: true } },
        sort: 'order',
        limit: 10,
        depth: 1,
      }),
      payload.find({
        collection: 'tv-episodes',
        where: { published: { equals: true } },
        sort: 'order',
        limit: 10,
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'site-settings',
      }),
    ])

    const page = pages.docs[0] || null

    return {
      sections: sectionsToMap(page?.sections as any[]),
      seo: page?.seo || null,
      partners: bustImageCache(partners.docs),
      episodes: bustImageCache(episodes.docs),
      settings,
    }
  } catch {
    return null
  }
}

/**
 * Fetch the global site settings (nav, footer, contact, socials).
 * Falls back to null if unavailable.
 */
export async function getSiteSettings() {
  try {
    const payload = await getPayload()
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    return bustImageCache(settings)
  } catch {
    return null
  }
}

/**
 * Fetch all published partners (for the homepage case cards).
 */
export async function getPartners() {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'partners',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 50,
      depth: 2,
    })
    return bustImageCache(result.docs)
  } catch {
    return []
  }
}

/**
 * Fetch a single partner by slug, with its sections + intro.
 */
export async function getPartnerBySlug(slug: string) {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'partners',
      where: { slug: { equals: slug }, published: { equals: true } },
      limit: 1,
      depth: 2,
    })
    const partner = result.docs[0] || null
    if (!partner) return null
    const busted = bustImageCache(partner)
    busted.sections = renderRichTextSections(busted.sections)
    return busted
  } catch {
    return null
  }
}

/**
 * Fetch a single published page by slug, returning the full document with
 * `sections` left as an ordered array so it can be passed straight to
 * <SectionRenderer />. Used by the dynamic [...slug] frontend route.
 *
 * Returns null when the page does not exist or is not published, so the route
 * can render a 404.
 */
export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
        published: { equals: true },
      },
      limit: 1,
      depth: 2,
    })
    const page = result.docs[0] || null
    if (!page) return null
    const busted = bustImageCache(page)
    busted.sections = renderRichTextSections(busted.sections)
    return busted
  } catch {
    return null
  }
}

/**
 * Fetch a single page by slug from Payload, with sections mapped.
 */
export async function getPageContent(slug: string) {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    const page = result.docs[0] || null
    if (!page) return null
    // sectionsToMap already applies image cache-busting per block
    return {
      sections: sectionsToMap(page.sections as any[]),
      seo: page.seo || null,
    }
  } catch {
    return null
  }
}
