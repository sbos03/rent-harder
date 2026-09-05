import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

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
    // Store uploads outside /public so they are served through Payload's
    // own media route (/api/media/file/...) and are not statically cached.
    staticDir: path.resolve(dirname, '../media-uploads'),
    mimeTypes: ['image/*', 'video/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'focalPoint' },
      { name: 'card', width: 768, height: 512, position: 'focalPoint' },
      { name: 'hero', width: 1920, height: 1080, position: 'focalPoint' },
      { name: 'portrait', width: 600, height: 1067, position: 'focalPoint' },
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
