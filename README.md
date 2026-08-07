# Styrotec Website — running the Directus prototype locally

This guide takes you from a fresh clone to a running website + CMS on your own
machine. It assumes **no prior knowledge** of Docker, Node or Directus — every
command is spelled out, and every step says what you should see when it worked.

Total time: **15–25 minutes** on the first run (most of it downloading), about
**2 minutes** on every run after that.

---

## 1. What is in this repository

The repo currently contains **two generations of the website side by side**:

| Folder | What it is | Do you need it? |
|---|---|---|
| `app/` | **The Directus prototype** — new CMS (Directus) + new website (SvelteKit). This is the current state of the rework. | ✅ **Yes — this is what you want to run.** |
| `backend/` | The *old* CMS (Strapi). | ❌ No. Leave it alone. |
| `frontend/` | The *old* website (Next.js), fed by Strapi. | ❌ No. Leave it alone. |
| `REWORK-REMAINING-EFFORT.md` | What is still missing before go-live, with time estimates. | 📖 Read after you've clicked around. |
| `app/README.md` | Architecture deep-dive: content model, schema-as-code, routing. | 📖 Read after you've clicked around. |

**Everything below happens inside the `app/` folder.** You never need to touch
`backend/` or `frontend/`.

### What you will end up with

Four things running on your machine at the same time:

```
┌─────────────────────────┐   ┌──────────────────────────┐
│  Website (SvelteKit)    │──▶│  Directus CMS            │
│  http://localhost:5173  │   │  http://localhost:8055   │
└─────────────────────────┘   └───────────┬──────────────┘
        what visitors see          the admin UI where
                                   content is edited
                                              │
                                   ┌──────────▼───────────┐
                                   │  PostgreSQL database │
                                   │  (inside Docker)     │
                                   └──────────────────────┘
```

Plus a **seeder** — a script that fills the empty CMS with the page structure,
demo machines and placeholder images, so there is something to look at.

---

## 2. Prerequisites

You need three things installed. Check each one before continuing.

### 2.1 Docker Desktop

Runs the CMS and the database in isolated containers, so nothing is installed
into your system.

- Download: <https://www.docker.com/products/docker-desktop/>
- Install it, **start the Docker Desktop app**, and wait until its whale icon in
  the menu bar / system tray stops animating.

Verify in a terminal:

```bash
docker --version
docker ps
```

`docker ps` must print a table header (it can be empty) — **not** an error like
`Cannot connect to the Docker daemon`. If you get that error, Docker Desktop is
not running yet.

### 2.2 Node.js 20 or newer

- Download the **LTS** version: <https://nodejs.org/>

Verify:

```bash
node --version    # must print v20.x.x or higher
```

### 2.3 pnpm (the package manager this project uses)

Node ships with a helper that installs it for you:

```bash
corepack enable
```

Verify:

```bash
pnpm --version    # e.g. 9.12.0
```

> If `corepack enable` fails with a permission error on macOS/Linux, run
> `sudo corepack enable`. If `pnpm` still isn't found afterwards, install it
> directly with `npm install -g pnpm`.

---

## 3. Step-by-step: first run

Open a terminal and work through these in order.

### Step 1 — Get the code and switch to the right branch

```bash
cd ~/workspace/StyrotecWebseite      # adjust to wherever the repo lives
git checkout directus-prototype
```

Confirm the prototype is there:

```bash
ls app
```

You should see `docker-compose.yml`, `web`, `seed`, `cms`, `shared`.
If the `app` folder does not exist, the prototype has not been committed to
the branch you are on — ask whoever handed you the repo for it.

### Step 2 — Go into the app folder

```bash
cd app
```

**Every remaining command in this guide is run from `app/`.**

### Step 3 — Create the configuration files

The project ships an example config with working local defaults (passwords,
ports, database name). Copy it into the **three** places that read it:

```bash
cp .env.example .env
cp .env.example web/.env
cp .env.example seed/.env
```

> **Why three copies?** They are read by three different programs from three
> different folders: Docker reads `app/.env`, the website reads `app/web/.env`,
> and the seeder reads `app/seed/.env`. Copying all three now saves you a
> confusing error later. Do **not** edit the values on your first run — several
> defaults are hard-coded as fallbacks and changing them piecemeal breaks the
> seeder (see [Troubleshooting](#8-troubleshooting)).

### Step 4 — Install the JavaScript dependencies

```bash
pnpm install
```

Takes 1–3 minutes. Creates `node_modules/` folders. Warnings are normal; a red
`ERR_PNPM_*` line is not.

### Step 5 — Start the CMS and the database

```bash
pnpm up
```

This is short for `docker compose up -d` — it downloads and starts the Directus
and PostgreSQL containers in the background.

**The first run downloads roughly 1 GB of images and can take 5–10 minutes.**
It looks frozen while pulling; it isn't.

Check that both containers are up:

```bash
docker compose ps
```

You want two services (`postgres`, `directus`) with status `Up` — Directus
should eventually say `Up (healthy)`. It takes ~30 seconds after start to
become healthy.

Watch the CMS boot log if you're curious (press `Ctrl+C` to stop watching — it
does *not* stop the container):

```bash
pnpm logs
```

### Step 6 — Create the content structure

```bash
pnpm schema
```

This builds all collections, fields, relations, languages, permissions and the
admin sidebar grouping inside the fresh, empty Directus. Takes 1–2 minutes and
prints a long list of what it creates.

It waits for Directus by itself, so it's fine to run right after `pnpm up`.

> This script is **create-only and idempotent** — running it twice is safe, it
> simply skips what already exists. It never deletes or renames anything.

### Step 7 — Fill it with demo content

```bash
pnpm seed
```

Creates ~45 pages with their sections, demo machines, employees, job ads, fairs
and testimonials — and generates + uploads a labeled SVG placeholder image for
every image slot. Takes 2–5 minutes.

> Also idempotent: re-running updates existing content in place instead of
> creating duplicates.

### Step 8 — Generate the TypeScript types (optional but harmless)

```bash
pnpm types
```

Writes `shared/types/directus.ts`. Only needed if you plan to edit code, but
it's quick.

### Step 9 — Start the website

```bash
pnpm dev
```

Leave this terminal window **open** — this process is the website. You'll see:

```
  ➜  Local:   http://localhost:5173/
```

### Step 10 — Open it

| What | URL | Login |
|---|---|---|
| **Website** | <http://localhost:5173/de> | — |
| **Directus admin (CMS)** | <http://localhost:8055> | `admin@styrotec.example.com` / `changeme` |

If <http://localhost:5173/> shows nothing, use **<http://localhost:5173/de>** —
the site always lives under a language prefix.

---

### The short version (once you've done it once)

```bash
cd app
cp .env.example .env && cp .env.example web/.env && cp .env.example seed/.env
pnpm bootstrap     # = install + docker up + schema + seed + types
pnpm dev
```

---

## 4. What to click through

The seeded content mirrors the real site's structure. A good tour:

1. **<http://localhost:5173/de>** — homepage: hero carousel, intro band, USP
   list, "explore more" cards, testimonials, contact form. Use the language
   switcher in the header: it jumps to the *translated* URL, not just a
   different language of the same URL.
2. **<http://localhost:5173/de/produkte/gebrauchtmaschinen/cnc-fraesmaschinen>**
   — a machine category page with a grid and an "in stock only" filter.
3. **<http://localhost:5173/de/produkte/gebrauchtmaschinen/cnc-fraesmaschinen/dmg-mori-dmu-50>**
   — a machine detail page: image gallery, translated data sheet, contact card.
4. **<http://localhost:5173/de/produkte/portalfraesmaschinen/fs10>** — variant
   cards with spec accordions, options accordion, technical-data table.
5. **<http://localhost:5173/de/unternehmen/karriere>** — job ads from the CMS.
   Submit the contact form at the bottom, then find your submission in Directus
   under **Inbox → contact_requests**.
6. **<http://localhost:5173/de/impressum>** — a rich-text page.
7. **<http://localhost:5173/sitemap.xml>** — generated from the CMS, lists every
   page and language.

The English versions live under `/en/...` with translated slugs, e.g.
<http://localhost:5173/en/products/used-machines/cnc-milling-machines>.

> **The images are deliberately ugly.** Every picture is a generated grey SVG
> placeholder labeled with the slot it fills. Real photos were never exported
> from the old system — replace them in Directus under **Files → "Seed
> placeholders"**.

### Try editing content

1. Open <http://localhost:8055> and log in.
2. In the sidebar: **Website → Pages → Startseite**.
3. Scroll to **Sections** — this is the page builder. Open a section, change a
   headline, hit **Save**.
4. Reload <http://localhost:5173/de> — your change is live.

Adding a whole new page works the same way: create a page, give it a slug per
language, add sections, set `status = published`. No code change needed — the
website resolves URLs from the database.

### Live Preview + Visual Editor

To see drafts before publishing:

1. Open any page in Directus and set `status = draft`, then **Save**. The public
   URL now returns 404 — drafts never leak to visitors.
2. Open the **Preview** pane (the eye/split icon in the item toolbar). It loads
   `http://localhost:5173/preview/de/{{id}}?token=...` — wired up automatically.
3. Hover a section in the preview: an outline appears. Click it to open that
   section's edit drawer, save, and the preview reloads with the change.
4. Set `status = published` to put it back on the live site.

---

## 5. Everyday commands

All run from `app/`.

| Command | What it does |
|---|---|
| `pnpm dev` | Start the website (foreground; `Ctrl+C` to stop) |
| `pnpm up` | Start CMS + database containers |
| `pnpm down` | Stop the containers (**keeps** your data) |
| `pnpm logs` | Follow the Directus log |
| `pnpm reset` | ⚠️ **Delete the database** and start fresh containers |
| `pnpm schema` | Apply the content structure |
| `pnpm seed` | Insert/update the demo content |
| `pnpm types` | Regenerate TypeScript types into `shared/` |
| `pnpm snapshot` | Export the live schema to `cms/snapshots/schema.json` |
| `pnpm bootstrap` | install + up + schema + seed + types, in that order |

### Coming back the next day

```bash
cd app
pnpm up      # containers (skip if Docker kept them running)
pnpm dev     # website
```

Your content is stored in a Docker volume and survives restarts and reboots.

### Starting completely over

If you've broken something beyond repair:

```bash
pnpm reset      # wipes the database volume, starts empty containers
pnpm schema
pnpm seed
```

---

## 6. Optional: faceted search (Meilisearch)

Not needed to explore the site — plain `?search=` already works. To enable it:

```bash
docker compose --profile search up -d
```

Then in Directus: **Settings → Flows → Import** and pick
`cms/flows/algolia-cnc-mills.json`.

---

## 7. Where things live

```
app/
├── .env                  # config for Docker (copy of .env.example)
├── docker-compose.yml    # Directus + Postgres (+ optional Meilisearch)
├── cms/
│   ├── uploads/          # uploaded files (seeded placeholders land here)
│   ├── flows/            # importable Directus Flow definitions
│   └── snapshots/        # exported schema snapshots
├── seed/                 # the schema + demo-content scripts
│   ├── src/schema/       #   → "schema as code": collections, fields, permissions
│   └── src/fixtures/     #   → the demo pages, machines, employees…
├── web/                  # the SvelteKit website
│   ├── .env              # config for the website (copy of .env.example)
│   └── src/
│       ├── routes/       #   → [lang]/[...slugs] resolves any URL from the DB
│       └── lib/components/  → one Svelte component per section type
└── shared/types/         # generated Directus types
```

---

## 8. Troubleshooting

**`Cannot connect to the Docker daemon` / `docker ps` errors**
Docker Desktop isn't running. Open the app, wait for the whale icon to settle,
retry.

**`pnpm: command not found`**
Run `corepack enable`, then open a **new** terminal window. Or
`npm install -g pnpm`.

**`pnpm schema` fails with a login/401 error**
Almost always because you edited `DIRECTUS_ADMIN_EMAIL`, `DIRECTUS_ADMIN_PASSWORD`
or `DIRECTUS_PORT` in `app/.env` but not in `app/seed/.env`. Make all three
`.env` files identical (Step 3) and retry. Note that the admin password is only
applied when the database is created — after changing it you also need
`pnpm reset`.

**`pnpm schema` fails with "did not become healthy"**
Directus wasn't up yet. Check `docker compose ps` and `pnpm logs`, wait for
`Up (healthy)`, then run it again.

**Port already in use (`5173`, `8055` or `5432`)**
Something else on your machine occupies the port. Find it with
`lsof -i :8055` (macOS/Linux) and quit it. To move the CMS instead, change
`DIRECTUS_PORT` in all three `.env` files and run `pnpm down && pnpm up`.
To move the website, change `WEB_PORT` in the `.env` files **and** export it in
your shell before starting — the dev server reads it from the environment:
`export WEB_PORT=3000 && pnpm dev`.

**The site loads but every image is broken**
`app/web/.env` is missing or lacks `PUBLIC_DIRECTUS_URL`. Redo Step 3 and
restart `pnpm dev`.

**A URL returns 404**
Either the page's `status` is `draft` in Directus, or the slug differs. Check
<http://localhost:5173/sitemap.xml> for the list of URLs that actually exist.

**The Preview pane in Directus is blank / refuses to load**
The website isn't running — `pnpm dev` must be active in a terminal.

**Changes in Directus don't show up on the website**
Hard-reload the browser (`Cmd/Ctrl + Shift + R`). Slug and navigation data are
cached briefly; restarting `pnpm dev` clears it.

**`pnpm seed` fails halfway**
It's idempotent — just run it again. If it keeps failing on the same item,
`pnpm reset && pnpm schema && pnpm seed` gives you a clean slate.

---

## 9. Understanding what you're looking at

Before drawing conclusions from the prototype, two things are worth knowing:

- **The content is fake.** Page structure, section types and machine categories
  mirror the real site, but the text is placeholder copy and the images are
  generated SVGs. Real content was never exported from the old Strapi system.
- **This is a local development setup**, not a production one — no TLS, no
  backups, no S3/R2 storage, weak default passwords. Never expose it publicly.

For the content model and architecture, read **`app/README.md`**.
For what's still missing before go-live and how long it takes, read
**`REWORK-REMAINING-EFFORT.md`**.
