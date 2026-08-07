# Styrotec — Directus prototype

Self-contained Directus + SvelteKit stack that replaces the existing Strapi
setup (`backend/` + `frontend/`) with a **Directus-native page builder**. It
mirrors the old site's pages and section types 1:1, but restructures the
content model so a content manager can maintain the whole site with minimal
technical knowledge.

## What's here

```
app/
├── docker-compose.yml   # Directus + Postgres + Meilisearch (search profile)
├── cms/                 # Directus volumes and Flow definitions
├── web/                 # SvelteKit app: section renderer, i18n, SEO, preview + visual editing
├── seed/                # Schema-as-code apply + idempotent content seed
└── shared/              # Generated Directus types (pnpm types)
```

## Content model (the important part)

The admin sidebar is grouped into **Website / Machines / Data / Inbox**:

- **`pages`** — ONE collection for every page of the site (not one singleton
  per page). A page is: internal name, `status`, a **per-language URL slug**,
  SEO translations, and **`sections`** — one ordered page-builder zone
  (Directus M2A) accepting 18 reusable block types: heroes (carousel /
  keyword+image / media+team-cards), text+image bands, page headers, USP
  lists, explore-more cards, variant cards with spec sheets, history
  timeline, card lists, collection listings (machines / jobs / fairs /
  downloads / brochures / testimonials), contact form, rich-text content
  blocks, accordions, tables and spacers.

  **Content managers can create entirely new pages themselves**: add a page,
  give it a slug per language, add sections, publish — the frontend resolves
  URLs from the collection, no code change involved. Pages with
  `kind = machine category` additionally serve machine detail pages under
  their slug.

- **`machines` + `machine_categories`** — ONE machines collection for the
  whole stock (was 9 near-identical collections); the category is a relation.
  One kanban board by `available` across everything, one search index,
  spec fields tucked into a collapsible "Specifications" group. Category
  pages and machine-grid blocks reference a category item.

- **Data** — employees, brochures, downloads, fairs, job_ads,
  social_media_channels, testimonials.
- **Inbox** — `contact_requests`: website contact-form submissions land here
  (public create-only permission). Triage them in Directus (kanban by
  status); attach a Flow to forward them by email.
- **Global** — site name, contact data, address (feeds header/footer/SEO).

A content manager edits a page by **adding, editing and reordering sections**
— the identical workflow on every page. Editing is intentionally flat (the
deep nesting of the Strapi model was a platform limitation, not a content
need):

- child items (cards, accordion entries, timeline milestones) are edited
  inline from the block's drawer — never more than one level deep;
- tables are a title + one label/value row list (no column juggling);
- variant cards carry one titled spec-line list;
- **internal links are page pickers**: cards and buttons reference a page
  item, so links follow slug renames automatically — no free-text paths.

### Public access & drafts

The schema apply provisions the **public policy**: read access to published
content only, plus create-only on `contact_requests`. The SvelteKit app
fetches public pages **unauthenticated** — drafts can never leak. Only the
`/preview` route uses the admin credentials to render drafts.

## Prereqs

- Docker + Docker Compose
- Node 20+ and `pnpm` (`corepack enable`)

## First boot

```bash
cd app
cp .env.example .env
pnpm bootstrap          # install → docker up → schema → seed → types
pnpm dev                # SvelteKit at http://localhost:5173
```

Directus admin: `http://localhost:8055` — email/password from `.env`.

The seed is **idempotent**: re-running `pnpm seed` updates content in place
(translations are matched by language, no duplicates). It also generates and
uploads labeled SVG placeholder images for every image slot — replace them in
the Files module ("Seed placeholders" folder) with real photos.

## What to click through

1. `/de` — homepage: hero carousel, intro, USP band, explore cards,
   testimonials, contact form. Language switcher maps to the translated URL.
2. `/de/produkte/gebrauchtmaschinen/cnc-fraesmaschinen` — machine grid with
   "In stock only" filter; every category (also lathes, saws, …) has working
   detail pages now.
3. `/de/produkte/gebrauchtmaschinen/cnc-fraesmaschinen/dmg-mori-dmu-50` —
   detail with image gallery, translated data sheet, description, contact card.
4. `/de/produkte/portalfraesmaschinen/fs10` — variant cards with spec
   accordions, options accordion, tech-data table.
5. `/de/unternehmen/karriere` — job ads from the CMS; submit the contact form
   and find it under **Inbox → contact_requests** in Directus.
6. `/de/impressum`, `/de/datenschutz` — rich-text content blocks.

## Live Preview + Visual Editor

In Directus admin open any page (Website → Pages):

1. Set `status = draft`, edit any section. The public URL now returns 404;
2. Open the Preview pane — URL pattern:
   `http://localhost:5173/preview/de/{{id}}?token=${WEB_PREVIEW_SECRET}`
   (configured automatically). The preview renders the full page including
   drafts.
3. Hover any section — the Visual Editor overlay (`@directus/visual-editing`)
   outlines it; click to open the corresponding item drawer, save, and the
   preview reloads with the change.
4. Set `status = published` → live again.

## Contact form → CMS inbox

The form posts to a SvelteKit action which creates a `contact_requests` item
via the public role (create-only, whitelisted fields). No SMTP credentials in
the web app; add a Directus Flow (`event: items.create` on
`contact_requests` → "Send Email") to notify the assigned employee.

## Search

Native `?search=` works for the B2B use case. For faceted search:

```bash
docker compose --profile search up -d
```

then import `cms/flows/algolia-cnc-mills.json` (Settings → Flows). The
compose file passes `MEILI_URL` / `MEILI_MASTER_KEY` / `MEILI_INDEX` to
Directus (`FLOWS_ENV_ALLOW_LIST`), and the flow reads the machines'
`pictures` relation. Duplicate the flow per machine collection as needed;
Algolia works identically — swap endpoint and auth header.

## Regenerating types & schema snapshot

```bash
pnpm types      # writes app/shared/types/directus.ts from the schema-as-code
pnpm snapshot   # exports the live schema to cms/snapshots/schema.json (commit it)
```

## Architecture notes

- **Schema-as-code** lives in `seed/src/schema/` (collections, fields,
  relations, translations, the M2A zone, public permissions, sidebar
  grouping, preview wiring). `pnpm schema` is idempotent and
  **create-only**: it never deletes/renames — for destructive changes reset
  the stack (`pnpm reset && pnpm schema && pnpm seed`).
- **Fixtures** (`seed/src/fixtures/`) are declarative: pages are
  `{ name, slug, seo, sections: [blocks…] }`; `'@img:key'` / `'@emp:key'` /
  `'@cat:key'` placeholders resolve to uploaded files / employees / machine
  categories.
- **Routing is DB-driven** (`web/src/lib/server/fetch.ts`): a request path is
  resolved against `pages.translations.slug`; machine detail URLs resolve via
  their parent category page. The nav/footer build hrefs from a cached
  slug map, so renaming a slug in Directus immediately moves the page.
  `/sitemap.xml` is generated from the same map.
- `lib/components/SectionRenderer.svelte` dispatches each section to one
  Svelte component per block type.

## What's not here (deferred)

- Content migration from Strapi (fixtures only; the old DB was never exported).
- Production topology (S3 storage, hosted Postgres, TLS, real user roles).
- Meilisearch flows for all 9 machine collections (one ships as a template).
- Cookie consent + analytics from the old frontend.
