import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Afbeelding',
    plural: 'Media',
  },
  admin: {
    useAsTitle: 'alt',
    description: "Upload afbeeldingen en video's voor de website.",
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*'],
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'focalPoint',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'focalPoint',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'focalPoint',
      },
      {
        name: 'portrait',
        width: 600,
        height: 1067,
        position: 'focalPoint',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt tekst',
      required: true,
      admin: {
        description: 'Beschrijving voor screenreaders en SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bijschrift',
      admin: {
        description: 'Optioneel bijschrift onder de afbeelding.',
      },
    },
  ],
}
