/**
 * Default homepage sections.
 *
 * The homepage renders from the CMS `home` page's `sections` blocks (so an
 * editor can add / edit / reorder / remove them). When that page has NO blocks
 * yet — a fresh database, or before the homepage has been populated in the
 * admin — we fall back to this default set so the site is never blank.
 *
 * These are plain block objects in the SAME shape as CMS blocks (each has a
 * `blockType`), so they flow through <SectionRenderer /> exactly like real
 * CMS content. As soon as the `home` page has its own blocks, those take over
 * and this fallback is ignored.
 *
 * Keep this in sync with app/(payload)/api/seed/route.ts (the seed uses the
 * same content to populate a brand-new database).
 */
export const defaultHomeSections: any[] = [
  {
    blockType: 'heroSection',
    title: 'BUILD.|RENT.|GROW.',
    subtitle:
      'Voor ambitieuze ondernemers die machines, materieel en objecten verhuren.',
    bottomText:
      'Grote kans dat er meer in jouw verhuurbedrijf zit dan je nu laat zien.',
    buttonText: 'LAAT ZIEN WAT JE VERHUURT.',
  },
  {
    blockType: 'introSection',
    anchor: 'wat-we-bouwen',
    eyebrow: 'DE DIGITALE SIDEKICK ACHTER JOUW VERHUUR.',
    title: 'BETER ZICHTBAAR.|SLIMMER GEREGELD.|STERKER GROEIEN.',
    description:
      'Rent Harder helpt ambitieuze verhuurbedrijven digitaal sterker te worden. Zodat je beter zichtbaar bent, slimmer werkt en meer uit je verhuurbedrijf haalt.',
    ctaText: 'LAAT ZIEN WAT JE VERHUURT',
  },
  {
    blockType: 'brandStatement',
    tagline: 'DIGITAAL WAAR HET KAN.|MENSELIJK WAAR HET MOET.',
  },
  {
    blockType: 'targetAudience',
    anchor: 'voor-wie',
    eyebrow: 'GEBOUWD VOOR SPECIALISTISCHE VERHUUR.',
    title: 'VOOR VERHUURDERS|VAN GROTE SPULLEN',
    categories:
      'Hoogwerkers. Aggregaten. Opleggers. Pompen. Containers. Heftrucks. Verreikers. Kranen. En waarschijnlijk nog veel meer.',
    ctaText: 'VOORBEELDEN ZIEN?',
  },
  {
    blockType: 'partnerStories',
    title: 'HARDER VERHUREN.',
    description:
      'Partners, geen klanten. We werken naast verhuurbedrijven die serieus willen groeien.',
    stories: [
      {
        eyebrow: 'Voor infra & tijdelijke installaties',
        name: 'LEIDINGVERHUUR',
        intro:
          'Meer aanvragen, grip op beschikbaarheid en een slimmer proces van offerte tot retour.',
      },
      {
        eyebrow: 'Voor bouw, infra & waterbeheer',
        name: 'POMPVERHUUR & WATEROPLOSSINGEN',
        intro:
          'Maak technische kennis beter zichtbaar en stroomlijn aanvraag, planning en uitvoering.',
      },
      {
        eyebrow: 'Voor particulier & zakelijk verhuur',
        name: 'VERHUUR CONTAINERS',
        intro:
          'Beter gevonden worden, makkelijker laten huren en slimmer werken van bestelling tot ophalen.',
      },
      {
        eyebrow: 'Voor industrie, logistiek & bouw',
        name: 'MACHINEVERHUUR',
        intro:
          'Meer uit je machinepark halen met betere vindbaarheid, snellere aanvragen en meer grip op verhuur.',
      },
    ],
    ctaText: 'Bekijk alle verhuurbranches',
  },
  {
    blockType: 'fullscreenStatement',
    eyebrow: 'VAN NEDERLAND TOT CURAÇAO.',
    title: 'DIGITALISEREN IS|MENSENWERK.',
    bottomText:
      'GROTE KANS DAT ER MEER IN JOUW VERHUURBEDRIJF ZIT DAN JE NU LAAT ZIEN.',
  },
  {
    blockType: 'cinematicStatement',
    title: 'MEER DAN ALLEEN|EEN PLATFORM.',
    body: 'Verhuur je machines, voertuigen of objecten? Dan zit er waarschijnlijk meer in jouw verhuurbedrijf dan je nu laat zien. RENT HARDER bouwt en ontwikkelt jouw complete digitale verhuurtak. Van verhuurplatform en planning tot zichtbaarheid, strategie en groei. Alles om harder te verhuren.',
  },
  {
    blockType: 'tvSection',
    anchor: 'rent-harder-tv',
    eyebrow: 'RENT HARDER.TV',
    title: 'ECHTE MACHINES.|ECHTE ONDERNEMERS.|ECHTE GROEI.',
    description:
      'Verhalen, inzichten en ideeën uit de wereld van verhuur. Op locatie, tussen het materieel en met de mensen die het iedere dag doen.',
    ctaText: 'BEKIJK ALLES OP RENT HARDER.TV',
  },
  {
    blockType: 'methodRoadmap',
    anchor: 'methode',
    eyebrow: 'DE RENT HARDER METHODE.',
    title: 'VAN AMBITIE|NAAR HARDER VERHUREN.',
    description:
      'Geen dikke rapporten of vage trajecten. Met de Rent Harder Methode bouwen we stap voor stap aan een verhuurbedrijf dat beter zichtbaar is, slimmer werkt en sterker groeit.',
    steps: [
      {
        num: '01',
        title: 'WAAR WIL JE NAARTOE?',
        description:
          'We brengen jouw ambities, assortiment, werkwijze en kansen in kaart. We beginnen niet met techniek, maar met waar jij naartoe wilt.',
        side: 'right',
      },
      {
        num: '02',
        title: 'WE MAKEN EEN PLAN.',
        description:
          'We vertalen jouw doelen naar een praktische digitale route. Realistisch waar nodig. Ambitieus waar het kan.',
        side: 'left',
      },
      {
        num: '03',
        title: 'WE BOUWEN JE FUNDAMENT.',
        description:
          'Geen standaard website die over twee jaar weer vervangen moet worden. We bouwen een snel, veilig en schaalbaar digitaal fundament.',
        side: 'right',
      },
      {
        num: '04',
        title: 'WE DIGITALISEREN JE VERHUUR.',
        description:
          'Aanvragen, planning, klanten, content en vindbaarheid worden één logisch geheel. Minder gedoe. Meer overzicht.',
        side: 'left',
      },
      {
        num: '05',
        title: 'WE LATEN JE GROEIEN.',
        description:
          'Een platform alleen brengt geen verhuur. We blijven werken aan zichtbaarheid, content, vindbaarheid en commerciële kansen.',
        side: 'right',
      },
      {
        num: '06',
        title: 'WE BLIJVEN MEEDENKEN.',
        description:
          'Geen project opleveren en verdwijnen. Rent Harder blijft je digitale sidekick.',
        side: 'left',
      },
    ],
  },
  {
    blockType: 'caseShowcase',
    anchor: 'built-to-rent-harder',
    eyebrow: 'BUILT TO RENT HARDER.',
    title: 'GEEN MOOIE PRAATJES.|WEL BEWIJS.',
    description:
      'Kijk wat er ontstaat wanneer ambitieuze verhuurbedrijven en Rent Harder naast elkaar gaan staan.',
    cases: [
      {
        name: 'JH VERHUUR',
        transformation: [{ text: 'Van breed verhaal' }, { text: 'naar scherpe containerfocus.' }],
        points: [
          { text: 'Eigen containerpropositie' },
          { text: 'Duidelijkere doelgroep' },
          { text: 'Betere lokale vindbaarheid' },
        ],
        featured: false,
      },
      {
        name: 'FLEXPUMPS',
        transformation: [{ text: 'Van pompen verhuren' }, { text: 'naar een merk dat niemand mist.' }],
        points: [
          { text: 'Sterke positionering' },
          { text: 'Opvallende content' },
          { text: 'Krachtige digitale basis' },
        ],
        featured: true,
      },
      {
        name: 'MEIJER VERHUUR',
        transformation: [{ text: 'Van lokaal verhuurbedrijf' }, { text: 'naar regionale autoriteit.' }],
        points: [
          { text: 'Meer focus op verhuurtak' },
          { text: 'Digitale groei strategie' },
          { text: 'Meer online aanvragen' },
        ],
        featured: false,
      },
    ],
    ctaText: 'MEER BUILDS',
  },
]
