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
    // Resize variants by WIDTH only (no fixed height → no forced cover-crop).
    // The old fixed width+height crop made Sharp decode+crop every image, which
    // intermittently failed on WebP (and some PNG) with large/odd/animated
    // sources, surfacing as "There was a problem while uploading the file".
    // Width-only + withoutEnlargement keeps aspect ratio and is far more
    // tolerant; it never upscales, so small sources never error.
    imageSizes: [
      { name: 'thumbnail', width: 400, withoutEnlargement: true },
      { name: 'card', width: 768, withoutEnlargement: true },
      { name: 'hero', width: 1920, withoutEnlargement: true },
      { name: 'portrait', width: 600, withoutEnlargement: true },
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
