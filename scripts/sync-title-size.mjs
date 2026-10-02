/**
 * One-off schema reconcile for the "title size" change.
 *
 * Background: the title-size control changed from a preset select (`title_size`)
 * to a px number (`title_size_px`). On databases that were managed by
 * `push: true` and never re-synced, the block tables still have the old column
 * and lack the new one, which makes those blocks fail to load/save in the admin
 * ("can't update or remove the block").
 *
 * This script makes the schema match the code:
 *   - adds `title_size_px` (numeric, nullable) where missing
 *   - drops the orphaned `title_size` where present
 *
 * It is IDEMPOTENT: safe to run multiple times. It only touches block tables
 * that are part of this change and never touches content columns.
 *
 * Usage (from the project root):
 *   node scripts/sync-title-size.mjs
 *
 * Uses the same DB the app uses (DATABASE_URL, or file:./data/payload.db).
 * ALWAYS back up the database first:  cp data/payload.db data/payload.db.bak
 */
import { createClient } from '@libsql/client'

const url = process.env.DATABASE_URL || 'file:./data/payload.db'
const db = createClient({ url })

console.log(`[sync-title-size] Using database: ${url}`)

const tables = await db.execute(
  "SELECT name FROM sqlite_master WHERE type='table' AND (name LIKE 'pages_blocks_%' OR name LIKE 'partners_blocks_%')",
)

let added = 0
let dropped = 0
let skipped = 0

for (const row of tables.rows) {
  const name = row.name
  const info = await db.execute(`PRAGMA table_info("${name}")`)
  const cols = info.rows.map((r) => r.name)

  const hasOld = cols.includes('title_size')
  const hasNew = cols.includes('title_size_px')

  // Only tables involved in the heading/title-size change.
  if (!hasOld && !hasNew) {
    continue
  }

  if (!hasNew) {
    await db.execute(`ALTER TABLE "${name}" ADD COLUMN "title_size_px" numeric`)
    console.log(`  + added title_size_px  → ${name}`)
    added++
  } else {
    skipped++
  }

  if (hasOld) {
    try {
      await db.execute(`ALTER TABLE "${name}" DROP COLUMN "title_size"`)
      console.log(`  - dropped title_size   → ${name}`)
      dropped++
    } catch (e) {
      // Older SQLite without DROP COLUMN support: leaving the unused column is harmless.
      console.log(`  ! could not drop title_size on ${name}: ${e.message} (harmless, leaving it)`)
    }
  }
}

console.log(`[sync-title-size] Done. Added ${added}, dropped ${dropped}, already-ok ${skipped}.`)
process.exit(0)
