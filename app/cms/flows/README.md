# Directus Flows

Import via Settings → Flows → Import Flow.

## `algolia-cnc-mills.json` — Machine → Meilisearch/Algolia sync

Replaces the 466-line `backend/src/index.ts` Algolia bootstrap. Triggers on
`items.cnc_mills.create|update|delete`, transforms the payload, and POSTs to
the configured search index. Ships pre-wired for Meilisearch; swap the URL and
headers for Algolia's `saveObjects` endpoint if preferred.

Environment variables the flow reads:
- `MEILI_MASTER_KEY`
- `MEILI_INDEX` (default `machines`)
- `MEILI_URL` (default `http://meilisearch:7700`)

To enable full search across all 9 machine collections, duplicate the flow and
change the event trigger to the next collection — nothing else changes.
