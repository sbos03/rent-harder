# RENT HARDER — VPS Deploy Guide

Stack: Next.js 16 + Payload CMS 3 + SQLite, run with PM2 behind Nginx.
Database: `data/payload.db` (SQLite file). Uploaded media: `media-uploads/`.

Schema is kept in sync automatically via Payload `push: true` — no migration
CLI is used (it is incompatible with Node 24).

---

## Normal deploy (code-only changes — no schema change)

```bash
cd /path/to/rent-harder
git pull
npm install
npm run build
pm2 restart rent-harder
```

That's it. Content and database are untouched.

---

## Deploy WITH a schema change

A "schema change" = you added/removed/renamed fields or blocks in a
collection (files in `/collections`, `/globals`, or `/collections/pageBlocks.ts`).

- **Additive change** (only NEW fields/blocks added): the normal deploy above
  works — `push` applies the new columns silently on restart.

- **Destructive change** (a field/block was REMOVED or RENAMED): `push` will
  hang on an interactive prompt under PM2. Do this instead:

  ```bash
  cd /path/to/rent-harder
  ./backup-db.sh                 # back up current content first
  pm2 stop rent-harder
  rm -f data/payload.db data/payload.db-shm data/payload.db-wal
  git pull && npm install && npm run build
  pm2 start rent-harder
  ```

  The DB is recreated with the new schema. Then re-add content (or restore
  from a backup that matches the new schema).

---

## First-time / after-reset setup

After the database is empty (fresh or reset):

1. Create the admin user: visit `https://rentharder.nl/admin`
2. Seed starter content: visit `https://rentharder.nl/api/seed`
3. Import images into the Media library: visit `https://rentharder.nl/api/import-media`

---

## Backups (important — this is the safety net)

The whole database is a single file, so backups are trivial.

Run manually:
```bash
./backup-db.sh
```

Automatic nightly backup (add to crontab with `crontab -e`):
```
0 3 * * * /path/to/rent-harder/backup-db.sh
```

Restore a backup:
```bash
pm2 stop rent-harder
cp backups/payload-YYYY-MM-DD.db data/payload.db
rm -f data/payload.db-shm data/payload.db-wal
pm2 start rent-harder
```

---

## Folders that MUST persist across deploys (never delete/gitignored)

- `data/`          — the SQLite database (your content)
- `media-uploads/` — uploaded images and videos
- `.env`           — secrets (PAYLOAD_SECRET, DATABASE_URL)
