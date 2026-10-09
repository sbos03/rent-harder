import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { defaultHomeSections } from '@/lib/defaultHomeSections'

/**
 * Creates (or re-creates) the Homepage in the CMS, filled with the default
 * block set from lib/defaultHomeSections.ts.
 *
 * Why this exists: the homepage renders from the `home` page's `sections`
 * blocks. If no `home` page exists, the frontend shows the code fallback
 * (defaultHomeSections) — which is why "the text in Payload differs from live"
 * and edits don't appear: there was no `home` page to edit. Running this once
 * materialises those exact blocks as real, editable CMS content, so what you
 * see in Payload is what's live, and edits take effect.
 *
 * SAFE: only touches the `home` page. Does NOT touch other pages, partners,
 * TV episodes or settings.
 *
 * Query params:
 *   (none)        → create `home` only if it does not exist yet
 *   ?force=true   → delete any existing `home` page(s) and recreate fresh
 *                   (use this to reset the homepage back to the defaults)
 */
export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const force = new URL(request.url).searchParams.get('force') === 'true'

    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 10,
    })

    if (existing.docs.length > 0 && !force) {
      return NextResponse.json({
        message:
          'De home pagina bestaat al. Niets gewijzigd. Gebruik ?force=true om hem te resetten naar de standaardblokken.',
        existingId: existing.docs[0].id,
      })
    }

    // force: remove the existing home page(s) first
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'pages', id: doc.id })
    }

    const created = await payload.create({
      collection: 'pages',
      data: {
        title: 'Homepage',
        slug: 'home',
        published: true,
        seo: {
          metaTitle: 'RENT HARDER — De digitale sidekick achter jouw verhuur',
          metaDescription:
            'RENT HARDER bouwt en ontwikkelt complete digitale verhuurtakken voor ambitieuze ondernemers die machines, materieel en objecten verhuren.',
        },
        // Same blocks the frontend was showing as a fallback, now as real,
        // editable CMS content.
        sections: defaultHomeSections as any,
      },
    })

    return NextResponse.json({
      message: force
        ? '✅ Home pagina gereset naar de standaardblokken.'
        : '✅ Home pagina aangemaakt met de standaardblokken. Bewerk hem nu in /admin.',
      id: created.id,
      blocks: defaultHomeSections.length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}
