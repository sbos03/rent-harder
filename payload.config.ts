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
import { FormSubmissions } from './collections/FormSubmissions'
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

  collections: [Users, Media, Pages, Partners, TVEpisodes, FormSubmissions],

  globals: [SiteSettings],

  secret: process.env.PAYLOAD_SECRET || 'REPLACE-WITH-SECURE-SECRET',

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./data/payload.db',
    },
    // Schema sync.
    //
    // `push` (Payload's auto-sync) runs on EVERY request in dev and, on this
    // sqlite setup, repeatedly tries to re-CREATE indexes that already exist.
    // That throws during page render and makes pages come back empty. So push
    // is OFF by default; schema changes are applied explicitly with the
    // additive scripts in /scripts (sync-title-size.mjs, sync-richtext-cols.mjs).
    //
    // To let Payload push intentionally (e.g. after adding a brand-new block),
    // start the server once with PAYLOAD_PUSH=true.
    push: process.env.PAYLOAD_PUSH === 'true',
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
