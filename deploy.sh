#!/usr/bin/env bash
# Deploy the static frontend (web/) to the shared Hetzner box.
#
#   ./deploy.sh
#
# Builds locally (nothing builds on the box), backs up the live dist, syncs the
# new one and restarts doaide-resume-web. The restart is not optional: `serve`
# reads dist/serve.json once at startup, so a page added since the last restart
# has no rewrite and serve answers it with a directory listing. That is how
# /resume-score and five other new pages went out as "Files within dist/..."
# for six days in October 2026.
set -euo pipefail

HOST="root@89.167.8.178"
KEY="/Users/dev/projects/keys/hetzner_deploy_ed25519"
REMOTE="/opt/doaide-resume/web/dist"
SSH=(ssh -i "$KEY" -o BatchMode=yes "$HOST")

cd "$(dirname "${BASH_SOURCE[0]}")/web"

npm run build
[ -f dist/serve.json ] || { echo "dist/serve.json missing; prerender did not run" >&2; exit 1; }

"${SSH[@]}" "cp -a $REMOTE /opt/backups/resume-dist-$(date +%Y%m%d-%H%M%S)"
rsync -az --delete -e "ssh -i $KEY -o BatchMode=yes" dist/ "$HOST:$REMOTE/"
"${SSH[@]}" "systemctl restart doaide-resume-web && sleep 3 && systemctl is-active doaide-resume-web"

# Every sitemap URL must come back as its own page, not a listing.
bad=0
for url in $(grep -oE '<loc>[^<]+' dist/sitemap.xml | sed 's/<loc>//'); do
  body=$(curl -s --max-time 15 "$url")
  case "$body" in
    *"Files within"*) echo "directory listing: $url" >&2; bad=1 ;;
    "") echo "no response: $url" >&2; bad=1 ;;
  esac
done
[ "$bad" -eq 0 ] && echo "deployed; every sitemap URL serves a page"
exit "$bad"
