import type { CollectionConfig } from 'payload'

export const TVEpisodes: CollectionConfig = {
  slug: 'tv-episodes',
  labels: {
    singular: 'TV Aflevering',
    plural: 'TV Afleveringen',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'meta', 'duration', 'published', 'updatedAt'],
    description: 'RENT HARDER.TV afleveringen — beheer titels, thumbnails en video links.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
    },
    {
      name: 'meta',
      type: 'text',
      label: 'Label (bijv. "RH.TV / 001 · DOCUMENTARY SHORT")',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duur (bijv. 06:42)',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Thumbnail',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (YouTube/Vimeo)',
      admin: { description: 'Plak hier de volledige URL van de video.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschrijving',
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
      admin: { position: 'sidebar', description: 'Lagere nummers worden eerst getoond.' },
    },
  ],
}
