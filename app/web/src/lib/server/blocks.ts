/**
 * Field expansion + localization for the page-builder `sections` zone.
 *
 * Directus M2A queries need explicit per-collection field scoping
 * (`sections.item:block_x.path`). BLOCK_FIELDS declares what each block needs;
 * `sectionFields()` turns it into the fields list for a page query.
 */

export const BLOCK_FIELDS: Record<string, string[]> = {
  block_hero_carousel: ['*', 'translations.*', 'images.directus_files_id'],
  block_hero_dual: ['*', 'translations.*'],
  block_hero_media: [
    '*',
    'translations.*',
    'image_cards.*',
    'image_cards.translations.*',
    'image_cards.employee.*',
    'image_cards.employee.translations.*',
  ],
  block_text_image: ['*', 'translations.*'],
  block_page_header: ['*', 'translations.*'],
  block_usp_list: ['*', 'translations.*'],
  block_explore_more: [
    '*',
    'translations.*',
    'preview_cards.*',
    'preview_cards.translations.*',
    'preview_cards.target_page.id',
    'preview_cards.target_page.translations.slug',
    'preview_cards.target_page.translations.languages_code',
  ],
  block_explore_variants: ['*', 'translations.*', 'variant_cards.*', 'variant_cards.translations.*'],
  block_history: ['*', 'translations.*', 'entries.*', 'entries.translations.*'],
  block_default_cards: [
    '*',
    'translations.*',
    'cards.*',
    'cards.translations.*',
    'cards.target_page.id',
    'cards.target_page.translations.slug',
    'cards.target_page.translations.languages_code',
  ],
  block_collection_list: ['*', 'translations.*'],
  block_contact_form: ['*', 'employee.*', 'employee.translations.*'],
  block_content_header: ['*', 'translations.*'],
  block_content_text_image: ['*', 'translations.*'],
  block_content_images: [
    '*',
    'image_cards.*',
    'image_cards.translations.*',
    'image_cards.employee.*',
    'image_cards.employee.translations.*',
  ],
  block_content_accordion: ['*', 'translations.*', 'items.*', 'items.translations.*'],
  block_content_table: ['*', 'tables.*', 'tables.translations.*'],
  block_spacer: ['*'],
};

/** fields[] entries expanding the sections zone for every block type. */
export function sectionFields(): string[] {
  const fields = ['sections.id', 'sections.collection', 'sections.sort'];
  for (const [collection, paths] of Object.entries(BLOCK_FIELDS)) {
    for (const p of paths) fields.push(`sections.item:${collection}.${p}`);
  }
  return fields;
}

/**
 * Recursively merge the translation row matching `lang` into every object that
 * carries a `translations` array (blocks fetch both languages; the pick
 * happens here so no fragile deep-filter syntax is needed on M2A paths).
 */
export function localize<T>(value: T, lang: string): T {
  if (Array.isArray(value)) {
    return value.map((v) => localize(v, lang)) as T;
  }
  if (value && typeof value === 'object') {
    const obj = { ...(value as Record<string, unknown>) };
    const translations = obj.translations;
    if (Array.isArray(translations)) {
      const match =
        translations.find((t) => (t as Record<string, unknown>)?.languages_code === lang) ??
        translations[0];
      if (match && typeof match === 'object') {
        const { id: _id, languages_code: _lc, ...fields } = match as Record<string, unknown>;
        for (const [k, v] of Object.entries(fields)) {
          if (v !== null && v !== undefined) obj[k] = v;
          else if (!(k in obj)) obj[k] = v;
        }
      }
      delete obj.translations;
    }
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object') obj[k] = localize(v, lang);
    }
    return obj as T;
  }
  return value;
}

export interface Section {
  id: number;
  collection: string;
  item: Record<string, unknown>;
}

/** Normalize the raw sections zone into a render-ready ordered list. */
export function normalizeSections(raw: unknown, lang: string): Section[] {
  if (!Array.isArray(raw)) return [];
  const sections: Section[] = [];
  for (const row of raw) {
    const r = row as { id: number; collection?: string; item?: unknown; sort?: number };
    if (!r?.collection || !r.item || typeof r.item !== 'object') continue;
    sections.push({ id: r.id, collection: r.collection, item: localize(r.item as Record<string, unknown>, lang) });
  }
  return sections;
}
