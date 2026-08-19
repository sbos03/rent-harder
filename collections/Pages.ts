import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Pagina',
    plural: "Pagina's",
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: "Beheer de pagina's en hun secties.",
    livePreview: {
      url: ({ data }) => {
        const slug = data?.slug
        if (slug === 'home') return '/'
        return `/${slug}`
      },
    },
  },
  fields: [
    // ─── SIDEBAR ─────────────────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL pad (bijv. "home" of "voor-wie/hoogwerkerverhuur")',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Pagina zichtbaar op de website?',
      },
    },
    // ─── MAIN CONTENT ────────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        // ── TAB: Algemeen ──
        {
          label: 'Algemeen',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Pagina titel',
              admin: { description: 'Interne naam van de pagina.' },
            },
            {
              name: 'seo',
              type: 'group',
              label: 'SEO Instellingen',
              admin: { description: 'Metadata voor zoekmachines en social media.' },
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Meta titel',
                  admin: { description: 'Titel in zoekresultaten (max 60 tekens).' },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta beschrijving',
                  admin: { description: 'Beschrijving in zoekresultaten (max 160 tekens).' },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Social media afbeelding',
                  admin: { description: 'Afbeelding bij delen op social media (1200x630).' },
                },
              ],
            },
          ],
        },
        // ── TAB: Secties ──
        {
          label: 'Secties',
          description: 'Bouw de pagina op uit secties. Sleep om te herordenen.',
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              label: ' ',
              admin: { initCollapsed: true },
              blocks: [
                // ─── HERO ──────────────────────────────────────────────────
                {
                  slug: 'heroSection',
                  labels: { singular: '🎬 Hero', plural: 'Hero Sections' },
                  imageURL: '/images/Rent_Harder_beeldmerk.svg',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Titel', admin: { width: '50%', description: 'Gebruik | voor regelafbrekingen' } },
                        { name: 'buttonText', type: 'text', label: 'CTA knop', admin: { width: '50%' } },
                      ],
                    },
                    { name: 'subtitle', type: 'textarea', label: 'Ondertitel' },
                    { name: 'bottomText', type: 'text', label: 'Tekst onderaan' },
                    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Achtergrond afbeelding' },
                  ],
                },
                // ─── INTRO (2-koloms) ──────────────────────────────────────
                {
                  slug: 'introSection',
                  labels: { singular: '📋 Intro Sectie', plural: 'Intro Secties' },
                  fields: [
                    { name: 'eyebrow', type: 'text', label: 'Label boven titel' },
                    { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    {
                      type: 'row',
                      fields: [
                        { name: 'ctaText', type: 'text', label: 'CTA knop tekst', admin: { width: '50%' } },
                        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding rechts', admin: { width: '50%' } },
                      ],
                    },
                  ],
                },
                // ─── BRAND STATEMENT ───────────────────────────────────────
                {
                  slug: 'brandStatement',
                  labels: { singular: '💬 Brand Statement', plural: 'Brand Statements' },
                  fields: [
                    { name: 'tagline', type: 'text', required: true, label: 'Tagline', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Achtergrond afbeelding' },
                  ],
                },
                // ─── TARGET AUDIENCE ───────────────────────────────────────
                {
                  slug: 'targetAudience',
                  labels: { singular: '🎯 Doelgroep', plural: 'Doelgroep Secties' },
                  fields: [
                    { name: 'eyebrow', type: 'text', label: 'Label' },
                    { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'categories', type: 'textarea', label: 'Categorieën', admin: { description: 'Opsomming van machine-types.' } },
                    { name: 'ctaText', type: 'text', label: 'CTA tekst' },
                  ],
                },
                // ─── PARTNER STORIES ───────────────────────────────────────
                {
                  slug: 'partnerStories',
                  labels: { singular: '🤝 Partnerverhalen', plural: 'Partnerverhalen Secties' },
                  fields: [
                    { name: 'title', type: 'text', required: true, label: 'Titel' },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    { name: 'stories', type: 'array', label: 'Verhalen', minRows: 1, fields: [
                      { name: 'name', type: 'text', required: true, label: 'Naam' },
                      { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
                    ]},
                    { name: 'ctaText', type: 'text', label: 'CTA tekst' },
                  ],
                },
                // ─── FULLSCREEN STATEMENT ──────────────────────────────────
                {
                  slug: 'fullscreenStatement',
                  labels: { singular: '🖼️ Fullscreen Statement', plural: 'Fullscreen Statements' },
                  fields: [
                    { name: 'eyebrow', type: 'text', label: 'Label' },
                    { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'bottomText', type: 'text', label: 'Tekst onderaan' },
                    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Achtergrond afbeelding' },
                  ],
                },
                // ─── CINEMATIC STATEMENT ───────────────────────────────────
                {
                  slug: 'cinematicStatement',
                  labels: { singular: '✨ Cinematic Statement', plural: 'Cinematic Statements' },
                  fields: [
                    { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'body', type: 'textarea', required: true, label: 'Tekst', admin: { description: 'Wordt woord-voor-woord getoond.' } },
                    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Achtergrond' },
                  ],
                },
                // ─── TV SECTION ────────────────────────────────────────────
                {
                  slug: 'tvSection',
                  labels: { singular: '📺 TV Sectie', plural: 'TV Secties' },
                  fields: [
                    { name: 'eyebrow', type: 'text', label: 'Label', defaultValue: 'RENT HARDER.TV' },
                    { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    { name: 'ctaText', type: 'text', label: 'CTA tekst' },
                  ],
                },
                // ─── METHOD ROADMAP ────────────────────────────────────────
                {
                  slug: 'methodRoadmap',
                  labels: { singular: '🗺️ Methode Roadmap', plural: 'Methode Roadmaps' },
                  fields: [
                    { name: 'eyebrow', type: 'text', label: 'Label' },
                    { name: 'title', type: 'text', required: true, label: 'Titel' },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    { name: 'steps', type: 'array', label: 'Stappen', minRows: 1, fields: [
                      {
                        type: 'row',
                        fields: [
                          { name: 'num', type: 'text', required: true, label: 'Nr', admin: { width: '15%' } },
                          { name: 'title', type: 'text', required: true, label: 'Titel', admin: { width: '45%' } },
                          { name: 'side', type: 'select', options: [{ label: 'Links', value: 'left' }, { label: 'Rechts', value: 'right' }], defaultValue: 'right', label: 'Kant', admin: { width: '20%' } },
                        ],
                      },
                      { name: 'description', type: 'textarea', required: true, label: 'Beschrijving' },
                    ]},
                  ],
                },
                // ─── CASE SHOWCASE ─────────────────────────────────────────
                {
                  slug: 'caseShowcase',
                  labels: { singular: '🏆 Case Showcase', plural: 'Case Showcases' },
                  fields: [
                    { name: 'eyebrow', type: 'text', label: 'Label' },
                    { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    { name: 'cases', type: 'array', label: 'Cases', minRows: 1, fields: [
                      {
                        type: 'row',
                        fields: [
                          { name: 'name', type: 'text', required: true, label: 'Naam', admin: { width: '40%' } },
                          { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Uitgelicht', admin: { width: '20%' } },
                          { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding', admin: { width: '40%' } },
                        ],
                      },
                      { name: 'transformation', type: 'array', label: 'Transformatie', fields: [
                        { name: 'text', type: 'text', required: true },
                      ]},
                      { name: 'points', type: 'array', label: 'Punten', fields: [
                        { name: 'text', type: 'text', required: true },
                      ]},
                    ]},
                    { name: 'ctaText', type: 'text', label: 'CTA tekst' },
                  ],
                },
                // ─── CTA ───────────────────────────────────────────────────
                {
                  slug: 'ctaSection',
                  labels: { singular: '🔘 CTA Sectie', plural: 'CTA Secties' },
                  fields: [
                    { name: 'heading', type: 'text', required: true, label: 'Titel' },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    {
                      type: 'row',
                      fields: [
                        { name: 'buttonText', type: 'text', required: true, label: 'Knop tekst', admin: { width: '40%' } },
                        { name: 'buttonAction', type: 'select', options: [{ label: 'Open contact', value: 'contact' }, { label: 'Link', value: 'link' }], label: 'Actie', admin: { width: '30%' } },
                        { name: 'buttonLink', type: 'text', label: 'Link URL', admin: { width: '30%', condition: (_, siblingData) => siblingData?.buttonAction === 'link' } },
                      ],
                    },
                  ],
                },
                // ─── CINEMATIC IMAGE ───────────────────────────────────────
                {
                  slug: 'cinematicImage',
                  labels: { singular: '🖼️ Sfeerbeeld', plural: 'Sfeerbeelden' },
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Afbeelding' },
                    { name: 'alt', type: 'text', required: true, label: 'Alt tekst' },
                  ],
                },
                // ─── CASE EXAMPLE ──────────────────────────────────────────
                {
                  slug: 'caseExample',
                  labels: { singular: '📝 Voorbeeld Case', plural: 'Voorbeeld Cases' },
                  fields: [
                    { name: 'label', type: 'text', label: 'Label (bijv. "VOORBEELD: MEIJER VERHUUR")' },
                    { name: 'title', type: 'text', required: true, label: 'Titel' },
                    { name: 'highlights', type: 'array', label: 'Highlights', fields: [
                      { name: 'text', type: 'text', required: true },
                    ]},
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    { name: 'bulletPoints', type: 'array', label: 'Bullet points', fields: [
                      { name: 'text', type: 'text', required: true },
                    ]},
                    {
                      type: 'row',
                      fields: [
                        { name: 'ctaText', type: 'text', label: 'CTA tekst', admin: { width: '50%' } },
                        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding', admin: { width: '50%' } },
                      ],
                    },
                  ],
                },
                // ─── PRINCIPLE STEPS ───────────────────────────────────────
                {
                  slug: 'principleSteps',
                  labels: { singular: '📐 Principes', plural: 'Principes Secties' },
                  fields: [
                    { name: 'label', type: 'text', label: 'Label' },
                    { name: 'title', type: 'text', required: true, label: 'Titel' },
                    { name: 'description', type: 'textarea', label: 'Beschrijving' },
                    { name: 'steps', type: 'array', label: 'Stappen', fields: [
                      { name: 'num', type: 'text', required: true, label: 'Nr' },
                      { name: 'title', type: 'text', required: true, label: 'Titel' },
                      { name: 'description', type: 'textarea', required: true, label: 'Beschrijving' },
                    ]},
                  ],
                },
                // ─── SEO CONTENT ───────────────────────────────────────────
                {
                  slug: 'seoContent',
                  labels: { singular: '📄 SEO Content', plural: 'SEO Content Secties' },
                  fields: [
                    { name: 'articles', type: 'array', label: 'Artikelen', fields: [
                      { name: 'title', type: 'text', required: true, label: 'Titel' },
                      { name: 'body', type: 'richText', required: true, label: 'Inhoud' },
                    ]},
                  ],
                },
                // ─── OTHER MARKETS ─────────────────────────────────────────
                {
                  slug: 'otherMarkets',
                  labels: { singular: '🔗 Andere Markten', plural: 'Andere Markten Secties' },
                  fields: [
                    { name: 'label', type: 'text', label: 'Label' },
                    { name: 'title', type: 'text', required: true, label: 'Titel' },
                    { name: 'markets', type: 'array', label: 'Markten', fields: [
                      {
                        type: 'row',
                        fields: [
                          { name: 'name', type: 'text', required: true, label: 'Naam', admin: { width: '50%' } },
                          { name: 'href', type: 'text', required: true, label: 'Link', admin: { width: '50%' } },
                        ],
                      },
                    ]},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
