import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

/**
 * Server-side Directus access.
 *
 * Public pages are fetched WITHOUT authentication — the seed provisions a
 * public policy with read access to published content only, so drafts can
 * never leak here. Only the preview route uses the staff token to read drafts.
 */

const url = publicEnv.PUBLIC_DIRECTUS_URL ?? env.DIRECTUS_PUBLIC_URL ?? 'http://localhost:8055';
const email = env.DIRECTUS_ADMIN_EMAIL ?? '';
const password = env.DIRECTUS_ADMIN_PASSWORD ?? '';

export const DIRECTUS_URL = url;

export class DirectusError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function doFetch<T>(path: string, headers: Record<string, string> = {}, init?: RequestInit): Promise<T> {
  const res = await fetch(`${url}${path}`, { ...init, headers: { ...headers, ...(init?.headers ?? {}) } });
  if (!res.ok) {
    throw new DirectusError(res.status, `${init?.method ?? 'GET'} ${path.split('?')[0]} → ${res.status}: ${await res.text()}`);
  }
  // Creates by roles without read permission return an empty body (204)
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

/** Unauthenticated fetch — sees exactly what the public role sees. */
export function publicFetch<T = unknown>(path: string): Promise<T> {
  return doFetch<T>(path);
}

/** Anonymous create (contact form) — allowed by the public policy for contact_requests. */
export async function publicCreate<T = unknown>(collection: string, payload: Record<string, unknown>): Promise<T> {
  return doFetch<T>(`/items/${collection}`, { 'Content-Type': 'application/json' }, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── Staff access (preview only) ─────────────────────────────────────────────

let cachedToken: string | null = null;
let cachedTokenExpiry = 0;

async function staffToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedTokenExpiry) return cachedToken;
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = (await res.json()) as { data?: { access_token: string; expires: number } };
  if (!body.data?.access_token) throw new DirectusError(res.status, 'Directus staff login failed');
  cachedToken = body.data.access_token;
  cachedTokenExpiry = Date.now() + (body.data.expires ?? 900_000) - 30_000;
  return cachedToken;
}

/** Authenticated fetch for the preview route — sees drafts. Retries once on auth expiry races. */
export async function staffFetch<T = unknown>(path: string): Promise<T> {
  const token = await staffToken();
  try {
    return await doFetch<T>(path, { Authorization: `Bearer ${token}` });
  } catch (e) {
    if (e instanceof DirectusError && e.status === 401) {
      cachedToken = null;
      const fresh = await staffToken();
      return doFetch<T>(path, { Authorization: `Bearer ${fresh}` });
    }
    throw e;
  }
}

export { assetUrl, srcset } from '../assets.js';
