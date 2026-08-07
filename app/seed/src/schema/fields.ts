import type { FieldDef } from './types.js';

export const statusField: FieldDef = {
  field: 'status',
  type: 'string',
  interface: 'select-dropdown',
  defaultValue: 'draft',
  required: true,
  choices: [
    { text: 'Draft', value: 'draft' },
    { text: 'Published', value: 'published' },
    { text: 'Archived', value: 'archived' },
  ],
  display: 'labels',
  displayOptions: {
    choices: [
      { text: 'Draft', value: 'draft', background: '#D3DAE4', foreground: '#18222F' },
      { text: 'Published', value: 'published', background: '#2ECDA7', foreground: '#FFFFFF' },
      { text: 'Archived', value: 'archived', background: '#A2B5CD', foreground: '#FFFFFF' },
    ],
  },
};

export const sortField: FieldDef = {
  field: 'sort',
  type: 'integer',
  interface: 'input',
  hidden: true,
};

export const dateCreatedField: FieldDef = {
  field: 'date_created',
  type: 'dateTime',
  interface: 'datetime',
  readonly: true,
  hidden: true,
  special: ['date-created'],
};

export const dateUpdatedField: FieldDef = {
  field: 'date_updated',
  type: 'dateTime',
  interface: 'datetime',
  readonly: true,
  hidden: true,
  special: ['date-updated'],
};

export const seedKeyField: FieldDef = {
  field: 'seed_key',
  type: 'string',
  interface: 'input',
  unique: true,
  hidden: true,
  note: 'Stable key for idempotent seeding',
};

export const commonMeta: FieldDef[] = [statusField, sortField, seedKeyField, dateCreatedField, dateUpdatedField];

export const conditionField: FieldDef = {
  field: 'condition_key',
  type: 'string',
  interface: 'select-dropdown',
  choices: [
    { text: 'Used', value: 'used' },
    { text: 'Used, good', value: 'used_good' },
    { text: 'Used, very good', value: 'used_very_good' },
    { text: 'Overhauled', value: 'overhauled' },
    { text: 'Fully functioning', value: 'fully_functioning' },
    { text: 'New', value: 'new' },
  ],
  defaultValue: 'used',
};

export const priorityField: FieldDef = {
  field: 'priority',
  type: 'string',
  interface: 'select-dropdown',
  choices: [
    { text: 'Low', value: 'low' },
    { text: 'Medium', value: 'medium' },
    { text: 'High', value: 'high' },
  ],
  defaultValue: 'medium',
};

export const availableField: FieldDef = {
  field: 'available',
  type: 'boolean',
  interface: 'boolean',
  defaultValue: true,
  note: 'Is this machine currently available for sale?',
};

export const locationField: FieldDef = {
  field: 'location',
  type: 'string',
  interface: 'input',
  note: 'Physical location (from Strapi productDataSheet.location)',
};

export const internalIdField: FieldDef = {
  field: 'internal_id',
  type: 'string',
  interface: 'input',
  unique: true,
  note: 'Internal business reference',
};

export const yearField: FieldDef = {
  field: 'year_of_manufacture',
  type: 'integer',
  interface: 'input',
};

export const weightField: FieldDef = { field: 'weight', type: 'string', interface: 'input' };
export const dimensionsField: FieldDef = { field: 'dimensions', type: 'string', interface: 'input' };

export const productDataSheetFields: FieldDef[] = [
  availableField,
  locationField,
  internalIdField,
  yearField,
  conditionField,
  priorityField,
  weightField,
  dimensionsField,
];

// Only genuinely language-dependent machine fields live in translations —
// names, slugs, manufacturers and spec values are language-independent.
export const machineTranslationFields: FieldDef[] = [
  { field: 'designation', type: 'string', interface: 'input', note: 'e.g. "5-Achs Bearbeitungszentrum"' },
  {
    field: 'description',
    type: 'json',
    interface: 'input-block-editor',
    note: 'Structured rich text (Block Editor)',
  },
];

export const seoTranslationFields: FieldDef[] = [
  { field: 'seo_page_title', type: 'string', interface: 'input', note: 'Meta title (55–60 chars)' },
  {
    field: 'seo_page_description',
    type: 'text',
    interface: 'input-multiline',
    note: 'Meta description (~155–160 chars)',
  },
  { field: 'seo_keywords', type: 'text', interface: 'input-multiline' },
];

