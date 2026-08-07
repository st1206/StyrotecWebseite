import { publicFetch, staffFetch, DirectusError } from './directus.js';
import { sectionFields, normalizeSections, localize, type Section } from './blocks.js';

export type Lang = string;

type Row = Record<string, unknown>;

export interface Language {
  code: string; // 'de-DE'
  short: string; // 'de' — URL prefix
  name: string;
  direction: string;
}

const FALLBACK_LANGUAGES: Language[] = [
  { code: 'de-DE', short: 'de', name: 'Deutsch', direction: 'ltr' },
  { code: 'en-US', short: 'en', name: 'English', direction: 'ltr' },
];

/**
 * Central language registry — the Directus `languages` collection controls
 * which URL prefixes exist and what the language switcher offers. Adding a
 * language in the admin makes the site serve it (untranslated content falls
 * back to the first available translation).
 */
export function fetchLanguages(): Promise<Language[]> {
  return cached('languages', 60_000, async () => {
    try {
      const res = await publicFetch<{ data: Array<{ code: string; name: string; direction: string }> }>(
        '/items/languages?limit=-1',
      );
      const langs = res.data.map((l) => ({
        code: l.code,
        short: l.code.split('-')[0].toLowerCase(),
        name: l.name,
        direction: l.direction ?? 'ltr',
      }));
      return langs.length > 0 ? langs : FALLBACK_LANGUAGES;
    } catch {
      return FALLBACK_LANGUAGES;
    }
  });
}

export async function defaultLanguage(): Promise<Language> {
  const langs = await fetchLanguages();
  return langs.find((l) => l.short === 'de') ?? langs[0];
}

/** full Directus code ('de-DE') for a URL prefix ('de') */
async function fullCode(short: Lang): Promise<string> {
  const langs = await fetchLanguages();
  return (langs.find((l) => l.short === short) ?? langs[0]).code;
}

function qs(params: Record<string, string | string[]>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) for (const item of v) sp.append(k, item);
    else sp.set(k, v);
  }
  return sp.toString();
}

const publishedFilter = JSON.stringify({ status: { _eq: 'published' } });

/** Tiny in-memory TTL cache for hot, rarely-changing lookups (global, nav). */
const cache = new Map<string, { until: number; value: unknown }>();
async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.until > Date.now()) return hit.value as T;
  const value = await fn();
  cache.set(key, { until: Date.now() + ttlMs, value });
  return value;
}

// ── Pages ───────────────────────────────────────────────────────────────────

export interface PageData {
  id: string;
  name?: string;
  kind?: string;
  machine_category?: string | null;
  slug?: string;
  seo_page_title?: string;
  seo_page_description?: string;
  seo_keywords?: string;
  /** slug per language short code — for hreflang + the language switcher */
  slugAlternates: Record<string, string>;
  sections: Section[];
  [key: string]: unknown;
}

const PAGE_FIELDS = ['*', 'translations.*', ...sectionFields()];

function shapePage(raw: Row, code: string): PageData {
  const translations = (raw.translations as Array<Row> | null) ?? [];
  const slugAlternates: Record<string, string> = {};
  for (const t of translations) {
    const tCode = t.languages_code as string | null;
    if (tCode && typeof t.slug === 'string') slugAlternates[tCode.split('-')[0].toLowerCase()] = t.slug;
  }
  const { sections, ...rest } = raw;
  const page = localize(rest, code) as Row;
  return {
    ...page,
    slugAlternates,
    sections: normalizeSections(sections, code),
  } as PageData;
}

async function queryPage(filter: Record<string, unknown>, lang: Lang, draft: boolean): Promise<PageData | null> {
  const fetcher = draft ? staffFetch : publicFetch;
  const code = await fullCode(lang);
  const query = qs({
    'fields[]': PAGE_FIELDS,
    filter: JSON.stringify(draft ? filter : { _and: [{ status: { _eq: 'published' } }, filter] }),
    limit: '1',
  });
  try {
    const res = await fetcher<{ data: Row[] }>(`/items/pages?${query}`);
    if (res.data.length === 0) return null;
    return shapePage(res.data[0], code);
  } catch (e) {
    if (e instanceof DirectusError && (e.status === 403 || e.status === 404)) return null;
    throw e;
  }
}

/** Resolve a page by its URL path (slug without language prefix). */
export function fetchPageBySlug(slug: string, lang: Lang): Promise<PageData | null> {
  // Directus forbids `_eq: ''` — the homepage (empty slug) uses `_empty`
  const slugFilter = slug === '' ? { _empty: true } : { _eq: slug };
  return queryPage({ translations: { slug: slugFilter } }, lang, false);
}

/** Preview: resolve by id (uuid) or seed key, drafts included. */
export function fetchPageByRef(ref: string, lang: Lang): Promise<PageData | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ref);
  // seed keys are stored verbatim; 'home'/'homepage' both map to the homepage
  const filter = isUuid
    ? { id: { _eq: ref } }
    : { seed_key: { _eq: ref === 'home' ? 'homepage' : ref } };
  return queryPage(filter, lang, true);
}

export interface NavEntry {
  key: string;
  kind: string;
  /** slug per language short code */
  slugs: Record<string, string>;
}

/** All published pages' slugs keyed by seed key — powers nav + sitemap. Cached. */
export function fetchNavMap(): Promise<Record<string, NavEntry>> {
  return cached('navMap', 30_000, async () => {
    const query = qs({
      'fields[]': ['seed_key', 'kind', 'translations.slug', 'translations.languages_code'],
      filter: publishedFilter,
      limit: '-1',
    });
    const res = await publicFetch<{ data: Row[] }>(`/items/pages?${query}`);
    const map: Record<string, NavEntry> = {};
    for (const row of res.data) {
      const key = row.seed_key as string | null;
      if (!key) continue;
      const slugs: Record<string, string> = {};
      for (const t of (row.translations as Array<Row> | null) ?? []) {
        const tCode = t.languages_code as string | null;
        if (tCode && typeof t.slug === 'string') slugs[tCode.split('-')[0].toLowerCase()] = t.slug;
      }
      map[key] = { key, kind: (row.kind as string) ?? 'standard', slugs };
    }
    return map;
  });
}

// ── Global / socials ────────────────────────────────────────────────────────

export function fetchGlobal(): Promise<Row | null> {
  return cached('global', 30_000, async () => {
    try {
      const res = await publicFetch<{ data: Row | null }>('/items/global');
      return res.data ?? null;
    } catch {
      return null;
    }
  });
}

export function fetchSocialChannels(): Promise<Row[]> {
  return cached('socials', 30_000, async () => {
    try {
      const res = await publicFetch<{ data: Row[] }>(
        `/items/social_media_channels?filter=${encodeURIComponent(publishedFilter)}&fields[]=name&fields[]=external_link`,
      );
      return res.data;
    } catch {
      return [];
    }
  });
}

// ── Machines ────────────────────────────────────────────────────────────────

export async function fetchMachineList(lang: Lang, categoryId?: string | null): Promise<Row[]> {
  const code = await fullCode(lang);
  const filter: Record<string, unknown> = categoryId
    ? { _and: [{ status: { _eq: 'published' } }, { category: { _eq: categoryId } }] }
    : { status: { _eq: 'published' } };
  const query = qs({
    'fields[]': ['*', 'translations.*', 'pictures.directus_files_id'],
    filter: JSON.stringify(filter),
    limit: '-1',
  });
  const res = await publicFetch<{ data: Row[] }>(`/items/machines?${query}`);
  const prio: Record<string, number> = { high: 0, medium: 1, low: 2 };
  return res.data
    .map((r) => localize(r, code) as Row)
    .sort((a, b) => (prio[a.priority as string] ?? 1) - (prio[b.priority as string] ?? 1));
}

export async function fetchMachineBySlug(slug: string, lang: Lang, categoryId?: string | null): Promise<Row | null> {
  const code = await fullCode(lang);
  const conditions: Record<string, unknown>[] = [{ status: { _eq: 'published' } }, { slug: { _eq: slug } }];
  if (categoryId) conditions.push({ category: { _eq: categoryId } });
  const query = qs({
    'fields[]': [
      '*',
      'translations.*',
      'pictures.directus_files_id',
      'contact_person.*',
      'contact_person.translations.*',
    ],
    filter: JSON.stringify({ _and: conditions }),
    limit: '1',
  });
  const res = await publicFetch<{ data: Row[] }>(`/items/machines?${query}`);
  if (res.data.length === 0) return null;
  return localize(res.data[0], code) as Row;
}

// ── Collection-list blocks ──────────────────────────────────────────────────

export async function fetchListSource(source: string, lang: Lang, categoryId?: string | null): Promise<Row[]> {
  if (source === 'machines') return fetchMachineList(lang, categoryId);

  const sortBy: Record<string, string> = {
    job_ads: 'sort_order',
    downloads: 'sort_order',
    fairs: 'start_date',
    testimonials: '-timestamp',
  };
  if (!['job_ads', 'fairs', 'downloads', 'brochures', 'testimonials'].includes(source)) return [];
  const code = await fullCode(lang);

  const query = qs({
    'fields[]': ['*', 'translations.*'],
    filter: publishedFilter,
    limit: '-1',
    ...(sortBy[source] ? { sort: sortBy[source] } : {}),
  });
  try {
    const res = await publicFetch<{ data: Row[] }>(`/items/${source}?${query}`);
    return res.data.map((r) => localize(r, code) as Row);
  } catch {
    return [];
  }
}

/** Hydrate every block_collection_list section with its entries (in parallel). */
export async function hydrateCollectionLists(page: PageData, lang: Lang): Promise<void> {
  await Promise.all(
    page.sections
      .filter((s) => s.collection === 'block_collection_list')
      .map(async (s) => {
        const source = s.item.source as string | undefined;
        const categoryId = (s.item.machine_category as string | null) ?? null;
        s.item.entries = source ? await fetchListSource(source, lang, categoryId) : [];
      }),
  );
}
