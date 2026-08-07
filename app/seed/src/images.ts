import { DIRECTUS_URL } from './directus-client.js';

/**
 * Placeholder image generation + upload.
 *
 * There is no exported media from the Strapi instance, so the seed generates
 * neutral, labeled SVG placeholders (industrial palette) and uploads them to
 * Directus. Content managers replace them with real photos in the Files
 * module — every image slot in the fixtures is a real `directus_files` row.
 *
 * Idempotency: files are looked up by title before uploading.
 */

interface ImageSpec {
  /** referenced from fixtures as '@img:<key>' */
  key: string;
  label: string;
  w?: number;
  h?: number;
  /** background/accent pair */
  colors?: [string, string];
}

const industrial: [string, string] = ['#1e293b', '#38bdf8'];
const steel: [string, string] = ['#334155', '#94a3b8'];
const foam: [string, string] = ['#0f172a', '#e2e8f0'];
const accent: [string, string] = ['#172554', '#fbbf24'];

function svgFor(spec: ImageSpec): string {
  const w = spec.w ?? 1600;
  const h = spec.h ?? 900;
  const [bg, fg] = spec.colors ?? industrial;
  const fontSize = Math.round(Math.min(w, h) / 14);
  // simple diagonal-lines texture + centered label
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <pattern id="p" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="56" height="56" fill="${bg}"/>
      <line x1="0" y1="0" x2="0" y2="56" stroke="${fg}" stroke-opacity="0.12" stroke-width="18"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  <rect x="${w * 0.06}" y="${h / 2 - fontSize}" width="${w * 0.88}" height="${fontSize * 2}" fill="${bg}" fill-opacity="0.72" rx="8"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="${fg}"
        font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="600">${spec.label}</text>
</svg>`;
}

export const imageSpecs: ImageSpec[] = [
  // Heroes
  { key: 'hero_home_1', label: 'Styrotec — Fertigung', colors: industrial },
  { key: 'hero_home_2', label: 'Portalfräsmaschine FS-Serie', colors: steel },
  { key: 'hero_home_3', label: 'Styroporbearbeitung', colors: foam },
  { key: 'hero_gantry_1', label: 'Portalfräsmaschine', colors: industrial },
  { key: 'hero_gantry_2', label: 'FS20 in Aktion', colors: steel },
  { key: 'hero_used_1', label: 'Gebrauchtmaschinen', colors: steel },
  { key: 'hero_used_2', label: 'Maschinenhalle', colors: industrial },
  { key: 'hero_career_1', label: 'Team Styrotec', colors: accent },
  { key: 'hero_news_1', label: 'Aktuelles', colors: industrial },
  { key: 'hero_service_1', label: 'Wartung & Service', colors: steel },
  { key: 'hero_service_2', label: 'Modernisierung', colors: industrial },
  { key: 'hero_styro_1', label: 'Styroporverarbeitung', colors: foam },
  { key: 'hero_styro_2', label: 'Formteile', colors: foam },
  { key: 'hero_press_1', label: 'Brikettierpresse', colors: steel },
  { key: 'hero_about', label: 'Über Styrotec', colors: accent, w: 1600, h: 900 },
  // Product/dual heroes
  { key: 'prod_fs10', label: 'FS10', colors: industrial, w: 1200, h: 900 },
  { key: 'prod_fs15', label: 'FS15', colors: industrial, w: 1200, h: 900 },
  { key: 'prod_fs20', label: 'FS20', colors: industrial, w: 1200, h: 900 },
  { key: 'prod_instock', label: 'Vorratsmaschine', colors: steel, w: 1200, h: 900 },
  { key: 'prod_styrospeed', label: 'Styrospeed HS', colors: accent, w: 1200, h: 900 },
  { key: 'prod_cutter_1', label: 'Schaftraspelfräser', colors: steel, w: 1200, h: 900 },
  { key: 'prod_cutter_2', label: 'Sonderfräser', colors: steel, w: 1200, h: 900 },
  { key: 'prod_tools', label: 'Fräswerkzeuge', colors: steel, w: 1200, h: 900 },
  { key: 'prod_spindle', label: 'Hohlfrässpindel', colors: industrial, w: 1200, h: 900 },
  { key: 'prod_suction', label: 'Absauganlage', colors: industrial, w: 1200, h: 900 },
  { key: 'prod_shredder', label: 'Zerkleinerer', colors: steel, w: 1200, h: 900 },
  { key: 'prod_raw', label: 'Rohmaterial', colors: foam, w: 1200, h: 900 },
  { key: 'prod_adhesive', label: 'Kleber', colors: foam, w: 1200, h: 900 },
  { key: 'prod_hybrid', label: 'Hybrid', colors: industrial, w: 1200, h: 900 },
  { key: 'prod_presses', label: 'Pressen', colors: steel, w: 1200, h: 900 },
  { key: 'prod_model', label: 'Modellbaumaschine', colors: steel, w: 1200, h: 900 },
  { key: 'prod_cnc', label: 'CNC-Fräsmaschine', colors: industrial, w: 1200, h: 900 },
  // Materials / industries
  { key: 'mat_metal', label: 'Metalle', colors: steel, w: 1000, h: 750 },
  { key: 'mat_plastic', label: 'Kunststoffe', colors: industrial, w: 1000, h: 750 },
  { key: 'mat_styro', label: 'Styropor', colors: foam, w: 1000, h: 750 },
  { key: 'ind_auto', label: 'Automotive', colors: industrial, w: 1000, h: 750 },
  { key: 'ind_aero', label: 'Luftfahrt', colors: steel, w: 1000, h: 750 },
  { key: 'ind_model', label: 'Modellbau', colors: accent, w: 1000, h: 750 },
  { key: 'ind_events', label: 'Messe & Event', colors: foam, w: 1000, h: 750 },
  // Machines (galleries)
  { key: 'machine_cnc_1', label: 'DMG Mori DMU 50', colors: industrial, w: 1200, h: 900 },
  { key: 'machine_cnc_1b', label: 'DMU 50 — Arbeitsraum', colors: steel, w: 1200, h: 900 },
  { key: 'machine_cnc_2', label: 'Hurco VM 30i', colors: industrial, w: 1200, h: 900 },
  { key: 'machine_cnc_3', label: 'Haas VF-2', colors: industrial, w: 1200, h: 900 },
  { key: 'machine_cnc_4', label: 'Mazak VTC-800', colors: industrial, w: 1200, h: 900 },
  { key: 'machine_cnc_5', label: 'Fanuc Robodrill', colors: industrial, w: 1200, h: 900 },
  { key: 'machine_conventional', label: 'Deckel FP4', colors: steel, w: 1200, h: 900 },
  { key: 'machine_lathe', label: 'Drehmaschine', colors: steel, w: 1200, h: 900 },
  { key: 'machine_milling', label: 'Fräsmaschine', colors: steel, w: 1200, h: 900 },
  { key: 'machine_grinding', label: 'Schleifmaschine', colors: steel, w: 1200, h: 900 },
  { key: 'machine_drilling', label: 'Bohrmaschine', colors: steel, w: 1200, h: 900 },
  { key: 'machine_saw', label: 'Säge', colors: steel, w: 1200, h: 900 },
  { key: 'machine_other', label: 'Sondermaschine', colors: steel, w: 1200, h: 900 },
  { key: 'machine_instock', label: 'FS15 Vorrat', colors: industrial, w: 1200, h: 900 },
  // People
  { key: 'emp_1', label: 'Julia Müller', colors: accent, w: 600, h: 600 },
  { key: 'emp_2', label: 'Thomas Weber', colors: accent, w: 600, h: 600 },
  { key: 'emp_3', label: 'Sabine Schmidt', colors: accent, w: 600, h: 600 },
  // Documents
  { key: 'doc_brochure', label: 'Broschüre (PDF)', colors: foam, w: 800, h: 1100 },
  { key: 'doc_datasheet', label: 'Datenblatt (PDF)', colors: foam, w: 800, h: 1100 },
  // History / misc
  { key: 'about_team', label: 'Unser Team', colors: accent, w: 1000, h: 750 },
  { key: 'about_hall', label: 'Fertigungshalle', colors: industrial, w: 1000, h: 750 },
];

const FOLDER_NAME = 'Seed placeholders';

async function ensureFolder(token: string): Promise<string | null> {
  const filter = encodeURIComponent(JSON.stringify({ name: { _eq: FOLDER_NAME } }));
  const res = await fetch(`${DIRECTUS_URL}/folders?filter=${filter}&limit=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const body = (await res.json()) as { data: Array<{ id: string }> };
    if (body.data.length > 0) return body.data[0].id;
  }
  const created = await fetch(`${DIRECTUS_URL}/folders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: FOLDER_NAME }),
  });
  if (!created.ok) return null;
  const body = (await created.json()) as { data: { id: string } };
  return body.data.id;
}

/** Upload all placeholder images (skipping ones that already exist); returns key → file id. */
export async function ensureImages(token: string): Promise<Record<string, string>> {
  const folder = await ensureFolder(token);
  const ids: Record<string, string> = {};

  for (const spec of imageSpecs) {
    const title = `seed:${spec.key}`;
    const filter = encodeURIComponent(JSON.stringify({ title: { _eq: title } }));
    const found = await fetch(`${DIRECTUS_URL}/files?filter=${filter}&limit=1&fields=id`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (found.ok) {
      const body = (await found.json()) as { data: Array<{ id: string }> };
      if (body.data.length > 0) {
        ids[spec.key] = body.data[0].id;
        continue;
      }
    }

    const form = new FormData();
    form.append('title', title);
    if (folder) form.append('folder', folder);
    form.append('file', new Blob([svgFor(spec)], { type: 'image/svg+xml' }), `${spec.key}.svg`);
    const res = await fetch(`${DIRECTUS_URL}/files`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (!res.ok) {
      throw new Error(`Image upload ${spec.key} failed: ${res.status} ${await res.text()}`);
    }
    const body = (await res.json()) as { data: { id: string } };
    ids[spec.key] = body.data.id;
  }

  return ids;
}
