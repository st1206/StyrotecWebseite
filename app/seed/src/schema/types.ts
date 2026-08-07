export type FieldType =
  | 'string'
  | 'text'
  | 'integer'
  | 'bigInteger'
  | 'boolean'
  | 'date'
  | 'dateTime'
  | 'uuid'
  | 'json'
  | 'alias'
  | 'float';

export type Interface =
  | 'input'
  | 'input-multiline'
  | 'input-rich-text-html'
  | 'input-block-editor'
  | 'boolean'
  | 'datetime'
  | 'select-dropdown'
  | 'select-multiple-checkbox'
  | 'file-image'
  | 'files'
  | 'select-dropdown-m2o'
  | 'list-o2m'
  | 'list-m2m'
  | 'list-m2a'
  | 'translations'
  | 'list'
  | 'group-detail'
  | 'numeric';

export interface FieldDef {
  field: string;
  type: FieldType;
  interface?: Interface;
  required?: boolean;
  unique?: boolean;
  defaultValue?: unknown;
  note?: string;
  choices?: { text: string; value: string }[];
  hidden?: boolean;
  readonly?: boolean;
  special?: string[];
  options?: Record<string, unknown>;
  display?: string;
  displayOptions?: Record<string, unknown>;
  /** editor form group (alias field with interface group-detail) */
  group?: string;
  /** Directus field conditions (show/hide/require based on other form values) */
  conditions?: Array<Record<string, unknown>>;
}

export interface RelationDef {
  kind: 'm2o' | 'o2m' | 'm2m' | 'm2a' | 'translations' | 'files';
  field: string;
  relatedCollection?: string;
  junctionCollection?: string;
  junctionField?: string;
  m2aAllowedCollections?: string[];
  onDelete?: 'CASCADE' | 'SET NULL' | 'NO ACTION';
  sortField?: string;
  /** o2m only: name of the FK uuid field on the child collection pointing back here */
  fkField?: string;
}

export interface CollectionDef {
  name: string;
  singleton?: boolean;
  hidden?: boolean;
  translatable?: boolean;
  translationFields?: FieldDef[];
  fields: FieldDef[];
  relations?: RelationDef[];
  note?: string;
  icon?: string;
  color?: string;
  /** sidebar folder name (folder collections are created by apply.ts) */
  group?: string;
  sort?: number;
  archiveField?: string;
  archiveValue?: string;
  unarchiveValue?: string;
  /** admin list display template, e.g. '{{name}}' */
  displayTemplate?: string;
  /** use a manually-set string primary key instead of a uuid (like `languages`) */
  stringPk?: boolean;
}
