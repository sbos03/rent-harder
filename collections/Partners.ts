import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partner',
    plural: 'Partners',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'headline', 'published', 'updatedAt'],
    description: 'Partnerverhalen — bedrijven waarmee RENT HARDER samenwerkt.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Bedrijfsnaam',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
      admin: { description: 'Korte samenvatting van de transformatie.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
    },
    {
      name: 'points',
      type: 'array',
      label: 'Resultaten',
      admin: { description: 'Opsomming van behaalde resultaten.' },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Achtergrond afbeelding',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
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
      admin: { position: 'sidebar' },
    },
  ],
}
