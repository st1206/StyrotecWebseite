/**
 * Routing is DB-driven: pages live in the Directus `pages` collection and are
 * resolved by their per-language slug (see lib/server/fetch.ts). This module
 * only keeps the shared types + href helper used by nav/layout components.
 */

/** URL language prefix ('de', 'en', …) — driven by the Directus languages collection */
export type Lang = string;

export interface NavEntry {
  key: string;
  kind: string;
  slugs: Record<Lang, string>;
}

export type SlugMap = Record<string, NavEntry>;

/** Build a localized href for a page (by seed key) from the slug map. */
export function hrefFor(map: SlugMap | undefined, key: string, lang: Lang): string {
  const slug = map?.[key]?.slugs?.[lang];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}
