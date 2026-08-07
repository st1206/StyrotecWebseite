import { createDirectus, rest, authentication, staticToken } from '@directus/sdk';
import 'dotenv/config';

const url = process.env.DIRECTUS_PUBLIC_URL ?? 'http://localhost:8055';
const email = process.env.DIRECTUS_ADMIN_EMAIL ?? 'admin@styrotec.example.com';
const password = process.env.DIRECTUS_ADMIN_PASSWORD ?? 'changeme';

export async function directusAdmin() {
  const client = createDirectus(url).with(authentication('json')).with(rest());
  await client.login(email, password);
  return client;
}

export async function waitForDirectus(timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${url}/server/health`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Directus at ${url} did not become healthy within ${timeoutMs}ms`);
}

export const DIRECTUS_URL = url;
