import type { CollectionDef, FieldDef } from '../types.js';
import { seedKeyField } from '../fields.js';

/**
 * Child collections for repeatable items inside blocks.
 *
 * Kept intentionally FLAT — one relation level max, with label/value leaf
 * structures as JSON repeaters on the translation row. The deeper nesting the
 * Strapi model had (tables→columns→rows, accordion groups→items,
 * variant→spec-groups→lines) was a Strapi limitation, not a content need.
 *
 * Internal links are M2O page pickers (`target_page`) instead of free-text
 * slugs: editors pick a page, and links follow slug renames automatically.
 */

const sortOrder: FieldDef = { field: 'sort_order', type: 'integer', interface: 'input', defaultValue: 1, hidden: true };

const fk = (field: string): FieldDef => ({
  field,
  type: 'uuid',
  interface: 'select-dropdown-m2o',
  hidden: true,
});

const imageField = (field = 'image'): FieldDef => ({ field, type: 'uuid', interface: 'file-image' });
const imageRel = (field = 'image') =>
  ({ kind: 'm2o', field, relatedCollection: 'directus_files', onDelete: 'SET NULL' }) as const;

const targetPageField: FieldDef = {
  field: 'target_page',
  type: 'uuid',
  interface: 'select-dropdown-m2o',
  note: 'Page this links to',
  options: { template: '{{name}}' },
};
const targetPageRel = { kind: 'm2o', field: 'target_page', relatedCollection: 'pages', onDelete: 'SET NULL' } as const;

const rowsRepeater = (note: string): FieldDef => ({
  field: 'rows',
  type: 'json',
  interface: 'list',
  note,
  options: {
    fields: [
      { field: 'label', name: 'Label', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'value', name: 'Value', type: 'string', meta: { interface: 'input', width: 'half' } },
    ],
  },
});

function child(
  name: string,
  icon: string,
  note: string,
  fields: FieldDef[],
  translationFields: FieldDef[] = [],
  relations: CollectionDef['relations'] = [],
): CollectionDef {
  return {
    name,
    icon,
    group: 'Children',
    note,
    hidden: true,
    translatable: translationFields.length > 0,
    translationFields,
    fields: [seedKeyField, sortOrder, ...fields],
    relations: [
      ...(translationFields.length > 0 ? [{ kind: 'translations' as const, field: 'translations' }] : []),
      ...(relations ?? []),
    ],
  };
}

export const childCollections: CollectionDef[] = [
  child(
    'image_cards',
    'image',
    'Captioned image, optionally tied to an employee (team cards)',
    [
      fk('hero_media_block'),
      fk('content_images_block'),
      imageField(),
      { field: 'is_image_transparent', type: 'boolean', interface: 'boolean', defaultValue: false },
      { field: 'employee', type: 'uuid', interface: 'select-dropdown-m2o' },
    ],
    [
      { field: 'title', type: 'string', interface: 'input' },
      { field: 'subtitle', type: 'string', interface: 'input' },
    ],
    [imageRel(), { kind: 'm2o', field: 'employee', relatedCollection: 'employees', onDelete: 'SET NULL' }],
  ),
  child(
    'preview_cards',
    'view_carousel',
    'Card linking to a page (explore-more sections)',
    [
      fk('explore_more_block'),
      targetPageField,
      imageField('thumbnail'),
      { field: 'is_image_transparent', type: 'boolean', interface: 'boolean', defaultValue: false },
    ],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'subtitle', type: 'string', interface: 'input' },
      { field: 'content', type: 'text', interface: 'input-multiline' },
      { field: 'cta_text', type: 'string', interface: 'input' },
    ],
    [imageRel('thumbnail'), targetPageRel],
  ),
  child(
    'variant_cards',
    'style',
    'Product variant: image + one titled spec list',
    [fk('explore_variants_block'), imageField()],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'spec_title', type: 'string', interface: 'input', note: 'Heading above the spec list, e.g. "Technische Daten"' },
      rowsRepeater('Label/value spec lines'),
    ],
    [imageRel()],
  ),
  child(
    'history_entries',
    'history',
    'Milestone on the history timeline',
    [fk('history_block'), { field: 'year', type: 'integer', interface: 'input', required: true }],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
  ),
  child(
    'default_cards',
    'view_agenda',
    'Image/text card with an optional page-link button',
    [fk('default_cards_block'), targetPageField, imageField('thumbnail'), { field: 'anchor', type: 'string', interface: 'input' }],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'content', type: 'text', interface: 'input-multiline' },
      { field: 'button_label', type: 'string', interface: 'input', note: 'Button text — only shown when a target page is set' },
    ],
    [imageRel('thumbnail'), targetPageRel],
  ),
  child(
    'accordion_items',
    'expand_more',
    'Single collapsible entry (title, text, optional image)',
    [
      fk('content_accordion_block'),
      imageField(),
      { field: 'is_image_transparent', type: 'boolean', interface: 'boolean', defaultValue: true },
    ],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'subtitle', type: 'string', interface: 'input' },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
    [imageRel()],
  ),
  child(
    'table_defs',
    'table_chart',
    'Titled label/value data table',
    [fk('content_table_block')],
    [{ field: 'title', type: 'string', interface: 'input' }, rowsRepeater('Table rows (label/value)')],
  ),
];
