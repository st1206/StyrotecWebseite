import type { CollectionDef } from '../types.js';
import { statusField, seedKeyField, sortField, dateCreatedField, dateUpdatedField, seoTranslationFields } from '../fields.js';
import { blockCollectionNames } from './blocks.js';

/**
 * The `pages` collection — ONE collection for every page of the site.
 *
 * This replaces the previous 41 per-page singletons (and their 41 junction +
 * 41 translation tables). Content managers create, rename, reorder and delete
 * pages themselves: a page is a per-language URL slug, SEO fields, and an
 * ordered `sections` page-builder zone. The frontend resolves URLs against
 * this collection — no code change needed for a new page.
 *
 * `kind = machine_category` marks pages that additionally host machine detail
 * routes (`<page-slug>/<machine-slug>`) for their linked category.
 */
export const pages: CollectionDef = {
  name: 'pages',
  icon: 'article',
  color: '#4B9CD3',
  group: 'Website',
  note: 'All site pages (page builder)',
  displayTemplate: '{{name}}',
  archiveField: 'status',
  archiveValue: 'archived',
  unarchiveValue: 'draft',
  translatable: true,
  translationFields: [
    {
      field: 'slug',
      type: 'string',
      interface: 'input',
      note: 'URL path without language prefix, e.g. produkte/portalfraesmaschinen/fs10 — empty for the homepage',
      options: { slug: true, trim: true },
    },
    ...seoTranslationFields,
  ],
  fields: [
    statusField,
    sortField,
    seedKeyField,
    dateCreatedField,
    dateUpdatedField,
    {
      field: 'name',
      type: 'string',
      interface: 'input',
      required: true,
      note: 'Internal page name shown in lists (not rendered on the site)',
    },
    {
      field: 'kind',
      type: 'string',
      interface: 'select-dropdown',
      defaultValue: 'standard',
      required: true,
      choices: [
        { text: 'Standard page', value: 'standard' },
        { text: 'Machine category page', value: 'machine_category' },
      ],
      note: 'Machine category pages also serve machine detail pages below their URL',
    },
    {
      field: 'machine_category',
      type: 'string',
      interface: 'select-dropdown-m2o',
      note: 'Only for machine category pages',
      options: { template: '{{name}}' },
      conditions: [
        { name: 'only for category pages', rule: { kind: { _neq: 'machine_category' } }, hidden: true },
      ],
    },
  ],
  relations: [
    { kind: 'translations', field: 'translations' },
    { kind: 'm2o', field: 'machine_category', relatedCollection: 'machine_categories', onDelete: 'SET NULL' },
    {
      kind: 'm2a',
      field: 'sections',
      junctionCollection: 'pages_sections',
      junctionField: 'item',
      m2aAllowedCollections: blockCollectionNames,
      sortField: 'sort',
    },
  ],
};

// GLOBAL — not localized
export const global: CollectionDef = {
  name: 'global',
  singleton: true,
  icon: 'public',
  group: 'Website',
  note: 'Global site config (not localized)',
  translatable: false,
  fields: [
    statusField,
    seedKeyField,
    { field: 'site_name', type: 'string', interface: 'input', required: true },
    { field: 'site_description', type: 'text', interface: 'input-multiline' },
    { field: 'keywords', type: 'text', interface: 'input-multiline' },
    { field: 'contact_email', type: 'string', interface: 'input' },
    { field: 'contact_phone', type: 'string', interface: 'input' },
    { field: 'address', type: 'text', interface: 'input-multiline' },
  ],
};

export const singletonCollections: CollectionDef[] = [global, pages];
