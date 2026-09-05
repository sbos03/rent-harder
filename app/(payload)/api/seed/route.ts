import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Check if pages already exist
    const existing = await payload.find({ collection: 'pages', limit: 1 })
    if (existing.docs.length > 0) {
      return NextResponse.json({ message: 'Pages already seeded. Delete them from /admin first if you want to re-seed.' })
    }

    // ─── HOMEPAGE ──────────────────────────────────────────────────────
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Homepage',
        slug: 'home',
        seo: {
          metaTitle: 'RENT HARDER — De digitale sidekick achter jouw verhuur',
          metaDescription: 'RENT HARDER bouwt en ontwikkelt complete digitale verhuurtakken voor ambitieuze ondernemers die machines, materieel en objecten verhuren.',
        },
        sections: [
          {
            blockType: 'heroSection',
            title: 'BUILD.|RENT.|GROW.',
            subtitle: 'Voor ambitieuze ondernemers die machines, materieel en objecten verhuren.',
            bottomText: 'Grote kans dat er meer in jouw verhuurbedrijf zit dan je nu laat zien.',
            buttonText: 'LAAT ZIEN WAT JE VERHUURT.',
          },
          {
            blockType: 'introSection',
            eyebrow: 'DE DIGITALE SIDEKICK ACHTER JOUW VERHUUR.',
            title: 'BETER ZICHTBAAR.|SLIMMER GEREGELD.|STERKER GROEIEN.',
            description: 'Rent Harder helpt ambitieuze verhuurbedrijven digitaal sterker te worden. Zodat je beter zichtbaar bent, slimmer werkt en meer uit je verhuurbedrijf haalt.',
            ctaText: 'LAAT ZIEN WAT JE VERHUURT',
          },
          {
            blockType: 'brandStatement',
            tagline: 'DIGITAAL WAAR HET KAN.|MENSELIJK WAAR HET MOET.',
          },
          {
            blockType: 'targetAudience',
            eyebrow: 'GEBOUWD VOOR SPECIALISTISCHE VERHUUR.',
            title: 'VOOR VERHUURDERS|VAN GROTE SPULLEN',
            categories: 'Hoogwerkers. Aggregaten. Opleggers. Pompen. Containers. Heftrucks. Verreikers. Kranen. En waarschijnlijk nog veel meer.',
            ctaText: 'VOORBEELDEN ZIEN?',
          },
          {
            blockType: 'partnerStories',
            title: 'HARDER VERHUREN.',
            description: 'Partners, geen klanten. We werken naast verhuurbedrijven die serieus willen groeien.',
            stories: [
              { eyebrow: 'Voor infra & tijdelijke installaties', name: 'LEIDINGVERHUUR', intro: 'Meer aanvragen, grip op beschikbaarheid en een slimmer proces van offerte tot retour.' },
              { eyebrow: 'Voor bouw, infra & waterbeheer', name: 'POMPVERHUUR & WATEROPLOSSINGEN', intro: 'Maak technische kennis beter zichtbaar en stroomlijn aanvraag, planning en uitvoering.' },
              { eyebrow: 'Voor particulier & zakelijk verhuur', name: 'VERHUUR CONTAINERS', intro: 'Beter gevonden worden, makkelijker laten huren en slimmer werken van bestelling tot ophalen.' },
              { eyebrow: 'Voor industrie, logistiek & bouw', name: 'MACHINEVERHUUR', intro: 'Meer uit je machinepark halen met betere vindbaarheid, snellere aanvragen en meer grip op verhuur.' },
            ],
            ctaText: 'Bekijk alle verhuurbranches',
          },
          {
            blockType: 'fullscreenStatement',
            eyebrow: 'VAN NEDERLAND TOT CURAÇAO.',
            title: 'DIGITALISEREN IS|MENSENWERK.',
            bottomText: 'GROTE KANS DAT ER MEER IN JOUW VERHUURBEDRIJF ZIT DAN JE NU LAAT ZIEN.',
          },
          {
            blockType: 'cinematicStatement',
            title: 'MEER DAN ALLEEN|EEN PLATFORM.',
            body: 'Verhuur je machines, voertuigen of objecten? Dan zit er waarschijnlijk meer in jouw verhuurbedrijf dan je nu laat zien. RENT HARDER bouwt en ontwikkelt jouw complete digitale verhuurtak. Van verhuurplatform en planning tot zichtbaarheid, strategie en groei. Alles om harder te verhuren.',
          },
          {
            blockType: 'tvSection',
            eyebrow: 'RENT HARDER.TV',
            title: 'ECHTE MACHINES.|ECHTE ONDERNEMERS.|ECHTE GROEI.',
            description: 'Verhalen, inzichten en ideeën uit de wereld van verhuur. Op locatie, tussen het materieel en met de mensen die het iedere dag doen.',
            ctaText: 'BEKIJK ALLES OP RENT HARDER.TV',
          },
          {
            blockType: 'methodRoadmap',
            eyebrow: 'DE RENT HARDER METHODE.',
            title: 'VAN AMBITIE NAAR HARDER VERHUREN.',
            description: 'Geen dikke rapporten of vage trajecten. Met de Rent Harder Methode bouwen we stap voor stap aan een verhuurbedrijf dat beter zichtbaar is, slimmer werkt en sterker groeit.',
            steps: [
              { num: '01', title: 'WAAR WIL JE NAARTOE?', description: 'We brengen jouw ambities, assortiment, werkwijze en kansen in kaart. We beginnen niet met techniek, maar met waar jij naartoe wilt.', side: 'right' },
              { num: '02', title: 'WE MAKEN EEN PLAN.', description: 'We vertalen jouw doelen naar een praktische digitale route. Realistisch waar nodig. Ambitieus waar het kan.', side: 'left' },
              { num: '03', title: 'WE BOUWEN JE FUNDAMENT.', description: 'Geen standaard website die over twee jaar weer vervangen moet worden. We bouwen een snel, veilig en schaalbaar digitaal fundament.', side: 'right' },
              { num: '04', title: 'WE DIGITALISEREN JE VERHUUR.', description: 'Aanvragen, planning, klanten, content en vindbaarheid worden één logisch geheel. Minder gedoe. Meer overzicht.', side: 'left' },
              { num: '05', title: 'WE LATEN JE GROEIEN.', description: 'Een platform alleen brengt geen verhuur. We blijven werken aan zichtbaarheid, content, vindbaarheid en commerciële kansen.', side: 'right' },
              { num: '06', title: 'WE BLIJVEN MEEDENKEN.', description: 'Geen project opleveren en verdwijnen. Rent Harder blijft je digitale sidekick.', side: 'left' },
            ],
          },
          {
            blockType: 'caseShowcase',
            eyebrow: 'BUILT TO RENT HARDER.',
            title: 'GEEN MOOIE PRAATJES.|WEL BEWIJS.',
            description: 'Kijk wat er ontstaat wanneer ambitieuze verhuurbedrijven en Rent Harder naast elkaar gaan staan.',
            cases: [
              { name: 'JH VERHUUR', transformation: [{ text: 'Van breed verhaal' }, { text: 'naar scherpe containerfocus.' }], points: [{ text: 'Eigen containerpropositie' }, { text: 'Duidelijkere doelgroep' }, { text: 'Betere lokale vindbaarheid' }], featured: false },
              { name: 'FLEXPUMPS', transformation: [{ text: 'Van pompen verhuren' }, { text: 'naar een merk dat niemand mist.' }], points: [{ text: 'Sterke positionering' }, { text: 'Opvallende content' }, { text: 'Krachtige digitale basis' }], featured: true },
              { name: 'MEIJER VERHUUR', transformation: [{ text: 'Van lokaal verhuurbedrijf' }, { text: 'naar regionale autoriteit.' }], points: [{ text: 'Meer focus op verhuurtak' }, { text: 'Digitale groei strategie' }, { text: 'Meer online aanvragen' }], featured: false },
            ],
            ctaText: 'MEER BUILDS',
          },
        ],
      },
    })

    // ─── HOOGWERKER PAGE ───────────────────────────────────────────────
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Hoogwerkerverhuur',
        slug: 'voor-wie/hoogwerkerverhuur',
        seo: {
          metaTitle: 'Hoogwerkers Verhuren — RENT HARDER',
          metaDescription: 'Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.',
        },
        sections: [
          {
            blockType: 'heroSection',
            title: 'HOOGWERKERS VERHUREN.|MAAR DAN HARDER.',
            subtitle: 'Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.',
            buttonText: 'LAAT ZIEN WAT JE VERHUURT',
          },
          {
            blockType: 'caseExample',
            label: 'VOORBEELD: MEIJER VERHUUR',
            title: 'VAN LOKAAL VERHUURBEDRIJF NAAR REGIONALE AUTORITEIT.',
            highlights: [{ text: 'Regio Oost-Groningen' }, { text: 'Hoogwerkers + materieel' }, { text: 'Digitale verhuurtak' }],
            description: 'Meijer Verhuur had het materieel, de kennis en de klanten. Maar digitaal was er weinig zichtbaar.',
            bulletPoints: [{ text: 'Eigen verhuurplatform met assortiment' }, { text: 'Lokale vindbaarheid in Google' }, { text: 'Professionele content en fotografie' }, { text: 'Meer aanvragen uit de regio' }],
            ctaText: 'ZO WERKEN WIJ',
          },
          {
            blockType: 'principleSteps',
            label: 'WAAROM DIT WERKT.',
            title: 'DIT WERKT NIET ALLEEN IN OOST-GRONINGEN.',
            description: 'De principes die we toepassen werken voor iedere verhuurder met een lokaal of regionaal werkgebied.',
            steps: [
              { num: '01', title: 'REGIO', description: 'Je materieel staat ergens. Je klanten zitten in een straal daaromheen. We maken je digitaal dominant in dat gebied.' },
              { num: '02', title: 'ASSORTIMENT', description: 'We laten precies zien wat je verhuurt, met de juiste uitleg, specificaties en vertrouwen.' },
              { num: '03', title: 'KLANT', description: 'We zorgen dat de juiste klant jou vindt op het moment dat hij zoekt.' },
            ],
          },
          {
            blockType: 'ctaSection',
            heading: 'WAAR LIGT JOUW OPEN VERHUURMARKT?',
            description: 'Elke regio heeft kansen. Wij helpen je ze zien en pakken.',
            buttonText: 'LAAT ONS MEEKIJKEN',
            buttonAction: 'contact',
          },
          {
            blockType: 'otherMarkets',
            label: 'NIET ALLEEN HOOGWERKERS.',
            title: 'DIT BOUWEN WE OOK.',
            markets: [
              { name: 'POMPVERHUUR', href: '/voor-wie/pompverhuur' },
              { name: 'CONTAINERVERHUUR', href: '/voor-wie/containerverhuur' },
              { name: 'MATERIEELVERHUUR', href: '/voor-wie/materieelverhuur' },
              { name: 'SPECIALISTISCHE VERHUUR', href: '/voor-wie/specialistisch' },
            ],
          },
        ],
      },
    })

    // ─── TV EPISODES ───────────────────────────────────────────────────
    const episodes = [
      { title: 'WAAR LIGT IN JOUW REGIO NOG EEN OPEN VERHUURMARKT?', meta: 'RH.TV / 001 · DOCUMENTARY SHORT', duration: '06:42', order: 1 },
      { title: 'HOE BOUW JE EEN VERHUURMERK DAT NIEMAND MIST?', meta: 'RH.TV / 002 · ON SITE', duration: '05:18', order: 2 },
      { title: 'MEER BEREIK MET VIDEO VAN JE MATERIEEL.', meta: 'RH.TV / 003 · DOCUMENTARY SHORT', duration: '04:37', order: 3 },
      { title: 'WAT MAAKT EEN VERHUURBEDRIJF KLAAR VOOR DE VOLGENDE GROEIFASE?', meta: 'RH.TV / 004 · HARDER TALK', duration: '08:24', order: 4 },
    ]
    for (const ep of episodes) {
      await payload.create({ collection: 'tv-episodes', data: { ...ep, published: true } })
    }

    // ─── SITE SETTINGS ─────────────────────────────────────────────────
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'RENT HARDER',
        siteDescription: 'De digitale sidekick achter jouw verhuur.',
        phone: '0599 253 032',
        email: 'contact@rentharder.nl',
        whatsapp: '06-12345678',
        address: 'Nomdenweg 2\nTer Apel',
        linkedin: 'https://linkedin.com/company/rentharder',
        instagram: 'https://instagram.com/rentharder',
        facebook: 'https://facebook.com/rentharder',
        youtube: 'https://youtube.com/@rentharder',
        footerTagline: 'De digitale sidekick achter jouw verhuur.',
        footerDescription: 'Jij verhuurt het materieel.',
        footerDescriptionBold: 'Wij bouwen en ontwikkelen jouw complete digitale verhuurtak.',
        poweredBy: 'Powered by KIX.',
        builtBy: 'Software built by Fuse-IT.',
        navigation: [
          { label: 'HOME', href: '/', type: 'page' },
          { label: 'WAT WE BOUWEN', href: '/#wat-we-bouwen', type: 'anchor' },
          { label: 'VOOR WIE', href: '/#voor-wie', type: 'anchor' },
          { label: 'DE METHODE', href: '/#methode', type: 'anchor' },
          { label: 'BUILT TO RENT HARDER', href: '/#built-to-rent-harder', type: 'anchor' },
          { label: 'RENT HARDER.TV', href: '/#rent-harder-tv', type: 'anchor' },
          { label: 'CONTACT', href: '#', type: 'contact' },
        ],
      },
    })

    return NextResponse.json({ message: '✅ Seeded: 2 pages, 4 TV episodes, site settings' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
