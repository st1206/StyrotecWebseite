import type { CollectionDef, FieldDef } from '../types.js';
import { commonMeta, productDataSheetFields, machineTranslationFields, seedKeyField, sortField } from '../fields.js';

/**
 * ONE `machines` collection for all machine types; the category is a m2o to
 * `machine_categories` (string primary key like `cnc_mills` — stable, so form
 * rules can reference it).
 *
 * The editor form is CONDITIONAL: every spec field is hidden until a category
 * is picked, then exactly the fields of that machine type appear — the same
 * field sets the original Strapi content types had (see CATEGORY_FIELDS).
 */

export const CATEGORY_KEYS = [
  'cnc_mills',
  'conventional_mills',
  'lathes',
  'milling_machines',
  'grinding_machines',
  'drilling_machines',
  'saws',
  'other_machines',
  'instock_machines',
] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];

/**
 * Exact spec-field sets of the original Strapi content types
 * (backend/src/api/<type>/content-types/<type>/schema.json).
 */
const CATEGORY_FIELDS: Record<string, CategoryKey[]> = {
  number_of_axes: ['cnc_mills', 'instock_machines'],
  travel_x: ['cnc_mills', 'instock_machines'],
  travel_y: ['cnc_mills', 'instock_machines'],
  travel_z: ['cnc_mills', 'instock_machines'],
  travel_a: ['cnc_mills', 'instock_machines'],
  travel_c: ['cnc_mills', 'instock_machines'],
  control_system: ['cnc_mills', 'instock_machines'],
  clamping_surface: ['cnc_mills', 'instock_machines'],
  milling_spindle: ['cnc_mills', 'instock_machines'],
  tool_holder: ['cnc_mills', 'instock_machines'],
  feed_rate_x: ['cnc_mills', 'instock_machines'],
  feed_rate_y: ['cnc_mills', 'instock_machines'],
  feed_rate_z: ['cnc_mills', 'instock_machines'],
  spindle_hours: ['cnc_mills'],
  machine_hours: ['cnc_mills'],
  machine_serial_number: [
    'conventional_mills',
    'lathes',
    'milling_machines',
    'grinding_machines',
    'drilling_machines',
    'saws',
    'other_machines',
  ],
  spindle_speed: ['conventional_mills'],
  table_holder: ['conventional_mills'],
  table_size: ['conventional_mills', 'milling_machines', 'grinding_machines', 'drilling_machines', 'saws'],
  table_height: ['milling_machines'],
  center_distance: ['lathes'],
  center_height: ['lathes'],
  grinding_area: ['grinding_machines'],
  overhang: ['drilling_machines'],
  roller_diameter: ['saws'],
  max_cutting_height: ['saws'],
  cutting_width: ['saws'],
  power: ['conventional_mills', 'lathes', 'grinding_machines', 'drilling_machines', 'saws', 'other_machines'],
};

const specGroup = 'specs_group';

/** hidden until the picked category is one this field belongs to */
const spec = (field: string, type: FieldDef['type'] = 'string'): FieldDef => ({
  field,
  type,
  interface: 'input',
  group: specGroup,
  hidden: true,
  conditions: [
    {
      name: 'show for matching category',
      rule: { category: { _in: CATEGORY_FIELDS[field] } },
      hidden: false,
    },
  ],
});

export const machineCategories: CollectionDef = {
  name: 'machine_categories',
  icon: 'category',
  color: '#2ECDA7',
  group: 'Machines',
  note: 'Machine categories — the id is a stable key used by the machine form rules',
  displayTemplate: '{{name}}',
  stringPk: true,
  translatable: true,
  translationFields: [{ field: 'label', type: 'string', interface: 'input', required: true, note: 'Display name per language' }],
  fields: [
    seedKeyField,
    sortField,
    { field: 'name', type: 'string', interface: 'input', required: true, note: 'Internal name' },
  ],
  relations: [{ kind: 'translations', field: 'translations' }],
};

export const machines: CollectionDef = {
  name: 'machines',
  icon: 'precision_manufacturing',
  color: '#2ECDA7',
  group: 'Machines',
  note: 'All machines (used, in-stock, all categories)',
  displayTemplate: '{{name}}',
  translatable: true,
  translationFields: [
    ...machineTranslationFields,
    { field: 'type', type: 'string', interface: 'input', note: 'Type label — used by grinding/other machines' },
  ],
  archiveField: 'status',
  archiveValue: 'archived',
  unarchiveValue: 'draft',
  fields: [
    ...commonMeta,
    {
      field: 'category',
      type: 'string',
      interface: 'select-dropdown-m2o',
      required: true,
      note: 'Pick first — the form shows the spec fields of this machine type',
      options: { template: '{{name}}' },
    },
    {
      field: 'name',
      type: 'string',
      interface: 'input',
      required: true,
      note: 'Machine name (e.g. "DMG Mori DMU 50")',
    },
    {
      field: 'slug',
      type: 'string',
      interface: 'input',
      required: true,
      unique: true,
      note: 'URL slug, e.g. dmg-mori-dmu-50 (language-independent)',
      options: { slug: true, trim: true },
    },
    { field: 'manufacturer', type: 'string', interface: 'input' },
    { field: 'model_type', type: 'string', interface: 'input' },
    ...productDataSheetFields,
    // Conditional specification fields — exactly the original per-type sets
    {
      field: specGroup,
      type: 'alias',
      interface: 'group-detail',
      special: ['alias', 'no-data', 'group'],
      note: 'Technical specifications for the selected category',
      options: { start: 'open' },
    } as FieldDef,
    ...Object.keys(CATEGORY_FIELDS).map((f) => spec(f, f === 'number_of_axes' ? 'integer' : 'string')),
    {
      field: 'contact_person',
      type: 'uuid',
      interface: 'select-dropdown-m2o',
    },
  ],
  relations: [
    { kind: 'm2o', field: 'category', relatedCollection: 'machine_categories', onDelete: 'SET NULL' },
    { kind: 'm2o', field: 'contact_person', relatedCollection: 'employees', onDelete: 'SET NULL' },
    { kind: 'files', field: 'pictures' },
    { kind: 'translations', field: 'translations' },
  ],
};

export const machineCollections: CollectionDef[] = [machineCategories, machines];
