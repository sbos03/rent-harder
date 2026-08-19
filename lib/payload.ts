import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

export const getPayload = () =>
  getPayloadInstance({
    config,
  })

/**
 * Fetch homepage content from Payload.
 * Falls back to null values if CMS is empty or unavailable.
 */
export async function getHomePageContent() {
  try {
    const payload = await getPayload()

    const [partners, episodes, settings] = await Promise.all([
      payload.find({
        collection: 'partners',
        where: { published: { equals: true } },
        sort: 'order',
        limit: 10,
      }),
      payload.find({
        collection: 'tv-episodes',
        where: { published: { equals: true } },
        sort: 'order',
        limit: 10,
      }),
      payload.findGlobal({
        slug: 'site-settings',
      }),
    ])

    return {
      partners: partners.docs,
      episodes: episodes.docs,
      settings,
    }
  } catch {
    // CMS not available or empty — return null so components use defaults
    return null
  }
}

/**
 * Fetch a single page by slug from Payload.
 */
export async function getPageBySlug(slug: string) {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] || null
  } catch {
    return null
  }
}
