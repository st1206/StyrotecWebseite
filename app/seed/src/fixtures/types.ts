/**
 * Declarative fixture format for the seed engine (seed/src/index.ts).
 *
 * Value placeholders resolved by the engine:
 *   '@img:<key>'  → a generated/uploaded placeholder image (see images.ts)
 *   '@emp:<key>'  → the id of a seeded employee (fixtures/data.ts)
 */

export type Lang = 'de-DE' | 'en-US';

export interface ChildSpec {
  /** child collection, e.g. 'preview_cards' */
  collection: string;
  /** globally unique seed key */
  key: string;
  /** non-translated fields */
  values?: Record<string, unknown>;
  /** per-language translated fields */
  translations?: Partial<Record<Lang, Record<string, unknown>>>;
  /** nested children keyed by the o2m alias field on this child */
  children?: Record<string, ChildSpec[]>;
}

export interface BlockSpec {
  /** block collection, e.g. 'block_hero_carousel' */
  collection: string;
  /** globally unique seed key */
  key: string;
  values?: Record<string, unknown>;
  translations?: Partial<Record<Lang, Record<string, unknown>>>;
  /** children keyed by the o2m alias field on the block */
  children?: Record<string, ChildSpec[]>;
}

export interface PageSpec {
  status?: 'draft' | 'published';
  /** internal admin name, e.g. 'Startseite' */
  name?: string;
  /** URL path per language, without lang prefix ('' = homepage) */
  slug?: { de: string; en: string };
  /** machine category pages host machine detail routes under their slug */
  kind?: 'standard' | 'machine_category';
  /** '@cat:<key>' for machine category pages */
  category?: string;
  /** per-language SEO fields (seo_page_title, seo_page_description, seo_keywords) */
  seo: Partial<Record<Lang, Record<string, unknown>>>;
  /** ordered list of sections */
  sections: BlockSpec[];
}
