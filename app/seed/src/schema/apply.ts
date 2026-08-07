import { directusAdmin, waitForDirectus, DIRECTUS_URL } from '../directus-client.js';
import { allCollections } from './index.js';
import type { CollectionDef, FieldDef, RelationDef } from './types.js';
import { createCollection, readCollections } from '@directus/sdk';

async function rawFetch(method: 'GET' | 'POST' | 'PATCH', path: string, token: string, body?: unknown) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}
const rawPost = (path: string, token: string, body: unknown) => rawFetch('POST', path, token, body);

const LOCALE_CODES = ['de-DE', 'en-US'];

type Client = Awaited<ReturnType<typeof directusAdmin>>;

async function getToken(client: Client): Promise<string> {
  const t = await client.getToken();
  if (!t) throw new Error('No auth token');
  return t;
}

async function ensureLanguages(client: Client, existing: Set<string>, token: string) {
  if (!existing.has('languages')) {
    await client.request(
      createCollection({
        collection: 'languages',
        meta: { icon: 'translate', note: 'Supported content languages' },
        schema: {},
        fields: [
          {
            field: 'code',
            type: 'string',
            meta: { interface: 'input' },
            schema: { is_primary_key: true, is_nullable: false, length: 10 },
          },
          { field: 'name', type: 'string', meta: { interface: 'input' }, schema: { is_nullable: false } },
          {
            field: 'direction',
            type: 'string',
            meta: {
              interface: 'select-dropdown',
              options: {
                choices: [
                  { text: 'Left-to-right', value: 'ltr' },
                  { text: 'Right-to-left', value: 'rtl' },
                ],
              },
            },
            schema: { default_value: 'ltr' },
          },
        ],
      } as never),
    );
    existing.add('languages');
  }
  for (const code of LOCALE_CODES) {
    const check = await fetch(`${DIRECTUS_URL}/items/languages/${encodeURIComponent(code)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (check.status === 404 || check.status === 403) {
      try {
        await rawPost('/items/languages', token, {
          code,
          name: code === 'de-DE' ? 'Deutsch' : 'English',
          direction: 'ltr',
        });
      } catch (e) {
        const msg = errMessage(e);
        if (!msg.includes('RECORD_NOT_UNIQUE') && !msg.includes('unique')) throw e;
      }
    }
  }
}

function inferSpecial(f: FieldDef): string[] | null {
  if (f.special) return f.special;
  if (f.interface === 'file-image') return ['file'];
  if (f.interface === 'select-dropdown-m2o') return ['m2o'];
  if (f.type === 'json' && f.interface === 'list') return ['cast-json'];
  if (f.type === 'json') return ['cast-json'];
  if (f.type === 'boolean') return ['cast-boolean'];
  return null;
}

function fieldMeta(f: FieldDef, collection: string) {
  return {
    field: f.field,
    type: f.type,
    // alias fields (form groups) carry no DB column
    schema:
      f.type === 'alias'
        ? null
        : {
            is_nullable: !f.required,
            has_auto_increment: false,
            is_unique: f.unique ?? false,
            default_value: f.defaultValue ?? null,
          },
    meta: {
      collection,
      field: f.field,
      interface: f.interface,
      note: f.note,
      hidden: f.hidden ?? false,
      readonly: f.readonly ?? false,
      required: f.required ?? false,
      special: inferSpecial(f),
      group: f.group ?? null,
      conditions: f.conditions ?? null,
      options: {
        ...(f.options ?? {}),
        ...(f.choices ? { choices: f.choices } : {}),
      },
      display: f.display,
      display_options: f.displayOptions,
    },
  } as const;
}

async function existingCollectionNames(client: Client): Promise<Set<string>> {
  const cols = (await client.request(readCollections())) as Array<{ collection: string }>;
  return new Set(cols.map((c) => c.collection));
}

async function existingFieldNames(collection: string, token: string): Promise<Set<string>> {
  try {
    const res = await fetch(`${DIRECTUS_URL}/fields/${collection}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return new Set();
    const data = (await res.json()) as { data: Array<{ field: string }> };
    return new Set(data.data.map((f) => f.field));
  } catch {
    return new Set();
  }
}

async function existingRelationKeys(token: string): Promise<Set<string>> {
  const res = await fetch(`${DIRECTUS_URL}/relations`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return new Set();
  const data = (await res.json()) as { data: Array<{ collection: string; field: string }> };
  return new Set(data.data.map((r) => `${r.collection}.${r.field}`));
}

/**
 * Create the relation, or PATCH its meta when it already exists. The Directus
 * admin app needs complete relation meta (one_field + junction_field pairs) to
 * render translations/M2A editors — the API alone works without it, so a
 * create-only script can leave the admin UI broken.
 */
async function ensureRelation(
  token: string,
  relKeys: Set<string>,
  body: { collection: string; field: string; related_collection?: string; meta?: Record<string, unknown>; schema?: unknown },
) {
  if (relKeys.has(`${body.collection}.${body.field}`)) {
    if (body.meta) {
      await rawFetch('PATCH', `/relations/${body.collection}/${body.field}`, token, { meta: body.meta });
    }
    return;
  }
  await rawPost('/relations', token, body);
  relKeys.add(`${body.collection}.${body.field}`);
}

async function createCollectionIfMissing(client: Client, def: CollectionDef, existing: Set<string>) {
  if (existing.has(def.name)) return false;
  await client.request(
    createCollection({
      collection: def.name,
      meta: {
        singleton: def.singleton ?? false,
        icon: def.icon,
        color: def.color,
        note: def.note,
        hidden: def.hidden ?? false,
        display_template: def.displayTemplate,
        archive_field: def.archiveField,
        archive_value: def.archiveValue,
        unarchive_value: def.unarchiveValue,
      },
      schema: {},
      fields: [
        def.stringPk
          ? {
              field: 'id',
              type: 'string',
              meta: {
                interface: 'input',
                readonly: false,
                note: 'Stable key, e.g. cnc_mills — referenced by form rules; do not change after creation',
              },
              schema: { is_primary_key: true, is_nullable: false, length: 64 },
            }
          : {
              field: 'id',
              type: 'uuid',
              meta: { hidden: true, interface: 'input', readonly: true, special: ['uuid'] },
              schema: { is_primary_key: true, has_auto_increment: false, is_nullable: false },
            },
      ],
    } as never),
  );
  existing.add(def.name);
  return true;
}

let hadFieldErrors = false;

async function createFieldsForCollection(def: CollectionDef, token: string) {
  const existingFields = await existingFieldNames(def.name, token);
  for (const field of def.fields) {
    if (existingFields.has(field.field)) continue;
    try {
      await rawPost(`/fields/${def.name}`, token, fieldMeta(field, def.name));
    } catch (e) {
      hadFieldErrors = true;
      console.warn(`   ! field ${def.name}.${field.field}: ${errMessage(e)}`);
    }
  }
}

async function ensureAliasField(
  collection: string,
  field: string,
  special: string[],
  iface: string,
  token: string,
  options?: Record<string, unknown>,
) {
  const fields = await existingFieldNames(collection, token);
  if (fields.has(field)) return;
  await rawPost(`/fields/${collection}`, token, {
    field,
    type: 'alias',
    meta: { interface: iface, special, options: options ?? {} },
    schema: null,
  });
}

async function createTranslationsCollection(
  client: Client,
  def: CollectionDef,
  existing: Set<string>,
  token: string,
  relKeys: Set<string>,
) {
  if (!def.translatable) return;
  const tname = `${def.name}_translations`;
  if (!existing.has(tname)) {
    await client.request(
      createCollection({
        collection: tname,
        meta: { hidden: true, icon: 'translate', note: `Translations for ${def.name}` },
        schema: {},
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: { hidden: true, interface: 'input', readonly: true },
            schema: { is_primary_key: true, has_auto_increment: true },
          },
          {
            field: `${def.name}_id`,
            type: def.stringPk ? 'string' : 'uuid',
            meta: { hidden: true, interface: 'select-dropdown-m2o' },
            schema: {},
          },
          { field: 'languages_code', type: 'string', meta: { interface: 'select-dropdown-m2o' }, schema: {} },
        ],
      } as never),
    );
    existing.add(tname);

  }

  await ensureAliasField(def.name, 'translations', ['translations'], 'translations', token, {
    languageField: 'name',
    defaultLanguage: 'de-DE',
    userLanguage: false,
  });

  // Both relations need junction_field pointing at each other for the admin
  // app's translations interface to render.
  try {
    await ensureRelation(token, relKeys, {
      collection: tname,
      field: `${def.name}_id`,
      related_collection: def.name,
      meta: {
        one_field: 'translations',
        junction_field: 'languages_code',
        sort_field: null,
        one_deselect_action: 'delete',
      },
      schema: { on_delete: 'CASCADE' },
    });
  } catch (e) {
    console.warn(`   ! rel ${tname}.${def.name}_id: ${errMessage(e)}`);
  }
  try {
    await ensureRelation(token, relKeys, {
      collection: tname,
      field: 'languages_code',
      related_collection: 'languages',
      meta: { junction_field: `${def.name}_id` },
      schema: { on_delete: 'SET NULL' },
    });
  } catch (e) {
    console.warn(`   ! rel ${tname}.languages_code: ${errMessage(e)}`);
  }

  const existingFields = await existingFieldNames(tname, token);
  for (const field of def.translationFields ?? []) {
    if (existingFields.has(field.field)) continue;
    try {
      await rawPost(`/fields/${tname}`, token, fieldMeta(field, tname));
    } catch (e) {
      hadFieldErrors = true;
      console.warn(`   ! field ${tname}.${field.field}: ${errMessage(e)}`);
    }
  }
}

/**
 * O2M: child collection carries a real uuid FK (declared in the child's own
 * field list OR created here), the parent gets an alias list field, and one
 * relation ties them together. This is what makes child items editable inline
 * from the parent's drawer in the admin app.
 */
async function createO2MRelation(parent: string, rel: RelationDef, token: string, relKeys: Set<string>) {
  const child = rel.relatedCollection!;
  const fkField = rel.fkField ?? `${parent}_id`;

  const childFields = await existingFieldNames(child, token);
  if (!childFields.has(fkField)) {
    await rawPost(`/fields/${child}`, token, {
      field: fkField,
      type: 'uuid',
      meta: { interface: 'select-dropdown-m2o', hidden: true, special: ['m2o'] },
      schema: { is_nullable: true },
    });
  }

  await ensureAliasField(parent, rel.field, ['o2m'], 'list-o2m', token, { enableSelect: false });

  if (!relKeys.has(`${child}.${fkField}`)) {
    await rawPost('/relations', token, {
      collection: child,
      field: fkField,
      related_collection: parent,
      meta: { one_field: rel.field, sort_field: 'sort_order', one_deselect_action: 'delete' },
      schema: { on_delete: 'CASCADE' },
    });
    relKeys.add(`${child}.${fkField}`);
  }
}

/** Multi-file M2M via a `${parent}_files` junction — the standard Directus gallery pattern. */
async function createFilesRelation(
  client: Client,
  parent: string,
  rel: RelationDef,
  existing: Set<string>,
  token: string,
  relKeys: Set<string>,
) {
  const junction = rel.junctionCollection ?? `${parent}_files`;
  if (!existing.has(junction)) {
    await client.request(
      createCollection({
        collection: junction,
        meta: { hidden: true, icon: 'link', note: `Files junction for ${parent}.${rel.field}` },
        schema: {},
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: { hidden: true, interface: 'input', readonly: true },
            schema: { is_primary_key: true, has_auto_increment: true },
          },
          { field: `${parent}_id`, type: 'uuid', meta: { hidden: true }, schema: {} },
          { field: 'directus_files_id', type: 'uuid', meta: { hidden: true }, schema: {} },
          { field: 'sort', type: 'integer', meta: { hidden: true, interface: 'input' }, schema: {} },
        ],
      } as never),
    );
    existing.add(junction);
  }

  await ensureAliasField(parent, rel.field, ['files'], 'files', token);

  if (!relKeys.has(`${junction}.${parent}_id`)) {
    await rawPost('/relations', token, {
      collection: junction,
      field: `${parent}_id`,
      related_collection: parent,
      meta: {
        one_field: rel.field,
        sort_field: 'sort',
        one_deselect_action: 'delete',
        junction_field: 'directus_files_id',
      },
      schema: { on_delete: 'CASCADE' },
    });
    relKeys.add(`${junction}.${parent}_id`);
  }
  if (!relKeys.has(`${junction}.directus_files_id`)) {
    await rawPost('/relations', token, {
      collection: junction,
      field: 'directus_files_id',
      related_collection: 'directus_files',
      meta: { junction_field: `${parent}_id` },
      schema: { on_delete: 'CASCADE' },
    });
    relKeys.add(`${junction}.directus_files_id`);
  }
}

async function createM2AJunction(
  client: Client,
  parentCollection: string,
  rel: RelationDef,
  existing: Set<string>,
  token: string,
  relKeys: Set<string>,
) {
  const junction = rel.junctionCollection!;
  if (!existing.has(junction)) {
    await client.request(
      createCollection({
        collection: junction,
        meta: { hidden: true, icon: 'link', note: `Sections junction for ${parentCollection}.${rel.field}` },
        schema: {},
        fields: [
          {
            field: 'id',
            type: 'integer',
            meta: { hidden: true, interface: 'input', readonly: true },
            schema: { is_primary_key: true, has_auto_increment: true },
          },
          { field: `${parentCollection}_id`, type: 'uuid', meta: { hidden: true }, schema: {} },
          { field: 'item', type: 'string', meta: { hidden: true }, schema: {} },
          { field: 'collection', type: 'string', meta: { hidden: true }, schema: {} },
          { field: 'sort', type: 'integer', meta: { hidden: true, interface: 'input' }, schema: {} },
        ],
      } as never),
    );
    existing.add(junction);
  }

  await ensureAliasField(parentCollection, rel.field, ['m2a'], 'list-m2a', token);

  // junction_field on BOTH relations is what pairs them for the admin app —
  // without it the M2A interface shows "relationship hasn't been configured".
  await ensureRelation(token, relKeys, {
    collection: junction,
    field: `${parentCollection}_id`,
    related_collection: parentCollection,
    meta: { one_field: rel.field, junction_field: 'item', sort_field: 'sort', one_deselect_action: 'delete' },
    schema: { on_delete: 'CASCADE' },
  });
  await ensureRelation(token, relKeys, {
    collection: junction,
    field: 'item',
    meta: {
      one_collection_field: 'collection',
      one_allowed_collections: rel.m2aAllowedCollections,
      junction_field: `${parentCollection}_id`,
    },
    schema: null,
  });
}

async function createM2ORelation(collection: string, rel: RelationDef, token: string, relKeys: Set<string>) {
  if (relKeys.has(`${collection}.${rel.field}`)) return;
  await rawPost('/relations', token, {
    collection,
    field: rel.field,
    related_collection: rel.relatedCollection ?? 'directus_files',
    schema: { on_delete: rel.onDelete ?? 'SET NULL' },
  });
  relKeys.add(`${collection}.${rel.field}`);
}

// ── Admin sidebar folders, preview + Visual Editor wiring ───────────────────

const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173';
const PREVIEW_SECRET = process.env.WEB_PREVIEW_SECRET ?? 'styrotec-preview-shared-secret';

/** def.group → sidebar folder collection */
const FOLDERS: Record<string, { key: string; icon: string; note: string; hidden?: boolean; sort: number }> = {
  Website: { key: 'website', icon: 'language', note: 'Pages & global site settings', sort: 1 },
  Machines: { key: 'machinery', icon: 'precision_manufacturing', note: 'Machine stock & categories', sort: 2 },
  Data: { key: 'site_data', icon: 'dataset', note: 'People, documents, fairs, jobs', sort: 3 },
  Inbox: { key: 'inbox_group', icon: 'inbox', note: 'Website form submissions', sort: 4 },
  Blocks: { key: 'page_builder', icon: 'view_module', note: 'Page-builder internals', hidden: true, sort: 5 },
  Children: { key: 'page_builder', icon: 'view_module', note: 'Page-builder internals', hidden: true, sort: 5 },
};

/**
 * Group collections into sidebar folders so content managers see a tidy tree:
 * Website / Machines / Data / Inbox (hidden builder collections are foldered
 * too, for when "show hidden" is toggled).
 */
async function ensureSidebarGroups(client: Client, token: string, existing: Set<string>) {
  const made = new Set<string>();
  for (const folder of Object.values(FOLDERS)) {
    if (made.has(folder.key) || existing.has(folder.key)) {
      made.add(folder.key);
      continue;
    }
    try {
      await client.request(
        createCollection({
          collection: folder.key,
          meta: { icon: folder.icon, note: folder.note, hidden: folder.hidden ?? false, sort: folder.sort },
          schema: null,
        } as never),
      );
      existing.add(folder.key);
      made.add(folder.key);
    } catch (e) {
      console.warn(`   ! folder ${folder.key}: ${errMessage(e)}`);
    }
  }

  for (const [i, def] of allCollections.entries()) {
    const folder = def.group ? FOLDERS[def.group] : undefined;
    if (!folder) continue;
    try {
      await rawFetch('PATCH', `/collections/${def.name}`, token, {
        meta: { group: folder.key, sort: i + 1 },
      });
    } catch (e) {
      console.warn(`   ! group ${def.name}: ${errMessage(e)}`);
    }
  }
}

// ── Display templates, relation displays, list presets ──────────────────────

/** Pick the most meaningful field to represent a collection in lists/pickers. */
function displayTemplateFor(def: CollectionDef): string {
  if (def.displayTemplate) return def.displayTemplate;
  if (def.fields.some((f) => f.field === 'name')) return '{{name}}';
  if (def.translatable && (def.translationFields?.length ?? 0) > 0) return '{{translations}}';
  const firstString = def.fields.find((f) => (f.type === 'string' || f.type === 'text') && !f.hidden);
  return firstString ? `{{${firstString.field}}}` : '{{id}}';
}

/** First human-readable translated field — used for the translations table's template. */
function translationsTemplateFor(def: CollectionDef): string | null {
  const preferred = ['title', 'section_title', 'headline', 'name', 'label', 'keyword', 'keyphrase', 'slug'];
  const fields = def.translationFields ?? [];
  for (const p of preferred) {
    if (fields.some((f) => f.field === p)) return `{{${p}}}`;
  }
  const firstString = fields.find((f) => f.type === 'string' || f.type === 'text');
  return firstString ? `{{${firstString.field}}}` : null;
}

/**
 * Give every collection (and its translations table) a display template so
 * pickers and relation columns show readable labels instead of raw ids, and
 * render every m2o relation with those labels in list views.
 */
async function ensureDisplayTemplates(token: string) {
  for (const def of allCollections) {
    try {
      await rawFetch('PATCH', `/collections/${def.name}`, token, {
        meta: { display_template: displayTemplateFor(def) },
      });
    } catch (e) {
      console.warn(`   ! display_template ${def.name}: ${errMessage(e)}`);
    }
    if (def.translatable) {
      const template = translationsTemplateFor(def);
      if (template) {
        try {
          await rawFetch('PATCH', `/collections/${def.name}_translations`, token, {
            meta: { display_template: template },
          });
        } catch (e) {
          console.warn(`   ! display_template ${def.name}_translations: ${errMessage(e)}`);
        }
      }
    }
  }

  // m2o fields: show the related item's template instead of its id
  const byName = new Map(allCollections.map((d) => [d.name, d]));
  for (const def of allCollections) {
    for (const rel of def.relations ?? []) {
      if (rel.kind !== 'm2o' || !rel.relatedCollection || rel.relatedCollection === 'directus_files') continue;
      const related = byName.get(rel.relatedCollection);
      if (!related) continue;
      try {
        await rawFetch('PATCH', `/fields/${def.name}/${rel.field}`, token, {
          meta: {
            display: 'related-values',
            display_options: { template: displayTemplateFor(related) },
            options: { template: displayTemplateFor(related) },
          },
        });
      } catch (e) {
        console.warn(`   ! relation display ${def.name}.${rel.field}: ${errMessage(e)}`);
      }
    }
  }
}

/** Sensible default list columns + sort for the visible collections (global presets). */
const LIST_PRESETS: Record<string, { fields: string[]; sort: string[] }> = {
  pages: { fields: ['name', 'kind', 'machine_category', 'status'], sort: ['sort'] },
  machines: { fields: ['name', 'category', 'available', 'location', 'priority', 'status'], sort: ['name'] },
  machine_categories: { fields: ['name', 'id'], sort: ['sort'] },
  employees: { fields: ['translations', 'email', 'tel', 'status'], sort: ['email'] },
  brochures: { fields: ['translations', 'status'], sort: ['sort'] },
  downloads: { fields: ['translations', 'sort_order', 'status'], sort: ['sort_order'] },
  fairs: { fields: ['translations', 'start_date', 'end_date', 'status'], sort: ['start_date'] },
  job_ads: { fields: ['translations', 'sort_order', 'status'], sort: ['sort_order'] },
  social_media_channels: { fields: ['name', 'external_link', 'status'], sort: ['name'] },
  testimonials: { fields: ['translations', 'timestamp', 'status'], sort: ['-timestamp'] },
  contact_requests: { fields: ['status', 'name', 'email', 'recipient', 'date_created'], sort: ['-date_created'] },
};

async function ensureListPresets(token: string) {
  const existing = (await rawFetch(
    'GET',
    `/presets?limit=-1&fields=id,collection,user,role&filter=${encodeURIComponent(JSON.stringify({ _and: [{ user: { _null: true } }, { role: { _null: true } }] }))}`,
    token,
  )) as { data: Array<{ id: number; collection: string }> };
  const byCollection = new Map(existing.data.map((p) => [p.collection, p.id]));

  for (const [collection, preset] of Object.entries(LIST_PRESETS)) {
    const layout_query = { tabular: { fields: preset.fields, sort: preset.sort } };
    const existingId = byCollection.get(collection);
    try {
      if (existingId != null) {
        await rawFetch('PATCH', `/presets/${existingId}`, token, { layout: 'tabular', layout_query });
      } else {
        await rawPost('/presets', token, { collection, role: null, user: null, layout: 'tabular', layout_query });
      }
    } catch (e) {
      console.warn(`   ! preset ${collection}: ${errMessage(e)}`);
    }
  }
}

/** Live-Preview pane URL on the pages collection + global. */
async function ensurePreviewUrls(token: string) {
  try {
    await rawFetch('PATCH', '/collections/pages', token, {
      meta: { preview_url: `${WEB_URL}/preview/de/{{id}}?token=${PREVIEW_SECRET}` },
    });
  } catch (e) {
    console.warn(`   ! preview_url pages: ${errMessage(e)}`);
  }
}

/** Register the site with the Visual Editor module (Directus ≥ 11.5). */
async function ensureVisualEditorUrls(token: string) {
  try {
    await rawFetch('PATCH', '/settings', token, {
      visual_editor_urls: [{ url: `${WEB_URL}/preview/de/home?token=${PREVIEW_SECRET}` }],
    });
  } catch (e) {
    console.warn(`   ! visual_editor_urls (needs Directus ≥ 11.5): ${errMessage(e)}`);
  }
}

// ── Public role permissions ─────────────────────────────────────────────────

const STATUS_GUARDED = new Set(
  allCollections.filter((c) => c.fields.some((f) => f.field === 'status' && f.defaultValue !== 'new')).map((c) => c.name),
);

async function ensurePublicPermissions(token: string, existing: Set<string>) {
  // Directus 11: public access is a policy (role = null). Find it.
  const res = (await rawFetch('GET', '/policies?limit=-1&fields=id,name', token)) as {
    data: Array<{ id: string; name: string }>;
  };
  const publicPolicy = res.data.find((p) => p.name.toLowerCase().includes('public'));
  if (!publicPolicy) {
    console.warn('   ! No public policy found — skipping public permissions');
    return;
  }

  const existingPerms = (await rawFetch(
    'GET',
    `/permissions?limit=-1&fields=collection,action&filter=${encodeURIComponent(JSON.stringify({ policy: { _eq: publicPolicy.id } }))}`,
    token,
  )) as { data: Array<{ collection: string; action: string }> };
  const have = new Set(existingPerms.data.map((p) => `${p.collection}:${p.action}`));

  const wanted: Array<{ collection: string; action: string; permissions?: unknown; fields: string[] }> = [];

  // Read access to every content collection this schema owns (published-only
  // where the collection has a workflow status), plus junctions/translations.
  for (const name of existing) {
    if (name.startsWith('directus_')) continue;
    if (name === 'contact_requests') continue; // inbox is write-only for the public
    wanted.push({
      collection: name,
      action: 'read',
      permissions: STATUS_GUARDED.has(name) ? { _and: [{ status: { _eq: 'published' } }] } : {},
      fields: ['*'],
    });
  }
  // Files metadata + asset delivery
  wanted.push({ collection: 'directus_files', action: 'read', permissions: {}, fields: ['*'] });
  // Contact form submissions (create only, whitelisted fields)
  wanted.push({
    collection: 'contact_requests',
    action: 'create',
    permissions: {},
    fields: ['name', 'company', 'email', 'phone', 'message', 'page_url', 'recipient'],
  });

  for (const w of wanted) {
    if (have.has(`${w.collection}:${w.action}`)) continue;
    try {
      await rawPost('/permissions', token, {
        policy: publicPolicy.id,
        collection: w.collection,
        action: w.action,
        permissions: w.permissions ?? {},
        validation: null,
        presets: null,
        fields: w.fields,
      });
    } catch (e) {
      console.warn(`   ! permission ${w.collection}:${w.action}: ${errMessage(e)}`);
    }
  }
}

function errMessage(e: unknown): string {
  if (typeof e === 'string') return e;
  if (e && typeof e === 'object') {
    const err = e as { errors?: Array<{ message?: string }>; message?: string };
    if (Array.isArray(err.errors) && err.errors[0]?.message) return err.errors[0].message;
    if (err.message) return err.message;
    try {
      return JSON.stringify(e);
    } catch {
      return String(e);
    }
  }
  return String(e);
}

async function apply() {
  console.log('▲ Waiting for Directus at', DIRECTUS_URL);
  await waitForDirectus();
  console.log('▲ Authenticating');
  const client = await directusAdmin();
  const token = await getToken(client);

  console.log('▲ Loading existing collections');
  const existing = await existingCollectionNames(client);
  const relKeys = await existingRelationKeys(token);

  console.log('▲ Ensuring languages');
  await ensureLanguages(client, existing, token);

  console.log('▲ Creating collections');
  for (const def of allCollections) {
    const created = await createCollectionIfMissing(client, def, existing);
    if (created) console.log(`   + ${def.name}`);
  }

  console.log('▲ Creating fields');
  for (const def of allCollections) {
    await createFieldsForCollection(def, token);
  }

  console.log('▲ Creating translation tables');
  for (const def of allCollections) {
    try {
      await createTranslationsCollection(client, def, existing, token, relKeys);
    } catch (e) {
      console.warn(`   ! translations ${def.name}: ${errMessage(e)}`);
    }
  }

  console.log('▲ Creating relations (m2o, o2m, files)');
  for (const def of allCollections) {
    for (const rel of def.relations ?? []) {
      try {
        if (rel.kind === 'm2o') await createM2ORelation(def.name, rel, token, relKeys);
        else if (rel.kind === 'o2m') await createO2MRelation(def.name, rel, token, relKeys);
        else if (rel.kind === 'files') await createFilesRelation(client, def.name, rel, existing, token, relKeys);
      } catch (e) {
        const msg = errMessage(e);
        if (!msg.includes('already exists') && !msg.includes('associated relationship')) {
          hadFieldErrors = true;
          console.warn(`   ! ${def.name}.${rel.field} (${rel.kind}): ${msg}`);
        }
      }
    }
  }

  console.log('▲ Creating section zones (M2A)');
  for (const def of allCollections) {
    for (const rel of def.relations ?? []) {
      if (rel.kind !== 'm2a') continue;
      try {
        await createM2AJunction(client, def.name, rel, existing, token, relKeys);
      } catch (e) {
        const msg = errMessage(e);
        if (!msg.includes('already exists')) {
          hadFieldErrors = true;
          console.warn(`   ! ${rel.junctionCollection}: ${msg}`);
        }
      }
    }
  }

  console.log('▲ Ensuring public role permissions');
  await ensurePublicPermissions(token, existing);

  console.log('▲ Grouping admin sidebar');
  await ensureSidebarGroups(client, token, existing);

  console.log('▲ Display templates + list presets');
  await ensureDisplayTemplates(token);
  await ensureListPresets(token);

  console.log('▲ Wiring Live Preview + Visual Editor');
  await ensurePreviewUrls(token);
  await ensureVisualEditorUrls(token);

  if (hadFieldErrors) {
    console.error('✖ Schema applied WITH ERRORS — see warnings above. The schema may be incomplete.');
    process.exit(1);
  }
  console.log('✔ Schema applied');
  // Explicit exit: the SDK auth client keeps a refresh timer alive otherwise
  process.exit(0);
}

apply().catch((err) => {
  console.error('✖ Schema apply failed:', err);
  process.exit(1);
});
