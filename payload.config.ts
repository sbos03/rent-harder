import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { TVEpisodes } from './collections/TVEpisodes'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — RENT HARDER CMS',
    },
  },

  editor: lexicalEditor(),

  collections: [Users, Media, Pages, Partners, TVEpisodes],

  globals: [SiteSettings],

  secret: process.env.PAYLOAD_SECRET || 'REPLACE-WITH-SECURE-SECRET',

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./data/payload.db',
    },
    // Auto-sync schema changes on startup (no manual migration step needed).
    push: true,
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
