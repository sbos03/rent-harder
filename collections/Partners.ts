import type { CollectionConfig } from 'payload'
import { pageSectionBlocks } from './pageBlocks'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partner',
    plural: 'Partners',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'published', 'updatedAt'],
    description: 'Partnerverhalen — elk met een eigen pagina opgebouwd uit secties.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL van de partnerpagina (bijv. "jh-verhuur").',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Gepubliceerd',
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Volgorde',
      admin: { position: 'sidebar', description: 'Lagere nummers eerst.' },
    },
    {
      type: 'tabs',
      tabs: [
        // ── TAB: Kaart (homepage card) ──
        {
          label: 'Kaart',
          description: 'Hoe deze partner op de homepage wordt getoond.',
          fields: [
            { name: 'name', type: 'text', required: true, label: 'Bedrijfsnaam' },
            {
              name: 'transformation',
              type: 'array',
              label: 'Transformatie regels',
              admin: { description: 'De grote regels op de kaart (bijv. "VAN BREED VERHAAL").' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'points',
              type: 'array',
              label: 'Resultaten',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'cardImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Kaart achtergrond afbeelding',
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Uitgelicht (grotere kaart)',
              defaultValue: false,
            },
          ],
        },
        // ── TAB: Intro (top of the partner page) ──
        {
          label: 'Intro',
          description: 'De koptekst en achtergrondfoto bovenaan de partnerpagina.',
          fields: [
            { name: 'introEyebrow', type: 'text', label: 'Label boven titel' },
            { name: 'introTitle', type: 'text', label: 'Titel', admin: { description: 'Gebruik | voor regelafbrekingen' } },
            { name: 'introDescription', type: 'textarea', label: 'Beschrijving' },
            {
              name: 'introImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Achtergrond afbeelding',
            },
          ],
        },
        // ── TAB: Secties (full page builder, same as homepage) ──
        {
          label: 'Secties',
          description: 'Bouw de partnerpagina op uit secties, net als de homepage.',
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
        // ── TAB: SEO ──
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO',
              fields: [
                { name: 'metaTitle', type: 'text', label: 'Meta titel' },
                { name: 'metaDescription', type: 'textarea', label: 'Meta beschrijving' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
