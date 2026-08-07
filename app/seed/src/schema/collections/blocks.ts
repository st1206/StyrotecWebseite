import type { CollectionDef, FieldDef } from '../types.js';
import { seedKeyField } from '../fields.js';

/**
 * Section blocks for the page builder.
 *
 * Every page singleton has ONE ordered `sections` M2A zone that accepts all of
 * these blocks. This replaces the Strapi model's fixed per-page attributes
 * (heroCarousel, pageHeaderTwo, defaultContentOne, …): a content manager adds,
 * removes and reorders sections instead of filling numbered slots.
 *
 * Blocks intentionally have NO status field — visibility is governed by the
 * page that embeds them, so editors never have to publish nested pieces.
 */

const darkModeField: FieldDef = {
  field: 'is_dark_mode',
  type: 'boolean',
  interface: 'boolean',
  defaultValue: false,
  note: 'Render this section on a dark background',
};

const anchorField: FieldDef = {
  field: 'anchor',
  type: 'string',
  interface: 'input',
  note: 'Optional #anchor id for in-page links',
};

const imageField = (field = 'image', note?: string): FieldDef => ({
  field,
  type: 'uuid',
  interface: 'file-image',
  note,
});

const imageRel = (field = 'image') =>
  ({ kind: 'm2o', field, relatedCollection: 'directus_files', onDelete: 'SET NULL' }) as const;

/** internal label for blocks that carry no readable text of their own */
const adminLabelField: FieldDef = {
  field: 'admin_label',
  type: 'string',
  interface: 'input',
  note: 'Internal label shown in lists and pickers (not rendered on the site)',
};

function block(
  name: string,
  displayName: string,
  note: string,
  fields: FieldDef[],
  translationFields: FieldDef[] = [],
  relations: CollectionDef['relations'] = [],
  opts: { displayTemplate?: string; adminLabel?: boolean } = {},
): CollectionDef {
  return {
    name,
    icon: 'view_module',
    group: 'Blocks',
    note: `${displayName} — ${note}`,
    hidden: true,
    displayTemplate: opts.displayTemplate,
    translatable: translationFields.length > 0,
    translationFields,
    fields: [seedKeyField, ...(opts.adminLabel ? [adminLabelField] : []), ...fields],
    relations: [
      ...(translationFields.length > 0 ? [{ kind: 'translations' as const, field: 'translations' }] : []),
      ...(relations ?? []),
    ],
  };
}

export const blockCollections: CollectionDef[] = [
  // ── Heroes ────────────────────────────────────────────────────────────────
  block(
    'block_hero_carousel',
    'Hero: image carousel',
    'full-width autoplaying image carousel with a keyphrase overlay',
    [{ field: 'carousel_speed', type: 'integer', interface: 'input', defaultValue: 4000, note: 'Slide interval in ms' }],
    [{ field: 'keyphrase', type: 'string', interface: 'input', note: 'Big headline over the images' }],
    [{ kind: 'files', field: 'images' }],
  ),
  block(
    'block_hero_dual',
    'Hero: keyword + text/image',
    'keyword banner with supporting text and image (product pages)',
    [imageField('image', 'Main hero image'), imageField('secondary_image', 'Optional second, angled image')],
    [
      { field: 'keyword', type: 'string', interface: 'input', required: true, note: 'Large keyword in the banner' },
      { field: 'sub_keyword', type: 'string', interface: 'input' },
      { field: 'title', type: 'string', interface: 'input' },
      { field: 'subtitle', type: 'string', interface: 'input' },
      { field: 'content', type: 'text', interface: 'input-multiline' },
    ],
    [imageRel('image'), imageRel('secondary_image')],
  ),
  block(
    'block_hero_media',
    'Hero: video/image + team cards',
    'video or image hero with optional person/image cards (about us)',
    [imageField('media', 'Video (mp4) or image'), anchorField],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
    [imageRel('media'), { kind: 'o2m', field: 'image_cards', relatedCollection: 'image_cards', fkField: 'hero_media_block' }],
  ),
  block(
    'block_text_image',
    'Text + image band',
    'split text/image band (intro sections)',
    [imageField()],
    [
      { field: 'title', type: 'string', interface: 'input', required: true },
      { field: 'subtitle', type: 'string', interface: 'input' },
      { field: 'content', type: 'text', interface: 'input-multiline' },
    ],
    [imageRel()],
  ),

  // ── Structure & navigation sections ──────────────────────────────────────
  block(
    'block_page_header',
    'Page header',
    'headline + description introducing a page region',
    [anchorField],
    [
      { field: 'headline', type: 'string', interface: 'input', required: true },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
  ),
  block(
    'block_usp_list',
    'USP checkmark band',
    'dark band listing unique selling points',
    [],
    [
      {
        field: 'items',
        type: 'json',
        interface: 'list',
        note: 'One entry per USP',
        options: { fields: [{ field: 'name', name: 'USP', type: 'string', meta: { interface: 'input', width: 'full' } }] },
      },
    ],
    [],
    { displayTemplate: '{{admin_label}}', adminLabel: true },
  ),
  block(
    'block_explore_more',
    'Explore more cards',
    'hover cards linking to subpages',
    [],
    [
      { field: 'section_title', type: 'string', interface: 'input' },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
    [{ kind: 'o2m', field: 'preview_cards', relatedCollection: 'preview_cards', fkField: 'explore_more_block' }],
  ),
  block(
    'block_explore_variants',
    'Product variant cards',
    'variant cards with spec accordions (FS10/15/20, materials)',
    [],
    [{ field: 'section_title', type: 'string', interface: 'input' }],
    [{ kind: 'o2m', field: 'variant_cards', relatedCollection: 'variant_cards', fkField: 'explore_variants_block' }],
  ),
  block(
    'block_history',
    'History timeline',
    'timeline of milestones',
    [],
    [{ field: 'section_title', type: 'string', interface: 'input' }],
    [{ kind: 'o2m', field: 'entries', relatedCollection: 'history_entries', fkField: 'history_block' }],
  ),
  block(
    'block_default_cards',
    'Card list',
    'alternating image/text cards with buttons (industries, values)',
    [darkModeField, anchorField],
    [
      { field: 'section_title', type: 'string', interface: 'input' },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
    [{ kind: 'o2m', field: 'cards', relatedCollection: 'default_cards', fkField: 'default_cards_block' }],
  ),
  block(
    'block_collection_list',
    'Collection listing',
    'embeds a data collection (machines, jobs, fairs, downloads, brochures)',
    [
      {
        field: 'source',
        type: 'string',
        interface: 'select-dropdown',
        required: true,
        note: 'Which collection to list',
        choices: [
          { text: 'Machines', value: 'machines' },
          { text: 'Job ads', value: 'job_ads' },
          { text: 'Fairs', value: 'fairs' },
          { text: 'Downloads', value: 'downloads' },
          { text: 'Brochures', value: 'brochures' },
          { text: 'Testimonials', value: 'testimonials' },
        ],
      },
      {
        field: 'machine_category',
        type: 'string',
        interface: 'select-dropdown-m2o',
        note: 'Only for machine listings: limit to one category (empty = all machines)',
        options: { template: '{{name}}' },
        conditions: [
          { name: 'only for machine listings', rule: { source: { _neq: 'machines' } }, hidden: true },
        ],
      },
      {
        field: 'display',
        type: 'string',
        interface: 'select-dropdown',
        defaultValue: 'machine_grid',
        required: true,
        note: 'How to render the entries',
        choices: [
          { text: 'Machine grid (cards + stock filter)', value: 'machine_grid' },
          { text: 'Job ads (accordion)', value: 'job_ads' },
          { text: 'Fairs (accordion with dates)', value: 'fairs' },
          { text: 'Downloads (table)', value: 'downloads' },
          { text: 'Brochures (download grid)', value: 'brochures' },
          { text: 'Testimonials (quotes)', value: 'testimonials' },
        ],
      },
    ],
    [
      { field: 'section_title', type: 'string', interface: 'input' },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
    [{ kind: 'm2o', field: 'machine_category', relatedCollection: 'machine_categories', onDelete: 'SET NULL' }],
  ),
  block(
    'block_contact_form',
    'Contact form',
    'contact band with a form and the responsible employee',
    [{ field: 'employee', type: 'uuid', interface: 'select-dropdown-m2o', note: 'Contact person shown next to the form; receives inquiries' }],
    [],
    [{ kind: 'm2o', field: 'employee', relatedCollection: 'employees', onDelete: 'SET NULL' }],
    { displayTemplate: 'Kontaktformular — {{employee}}' },
  ),

  // ── Free content blocks (Strapi "defaultContent" dynamic zone) ───────────
  block(
    'block_content_header',
    'Content: header',
    'section heading within content flow',
    [darkModeField, anchorField],
    [
      { field: 'section_title', type: 'string', interface: 'input', required: true },
      { field: 'description', type: 'text', interface: 'input-multiline' },
    ],
  ),
  block(
    'block_content_text_image',
    'Content: text + image',
    'rich text with a positioned image',
    [
      darkModeField,
      {
        field: 'image_position',
        type: 'string',
        interface: 'select-dropdown',
        defaultValue: 'right',
        choices: [
          { text: 'Top', value: 'top' },
          { text: 'Bottom', value: 'bottom' },
          { text: 'Left', value: 'left' },
          { text: 'Right', value: 'right' },
        ],
      },
      {
        field: 'image_size',
        type: 'string',
        interface: 'select-dropdown',
        defaultValue: 'md',
        choices: [
          { text: 'XS', value: 'xs' },
          { text: 'SM', value: 'sm' },
          { text: 'MD', value: 'md' },
          { text: 'LG', value: 'lg' },
          { text: 'XL', value: 'xl' },
        ],
      },
      { field: 'is_image_transparent', type: 'boolean', interface: 'boolean', defaultValue: false },
      imageField(),
    ],
    [
      { field: 'title', type: 'string', interface: 'input' },
      { field: 'content', type: 'json', interface: 'input-block-editor', note: 'Rich text (Block Editor)' },
    ],
    [imageRel()],
  ),
  block(
    'block_content_images',
    'Content: image gallery',
    'grid of captioned images',
    [darkModeField],
    [],
    [{ kind: 'o2m', field: 'image_cards', relatedCollection: 'image_cards', fkField: 'content_images_block' }],
    { displayTemplate: '{{admin_label}}', adminLabel: true },
  ),
  block(
    'block_content_accordion',
    'Content: accordion',
    'collapsible topics (options, FAQs, specs)',
    [darkModeField],
    [{ field: 'title', type: 'string', interface: 'input' }],
    [{ kind: 'o2m', field: 'items', relatedCollection: 'accordion_items', fkField: 'content_accordion_block' }],
  ),
  block(
    'block_content_table',
    'Content: table',
    'technical data tables',
    [darkModeField],
    [],
    [{ kind: 'o2m', field: 'tables', relatedCollection: 'table_defs', fkField: 'content_table_block' }],
    { displayTemplate: '{{admin_label}}', adminLabel: true },
  ),
  block(
    'block_spacer',
    'Spacer',
    'vertical whitespace, optional separator line',
    [
      darkModeField,
      {
        field: 'height',
        type: 'string',
        interface: 'select-dropdown',
        defaultValue: 'md',
        choices: [
          { text: 'XS', value: 'xs' },
          { text: 'SM', value: 'sm' },
          { text: 'MD', value: 'md' },
          { text: 'LG', value: 'lg' },
          { text: 'XL', value: 'xl' },
        ],
      },
      { field: 'with_separator_line', type: 'boolean', interface: 'boolean', defaultValue: false },
    ],
    [],
    [],
    { displayTemplate: 'Abstand ({{height}})' },
  ),
];

export const blockCollectionNames = blockCollections.map((c) => c.name);
