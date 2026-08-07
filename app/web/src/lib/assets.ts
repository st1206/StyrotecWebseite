// Client-safe helpers for building Directus asset URLs (no secrets, no server-only imports).

const DIRECTUS_URL =
  (typeof import.meta !== 'undefined' && (import.meta.env as { PUBLIC_DIRECTUS_URL?: string })?.PUBLIC_DIRECTUS_URL) ||
  'http://localhost:8055';

export function assetUrl(
  id: string | null | undefined,
  opts?: {
    width?: number;
    height?: number;
    format?: 'webp' | 'jpg' | 'png' | 'avif';
    quality?: number;
    fit?: 'cover' | 'contain' | 'inside';
  },
) {
  if (!id) return null;
  const params = new URLSearchParams();
  if (opts?.width) params.set('width', String(opts.width));
  if (opts?.height) params.set('height', String(opts.height));
  if (opts?.format) params.set('format', opts.format);
  if (opts?.quality) params.set('quality', String(opts.quality));
  if (opts?.fit) params.set('fit', opts.fit);
  const q = params.toString();
  return `${DIRECTUS_URL}/assets/${id}${q ? `?${q}` : ''}`;
}

export function srcset(id: string | null | undefined, widths: number[] = [400, 800, 1200, 1600]) {
  if (!id) return null;
  return widths.map((w) => `${assetUrl(id, { width: w, format: 'webp' })} ${w}w`).join(', ');
}

export const DIRECTUS_ASSETS_BASE = DIRECTUS_URL;
