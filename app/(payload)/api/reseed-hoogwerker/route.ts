import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

/**
 * Force-recreates ONLY the Hoogwerkerverhuur page with the correct blocks.
 * Safe to run anytime — it deletes the existing Hoogwerker page (if any)
 * and recreates it fresh. Does NOT touch the Homepage or any other content.
 */
export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Delete any existing Hoogwerker page(s)
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'voor-wie/hoogwerkerverhuur' } },
      limit: 10,
    })
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'pages', id: doc.id })
    }

    // Recreate with the correct block structure
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Hoogwerkerverhuur',
        slug: 'voor-wie/hoogwerkerverhuur',
        seo: {
          metaTitle: 'Hoogwerkers Verhuren — RENT HARDER',
          metaDescription:
            'Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.',
        },
        sections: [
          {
            blockType: 'heroSection',
            title: 'HOOGWERKERS VERHUREN.|MAAR DAN HARDER.',
            subtitle:
              'Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.',
            buttonText: 'LAAT ZIEN WAT JE VERHUURT',
          },
          {
            blockType: 'caseExample',
            label: 'VOORBEELD: MEIJER VERHUUR',
            title: 'ZO DOET|MEIJER VERHUUR DAT.',
            highlights: [
              { text: 'OOST-GRONINGEN.' },
              { text: 'HOOGWERKERS.' },
              { text: 'LOKALE FOCUS.' },
            ],
            description:
              'Meijer Verhuur hoeft niet heel Nederland te bedienen om digitaal succesvol te zijn. Juist door assortiment, regio en doelgroep scherp te presenteren ontstaat een veel sterkere lokale verhuurpositie.',
            bulletPoints: [
              { text: 'LOKALE VINDBAARHEID.' },
              { text: 'DUIDELIJK ASSORTIMENT.' },
              { text: 'EEN EIGEN VERHUURPOSITIE.' },
            ],
            ctaText: 'BEKIJK DE BUILD',
          },
          {
            blockType: 'principleSteps',
            label: 'HET PRINCIPE IS OVERAL HETZELFDE.',
            title: 'DIT WERKT NIET ALLEEN|IN OOST-GRONINGEN.',
            description:
              'Je hoeft niet de grootste verhuurder van Nederland te zijn. Je moet digitaal de logischste keuze worden binnen jouw regio, assortiment en doelgroep.',
            steps: [
              { num: '1', title: 'REGIO.', description: 'Waar wil je daadwerkelijk opdrachten winnen?' },
              { num: '2', title: 'ASSORTIMENT.', description: 'Welke hoogwerkers en machines wil je vaker verhuren?' },
              { num: '3', title: 'KLANT.', description: 'Wie zoekt ze, wanneer en met welke informatiebehoefte?' },
            ],
          },
          {
            blockType: 'ctaSection',
            heading: 'WAAR LIGT JOUW|OPEN VERHUURMARKT?',
            description:
              'Misschien staat de volgende groeimarkt niet honderd kilometer verderop, maar gewoon drie plaatsen naast je.',
            buttonText: 'LAAT ONS MEEKIJKEN',
            buttonAction: 'contact',
          },
          {
            blockType: 'otherMarkets',
            label: 'OOK ACTIEF IN.',
            title: 'ANDERE VERHUURMARKT?|ZELFDE PRINCIPES.',
            markets: [
              { name: 'POMPVERHUUR', href: '#' },
              { name: 'CONTAINERVERHUUR', href: '#' },
              { name: 'MATERIEELVERHUUR', href: '#' },
              { name: 'SPECIALISTISCHE VERHUUR', href: '#' },
            ],
          },
        ],
      },
    })

    return NextResponse.json({
      message: '✅ Hoogwerkerverhuur pagina opnieuw aangemaakt met de juiste blokken.',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}
