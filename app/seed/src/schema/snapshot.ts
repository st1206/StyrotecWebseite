import { writeFileSync } from 'node:fs';
import { directusAdmin, waitForDirectus, DIRECTUS_URL } from '../directus-client.js';

/**
 * Export the live Directus schema snapshot to cms/snapshots/schema.json.
 * Commit it for review/versioning; a production instance can be brought to the
 * same state with `npx directus schema apply` against this file.
 */
async function snapshot() {
  await waitForDirectus();
  const client = await directusAdmin();
  const token = await client.getToken();
  const res = await fetch(`${DIRECTUS_URL}/schema/snapshot`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`snapshot → ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as { data: unknown };

  const out = new URL('../../../cms/snapshots/schema.json', import.meta.url).pathname;
  writeFileSync(out, JSON.stringify(body.data, null, 2));
  console.log(`✔ Wrote ${out}`);
  process.exit(0);
}

snapshot().catch((err) => {
  console.error('✖ Snapshot failed:', err);
  process.exit(1);
});
