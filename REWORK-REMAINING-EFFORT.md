# Styrotec Rework — Remaining Effort & Time Estimate

_Stand: 2026-07-30 · Basis: `directus-prototype` branch · Companion to the
"Directus statt Strapi" decision document._

## Summary

The Directus rework in `app/` is **substantially built — a working replacement,
not a sketch.** The content model, seeder, and new frontend all exist and are
internally consistent. What remains is **content, production infrastructure, and
last-mile launch features** — most of it explicitly deferred in `app/README.md`.

- **MVP go-live** (infra + email + consent + redirects + QA, native search,
  German + minimum content): **~2 weeks of developer work**, content entry in
  parallel.
- **Full parity** (faceted search, both locales, complete real inventory):
  **~3–4 weeks elapsed.**
- **Critical-path risk is content, not code.** The build is essentially done.

## Where the rework stands

| Layer | State |
|---|---|
| **Content model** (Directus schema-as-code) | ✅ Complete — 76 collections, all 18 page-builder block types, unified `machines` collection replacing the 9 Strapi machine collections |
| **Seeder** | ✅ Complete & idempotent — but seeds **placeholder** data (real page taxonomy, fake records + SVG placeholder images) |
| **New frontend** (`app/web`) | ✅ Near-complete — 24 Svelte components, DB-driven routing, i18n, SEO, sitemap, live preview + visual editing |
| **Old Strapi + old frontend** | ⚠️ To be retired — the plan replaces `frontend/` wholesale with `app/web`, not repointed |

The engine is built. The old Strapi content model was 58 content types (16
collection + 42 single) + 36 components; the Directus model collapses that into
one `pages` page-builder collection + one `machines` collection.

## Remaining work — Developer

| # | Task | Estimate | Notes |
|---|---|---|---|
| A | **Production hosting** — VPS + Docker, reverse proxy/TLS, R2 storage driver, Postgres backups, prod env flags/CORS/roles, DNS cutover | **~2 days** | Matches `.notes/hosting-options.md` (Option A). Backups are the one non-optional item. |
| B | **Content migration tooling** — ETL from local `.tmp/data.db` (SQLite) → Directus flattened model | **2–4 days**, or skip | Only *partial* real data exists there (cnc_mills=6, employees=4, jobs=4, testimonials=6; 8 of 9 machine collections empty). May be cheaper to hand-enter than to build the Strapi-nested → Directus-flat mapper. |
| C | **Contact-form email Flow** — Directus `items.create` → Send Email | **~0.5 day** | Form already lands in the inbox; just needs the notification flow. |
| D | **Cookie consent + analytics** — port `vanilla-cookieconsent` + Vercel analytics/speed-insights into `app/web` | **0.5–1 day** | Straight port from old frontend. |
| E | **Faceted search** — Meilisearch/Algolia sync flow (unified `machines` makes this 1 flow, not 9) | **1–2 days** | Deferrable — native `?search=` already works for MVP. |
| F | **Old-URL → new-slug redirects / SEO continuity** | **0.5–1 day** | New slugs are DB-driven; need a map from old Strapi paths to preserve rankings. |
| G | **Parity QA pass** — click all ~42 pages, both locales, vs live site; fix rendering/responsive/SEO gaps | **2–4 days** | Biggest dev variable after content. |

**Developer subtotal: ~9–14 days → roughly 2–3 weeks of focused work.**

## Remaining work — Business / Content

Largely non-dev, runs in parallel with developer work.

- **Real page copy + SEO** for ~42 pages, and **English** content (the old site
  only ever prerendered German — if EN is in scope, it roughly doubles content
  entry).
- **Real machine inventory** — specs + photos for the live stock across 9
  categories. Single largest unknown: the old real data was never exported and
  mostly doesn't exist in git, so per the artifact's premise it must be
  re-entered regardless of CMS choice.
- **Replace placeholder images** with real photos/PDFs (currently labeled SVG
  placeholders in the "Seed placeholders" folder).

**Content subtotal: ~1–3 weeks elapsed**, dominated by inventory size and who
does the entry — mostly parallelizable with dev.

## Two questions that swing the estimate

1. **Is `backend/.tmp/data.db` still intact on the build machine?** It is
   gitignored — the only copy of any real content. If lost, most content must be
   re-entered from scratch.
2. **Is English in scope for launch?** It roughly doubles the content-entry
   effort.

## Explicitly deferred (from `app/README.md`)

- Content migration from Strapi (fixtures only; old DB never exported).
- Production topology (S3/R2 storage, hosted Postgres, TLS, real user roles).
- Meilisearch flows for all machine collections (one template ships).
- Cookie consent + analytics from the old frontend.
