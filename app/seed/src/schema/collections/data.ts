import type { CollectionDef, FieldDef } from '../types.js';
import { commonMeta } from '../fields.js';

export const employees: CollectionDef = {
  name: 'employees',
  icon: 'person',
  group: 'Data',
  translatable: true,
  translationFields: [
    { field: 'name', type: 'string', interface: 'input', required: true },
    { field: 'position', type: 'string', interface: 'input' },
  ],
  fields: [
    ...commonMeta,
    { field: 'email', type: 'string', interface: 'input' },
    { field: 'tel', type: 'string', interface: 'input' },
    { field: 'picture', type: 'uuid', interface: 'file-image' },
    { field: 'contact_picture', type: 'uuid', interface: 'file-image' },
  ],
  relations: [
    { kind: 'm2o', field: 'picture', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'm2o', field: 'contact_picture', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'translations', field: 'translations' },
  ],
};

export const brochures: CollectionDef = {
  name: 'brochures',
  icon: 'menu_book',
  group: 'Data',
  translatable: true,
  translationFields: [
    { field: 'title', type: 'string', interface: 'input', required: true },
  ],
  fields: [
    ...commonMeta,
    { field: 'thumbnail', type: 'uuid', interface: 'file-image' },
    { field: 'file', type: 'uuid', interface: 'file-image' },
  ],
  relations: [
    { kind: 'm2o', field: 'thumbnail', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'm2o', field: 'file', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'translations', field: 'translations' },
  ],
};

export const downloads: CollectionDef = {
  name: 'downloads',
  icon: 'download',
  group: 'Data',
  translatable: true,
  translationFields: [
    { field: 'title', type: 'string', interface: 'input', required: true },
    { field: 'description', type: 'text', interface: 'input-multiline' },
  ],
  fields: [
    ...commonMeta,
    { field: 'file', type: 'uuid', interface: 'file-image' },
    { field: 'sort_order', type: 'integer', interface: 'input', defaultValue: 1 },
  ],
  relations: [
    { kind: 'm2o', field: 'file', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'translations', field: 'translations' },
  ],
};

export const fairs: CollectionDef = {
  name: 'fairs',
  icon: 'event',
  group: 'Data',
  translatable: true,
  translationFields: [
    { field: 'name', type: 'string', interface: 'input', required: true },
    { field: 'city', type: 'string', interface: 'input' },
    { field: 'description', type: 'text', interface: 'input-multiline' },
    { field: 'content', type: 'json', interface: 'input-block-editor' },
  ],
  fields: [
    ...commonMeta,
    { field: 'start_date', type: 'date', interface: 'datetime' },
    { field: 'end_date', type: 'date', interface: 'datetime' },
    { field: 'external_link', type: 'string', interface: 'input' },
    { field: 'logo', type: 'uuid', interface: 'file-image' },
  ],
  relations: [
    { kind: 'm2o', field: 'logo', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'translations', field: 'translations' },
  ],
};

export const jobAds: CollectionDef = {
  name: 'job_ads',
  icon: 'work',
  group: 'Data',
  translatable: true,
  translationFields: [
    { field: 'title', type: 'string', interface: 'input', required: true },
    { field: 'description', type: 'text', interface: 'input-multiline' },
    { field: 'content', type: 'json', interface: 'input-block-editor' },
  ],
  fields: [
    ...commonMeta,
    { field: 'file', type: 'uuid', interface: 'file-image' },
    { field: 'sort_order', type: 'integer', interface: 'input', defaultValue: 1 },
  ],
  relations: [
    { kind: 'm2o', field: 'file', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'translations', field: 'translations' },
  ],
};

export const socialMediaChannels: CollectionDef = {
  name: 'social_media_channels',
  icon: 'share',
  group: 'Data',
  translatable: false,
  fields: [
    ...commonMeta,
    { field: 'name', type: 'string', interface: 'input', required: true },
    { field: 'external_link', type: 'string', interface: 'input' },
  ],
};

export const testimonials: CollectionDef = {
  name: 'testimonials',
  icon: 'format_quote',
  group: 'Data',
  translatable: true,
  translationFields: [
    { field: 'name', type: 'string', interface: 'input', required: true },
    { field: 'testimonial', type: 'json', interface: 'input-block-editor' },
  ],
  fields: [
    ...commonMeta,
    { field: 'timestamp', type: 'date', interface: 'datetime' },
    { field: 'thumbnail', type: 'uuid', interface: 'file-image' },
  ],
  relations: [
    { kind: 'm2o', field: 'thumbnail', relatedCollection: 'directus_files', onDelete: 'SET NULL' },
    { kind: 'translations', field: 'translations' },
  ],
};

/**
 * Contact form submissions land here instead of being emailed straight out:
 * the team triages them in Directus (kanban by status), and a Flow can notify
 * the assigned employee by mail. Public role gets create-only access.
 */
export const contactRequests: CollectionDef = {
  name: 'contact_requests',
  icon: 'inbox',
  color: '#E35169',
  group: 'Inbox',
  note: 'Inquiries submitted through the website contact form',
  translatable: false,
  fields: [
    {
      field: 'status',
      type: 'string',
      interface: 'select-dropdown',
      defaultValue: 'new',
      required: true,
      choices: [
        { text: 'New', value: 'new' },
        { text: 'In progress', value: 'in_progress' },
        { text: 'Done', value: 'done' },
      ],
      display: 'labels',
      displayOptions: {
        choices: [
          { text: 'New', value: 'new', background: '#E35169', foreground: '#FFFFFF' },
          { text: 'In progress', value: 'in_progress', background: '#4B9CD3', foreground: '#FFFFFF' },
          { text: 'Done', value: 'done', background: '#2ECDA7', foreground: '#FFFFFF' },
        ],
      },
    },
    { field: 'name', type: 'string', interface: 'input', required: true },
    { field: 'company', type: 'string', interface: 'input' },
    { field: 'email', type: 'string', interface: 'input', required: true },
    { field: 'phone', type: 'string', interface: 'input' },
    { field: 'message', type: 'text', interface: 'input-multiline', required: true },
    { field: 'page_url', type: 'string', interface: 'input', readonly: true, note: 'Page the form was submitted from' },
    { field: 'recipient', type: 'uuid', interface: 'select-dropdown-m2o', note: 'Employee responsible for this inquiry' },
    {
      field: 'date_created',
      type: 'dateTime',
      interface: 'datetime',
      readonly: true,
      special: ['date-created'],
    },
  ],
  relations: [{ kind: 'm2o', field: 'recipient', relatedCollection: 'employees', onDelete: 'SET NULL' }],
};

export const dataCollections: CollectionDef[] = [
  employees,
  brochures,
  downloads,
  fairs,
  jobAds,
  socialMediaChannels,
  testimonials,
  contactRequests,
];
