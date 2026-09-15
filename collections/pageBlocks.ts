import type { Block, Field } from 'payload'

/**
 * Shared "Anchor / Sectie ID" field added to every block. Lets an editor give
 * a section a stable id (e.g. "prijzen") so links like /pagina#prijzen scroll
 * to it. The value is normalised to a URL-safe slug on save.
 */
const anchorField: Field = {
  name: 'anchor',
  type: 'text',
  label: 'Anchor / Sectie ID',
  admin: {
    position: 'sidebar',
    description: 'Optioneel. Link ernaartoe met #jouw-id, bijv. "prijzen" → /pagina#prijzen. Alleen letters, cijfers en koppeltekens.',
  },
  hooks: {
    beforeValidate: [
      ({ value }) =>
        typeof value === 'string' && value.trim() !== ''
          ? value
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '')
          : value,
    ],
  },
}

/**
 * Section blocks used by both the Pages collection and the Partners collection,
 * so partner pages can be built exactly like the homepage.
 */
const rawSectionBlocks: Block[] = [
  // ─── HERO ──────────────────────────────────────────────
  {
    slug: 'heroSection',
    labels: { singular: '🎬 Hero', plural: 'Hero Sections' },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'title', type: 'text', required: true, label: 'Titel', admin: { width: '50%', description: 'Gebruik | voor regelafbrekingen' } },
          { name: 'buttonText', type: 'text', label: 'CTA knop', admin: { width: '50%' } },
        ],
      },
      { name: 'buttonLink', type: 'text', label: 'CTA link', admin: { description: 'Leeg = opent contact popup. Of: #anchor, /contact, https://...' } },
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
      { name: 'ctaLink', type: 'text', label: 'CTA link', admin: { description: 'Leeg = opent contact popup. Of: #anchor, /contact, https://...' } },
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
      { name: 'ctaLink', type: 'text', label: 'CTA link', admin: { description: 'Leeg = opent contact popup. Of: #anchor, /contact, https://...' } },
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
        { name: 'eyebrow', type: 'text', label: 'Label boven titel', admin: { description: 'Bijv. "Voor infra & tijdelijke installaties"' } },
        { name: 'name', type: 'text', required: true, label: 'Titel' },
        { name: 'intro', type: 'textarea', label: 'Korte intro' },
        { name: 'link', type: 'text', label: 'Link naar pagina', admin: { description: 'Bijv. /partners/leidingverhuur' } },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
      ]},
      { name: 'ctaText', type: 'text', label: 'CTA tekst' },
      { name: 'ctaLink', type: 'text', label: 'CTA link', admin: { description: 'Leeg = opent contact popup. Of: #anchor, /contact, https://...' } },
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
      { name: 'ctaLink', type: 'text', label: 'CTA link', admin: { description: 'Leeg = opent contact popup. Of: #anchor, /contact, https://...' } },
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
        { name: 'link', type: 'text', label: 'Link naar partnerpagina', admin: { description: 'Bijv. /partners/jh-verhuur' } },
        { name: 'transformation', type: 'array', label: 'Transformatie', fields: [
          { name: 'text', type: 'text', required: true },
        ]},
        { name: 'points', type: 'array', label: 'Punten', fields: [
          { name: 'text', type: 'text', required: true },
        ]},
      ]},
      { name: 'ctaText', type: 'text', label: 'CTA tekst' },
      { name: 'ctaLink', type: 'text', label: 'CTA link', admin: { description: 'Leeg = opent contact popup. Of: #anchor, /contact, https://...' } },
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
  // ─── FEATURE COLUMNS (licht, titel + subtitle + kolommen) ──
  {
    slug: 'featureColumns',
    labels: { singular: '🧱 Feature Kolommen', plural: 'Feature Kolommen Secties' },
    fields: [
      { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
      { name: 'subtitle', type: 'textarea', label: 'Ondertitel' },
      {
        name: 'theme',
        type: 'select',
        label: 'Kleurstelling',
        defaultValue: 'light',
        options: [
          { label: 'Licht (witte achtergrond)', value: 'light' },
          { label: 'Donker (zwarte achtergrond)', value: 'dark' },
        ],
      },
      {
        name: 'columns',
        type: 'array',
        label: 'Kolommen',
        minRows: 1,
        maxRows: 4,
        fields: [
          { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
          { name: 'description', type: 'textarea', label: 'Beschrijving' },
        ],
      },
    ],
  },
  // ─── CENTERED STATEMENT (gecentreerde titel + paragrafen + highlight) ──
  {
    slug: 'centeredStatement',
    labels: { singular: '🎯 Gecentreerd Statement', plural: 'Gecentreerde Statements' },
    fields: [
      { name: 'title', type: 'text', required: true, label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
      {
        name: 'paragraphs',
        type: 'array',
        label: 'Paragrafen',
        fields: [{ name: 'text', type: 'textarea', required: true, label: 'Tekst' }],
      },
      { name: 'highlightText', type: 'text', label: 'Highlight balk tekst', admin: { description: 'Optioneel. Gebruik | voor regelafbrekingen. Leeg = geen balk.' } },
      {
        name: 'theme',
        type: 'select',
        label: 'Kleurstelling',
        defaultValue: 'light',
        options: [
          { label: 'Licht (witte achtergrond)', value: 'light' },
          { label: 'Donker (zwarte achtergrond)', value: 'dark' },
        ],
      },
    ],
  },
  // ─── TEXT COLUMNS (eyebrow + titel + kolommen met bullets) ──
  {
    slug: 'textColumns',
    labels: { singular: '📰 Tekst Kolommen', plural: 'Tekst Kolommen Secties' },
    fields: [
      { name: 'eyebrow', type: 'text', label: 'Label boven titel' },
      { name: 'title', type: 'text', label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
      {
        name: 'theme',
        type: 'select',
        label: 'Kleurstelling',
        defaultValue: 'light',
        options: [
          { label: 'Licht (witte achtergrond)', value: 'light' },
          { label: 'Donker (zwarte achtergrond)', value: 'dark' },
        ],
      },
      {
        name: 'columns',
        type: 'array',
        label: 'Kolommen',
        minRows: 1,
        maxRows: 4,
        fields: [
          {
            name: 'richBody',
            type: 'richText',
            label: 'Tekst',
            admin: {
              description:
                'Tekst met opmaak: alinea-breaks, vet, cursief, links en lijsten. Gebruik dit veld. (De oude "Tekst (oud)" en "Uitgelichte regel" velden hieronder zijn alleen voor bestaande content.)',
            },
          },
          {
            name: 'body',
            type: 'textarea',
            label: 'Tekst (oud)',
            admin: {
              description: 'Verouderd. Laat leeg en gebruik het "Tekst" veld hierboven.',
            },
          },
          {
            name: 'highlight',
            type: 'text',
            label: 'Uitgelichte regel (oud)',
            admin: {
              description: 'Verouderd. Laat leeg en gebruik het "Tekst" veld hierboven.',
            },
          },
          {
            name: 'bullets',
            type: 'array',
            label: 'Bullets (met checkmark)',
            fields: [{ name: 'text', type: 'text', required: true }],
          },
        ],
      },
    ],
  },
  // ─── IMAGE DUO (twee afbeeldingen naast elkaar) ────────────
  {
    slug: 'imageDuo',
    labels: { singular: '🖼️ Twee Afbeeldingen', plural: 'Twee-Afbeelding Secties' },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'imageLeft', type: 'upload', relationTo: 'media', required: true, label: 'Linker afbeelding', admin: { width: '50%' } },
          { name: 'imageRight', type: 'upload', relationTo: 'media', required: true, label: 'Rechter afbeelding', admin: { width: '50%' } },
        ],
      },
      {
        name: 'theme',
        type: 'select',
        label: 'Kleurstelling',
        defaultValue: 'light',
        options: [
          { label: 'Licht (witte achtergrond)', value: 'light' },
          { label: 'Donker (zwarte achtergrond)', value: 'dark' },
        ],
      },
    ],
  },
]

/**
 * Every block gets the shared anchor field (in the sidebar) prepended, so any
 * section can be given a stable id for #anchor links without repeating the
 * field in each block definition.
 */
export const pageSectionBlocks: Block[] = rawSectionBlocks.map((block) => ({
  ...block,
  fields: [anchorField, ...block.fields],
}))
