import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

export const getPayload = () =>
  getPayloadInstance({
    config,
  })

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
    if (map[type]) {
      map[type] = Array.isArray(map[type]) ? [...map[type], block] : [map[type], block]
    } else {
      map[type] = block
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
      partners: partners.docs,
      episodes: episodes.docs,
      settings,
    }
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
    return {
      sections: sectionsToMap(page.sections as any[]),
      seo: page.seo || null,
    }
  } catch {
    return null
  }
}
