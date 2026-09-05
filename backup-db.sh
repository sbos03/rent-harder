#!/usr/bin/env bash
# Backs up the SQLite database to the backups/ folder with a timestamp.
# Usage: ./backup-db.sh
# Cron (nightly at 03:00): 0 3 * * * /path/to/rent-harder/backup-db.sh

set -e

# Resolve the directory this script lives in (works from any cwd)
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DB="$DIR/data/payload.db"
BACKUP_DIR="$DIR/backups"
STAMP="$(date +%F_%H-%M-%S)"

if [ ! -f "$DB" ]; then
  echo "No database found at $DB"
  exit 1
fi

mkdir -p "$BACKUP_DIR"
cp "$DB" "$BACKUP_DIR/payload-$STAMP.db"
echo "Backup created: $BACKUP_DIR/payload-$STAMP.db"

# Keep only the 30 most recent backups
ls -1t "$BACKUP_DIR"/payload-*.db 2>/dev/null | tail -n +31 | xargs -r rm --
