import { directusAdmin, waitForDirectus, DIRECTUS_URL } from './directus-client.js';
import { allCollections } from './schema/index.js';
import { ensureImages } from './images.js';
import { pageFixtures } from './fixtures/pages.js';
import { machineFixtures } from './fixtures/machines.js';
import { dataFixtures } from './fixtures/data.js';
import type { BlockSpec, ChildSpec, Lang, PageSpec } from './fixtures/types.js';

type Client = Awaited<ReturnType<typeof directusAdmin>>;

let cachedToken: string | null = null;
async function token(client: Client) {
  if (cachedToken) return cachedToken;
  const t = await client.getToken();
  if (!t) throw new Error('No token');
  cachedToken = t;
  return t;
}

async function api<T = unknown>(
  client: Client,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<T> {
  const t = await token(client);
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${await res.text()}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ── Schema lookups (derived from the schema-as-code definitions) ───────────

/** collection → o2m alias field → { child collection, FK field on child } */
const o2mLookup = new Map<string, Map<string, { child: string; fkField: string }>>();
/** collection → set of files-alias fields */
const filesLookup = new Map<string, Set<string>>();
for (const def of allCollections) {
  for (const rel of def.relations ?? []) {
    if (rel.kind === 'o2m' && rel.relatedCollection) {
      if (!o2mLookup.has(def.name)) o2mLookup.set(def.name, new Map());
      o2mLookup.get(def.name)!.set(rel.field, {
        child: rel.relatedCollection,
        fkField: rel.fkField ?? `${def.name}_id`,
      });
    }
    if (rel.kind === 'files') {
      if (!filesLookup.has(def.name)) filesLookup.set(def.name, new Set());
      filesLookup.get(def.name)!.add(rel.field);
    }
  }
}

// ── Placeholder resolution ──────────────────────────────────────────────────

let imageIds: Record<string, string> = {};
let employeeIds: Record<string, string> = {};
let categoryIds: Record<string, string> = {};
let pageIds: Record<string, string> = {};

function resolveValue(v: unknown): unknown {
  if (typeof v === 'string') {
    if (v.startsWith('@img:')) {
      const key = v.slice(5);
      const id = imageIds[key];
      if (!id) throw new Error(`Unknown image ref '${v}' — add it to images.ts`);
      return id;
    }
    if (v.startsWith('@emp:')) {
      const key = v.slice(5);
      const id = employeeIds[key];
      if (!id) throw new Error(`Unknown employee ref '${v}'`);
      return id;
    }
    if (v.startsWith('@cat:')) {
      const key = v.slice(5);
      const id = categoryIds[key];
      if (!id) throw new Error(`Unknown machine category ref '${v}'`);
      return id;
    }
    if (v.startsWith('@page:')) {
      const key = v.slice(6);
      const id = pageIds[key];
      if (!id) throw new Error(`Unknown page ref '${v}' — pages are seeded before blocks, check the key`);
      return id;
    }
    return v;
  }
  if (Array.isArray(v)) return v.map(resolveValue);
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, val]) => [k, resolveValue(val)]));
  }
  return v;
}

/** Convert files-alias arrays like pictures: ['@img:a', '@img:b'] into junction payloads. */
function resolveRow(collection: string, row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const fileAliases = filesLookup.get(collection);
  for (const [k, v] of Object.entries(row)) {
    if (fileAliases?.has(k) && Array.isArray(v)) {
      out[k] = v.map((ref, i) => ({ directus_files_id: resolveValue(ref), sort: i + 1 }));
    } else {
      out[k] = resolveValue(v);
    }
  }
  return out;
}

// ── Translation-aware upserts ───────────────────────────────────────────────

type TranslationRow = { id: number; languages_code: string };

function mergeTranslations(
  existing: TranslationRow[],
  wanted: Partial<Record<Lang, Record<string, unknown>>> | Array<Record<string, unknown>> | undefined,
): Array<Record<string, unknown>> | undefined {
  if (!wanted) return undefined;
  const rows: Array<Record<string, unknown>> = Array.isArray(wanted)
    ? wanted
    : Object.entries(wanted).map(([languages_code, fields]) => ({ languages_code, ...fields }));
  const byLang = new Map(existing.map((t) => [t.languages_code, t.id]));
  return rows.map((r) => {
    const id = byLang.get(r.languages_code as string);
    return id ? { id, ...r } : r;
  });
}

const summary: Record<string, { created: number; updated: number }> = {};
const bump = (col: string, action: 'created' | 'updated') => {
  summary[col] ??= { created: 0, updated: 0 };
  summary[col][action]++;
};

/**
 * Idempotent upsert by seed_key. Existing translation rows are matched by
 * language and PATCHed by id (previously every re-seed created duplicates).
 */
async function upsertBySeedKey(
  client: Client,
  collection: string,
  key: string,
  payload: Record<string, unknown>,
): Promise<string> {
  const { translations, ...rest } = payload;
  const filter = encodeURIComponent(JSON.stringify({ seed_key: { _eq: key } }));
  const existing = await api<{ data: Array<{ id: string; translations?: TranslationRow[] }> }>(
    client,
    'GET',
    `/items/${collection}?filter=${filter}&limit=1&fields=id${translations ? ',translations.id,translations.languages_code' : ''}`,
  );
  const row = resolveRow(collection, rest as Record<string, unknown>);

  if (existing.data.length > 0) {
    const found = existing.data[0];
    const merged = mergeTranslations(found.translations ?? [], translations as never);
    await api(client, 'PATCH', `/items/${collection}/${found.id}`, {
      ...row,
      ...(merged ? { translations: merged } : {}),
    });
    bump(collection, 'updated');
    return found.id;
  }

  const created = await api<{ data: { id: string } }>(client, 'POST', `/items/${collection}`, {
    seed_key: key,
    ...row,
    ...(translations
      ? { translations: mergeTranslations([], translations as never) }
      : {}),
  });
  bump(collection, 'created');
  return created.data.id;
}

// ── Blocks & children ───────────────────────────────────────────────────────

async function seedChildren(client: Client, parentCollection: string, parentId: string, spec: BlockSpec | ChildSpec) {
  if (!spec.children) return;
  for (const [aliasField, children] of Object.entries(spec.children)) {
    const link = o2mLookup.get(parentCollection)?.get(aliasField);
    if (!link) throw new Error(`No o2m '${aliasField}' declared on ${parentCollection}`);

    const keptKeys: string[] = [];
    let sort = 1;
    for (const child of children) {
      const id = await upsertBySeedKey(client, link.child, child.key, {
        ...(child.values ?? {}),
        [link.fkField]: parentId,
        sort_order: sort++,
        ...(child.translations ? { translations: child.translations } : {}),
      });
      keptKeys.push(child.key);
      await seedChildren(client, link.child, id, child);
    }

    // Remove seed-created strays (renamed/removed in fixtures). Editor-created
    // items (seed_key null) are left untouched.
    const strayFilter = encodeURIComponent(
      JSON.stringify({
        _and: [
          { [link.fkField]: { _eq: parentId } },
          { seed_key: { _nnull: true } },
          ...(keptKeys.length ? [{ seed_key: { _nin: keptKeys } }] : []),
        ],
      }),
    );
    const strays = await api<{ data: Array<{ id: string }> }>(
      client,
      'GET',
      `/items/${link.child}?filter=${strayFilter}&limit=-1&fields=id`,
    );
    if (strays.data.length > 0) {
      await api(client, 'DELETE', `/items/${link.child}`, strays.data.map((s) => s.id));
    }
  }
}

const ADMIN_LABEL_COLLECTIONS = new Set(
  allCollections.filter((c) => c.fields.some((f) => f.field === 'admin_label')).map((c) => c.name),
);

async function seedBlock(client: Client, spec: BlockSpec): Promise<string> {
  const values = { ...(spec.values ?? {}) };
  // blocks without readable text get their seed key as a default picker label
  if (ADMIN_LABEL_COLLECTIONS.has(spec.collection) && !values.admin_label) {
    values.admin_label = spec.key.replace(/_/g, ' ');
  }
  const id = await upsertBySeedKey(client, spec.collection, spec.key, {
    ...values,
    ...(spec.translations ? { translations: spec.translations } : {}),
  });
  await seedChildren(client, spec.collection, id, spec);
  return id;
}

// ── Pages ───────────────────────────────────────────────────────────────────

/** Pass 1: create/update the bare page items so '@page:' refs resolve in blocks. */
async function seedPageBase(client: Client, key: string, spec: PageSpec, sort: number): Promise<string> {
  if (!spec.slug || !spec.name) throw new Error(`Page fixture '${key}' is missing name/slug meta`);
  const translations = {
    'de-DE': { slug: spec.slug.de, ...(spec.seo['de-DE'] ?? {}) },
    'en-US': { slug: spec.slug.en, ...(spec.seo['en-US'] ?? {}) },
  };
  return upsertBySeedKey(client, 'pages', key, {
    status: spec.status ?? 'published',
    sort,
    name: spec.name,
    kind: spec.kind ?? 'standard',
    machine_category: spec.category ?? null,
    translations,
  });
}

/** Pass 2: seed the sections (blocks may reference any page via '@page:'). */
async function seedPageSections(client: Client, key: string, spec: PageSpec) {
  const pageId = pageIds[key];

  // Blocks (+ their children)
  const sectionRefs: Array<{ collection: string; item: string }> = [];
  for (const block of spec.sections) {
    const blockId = await seedBlock(client, block);
    sectionRefs.push({ collection: block.collection, item: blockId });
  }

  // Rebuild the sections junction deterministically
  const rows = await api<{ data: Array<{ id: number }> }>(
    client,
    'GET',
    `/items/pages_sections?limit=-1&fields=id&filter=${encodeURIComponent(JSON.stringify({ pages_id: { _eq: pageId } }))}`,
  );
  if (rows.data.length > 0) {
    await api(client, 'DELETE', '/items/pages_sections', rows.data.map((r) => r.id));
  }
  for (let i = 0; i < sectionRefs.length; i++) {
    await api(client, 'POST', '/items/pages_sections', {
      pages_id: pageId,
      collection: sectionRefs[i].collection,
      item: sectionRefs[i].item,
      sort: i + 1,
    });
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('▲ Waiting for Directus at', DIRECTUS_URL);
  await waitForDirectus();
  const client = await directusAdmin();
  const t = await token(client);

  console.log('▲ Uploading placeholder images');
  imageIds = await ensureImages(t);
  console.log(`   ${Object.keys(imageIds).length} images available`);

  console.log('▲ Seeding data collections');
  for (const [key, row] of Object.entries(dataFixtures.employees)) {
    employeeIds[key] = await upsertBySeedKey(client, 'employees', key, row);
  }
  for (const [col, rows] of Object.entries({
    brochures: dataFixtures.brochures,
    downloads: dataFixtures.downloads,
    fairs: dataFixtures.fairs,
    job_ads: dataFixtures.jobAds,
    social_media_channels: dataFixtures.socialMediaChannels,
    testimonials: dataFixtures.testimonials,
  })) {
    for (const [key, row] of Object.entries(rows)) {
      await upsertBySeedKey(client, col, key, row);
    }
  }

  console.log('▲ Seeding machine categories + machines');
  const { categories, machines } = machineFixtures();
  for (const [key, row] of Object.entries(categories)) {
    categoryIds[key] = await upsertBySeedKey(client, 'machine_categories', key, row);
  }
  for (const [key, row] of Object.entries(machines)) {
    await upsertBySeedKey(client, 'machines', key, row);
  }

  console.log('▲ Seeding global');
  await api(client, 'PATCH', '/items/global', pageFixtures.global);
  bump('global', 'updated');

  console.log('▲ Seeding pages (pass 1: items)');
  let pageSort = 1;
  for (const [key, spec] of Object.entries(pageFixtures.pages)) {
    pageIds[key] = await seedPageBase(client, key, spec, pageSort++);
  }

  console.log('▲ Seeding pages (pass 2: sections)');
  for (const [key, spec] of Object.entries(pageFixtures.pages)) {
    await seedPageSections(client, key, spec);
    process.stdout.write(`   ✓ ${key}\n`);
  }

  console.log('\n▲ Seed summary:');
  for (const [col, r] of Object.entries(summary).sort()) {
    console.log(`   ${col.padEnd(40)} created=${r.created}  updated=${r.updated}`);
  }
  console.log('✔ Seed complete');
  // Explicit exit: the SDK auth client keeps a refresh timer alive otherwise
  process.exit(0);
}

seed().catch((err) => {
  console.error('✖ Seed failed:', err);
  process.exit(1);
});
