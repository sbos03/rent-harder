import type { CollectionConfig } from 'payload'
import { pageSectionBlocks } from './pageBlocks'

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
              blocks: pageSectionBlocks,
            },
          ],
        },
      ],
    },
  ],
}
