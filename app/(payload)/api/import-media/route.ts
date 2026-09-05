import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const maxDuration = 300

/**
 * One-time importer: registers all files in /public/images (plus root videos)
 * into the Media collection so they appear in the admin and can be reused.
 * Skips files that were already imported (matched by original filename).
 */
export async function GET() {
  try {
    const payload = await getPayload({ config })

    const publicDir = path.resolve(process.cwd(), 'public')
    const imagesDir = path.join(publicDir, 'images')

    // Gather candidate files
    const candidates: { fullPath: string; filename: string }[] = []

    if (fs.existsSync(imagesDir)) {
      for (const f of fs.readdirSync(imagesDir)) {
        const full = path.join(imagesDir, f)
        if (fs.statSync(full).isFile()) {
          candidates.push({ fullPath: full, filename: f })
        }
      }
    }

    // Root-level videos (e.g. Hero_Rent_Harder.mp4)
    for (const f of fs.readdirSync(publicDir)) {
      const full = path.join(publicDir, f)
      if (fs.statSync(full).isFile() && /\.(mp4|webm|mov)$/i.test(f)) {
        candidates.push({ fullPath: full, filename: f })
      }
    }

    // Existing media filenames (to avoid duplicates)
    const existing = await payload.find({ collection: 'media', limit: 1000, depth: 0 })
    const existingNames = new Set(
      existing.docs.map((d: any) => (d.filename || '').toLowerCase())
    )

    const imported: string[] = []
    const skipped: string[] = []
    const failed: { file: string; error: string }[] = []

    for (const { fullPath, filename } of candidates) {
      // Skip SVGs that are UI assets (logo, beeldmerk) — not content images
      if (/\.svg$/i.test(filename)) {
        skipped.push(`${filename} (svg ui asset)`)
        continue
      }

      if (existingNames.has(filename.toLowerCase())) {
        skipped.push(`${filename} (already imported)`)
        continue
      }

      try {
        const buffer = fs.readFileSync(fullPath)
        const ext = path.extname(filename).slice(1).toLowerCase()
        const mimeMap: Record<string, string> = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          webp: 'image/webp',
          gif: 'image/gif',
          mp4: 'video/mp4',
          webm: 'video/webm',
          mov: 'video/quicktime',
        }
        const mimetype = mimeMap[ext] || 'application/octet-stream'

        await payload.create({
          collection: 'media',
          data: {
            alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          },
          file: {
            data: buffer,
            mimetype,
            name: filename,
            size: buffer.length,
          },
        })
        imported.push(filename)
      } catch (err: any) {
        failed.push({ file: filename, error: err?.message || String(err) })
      }
    }

    return NextResponse.json({
      message: `Import klaar: ${imported.length} toegevoegd, ${skipped.length} overgeslagen, ${failed.length} mislukt.`,
      imported,
      skipped,
      failed,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}
