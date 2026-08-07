/**
 * Directus Visual Editor helpers.
 *
 * Emits `data-directus` attributes so the Directus Visual Editor overlay
 * (loaded via @directus/visual-editing in +layout.svelte) can:
 *   - highlight editable regions on hover
 *   - open a field drawer on click
 *   - persist edits back to Directus without page reload
 */

export interface EditTarget {
  collection: string;
  item?: string | number;
  fields?: string | string[];
  mode?: 'drawer' | 'popover' | 'modal';
}

export function edit(target: EditTarget): string {
  const parts: string[] = [`collection:${target.collection}`];
  if (target.item !== undefined) parts.push(`item:${target.item}`);
  if (target.fields) {
    const fields = Array.isArray(target.fields) ? target.fields.join(',') : target.fields;
    parts.push(`fields:${fields}`);
  }
  if (target.mode) parts.push(`mode:${target.mode}`);
  return parts.join(';');
}

/** Convenience: single field on a specific item */
export function editField(collection: string, item: string | number | undefined, field: string) {
  return edit({ collection, item, fields: field });
}

/** Convenience: page-level singleton fields */
export function editSingleton(collection: string, field: string) {
  return edit({ collection, fields: field });
}
