/**
 * Additive schema sync for the fields added this session:
 *   - preserve_case     (boolean/int) on every block table that has title controls
 *   - rich_description  (text / JSON) on description-style blocks
 *   - rich_intro        (text / JSON) on partner-stories sub-items
 *   - rich_description  (text / JSON) on step sub-items (method/principle)
 *
 * Payload's `push: true` was NOT reliably adding these in the background dev
 * context, which made every page query fail with a missing-column error and
 * the pages render empty. This script makes the DB match the code.
 *
 * IDEMPOTENT and NON-DESTRUCTIVE: it only ADDs columns that are missing, never
 * drops or rewrites anything. Safe to run multiple times, on local or VPS.
 *
 *   node scripts/sync-richtext-cols.mjs
 */
import { createClient } from '@libsql/client'

const url = process.env.DATABASE_URL || 'file:./data/payload.db'
const db = createClient({ url })
console.log(`[sync-richtext-cols] DB: ${url}`)

async function tableExists(name) {
  const r = await db.execute(
    `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
    [name],
  )
  return r.rows.length > 0
}

async function columns(name) {
  const r = await db.execute(`PRAGMA table_info("${name}")`)
  return new Set(r.rows.map((row) => row.name))
}

async function addColumn(table, column, type) {
  if (!(await tableExists(table))) {
    console.log(`  . skip ${table} (table not present)`)
    return
  }
  const cols = await columns(table)
  if (cols.has(column)) {
    console.log(`  = ${table}.${column} already present`)
    return
  }
  await db.execute(`ALTER TABLE "${table}" ADD COLUMN "${column}" ${type}`)
  console.log(`  + ${table}.${column} (${type})`)
}

// preserve_case lives on every block table that uses the shared title controls.
const preserveCaseTables = [
  'pages_blocks_hero_section',
  'pages_blocks_intro_section',
  'pages_blocks_target_audience',
  'pages_blocks_partner_stories',
  'pages_blocks_fullscreen_statement',
  'pages_blocks_cinematic_statement',
  'pages_blocks_tv_section',
  'pages_blocks_method_roadmap',
  'pages_blocks_case_showcase',
  'pages_blocks_case_example',
  'pages_blocks_principle_steps',
  'pages_blocks_seo_content',
  'pages_blocks_other_markets',
  'pages_blocks_feature_columns',
  'pages_blocks_centered_statement',
  'pages_blocks_text_columns',
  'pages_blocks_content_block',
]

// rich_description on description-style blocks (section-level).
const richDescriptionTables = [
  'pages_blocks_intro_section',
  'pages_blocks_tv_section',
  'pages_blocks_case_showcase',
  'pages_blocks_case_example',
  'pages_blocks_cta_section',
  'pages_blocks_partner_stories',
  'pages_blocks_method_roadmap',
  'pages_blocks_principle_steps',
]

// Partner stories and the Partners-collection mirror of these tables also
// exist (partners_blocks_*). We handle both prefixes.
const prefixes = ['pages', 'partners']

function withPrefixes(tables) {
  const out = []
  for (const t of tables) {
    out.push(t)
    out.push(t.replace(/^pages_/, 'partners_'))
  }
  return out
}

console.log('\n--- preserve_case ---')
for (const t of withPrefixes(preserveCaseTables)) {
  await addColumn(t, 'preserve_case', 'integer')
}

console.log('\n--- rich_description (section level) ---')
for (const t of withPrefixes(richDescriptionTables)) {
  await addColumn(t, 'rich_description', 'text')
}

// Sub-item (array) tables: partner stories intro + step descriptions.
console.log('\n--- rich_intro / rich_description (array sub-items) ---')
// Partner stories items table name pattern.
for (const p of prefixes) {
  await addColumn(`${p}_blocks_partner_stories_stories`, 'rich_intro', 'text')
  await addColumn(`${p}_blocks_method_roadmap_steps`, 'rich_description', 'text')
  await addColumn(`${p}_blocks_principle_steps_steps`, 'rich_description', 'text')
}

console.log('\n[sync-richtext-cols] Done.')
process.exit(0)
