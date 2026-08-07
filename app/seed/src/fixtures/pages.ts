import type { BlockSpec, PageSpec } from './types.js';

/**
 * Page fixtures: every page singleton gets SEO + an ordered `sections` list
 * mirroring the structure of the old Strapi/SvelteKit site. Content is
 * realistic placeholder copy (DE + EN) — ready for content managers to refine.
 */

// ── Helpers ─────────────────────────────────────────────────────────────────

type DE = Record<string, unknown>;
type EN = Record<string, unknown>;

const tr = (de: DE, en: EN) => ({ 'de-DE': de, 'en-US': en });

function seo(deTitle: string, enTitle: string, deDesc: string, enDesc: string, keywords = 'Styrotec, Portalfräsmaschinen, Baienfurt') {
  return tr(
    { seo_page_title: `${deTitle} | STYROTEC`, seo_page_description: deDesc, seo_keywords: keywords },
    { seo_page_title: `${enTitle} | STYROTEC`, seo_page_description: enDesc, seo_keywords: keywords },
  );
}

/** Minimal Block-Editor document from plain paragraphs. */
function doc(...paragraphs: string[]) {
  return {
    type: 'doc',
    content: paragraphs.map((text) => ({ type: 'paragraph', content: [{ type: 'text', text }] })),
  };
}

function heroCarousel(key: string, images: string[], de: string, en: string, speed = 4000): BlockSpec {
  return {
    collection: 'block_hero_carousel',
    key,
    values: { carousel_speed: speed, images },
    translations: tr({ keyphrase: de }, { keyphrase: en }),
  };
}

function heroDual(
  key: string,
  image: string,
  de: { keyword: string; sub?: string; title?: string; subtitle?: string; content?: string },
  en: { keyword: string; sub?: string; title?: string; subtitle?: string; content?: string },
): BlockSpec {
  return {
    collection: 'block_hero_dual',
    key,
    values: { image },
    translations: tr(
      { keyword: de.keyword, sub_keyword: de.sub, title: de.title, subtitle: de.subtitle, content: de.content },
      { keyword: en.keyword, sub_keyword: en.sub, title: en.title, subtitle: en.subtitle, content: en.content },
    ),
  };
}

function textImage(
  key: string,
  image: string | null,
  de: { title: string; subtitle?: string; content: string },
  en: { title: string; subtitle?: string; content: string },
): BlockSpec {
  return {
    collection: 'block_text_image',
    key,
    values: image ? { image } : {},
    translations: tr(de, en),
  };
}

function pageHeader(key: string, de: { headline: string; description?: string }, en: { headline: string; description?: string }, anchor?: string): BlockSpec {
  return { collection: 'block_page_header', key, values: anchor ? { anchor } : {}, translations: tr(de, en) };
}

function uspList(key: string, items: Array<[string, string]>): BlockSpec {
  return {
    collection: 'block_usp_list',
    key,
    translations: tr(
      { items: items.map(([de]) => ({ name: de })) },
      { items: items.map(([, en]) => ({ name: en })) },
    ),
  };
}

interface PreviewCardSpec {
  key: string;
  thumbnail: string;
  /** page key ('@page:' ref is added automatically) */
  page: string;
  de: { title: string; content: string };
  en: { title: string; content: string };
}

function exploreMore(key: string, deTitle: string, enTitle: string, cards: PreviewCardSpec[], deDesc?: string, enDesc?: string): BlockSpec {
  return {
    collection: 'block_explore_more',
    key,
    translations: tr({ section_title: deTitle, description: deDesc }, { section_title: enTitle, description: enDesc }),
    children: {
      preview_cards: cards.map((c) => ({
        collection: 'preview_cards',
        key: c.key,
        values: { thumbnail: c.thumbnail, target_page: `@page:${c.page}` },
        translations: tr(
          { title: c.de.title, content: c.de.content, cta_text: 'Mehr erfahren' },
          { title: c.en.title, content: c.en.content, cta_text: 'Learn more' },
        ),
      })),
    },
  };
}

interface VariantSpec {
  key: string;
  image: string;
  de: string;
  en: string;
  /** [label, value, enLabel?] — ONE spec list per card (flat by design) */
  lines: Array<[string, string, string?]>;
  specTitle?: [string, string];
}

function exploreVariants(key: string, deTitle: string, enTitle: string, variants: VariantSpec[]): BlockSpec {
  return {
    collection: 'block_explore_variants',
    key,
    translations: tr({ section_title: deTitle }, { section_title: enTitle }),
    children: {
      variant_cards: variants.map((v) => ({
        collection: 'variant_cards',
        key: v.key,
        values: { image: v.image },
        translations: tr(
          {
            title: v.de,
            spec_title: v.specTitle?.[0] ?? 'Technische Daten',
            rows: v.lines.map(([label, value]) => ({ label, value })),
          },
          {
            title: v.en,
            spec_title: v.specTitle?.[1] ?? 'Technical data',
            rows: v.lines.map(([label, value, enLabel]) => ({ label: enLabel ?? label, value })),
          },
        ),
      })),
    },
  };
}

function historyBlock(key: string, deTitle: string, enTitle: string, entries: Array<{ key: string; year: number; de: [string, string]; en: [string, string] }>): BlockSpec {
  return {
    collection: 'block_history',
    key,
    translations: tr({ section_title: deTitle }, { section_title: enTitle }),
    children: {
      entries: entries.map((e) => ({
        collection: 'history_entries',
        key: e.key,
        values: { year: e.year },
        translations: tr({ title: e.de[0], description: e.de[1] }, { title: e.en[0], description: e.en[1] }),
      })),
    },
  };
}

interface CardSpec {
  key: string;
  thumbnail?: string;
  /** optional page-link button: page key + label per language */
  button?: { page: string; de: string; en: string };
  de: { title: string; content: string };
  en: { title: string; content: string };
}

function defaultCards(key: string, deTitle: string, enTitle: string, cards: CardSpec[], opts: { dark?: boolean; deDesc?: string; enDesc?: string } = {}): BlockSpec {
  return {
    collection: 'block_default_cards',
    key,
    values: { is_dark_mode: opts.dark ?? false },
    translations: tr({ section_title: deTitle, description: opts.deDesc }, { section_title: enTitle, description: opts.enDesc }),
    children: {
      cards: cards.map((c) => ({
        collection: 'default_cards',
        key: c.key,
        values: {
          ...(c.thumbnail ? { thumbnail: c.thumbnail } : {}),
          ...(c.button ? { target_page: `@page:${c.button.page}` } : {}),
        },
        translations: tr(
          { title: c.de.title, content: c.de.content, button_label: c.button?.de },
          { title: c.en.title, content: c.en.content, button_label: c.button?.en },
        ),
      })),
    },
  };
}

function collectionList(
  key: string,
  source: string,
  display: string,
  deTitle?: string,
  enTitle?: string,
  deDesc?: string,
  enDesc?: string,
  categoryRef?: string,
): BlockSpec {
  return {
    collection: 'block_collection_list',
    key,
    values: { source, display, ...(categoryRef ? { machine_category: categoryRef } : {}) },
    translations: deTitle
      ? tr({ section_title: deTitle, description: deDesc }, { section_title: enTitle, description: enDesc })
      : undefined,
  };
}

/** machine grid limited to one category */
function machineList(key: string, categoryKey: string): BlockSpec {
  return collectionList(key, 'machines', 'machine_grid', undefined, undefined, undefined, undefined, `@cat:${categoryKey}`);
}

let contactRotation = 0;
function contactForm(key: string, emp?: string): BlockSpec {
  const fallback = ['@emp:emp_1', '@emp:emp_2', '@emp:emp_3'][contactRotation++ % 3];
  return { collection: 'block_contact_form', key, values: { employee: emp ?? fallback } };
}

function contentHeader(key: string, de: { title: string; description?: string }, en: { title: string; description?: string }, dark = false): BlockSpec {
  return {
    collection: 'block_content_header',
    key,
    values: { is_dark_mode: dark },
    translations: tr({ section_title: de.title, description: de.description }, { section_title: en.title, description: en.description }),
  };
}

function contentTextImage(
  key: string,
  de: { title?: string; paragraphs: string[] },
  en: { title?: string; paragraphs: string[] },
  opts: { image?: string; position?: string; size?: string; dark?: boolean } = {},
): BlockSpec {
  return {
    collection: 'block_content_text_image',
    key,
    values: {
      ...(opts.image ? { image: opts.image } : {}),
      image_position: opts.position ?? 'right',
      image_size: opts.size ?? 'md',
      is_dark_mode: opts.dark ?? false,
    },
    translations: tr(
      { title: de.title, content: doc(...de.paragraphs) },
      { title: en.title, content: doc(...en.paragraphs) },
    ),
  };
}

function contentAccordion(
  key: string,
  deTitle: string,
  enTitle: string,
  items: Array<{ key: string; de: [string, string]; en: [string, string]; image?: string }>,
): BlockSpec {
  return {
    collection: 'block_content_accordion',
    key,
    translations: tr({ title: deTitle }, { title: enTitle }),
    children: {
      items: items.map((i) => ({
        collection: 'accordion_items',
        key: i.key,
        values: i.image ? { image: i.image } : {},
        translations: tr({ title: i.de[0], description: i.de[1] }, { title: i.en[0], description: i.en[1] }),
      })),
    },
  };
}

function contentTable(
  key: string,
  tables: Array<{ key: string; de: string; en: string; rows: Array<[string, string, string?]> }>,
): BlockSpec {
  return {
    collection: 'block_content_table',
    key,
    children: {
      tables: tables.map((t) => ({
        collection: 'table_defs',
        key: t.key,
        translations: tr(
          { title: t.de, rows: t.rows.map(([label, value]) => ({ label, value })) },
          { title: t.en, rows: t.rows.map(([label, value, enLabel]) => ({ label: enLabel ?? label, value })) },
        ),
      })),
    },
  };
}

function spacer(key: string, height: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md', separator = false): BlockSpec {
  return { collection: 'block_spacer', key, values: { height, with_separator_line: separator } };
}

// ── Shared section builders ────────────────────────────────────────────────

/** Machine category page: hero/page header + machine grid + contact form. */
function machineCategoryPage(
  prefix: string,
  categoryKey: string,
  de: { title: string; desc: string },
  en: { title: string; desc: string },
): PageSpec {
  return {
    kind: 'machine_category',
    category: `@cat:${categoryKey}`,
    seo: seo(de.title, en.title, de.desc, en.desc, `Styrotec, Gebrauchtmaschinen, ${de.title}`),
    sections: [
      pageHeader(`${prefix}_header`, { headline: de.title, description: de.desc }, { headline: en.title, description: en.desc }),
      machineList(`${prefix}_list`, categoryKey),
      contactForm(`${prefix}_contact`),
    ],
  };
}

/** FS-series product page: dual hero + variants + options accordion + data table + contact. */
function fsPage(model: 'fs10' | 'fs15' | 'fs20', travel: [string, string, string], footprint: string, spindle: string): PageSpec {
  const name = model.toUpperCase();
  return {
    seo: seo(
      `Portalfräsmaschine ${name}`,
      `Gantry mill ${name}`,
      `Die ${name} ist unsere Portalfräsmaschine für die präzise Bearbeitung großformatiger Werkstücke aus Styropor, Kunststoff und Leichtmetall.`,
      `The ${name} is our gantry milling machine for precise machining of large-format workpieces in styrofoam, plastics and light metals.`,
      `Styrotec, ${name}, Portalfräsmaschine, gantry mill`,
    ),
    sections: [
      heroDual(
        `${model}_hero`,
        `@img:prod_${model}`,
        { keyword: name, sub: 'Portalfräsmaschine', title: `Die ${name} im Überblick`, content: `Die ${name} vereint hohe Verfahrgeschwindigkeiten mit maximaler Präzision — entwickelt und gefertigt in Baienfurt.` },
        { keyword: name, sub: 'Gantry milling machine', title: `The ${name} at a glance`, content: `The ${name} combines high traverse speeds with maximum precision — engineered and built in Baienfurt.` },
      ),
      exploreVariants(`${model}_variants`, 'Varianten', 'Variants', [
        {
          key: `${model}_variant_standard`,
          image: `@img:prod_${model}`,
          de: `${name} Standard`,
          en: `${name} Standard`,
          lines: [
            ['Verfahrweg X', travel[0], 'Travel X'],
            ['Verfahrweg Y', travel[1], 'Travel Y'],
            ['Verfahrweg Z', travel[2], 'Travel Z'],
            ['Frässpindel', spindle, 'Milling spindle'],
            ['Steuerung', 'Siemens Sinumerik One', 'Control system'],
          ],
        },
        {
          key: `${model}_variant_hybrid`,
          image: '@img:prod_hybrid',
          de: `${name} Hybrid`,
          en: `${name} Hybrid`,
          lines: [
            ['Verfahrweg X', travel[0], 'Travel X'],
            ['Verfahrweg Y', travel[1], 'Travel Y'],
            ['Verfahrweg Z', travel[2], 'Travel Z'],
            ['Zusatzaggregat', 'Heißdraht-Einheit', 'Additional unit'],
            ['Steuerung', 'Siemens Sinumerik One', 'Control system'],
          ],
        },
      ]),
      contentAccordion(`${model}_options`, 'Optionen & Ausstattung', 'Options & equipment', [
        { key: `${model}_opt_suction`, de: ['Absaugung', 'Integrierte Absauganlage für staubarmes Arbeiten bei der Styropor- und Kunststoffbearbeitung.'], en: ['Suction system', 'Integrated suction system for low-dust machining of styrofoam and plastics.'] },
        { key: `${model}_opt_tools`, de: ['Werkzeugwechsler', 'Automatischer Werkzeugwechsler mit bis zu 12 Plätzen für unterbrechungsfreie Bearbeitung.'], en: ['Tool changer', 'Automatic tool changer with up to 12 stations for uninterrupted machining.'] },
        { key: `${model}_opt_table`, de: ['Aufspannsysteme', 'Vakuum- und Rastertische für die flexible Aufspannung unterschiedlichster Werkstücke.'], en: ['Clamping systems', 'Vacuum and grid tables for flexible clamping of a wide range of workpieces.'] },
      ]),
      contentTable(`${model}_table`, [
        {
          key: `${model}_table_geo`,
          de: 'Geometrie',
          en: 'Geometry',
          rows: [
            ['Verfahrweg X', travel[0], 'Travel X'],
            ['Verfahrweg Y', travel[1], 'Travel Y'],
            ['Verfahrweg Z', travel[2], 'Travel Z'],
            ['Aufstellfläche', footprint, 'Footprint'],
          ],
        },
        {
          key: `${model}_table_drive`,
          de: 'Antrieb',
          en: 'Drive',
          rows: [
            ['Frässpindel', spindle, 'Milling spindle'],
            ['Vorschub max.', '60 m/min', 'Feed rate max.'],
            ['Steuerung', 'Siemens Sinumerik One', 'Control system'],
          ],
        },
      ]),
      contactForm(`${model}_contact`, '@emp:emp_2'),
    ],
  };
}

/** Simple product page: dual hero + content + contact. */
function productPage(
  prefix: string,
  image: string,
  de: { keyword: string; sub?: string; title: string; desc: string; paragraphs: string[] },
  en: { keyword: string; sub?: string; title: string; desc: string; paragraphs: string[] },
  extraSections: BlockSpec[] = [],
): PageSpec {
  return {
    seo: seo(de.title, en.title, de.desc, en.desc),
    sections: [
      heroDual(`${prefix}_hero`, image, { keyword: de.keyword, sub: de.sub, title: de.title, content: de.desc }, { keyword: en.keyword, sub: en.sub, title: en.title, content: en.desc }),
      contentTextImage(`${prefix}_content`, { title: de.title, paragraphs: de.paragraphs }, { title: en.title, paragraphs: en.paragraphs }, { image, size: 'lg' }),
      ...extraSections,
      contactForm(`${prefix}_contact`),
    ],
  };
}

// ── Pages ───────────────────────────────────────────────────────────────────

const pages: Record<string, PageSpec> = {
  homepage: {
    seo: seo(
      'Präzision in Serie',
      'Precision in series',
      'STYROTEC aus Baienfurt: Portalfräsmaschinen, Styroporbearbeitung, Gebrauchtmaschinen und Dienstleistungen rund um Ihre Fertigung.',
      'STYROTEC from Baienfurt: gantry milling machines, styrofoam processing, used machinery and services for your production.',
    ),
    sections: [
      heroCarousel('home_hero', ['@img:hero_home_1', '@img:hero_home_2', '@img:hero_home_3'], 'Präzision in Serie.', 'Precision in series.'),
      textImage(
        'home_intro',
        '@img:about_hall',
        { title: 'Maschinenbau aus Baienfurt', subtitle: 'Seit über 30 Jahren', content: 'STYROTEC entwickelt und fertigt Portalfräsmaschinen, bearbeitet Styropor in Serie und handelt mit geprüften Gebrauchtmaschinen. Von der Konstruktion bis zum Service — alles aus einer Hand.' },
        { title: 'Machine engineering from Baienfurt', subtitle: 'For over 30 years', content: 'STYROTEC develops and builds gantry milling machines, processes styrofoam in series and trades in certified used machinery. From design to service — everything from a single source.' },
      ),
      uspList('home_usps', [
        ['Eigene Entwicklung und Fertigung in Deutschland', 'In-house development and production in Germany'],
        ['Über 30 Jahre Branchenerfahrung', 'More than 30 years of industry experience'],
        ['Geprüfte Gebrauchtmaschinen mit Gewährleistung', 'Certified used machines with warranty'],
        ['Service, Wartung und Modernisierung', 'Service, maintenance and modernization'],
      ]),
      exploreMore('home_explore', 'Unsere Bereiche', 'What we do', [
        { key: 'home_explore_gantry', thumbnail: '@img:hero_gantry_1', page: 'gantry_machines_page', de: { title: 'Portalfräsmaschinen', content: 'FS10, FS15 und FS20 — Präzision für große Werkstücke.' }, en: { title: 'Gantry mills', content: 'FS10, FS15 and FS20 — precision for large workpieces.' } },
        { key: 'home_explore_used', thumbnail: '@img:hero_used_1', page: 'used_machines_page', de: { title: 'Gebrauchtmaschinen', content: 'Geprüfte CNC- und konventionelle Maschinen ab Lager.' }, en: { title: 'Used machines', content: 'Certified CNC and conventional machines from stock.' } },
        { key: 'home_explore_styro', thumbnail: '@img:hero_styro_1', page: 'styrofoam_processing_page', de: { title: 'Styroporbearbeitung', content: 'Formteile und Prototypen aus EPS — gefräst statt geschäumt.' }, en: { title: 'Styrofoam processing', content: 'Molded parts and prototypes in EPS — milled, not foamed.' } },
        { key: 'home_explore_service', thumbnail: '@img:hero_service_1', page: 'machine_maintenance_page', de: { title: 'Dienstleistungen', content: 'Erhaltung, Modernisierung und Vermarktung Ihrer Maschinen.' }, en: { title: 'Services', content: 'Maintenance, modernization and marketing of your machines.' } },
      ]),
      collectionList('home_testimonials', 'testimonials', 'testimonials', 'Das sagen unsere Kunden', 'What our customers say'),
      contactForm('home_contact', '@emp:emp_1'),
    ],
  },

  about_us_page: {
    seo: seo('Über uns', 'About us', 'STYROTEC ist ein familiengeführtes Maschinenbauunternehmen aus Baienfurt — lernen Sie unser Team und unsere Geschichte kennen.', 'STYROTEC is a family-run machine engineering company from Baienfurt — meet our team and our history.'),
    sections: [
      {
        collection: 'block_hero_media',
        key: 'about_hero',
        values: { media: '@img:hero_about' },
        translations: tr(
          { title: 'Über uns', description: 'Familienunternehmen, Maschinenbauer, Partner — seit drei Generationen.' },
          { title: 'About us', description: 'Family business, machine builders, partners — for three generations.' },
        ),
        children: {
          image_cards: [
            { collection: 'image_cards', key: 'about_card_emp1', values: { employee: '@emp:emp_1', image: '@img:emp_1' }, translations: tr({ title: 'Julia Müller', subtitle: 'Vertriebsleitung' }, { title: 'Julia Müller', subtitle: 'Head of Sales' }) },
            { collection: 'image_cards', key: 'about_card_emp2', values: { employee: '@emp:emp_2', image: '@img:emp_2' }, translations: tr({ title: 'Thomas Weber', subtitle: 'Technische Leitung' }, { title: 'Thomas Weber', subtitle: 'Technical Director' }) },
            { collection: 'image_cards', key: 'about_card_emp3', values: { employee: '@emp:emp_3', image: '@img:emp_3' }, translations: tr({ title: 'Sabine Schmidt', subtitle: 'Kundenbetreuung' }, { title: 'Sabine Schmidt', subtitle: 'Customer Success' }) },
          ],
        },
      },
      historyBlock('about_history', 'Unsere Geschichte', 'Our history', [
        { key: 'about_history_1989', year: 1989, de: ['Gründung', 'Start als Zwei-Mann-Werkstatt für Sonderfräser in Baienfurt.'], en: ['Founding', 'Started as a two-man workshop for special milling cutters in Baienfurt.'] },
        { key: 'about_history_1997', year: 1997, de: ['Erste Portalfräsmaschine', 'Entwicklung und Auslieferung der ersten eigenen Portalfräsmaschine.'], en: ['First gantry mill', 'Development and delivery of the first in-house gantry milling machine.'] },
        { key: 'about_history_2008', year: 2008, de: ['Neue Fertigungshalle', 'Erweiterung um 2.400 m² Produktionsfläche am Standort Baienfurt.'], en: ['New production hall', 'Expansion by 2,400 m² of production space at the Baienfurt site.'] },
        { key: 'about_history_2016', year: 2016, de: ['FS-Serie', 'Marktstart der Baureihe FS10/FS15/FS20 mit Siemens-Steuerung.'], en: ['FS series', 'Market launch of the FS10/FS15/FS20 series with Siemens control.'] },
        { key: 'about_history_2024', year: 2024, de: ['Digitalisierung', 'Vernetzte Fertigung und Ausbau des Gebrauchtmaschinenhandels.'], en: ['Digitalization', 'Connected production and expansion of the used machinery business.'] },
      ]),
      defaultCards('about_values', 'Unsere Werte', 'Our values', [
        { key: 'about_values_quality', thumbnail: '@img:about_hall', de: { title: 'Qualität', content: 'Jede Maschine durchläuft vor der Auslieferung eine vollständige Geometrie- und Funktionsprüfung.' }, en: { title: 'Quality', content: 'Every machine undergoes a full geometry and function check before delivery.' } },
        { key: 'about_values_reliability', thumbnail: '@img:hero_service_1', de: { title: 'Verlässlichkeit', content: 'Feste Ansprechpartner, kurze Wege und Ersatzteilversorgung über Jahrzehnte.' }, en: { title: 'Reliability', content: 'Dedicated contacts, short response times and spare parts supply for decades.' } },
      ]),
      pageHeader('about_team_header', { headline: 'Unser Team', description: 'Erfahrung trifft junge Talente — rund 40 Mitarbeiterinnen und Mitarbeiter.' }, { headline: 'Our team', description: 'Experience meets young talent — around 40 employees.' }),
      contentTextImage(
        'about_team_content',
        { paragraphs: ['Vom Zerspanungsmechaniker bis zur Anwendungstechnikerin: Bei STYROTEC arbeiten Menschen, die Maschinenbau leben. Wir bilden selbst aus und übernehmen unsere Azubis in der Regel unbefristet.'] },
        { paragraphs: ['From machining specialists to application engineers: the people at STYROTEC live and breathe mechanical engineering. We train our own apprentices and usually retain them permanently.'] },
        { image: '@img:about_team', position: 'left', size: 'lg' },
      ),
      contactForm('about_contact', '@emp:emp_3'),
    ],
  },

  industries_page: {
    seo: seo('Branchen', 'Industries', 'Automotive, Luftfahrt, Modellbau, Messebau: Branchen, in denen STYROTEC Maschinen und Formteile im Einsatz sind.', 'Automotive, aerospace, model making, trade fairs: industries relying on STYROTEC machines and molded parts.'),
    sections: [
      pageHeader('industries_header', { headline: 'Branchen', description: 'Unsere Maschinen und Formteile sind in vielen Industrien zu Hause.' }, { headline: 'Industries', description: 'Our machines and molded parts are at home in many industries.' }),
      defaultCards('industries_cards', 'Anwendungsbereiche', 'Application areas', [
        { key: 'industries_auto', thumbnail: '@img:ind_auto', de: { title: 'Automotive', content: 'Design- und Datenkontrollmodelle, Lehren und Vorrichtungen für Fahrzeughersteller und Zulieferer.' }, en: { title: 'Automotive', content: 'Design and data control models, gauges and fixtures for vehicle manufacturers and suppliers.' } },
        { key: 'industries_aero', thumbnail: '@img:ind_aero', de: { title: 'Luft- und Raumfahrt', content: 'Großformatige Leichtbau-Formen und Positivmodelle für Faserverbund-Bauteile.' }, en: { title: 'Aerospace', content: 'Large-format lightweight molds and plugs for fiber composite components.' } },
        { key: 'industries_model', thumbnail: '@img:ind_model', button: { page: 'model_construction_machines_page', de: 'Modellbaumaschinen', en: 'Model construction machines' }, de: { title: 'Modell- und Formenbau', content: 'Präzise gefräste Urmodelle aus Styropor, Ureol und Kunststoff.' }, en: { title: 'Model and mold making', content: 'Precision-milled master models in styrofoam, ureol and plastics.' } },
        { key: 'industries_events', thumbnail: '@img:ind_events', de: { title: 'Messe- und Eventbau', content: '3D-Logos, Skulpturen und Kulissen aus EPS — schnell und wirtschaftlich gefräst.' }, en: { title: 'Trade fair and events', content: '3D logos, sculptures and scenery in EPS — milled quickly and economically.' } },
      ]),
    ],
  },

  career: {
    seo: seo('Karriere', 'Career', 'Offene Stellen und Ausbildung bei STYROTEC in Baienfurt — werden Sie Teil unseres Teams.', 'Open positions and apprenticeships at STYROTEC in Baienfurt — join our team.'),
    sections: [
      heroCarousel('career_hero', ['@img:hero_career_1', '@img:about_team'], 'Wachsen Sie mit uns.', 'Grow with us.', 4500),
      pageHeader('career_openings_header', { headline: 'Offene Stellen', description: 'Aktuelle Ausschreibungen — bewerben Sie sich direkt bei uns.' }, { headline: 'Open positions', description: 'Current openings — apply directly with us.' }),
      collectionList('career_jobs', 'job_ads', 'job_ads'),
      pageHeader('career_training_header', { headline: 'Ausbildung', description: 'Wir bilden Industriemechaniker (m/w/d) und Zerspanungsmechaniker (m/w/d) aus. Übernahme nach der Ausbildung ist bei uns die Regel.' }, { headline: 'Apprenticeships', description: 'We train industrial mechanics and machining specialists. Permanent employment after the apprenticeship is the norm here.' }),
      contactForm('career_contact', '@emp:emp_3'),
    ],
  },

  news_page: {
    seo: seo('Aktuelles', 'News', 'Neuigkeiten, Messetermine und Downloads von STYROTEC.', 'News, trade fair dates and downloads from STYROTEC.'),
    sections: [
      heroCarousel('news_hero', ['@img:hero_news_1'], 'Aktuelles', 'News'),
      pageHeader('news_fairs_header', { headline: 'Messen', description: 'Treffen Sie uns auf diesen Veranstaltungen.' }, { headline: 'Trade fairs', description: 'Meet us at these events.' }),
      collectionList('news_fairs', 'fairs', 'fairs'),
      pageHeader('news_downloads_header', { headline: 'Downloads', description: 'Datenblätter und Unterlagen zum Herunterladen.' }, { headline: 'Downloads', description: 'Datasheets and documents for download.' }),
      collectionList('news_downloads', 'downloads', 'downloads'),
      collectionList('news_brochures', 'brochures', 'brochures', 'Prospekte', 'Brochures'),
    ],
  },

  legal_notice_page: {
    seo: seo('Impressum', 'Legal notice', 'Impressum der STYROTEC GmbH & Co. KG.', 'Legal notice of STYROTEC GmbH & Co. KG.'),
    sections: [
      pageHeader('legal_header', { headline: 'Impressum' }, { headline: 'Legal notice' }),
      contentTextImage(
        'legal_provider',
        { title: 'Angaben gemäß § 5 TMG', paragraphs: ['STYROTEC GmbH & Co. KG, Kartonstraße 2, 88255 Baienfurt.', 'Vertreten durch die Geschäftsführung. Telefon: +49 751 56050-20, E-Mail: info@styrotec.com.', 'Registergericht: Amtsgericht Ulm. Umsatzsteuer-ID gemäß § 27a UStG: DE 000000000 (Platzhalter).'] },
        { title: 'Information pursuant to § 5 TMG', paragraphs: ['STYROTEC GmbH & Co. KG, Kartonstraße 2, 88255 Baienfurt, Germany.', 'Represented by the management. Phone: +49 751 56050-20, email: info@styrotec.com.', 'Commercial register: Amtsgericht Ulm. VAT ID pursuant to § 27a UStG: DE 000000000 (placeholder).'] },
      ),
      contentTextImage(
        'legal_liability',
        { title: 'Haftung für Inhalte', paragraphs: ['Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für fremde Inhalte übernehmen wir keine Gewähr; verantwortlich ist stets der jeweilige Anbieter.'] },
        { title: 'Liability for content', paragraphs: ['As a service provider we are responsible for our own content on these pages in accordance with general law. We accept no liability for third-party content; the respective provider remains responsible.'] },
      ),
    ],
  },

  privacy_policy_page: {
    seo: seo('Datenschutz', 'Privacy policy', 'Datenschutzerklärung der STYROTEC GmbH & Co. KG.', 'Privacy policy of STYROTEC GmbH & Co. KG.'),
    sections: [
      pageHeader('privacy_header', { headline: 'Datenschutzerklärung' }, { headline: 'Privacy policy' }),
      contentTextImage(
        'privacy_general',
        { title: 'Datenschutz auf einen Blick', paragraphs: ['Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.', 'Verantwortliche Stelle ist die STYROTEC GmbH & Co. KG, Kartonstraße 2, 88255 Baienfurt.'] },
        { title: 'Privacy at a glance', paragraphs: ['We treat your personal data confidentially and in accordance with statutory data protection regulations (GDPR) and this privacy policy.', 'The responsible party is STYROTEC GmbH & Co. KG, Kartonstraße 2, 88255 Baienfurt, Germany.'] },
      ),
      contentTextImage(
        'privacy_forms',
        { title: 'Kontaktformular', paragraphs: ['Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.'] },
        { title: 'Contact form', paragraphs: ['If you send us inquiries via the contact form, your details are stored for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent.'] },
      ),
    ],
  },

  // Machine category pages
  cnc_mills_page: {
    seo: seo('CNC-Fräsmaschinen', 'CNC milling machines', 'Gebrauchte und überholte CNC-Fräsmaschinen: 3- bis 5-Achs-Bearbeitungszentren namhafter Hersteller, geprüft und einsatzbereit.', 'Used and overhauled CNC milling machines: 3- to 5-axis machining centers from renowned manufacturers, inspected and ready for use.'),
    sections: [
      heroDual(
        'cnc_mills_hero',
        '@img:prod_cnc',
        { keyword: 'Präzision', sub: 'in jeder Achse', title: 'CNC-Fräsmaschinen', subtitle: 'Auswahl geprüfter Maschinen', content: 'Unsere CNC-Fräsmaschinen stammen aus geprüften Beständen. Wir bieten 3-Achs- bis 5-Achs-Systeme namhafter Hersteller — inspiziert, gewartet und mit Gewährleistung.' },
        { keyword: 'Precision', sub: 'on every axis', title: 'CNC milling machines', subtitle: 'A curated selection', content: 'Our CNC mills come from vetted stock. We offer 3-axis to 5-axis systems from established manufacturers — inspected, serviced and covered by warranty.' },
      ),
      machineList('cnc_mills_list', 'cnc_mills'),
      contactForm('cnc_mills_contact', '@emp:emp_2'),
    ],
  },
  conventional_mills_page: machineCategoryPage('conventional_mills', 'conventional_mills', { title: 'Konventionelle Fräsen', desc: 'Bewährte konventionelle Fräsmaschinen für Werkstatt und Ausbildung.' }, { title: 'Conventional mills', desc: 'Proven conventional milling machines for workshop and training.' }),
  lathes_page: machineCategoryPage('lathes', 'lathes', { title: 'Drehmaschinen', desc: 'Gebrauchte Drehmaschinen — von der Werkzeugmacher- bis zur Produktionsdrehmaschine.' }, { title: 'Lathes', desc: 'Used lathes — from toolroom to production machines.' }),
  milling_machines_page: machineCategoryPage('milling_machines', 'milling_machines', { title: 'Fräsmaschinen', desc: 'Konsolen- und Werkzeugfräsmaschinen aus geprüftem Bestand.' }, { title: 'Milling machines', desc: 'Knee-type and tool milling machines from certified stock.' }),
  grinding_machines_page: machineCategoryPage('grinding_machines', 'grinding_machines', { title: 'Schleifmaschinen', desc: 'Flach- und Rundschleifmaschinen für höchste Oberflächengüten.' }, { title: 'Grinding machines', desc: 'Surface and cylindrical grinders for premium surface finishes.' }),
  drilling_machines_page: machineCategoryPage('drilling_machines', 'drilling_machines', { title: 'Bohrmaschinen', desc: 'Säulen- und Radialbohrmaschinen für Werkstatt und Serie.' }, { title: 'Drilling machines', desc: 'Column and radial drilling machines for workshop and production.' }),
  saws_page: machineCategoryPage('saws', 'saws', { title: 'Sägen', desc: 'Band- und Kreissägen für Metall — sofort verfügbar.' }, { title: 'Saws', desc: 'Band and circular saws for metal — available immediately.' }),
  other_machines_page: machineCategoryPage('other_machines', 'other_machines', { title: 'Sonstige Maschinen', desc: 'Pressen, Scheren, Sondermaschinen und mehr aus unserem Bestand.' }, { title: 'Other machines', desc: 'Presses, shears, special-purpose machines and more from our stock.' }),

  instock_page: {
    seo: seo('Vorratsmaschinen', 'In-stock machines', 'Sofort verfügbare Portalfräsmaschinen aus unserem Vorrat — kurzfristig lieferbar und eingefahren.', 'Gantry mills from stock — available at short notice, run-in and ready.'),
    sections: [
      heroDual(
        'instock_hero',
        '@img:prod_instock',
        { keyword: 'Sofort', sub: 'verfügbar', title: 'Vorratsmaschinen', content: 'Portalfräsmaschinen aus dem Bestand: eingefahren, geprüft und kurzfristig lieferbar.' },
        { keyword: 'Available', sub: 'right now', title: 'In-stock machines', content: 'Gantry mills from stock: run-in, inspected and ready for short-term delivery.' },
      ),
      machineList('instock_list', 'instock_machines'),
      contactForm('instock_contact', '@emp:emp_2'),
    ],
  },

  used_machines_page: {
    seo: seo('Gebrauchtmaschinen', 'Used machines', 'Geprüfte Gebrauchtmaschinen aller Kategorien: CNC-Fräsen, Drehmaschinen, Schleifmaschinen, Sägen und mehr.', 'Certified used machines of all categories: CNC mills, lathes, grinders, saws and more.'),
    sections: [
      heroCarousel('used_hero', ['@img:hero_used_1', '@img:hero_used_2'], 'Gebrauchtmaschinen mit Gewährleistung', 'Used machines with warranty'),
      exploreMore('used_explore', 'Alle Kategorien', 'All categories', [
        { key: 'used_explore_cnc', thumbnail: '@img:prod_cnc', page: 'cnc_mills_page', de: { title: 'CNC-Fräsmaschinen', content: '3- bis 5-Achs-Bearbeitungszentren.' }, en: { title: 'CNC milling machines', content: '3- to 5-axis machining centers.' } },
        { key: 'used_explore_conventional', thumbnail: '@img:machine_conventional', page: 'conventional_mills_page', de: { title: 'Konventionelle Fräsen', content: 'Bewährte Werkstattmaschinen.' }, en: { title: 'Conventional mills', content: 'Proven workshop machines.' } },
        { key: 'used_explore_lathes', thumbnail: '@img:machine_lathe', page: 'lathes_page', de: { title: 'Drehmaschinen', content: 'Werkzeugmacher- und Produktionsdrehmaschinen.' }, en: { title: 'Lathes', content: 'Toolroom and production lathes.' } },
        { key: 'used_explore_milling', thumbnail: '@img:machine_milling', page: 'milling_machines_page', de: { title: 'Fräsmaschinen', content: 'Konsolen- und Werkzeugfräsmaschinen.' }, en: { title: 'Milling machines', content: 'Knee-type and tool milling machines.' } },
        { key: 'used_explore_grinding', thumbnail: '@img:machine_grinding', page: 'grinding_machines_page', de: { title: 'Schleifmaschinen', content: 'Flach- und Rundschleifmaschinen.' }, en: { title: 'Grinding machines', content: 'Surface and cylindrical grinders.' } },
        { key: 'used_explore_drilling', thumbnail: '@img:machine_drilling', page: 'drilling_machines_page', de: { title: 'Bohrmaschinen', content: 'Säulen- und Radialbohrmaschinen.' }, en: { title: 'Drilling machines', content: 'Column and radial drills.' } },
        { key: 'used_explore_saws', thumbnail: '@img:machine_saw', page: 'saws_page', de: { title: 'Sägen', content: 'Band- und Kreissägen für Metall.' }, en: { title: 'Saws', content: 'Band and circular saws for metal.' } },
        { key: 'used_explore_other', thumbnail: '@img:machine_other', page: 'other_machines_page', de: { title: 'Sonstige Maschinen', content: 'Pressen, Scheren und Sondermaschinen.' }, en: { title: 'Other machines', content: 'Presses, shears and special machines.' } },
      ]),
      contactForm('used_contact', '@emp:emp_2'),
    ],
  },

  gantry_machines_page: {
    seo: seo('Portalfräsmaschinen', 'Gantry mills', 'Portalfräsmaschinen FS10, FS15 und FS20 aus eigener Entwicklung — für Styropor, Kunststoff und Leichtmetall.', 'Gantry milling machines FS10, FS15 and FS20 from our own development — for styrofoam, plastics and light metals.'),
    sections: [
      heroCarousel('gantry_hero', ['@img:hero_gantry_1', '@img:hero_gantry_2'], 'Portalfräsen. Unsere Kernkompetenz.', 'Gantry milling. Our core competency.', 5000),
      textImage(
        'gantry_intro',
        '@img:hero_gantry_1',
        { title: 'Portalfräsmaschinen', subtitle: 'Made by STYROTEC', content: 'Seit über 30 Jahren entwickeln und fertigen wir Portalfräsmaschinen in Baienfurt. Die FS-Serie deckt Verfahrwege von 2 bis 12 Metern ab und bearbeitet Styropor, Kunststoffe und Leichtmetalle.' },
        { title: 'Gantry milling machines', subtitle: 'Made by STYROTEC', content: 'For over 30 years we have been developing and building gantry mills in Baienfurt. The FS series covers travels from 2 to 12 meters and machines styrofoam, plastics and light metals.' },
      ),
      uspList('gantry_usps', [
        ['Verfahrwege bis 12 m in X', 'Travels up to 12 m in X'],
        ['Siemens Sinumerik Steuerung', 'Siemens Sinumerik control'],
        ['Eigene Konstruktion & Fertigung', 'In-house design & production'],
        ['Service und Ersatzteile ab Werk', 'Factory service and spare parts'],
      ]),
      exploreMore('gantry_explore', 'Modelle', 'Models', [
        { key: 'gantry_explore_fs10', thumbnail: '@img:prod_fs10', page: 'fs10_page', de: { title: 'FS10', content: 'Der kompakte Einstieg in die Portalbearbeitung.' }, en: { title: 'FS10', content: 'The compact entry into gantry machining.' } },
        { key: 'gantry_explore_fs15', thumbnail: '@img:prod_fs15', page: 'fs15_page', de: { title: 'FS15', content: 'Der Allrounder für Modell- und Formenbau.' }, en: { title: 'FS15', content: 'The all-rounder for model and mold making.' } },
        { key: 'gantry_explore_fs20', thumbnail: '@img:prod_fs20', page: 'fs20_page', de: { title: 'FS20', content: 'Maximale Verfahrwege für Großformate.' }, en: { title: 'FS20', content: 'Maximum travels for large formats.' } },
        { key: 'gantry_explore_instock', thumbnail: '@img:prod_instock', page: 'instock_page', de: { title: 'Vorratsmaschinen', content: 'Sofort verfügbare Maschinen ab Lager.' }, en: { title: 'In-stock machines', content: 'Machines available from stock.' } },
      ]),
      contactForm('gantry_contact', '@emp:emp_2'),
    ],
  },

  fs10_page: fsPage('fs10', ['2.000 mm', '1.500 mm', '800 mm'], '4,5 × 3,2 m', '7,5 kW HSK-A63'),
  fs15_page: fsPage('fs15', ['4.000 mm', '2.500 mm', '1.200 mm'], '7,0 × 4,6 m', '11 kW HSK-A63'),
  fs20_page: fsPage('fs20', ['8.000 mm', '3.500 mm', '1.500 mm'], '12,5 × 6,0 m', '15 kW HSK-A63'),

  briquetting_press_page: {
    seo: seo('Brikettierpressen', 'Briquetting presses', 'Brikettierpressen für Metall, Kunststoff und Styropor: Reststoffe kompaktieren, Entsorgungskosten senken.', 'Briquetting presses for metal, plastics and styrofoam: compact residues, reduce disposal costs.'),
    sections: [
      heroCarousel('press_hero', ['@img:hero_press_1'], 'Reststoffe wirtschaftlich verwerten', 'Turning residues into value'),
      textImage(
        'press_intro',
        '@img:prod_presses',
        { title: 'Brikettierpressen', content: 'Späne, Stäube und Verschnitt werden zu kompakten Briketts gepresst — das senkt Lager- und Entsorgungskosten und macht Wertstoffe handelbar.' },
        { title: 'Briquetting presses', content: 'Chips, dust and offcuts are compressed into compact briquettes — cutting storage and disposal costs and making recyclables tradeable.' },
      ),
      uspList('press_usps', [
        ['Bis zu 90 % Volumenreduktion', 'Up to 90% volume reduction'],
        ['Für Metall, Kunststoff und EPS', 'For metal, plastics and EPS'],
        ['Vollautomatischer Betrieb', 'Fully automatic operation'],
        ['Amortisation oft unter 2 Jahren', 'Payback often under 2 years'],
      ]),
      exploreMore('press_explore', 'Einsatzbereiche', 'Applications', [
        { key: 'press_explore_metal', thumbnail: '@img:mat_metal', page: 'metals_page', de: { title: 'Metalle', content: 'Späne aus Stahl, Aluminium und Buntmetall brikettieren.' }, en: { title: 'Metals', content: 'Briquetting chips from steel, aluminium and non-ferrous metals.' } },
        { key: 'press_explore_plastic', thumbnail: '@img:mat_plastic', page: 'plastics_page', de: { title: 'Kunststoffe', content: 'Frässtäube und Mahlgut kompakt und sauber handhaben.' }, en: { title: 'Plastics', content: 'Handle milling dust and regrind compactly and cleanly.' } },
        { key: 'press_explore_styro', thumbnail: '@img:mat_styro', page: 'styrofoam_page', de: { title: 'Styropor', content: 'EPS-Verschnitt zu lagerfähigen Blöcken verdichten.' }, en: { title: 'Styrofoam', content: 'Compress EPS offcuts into storable blocks.' } },
      ]),
      contactForm('press_contact', '@emp:emp_1'),
    ],
  },

  metals_page: productPage(
    'metals',
    '@img:mat_metal',
    { keyword: 'Metalle', sub: 'brikettieren', title: 'Metallspäne verwerten', desc: 'Stahl-, Alu- und Buntmetallspäne wirtschaftlich kompaktieren.', paragraphs: ['Metallspäne binden Kühlschmierstoff und Lagerfläche. Unsere Brikettierpressen verdichten Späne zu Briketts mit bis zu 90 % Volumenreduktion — der zurückgewonnene Kühlschmierstoff fließt in den Prozess zurück.', 'Briketts erzielen im Schrotthandel deutlich höhere Erlöse als lose Späne.'] },
    { keyword: 'Metals', sub: 'briquetting', title: 'Recycling metal chips', desc: 'Compact steel, aluminium and non-ferrous chips economically.', paragraphs: ['Metal chips tie up coolant and storage space. Our briquetting presses compress chips into briquettes with up to 90% volume reduction — recovered coolant flows back into the process.', 'Briquettes achieve significantly higher scrap prices than loose chips.'] },
  ),
  plastics_page: productPage(
    'plastics',
    '@img:mat_plastic',
    { keyword: 'Kunststoffe', sub: 'verdichten', title: 'Kunststoffreste kompaktieren', desc: 'Frässtäube und Mahlgut sauber und wirtschaftlich handhaben.', paragraphs: ['Leichte Kunststoffstäube und -späne sind voluminös und schwer zu handhaben. Verdichtet zu Briketts lassen sie sich staubfrei lagern, transportieren und dem Recycling zuführen.'] },
    { keyword: 'Plastics', sub: 'compacting', title: 'Compacting plastic residues', desc: 'Handle milling dust and regrind cleanly and economically.', paragraphs: ['Light plastic dust and chips are bulky and hard to handle. Compacted into briquettes they can be stored, transported and recycled dust-free.'] },
  ),
  styrofoam_page: productPage(
    'styrofoam',
    '@img:mat_styro',
    { keyword: 'Styropor', sub: 'recyceln', title: 'EPS-Verschnitt verwerten', desc: 'Styropor-Reste zu lagerfähigen Blöcken pressen.', paragraphs: ['Beim Fräsen und Schneiden von EPS entstehen große Mengen Verschnitt. Unsere Pressen verdichten das Material um den Faktor 40 — aus Bergen von Reststoff werden handliche, verkaufsfähige Blöcke.'] },
    { keyword: 'Styrofoam', sub: 'recycling', title: 'Recycling EPS offcuts', desc: 'Press styrofoam residues into storable blocks.', paragraphs: ['Milling and cutting EPS produces large amounts of offcut. Our presses compact the material by a factor of 40 — mountains of residue become compact, sellable blocks.'] },
  ),

  styrofoam_processing_page: {
    seo: seo('Styroporbearbeitung', 'Styrofoam processing', 'Styropor-Formteile, Prototypen und Großmodelle — CNC-gefräst in Serienqualität.', 'Styrofoam molded parts, prototypes and large models — CNC-milled in series quality.'),
    sections: [
      heroCarousel('styro_hero', ['@img:hero_styro_1', '@img:hero_styro_2'], 'Styropor. Perfekt geformt.', 'Styrofoam. Perfectly shaped.'),
      textImage(
        'styro_intro',
        '@img:hero_styro_2',
        { title: 'Bearbeitung in Serie', content: 'Von der Rohplatte zum fertigen Formteil: Auf unseren eigenen Portalfräsmaschinen fertigen wir Styropor-Teile in kleinen und großen Serien — maßhaltig, wiederholgenau und kurzfristig.' },
        { title: 'Processing in series', content: 'From raw sheet to finished molded part: on our own gantry mills we produce styrofoam parts in small and large series — dimensionally accurate, repeatable and on short notice.' },
      ),
      uspList('styro_usps', [
        ['Formteile bis 12 m Länge', 'Molded parts up to 12 m in length'],
        ['3D-Fräsen nach CAD-Daten', '3D milling from CAD data'],
        ['Kleinserien ab Losgröße 1', 'Small series from batch size 1'],
        ['Eigenes Materiallager', 'In-house material stock'],
      ]),
      exploreMore('styro_explore', 'Rund um die Bearbeitung', 'Around processing', [
        { key: 'styro_explore_raw', thumbnail: '@img:prod_raw', page: 'raw_material_page', de: { title: 'Rohmaterial', content: 'EPS-Blöcke und -Platten in allen Dichten.' }, en: { title: 'Raw material', content: 'EPS blocks and sheets in all densities.' } },
        { key: 'styro_explore_adhesive', thumbnail: '@img:prod_adhesive', page: 'adhesive_page', de: { title: 'Kleber', content: 'Systemkleber für EPS-Verbindungen.' }, en: { title: 'Adhesive', content: 'System adhesives for EPS bonding.' } },
        { key: 'styro_explore_shredder', thumbnail: '@img:prod_shredder', page: 'shredder_page', de: { title: 'Zerkleinerer', content: 'Verschnitt direkt an der Maschine recyceln.' }, en: { title: 'Shredders', content: 'Recycle offcuts right at the machine.' } },
      ]),
      contactForm('styro_contact', '@emp:emp_1'),
    ],
  },

  machine_maintenance_page: {
    seo: seo('Maschinenerhaltung', 'Machine maintenance', 'Wartung, Inspektion und Instandsetzung Ihrer Werkzeugmaschinen — herstellerunabhängig und planbar.', 'Maintenance, inspection and repair of your machine tools — manufacturer-independent and plannable.'),
    sections: [
      heroCarousel('maintenance_hero', ['@img:hero_service_1'], 'Wartung & Service', 'Maintenance & service'),
      textImage(
        'maintenance_intro',
        '@img:hero_service_1',
        { title: 'Maschinenerhaltung', content: 'Ungeplante Stillstände sind teuer. Mit planmäßiger Wartung, Geometrieprüfung und schneller Instandsetzung halten wir Ihre Maschinen produktiv — herstellerunabhängig.' },
        { title: 'Machine maintenance', content: 'Unplanned downtime is expensive. With scheduled maintenance, geometry checks and fast repairs we keep your machines productive — regardless of manufacturer.' },
      ),
      uspList('maintenance_usps', [
        ['Herstellerunabhängiger Service', 'Manufacturer-independent service'],
        ['Geometrie- und Laservermessung', 'Geometry and laser measurement'],
        ['Ersatzteilservice', 'Spare parts service'],
        ['Wartungsverträge mit fester Reaktionszeit', 'Service contracts with guaranteed response times'],
      ]),
      pageHeader('maintenance_header_inspection', { headline: 'Inspektion & Wartung', description: 'Regelmäßige Checks nach Herstellervorgabe oder individuellem Plan.' }, { headline: 'Inspection & maintenance', description: 'Regular checks per manufacturer specification or individual plan.' }),
      contentTextImage(
        'maintenance_content_inspection',
        { paragraphs: ['Wir prüfen Führungen, Antriebe, Spindeln und Sicherheitseinrichtungen, tauschen Verschleißteile und dokumentieren den Zustand Ihrer Maschine nachvollziehbar. So bleiben Garantieansprüche und Wiederverkaufswert erhalten.'] },
        { paragraphs: ['We inspect guideways, drives, spindles and safety equipment, replace wear parts and document the condition of your machine transparently. This preserves warranty claims and resale value.'] },
        { image: '@img:machine_conventional', position: 'right' },
      ),
      pageHeader('maintenance_header_repair', { headline: 'Instandsetzung', description: 'Von der Spindelreparatur bis zur Generalüberholung.' }, { headline: 'Repair', description: 'From spindle repair to complete overhaul.' }),
      contentTextImage(
        'maintenance_content_repair',
        { paragraphs: ['Im Schadensfall analysieren wir schnell und reparieren vor Ort oder in unserer Werkstatt in Baienfurt. Bei größeren Schäden erstellen wir eine ehrliche Wirtschaftlichkeitsbetrachtung: Reparatur, Überholung oder Ersatz.'] },
        { paragraphs: ['In case of damage we analyze quickly and repair on site or in our Baienfurt workshop. For major damage we provide an honest economic assessment: repair, overhaul or replacement.'] },
        { image: '@img:hero_service_2', position: 'left' },
      ),
      contactForm('maintenance_contact', '@emp:emp_2'),
    ],
  },

  machine_marketing_page: {
    seo: seo('Maschinenvermarktung', 'Machine marketing', 'Wir vermarkten Ihre gebrauchte Werkzeugmaschine: Bewertung, Aufbereitung, weltweiter Verkauf.', 'We market your used machine tool: valuation, refurbishment, worldwide sale.'),
    sections: [
      heroCarousel('marketing_hero', ['@img:hero_used_2'], 'Wir vermarkten Ihre Maschine', 'We market your machine'),
      textImage(
        'marketing_intro',
        '@img:hero_used_1',
        { title: 'Maschinenvermarktung', content: 'Sie ersetzen eine Maschine oder geben eine Fertigung auf? Wir bewerten, kaufen an oder vermarkten in Kommission — inklusive Demontage, Transport und Zahlungsabwicklung.' },
        { title: 'Machine marketing', content: 'Replacing a machine or closing a production line? We appraise, purchase directly or sell on consignment — including dismantling, transport and payment handling.' },
      ),
      uspList('marketing_usps', [
        ['Marktgerechte Bewertung in 48 h', 'Market-based valuation within 48 h'],
        ['Ankauf oder Kommission', 'Direct purchase or consignment'],
        ['Demontage und Logistik inklusive', 'Dismantling and logistics included'],
        ['Internationales Käufernetzwerk', 'International buyer network'],
      ]),
      pageHeader('marketing_header_process', { headline: 'So läuft es ab', description: 'Vom ersten Foto bis zur Auszahlung in vier Schritten.' }, { headline: 'How it works', description: 'From the first photo to payout in four steps.' }),
      contentAccordion('marketing_process', 'Ablauf', 'Process', [
        { key: 'marketing_step_1', de: ['1. Bewertung', 'Sie senden uns Eckdaten und Fotos — wir nennen Ihnen binnen 48 Stunden einen realistischen Marktwert.'], en: ['1. Valuation', 'Send us key data and photos — we quote a realistic market value within 48 hours.'] },
        { key: 'marketing_step_2', de: ['2. Vereinbarung', 'Ankauf zum Festpreis oder Vermarktung in Kommission mit transparenter Provision.'], en: ['2. Agreement', 'Direct purchase at a fixed price or consignment sale with a transparent commission.'] },
        { key: 'marketing_step_3', de: ['3. Aufbereitung', 'Reinigung, Funktionsprüfung, Fotodokumentation und internationale Vermarktung.'], en: ['3. Preparation', 'Cleaning, function testing, photo documentation and international marketing.'] },
        { key: 'marketing_step_4', de: ['4. Abwicklung', 'Demontage, Verladung, Export-Papiere und sichere Zahlungsabwicklung durch uns.'], en: ['4. Settlement', 'Dismantling, loading, export documents and secure payment handled by us.'] },
      ]),
      contactForm('marketing_contact', '@emp:emp_1'),
    ],
  },

  machine_modernization_page: {
    seo: seo('Maschinenmodernisierung', 'Machine modernization', 'Retrofit statt Neukauf: Steuerung, Antriebe und Sicherheitstechnik Ihrer Maschine auf den neuesten Stand bringen.', 'Retrofit instead of replacement: bring your machine’s control, drives and safety technology up to date.'),
    sections: [
      heroCarousel('modernization_hero', ['@img:hero_service_2'], 'Neues Leben für Ihre Maschine', 'New life for your machine'),
      textImage(
        'modernization_intro',
        '@img:hero_service_2',
        { title: 'Retrofit & Modernisierung', content: 'Eine mechanisch gesunde Maschine ist die halbe Miete. Wir erneuern Steuerung, Antriebe, Messsysteme und Sicherheitstechnik — für einen Bruchteil des Neupreises.' },
        { title: 'Retrofit & modernization', content: 'A mechanically sound machine is half the battle. We renew controls, drives, measuring systems and safety technology — at a fraction of the price of a new machine.' },
      ),
      uspList('modernization_usps', [
        ['Steuerungs-Retrofit (Siemens, Heidenhain)', 'Control retrofit (Siemens, Heidenhain)'],
        ['CE-konforme Sicherheitstechnik', 'CE-compliant safety technology'],
        ['Geometrie-Überholung', 'Geometry overhaul'],
        ['Bis zu 60 % günstiger als Neukauf', 'Up to 60% cheaper than buying new'],
      ]),
      pageHeader('modernization_header', { headline: 'Typischer Umfang', description: 'Was ein Retrofit bei uns beinhaltet.' }, { headline: 'Typical scope', description: 'What a retrofit with us includes.' }),
      contentAccordion('modernization_scope', 'Leistungen', 'Scope of work', [
        { key: 'modernization_scope_control', de: ['Steuerung & Antriebe', 'Austausch der NC-Steuerung, neuer Servoantriebe und Messsysteme inklusive Inbetriebnahme und Schulung.'], en: ['Control & drives', 'Replacement of the NC control, new servo drives and measuring systems, including commissioning and training.'] },
        { key: 'modernization_scope_mechanics', de: ['Mechanik', 'Überholung von Führungen, Kugelrollspindeln und Spindellagern; anschließende Laservermessung.'], en: ['Mechanics', 'Overhaul of guideways, ball screws and spindle bearings, followed by laser calibration.'] },
        { key: 'modernization_scope_safety', de: ['Sicherheitstechnik', 'Neue Schutzeinrichtungen, Not-Halt-Kreise und Dokumentation nach aktueller Maschinenrichtlinie.'], en: ['Safety technology', 'New guards, emergency-stop circuits and documentation per the current Machinery Directive.'] },
      ]),
      contactForm('modernization_contact', '@emp:emp_2'),
    ],
  },

  milling_tools_page: {
    seo: seo('Fräswerkzeuge', 'Milling tools', 'Fräswerkzeuge für Styropor und Kunststoff: Styrospeed HS, Raspelfräser und Sonderanfertigungen.', 'Milling tools for styrofoam and plastics: Styrospeed HS, rasp cutters and custom tools.'),
    sections: [
      heroDual(
        'tools_hero',
        '@img:prod_tools',
        { keyword: 'Werkzeuge', sub: 'für weiche Werkstoffe', title: 'Fräswerkzeuge', content: 'Speziell für EPS, XPS und Kunststoffe entwickelte Fräser — für saubere Schnittbilder bei hohen Vorschüben.' },
        { keyword: 'Tooling', sub: 'for soft materials', title: 'Milling tools', content: 'Cutters engineered specifically for EPS, XPS and plastics — clean cutting patterns at high feed rates.' },
      ),
      exploreMore('tools_explore', 'Unser Programm', 'Our range', [
        { key: 'tools_explore_styrospeed', thumbnail: '@img:prod_styrospeed', page: 'styrospeed_hs_page', de: { title: 'Styrospeed HS', content: 'Hochgeschwindigkeitsfräser für EPS.' }, en: { title: 'Styrospeed HS', content: 'High-speed cutter for EPS.' } },
        { key: 'tools_explore_rasp', thumbnail: '@img:prod_cutter_1', page: 'shank_rasp_cutter_page', de: { title: 'Raspelfräser', content: 'Zylinderschaft-Raspelfräser für hohen Abtrag.' }, en: { title: 'Rasp cutters', content: 'Cylindrical-shank rasp cutters for high removal rates.' } },
        { key: 'tools_explore_special', thumbnail: '@img:prod_cutter_2', page: 'special_milling_cutter_page', de: { title: 'Sonderfräser', content: 'Werkzeuge nach Ihrer Kontur und Anwendung.' }, en: { title: 'Special cutters', content: 'Tools built to your contour and application.' } },
      ]),
      contactForm('tools_contact', '@emp:emp_3'),
    ],
  },

  styrospeed_hs_page: productPage(
    'styrospeed',
    '@img:prod_styrospeed',
    { keyword: 'Styrospeed', sub: 'HS', title: 'Der Hochgeschwindigkeitsfräser', desc: 'Bis zu 60 m/min Vorschub in EPS bei perfekter Oberfläche.', paragraphs: ['Der Styrospeed HS wurde für die Hochgeschwindigkeitsbearbeitung von EPS und XPS entwickelt. Seine offene Schneidgeometrie verhindert Aufschmelzungen und liefert auch bei maximalem Vorschub eine saubere, nachbearbeitungsfreie Oberfläche.', 'Verfügbar in Durchmessern von 8 bis 25 mm, mit Zylinderschaft für gängige Spannsysteme.'] },
    { keyword: 'Styrospeed', sub: 'HS', title: 'The high-speed cutter', desc: 'Up to 60 m/min feed in EPS with a perfect finish.', paragraphs: ['The Styrospeed HS was developed for high-speed machining of EPS and XPS. Its open cutting geometry prevents melting and delivers a clean, rework-free surface even at maximum feed.', 'Available in diameters from 8 to 25 mm, with cylindrical shank for common clamping systems.'] },
  ),
  shank_rasp_cutter_page: productPage(
    'rasp',
    '@img:prod_cutter_1',
    { keyword: 'Raspelfräser', title: 'Zylinderschaft-Raspelfräser', desc: 'Maximaler Abtrag beim Schruppen von EPS und Ureol.', paragraphs: ['Unsere Raspelfräser tragen große Volumina in kurzer Zeit ab — ideal für das Schruppen von Großmodellen. Die raspelartige Verzahnung erzeugt feines, gut absaugbares Frässpangut statt langer Fäden.'] },
    { keyword: 'Rasp cutter', title: 'Cylindrical-shank rasp cutters', desc: 'Maximum removal when roughing EPS and ureol.', paragraphs: ['Our rasp cutters remove large volumes in a short time — ideal for roughing large models. The rasp-like toothing produces fine, easily extracted chips instead of long strands.'] },
  ),
  special_milling_cutter_page: productPage(
    'special_cutter',
    '@img:prod_cutter_2',
    { keyword: 'Sonderfräser', title: 'Werkzeuge nach Maß', desc: 'Profil- und Formfräser nach Ihrer Zeichnung.', paragraphs: ['Wenn Standardwerkzeuge nicht reichen, fertigen wir Profil- und Formfräser exakt nach Ihrer Kontur — vom Einzelstück bis zur Kleinserie, inklusive Nachschliff-Service.'] },
    { keyword: 'Special cutters', title: 'Tools made to measure', desc: 'Profile and form cutters to your drawing.', paragraphs: ['When standard tools are not enough, we manufacture profile and form cutters exactly to your contour — from one-offs to small series, including regrinding service.'] },
  ),
  hollow_milling_spindle_page: productPage(
    'spindle',
    '@img:prod_spindle',
    { keyword: 'Hohlfrässpindel', title: 'Frässpindel mit integrierter Absaugung', desc: 'Absaugung direkt durch die Spindel — staubfrei fräsen.', paragraphs: ['Bei der Hohlfrässpindel wird das Frässpangut direkt durch die Spindel abgesaugt. Das hält Werkstück und Maschine sauber und macht Einhausungen in vielen Fällen überflüssig.'] },
    { keyword: 'Hollow spindle', title: 'Milling spindle with integrated extraction', desc: 'Extraction directly through the spindle — dust-free milling.', paragraphs: ['With the hollow milling spindle, chips are extracted directly through the spindle. This keeps workpiece and machine clean and often eliminates the need for enclosures.'] },
  ),
  suction_system_page: productPage(
    'suction',
    '@img:prod_suction',
    { keyword: 'Absaugungen', title: 'Absauganlagen für die EPS-Bearbeitung', desc: 'Zentrale und dezentrale Absaugung für staubarme Fertigung.', paragraphs: ['Passend zu unseren Maschinen liefern wir Absauganlagen vom Einzelplatzentstauber bis zur zentralen Anlage mit Brikettierung des abgesaugten Materials.'] },
    { keyword: 'Suction', title: 'Extraction systems for EPS machining', desc: 'Central and decentralized extraction for low-dust production.', paragraphs: ['Matching our machines, we supply extraction systems from single-station dedusters to central systems with briquetting of the extracted material.'] },
  ),
  shredder_page: productPage(
    'shredder',
    '@img:prod_shredder',
    { keyword: 'Zerkleinerer', title: 'EPS-Verschnitt zerkleinern', desc: 'Reststücke direkt an der Maschine recyceln.', paragraphs: ['Unsere Zerkleinerer verarbeiten EPS-Reststücke zu wiederverwendbarem Granulat — als Vorstufe zur Brikettierung oder zur direkten Wiederverwendung als Schüttmaterial.'] },
    { keyword: 'Shredders', title: 'Shredding EPS offcuts', desc: 'Recycle residues right at the machine.', paragraphs: ['Our shredders process EPS residues into reusable granulate — as a preliminary stage for briquetting or for direct reuse as loose fill.'] },
  ),
  raw_material_page: productPage(
    'raw',
    '@img:prod_raw',
    { keyword: 'Rohmaterial', title: 'EPS-Blöcke und Platten', desc: 'Styropor in allen Dichten, zugeschnitten nach Maß.', paragraphs: ['Wir liefern EPS-Blöcke und -Platten in allen gängigen Dichten aus eigenem Lager — auf Wunsch exakt konturgeschnitten und just-in-time zu Ihrer Fertigung.'] },
    { keyword: 'Raw material', title: 'EPS blocks and sheets', desc: 'Styrofoam in all densities, cut to size.', paragraphs: ['We supply EPS blocks and sheets in all common densities from our own stock — contour-cut to size on request and delivered just-in-time to your production.'] },
  ),
  adhesive_page: productPage(
    'adhesive',
    '@img:prod_adhesive',
    { keyword: 'Kleber', title: 'Systemkleber für EPS', desc: 'Kleben statt schäumen: Verbindungen ohne Wartezeit.', paragraphs: ['Unsere Systemkleber verbinden EPS-Segmente schnell und dauerhaft — lösungsmittelfrei, fräsbar und ohne Durchschlagen an der Oberfläche.'] },
    { keyword: 'Adhesive', title: 'System adhesives for EPS', desc: 'Bonding without waiting times.', paragraphs: ['Our system adhesives join EPS segments quickly and permanently — solvent-free, millable and without telegraphing at the surface.'] },
  ),
  presses_page: productPage(
    'presses',
    '@img:prod_presses',
    { keyword: 'Pressen', title: 'Pressen für die Verdichtung', desc: 'Kompaktier-Lösungen jenseits der Brikettierung.', paragraphs: ['Neben Brikettierpressen liefern wir Ballen- und Kompaktierpressen für Folien, Kartonagen und Mischabfälle aus der Fertigung.'] },
    { keyword: 'Presses', title: 'Presses for compaction', desc: 'Compaction solutions beyond briquetting.', paragraphs: ['In addition to briquetting presses we supply baling and compacting presses for films, cardboard and mixed production waste.'] },
  ),
  hybrid_page: productPage(
    'hybrid',
    '@img:prod_hybrid',
    { keyword: 'Hybrid', title: 'Fräsen + Heißdraht kombiniert', desc: 'Zwei Verfahren, eine Aufspannung.', paragraphs: ['Unsere Hybrid-Portale kombinieren Heißdrahtschneiden für schnelle Grobkonturen mit CNC-Fräsen für Detailgeometrien — in einer einzigen Aufspannung.'] },
    { keyword: 'Hybrid', title: 'Milling + hot wire combined', desc: 'Two processes, one setup.', paragraphs: ['Our hybrid gantries combine hot-wire cutting for fast rough contours with CNC milling for detailed geometry — in a single setup.'] },
  ),
  model_construction_machines_page: {
    seo: seo('Modellbaumaschinen', 'Model construction machines', 'Kompakte Maschinen für Modell- und Formenbau: Fräsen, Schleifen, Bohren und Sägen.', 'Compact machines for model and mold making: milling, grinding, drilling and sawing.'),
    sections: [
      heroDual(
        'model_hero',
        '@img:prod_model',
        { keyword: 'Modellbau', title: 'Maschinen für den Modellbau', content: 'Kompakte, präzise Maschinen für Modell- und Formenbauwerkstätten — neu und gebraucht.' },
        { keyword: 'Model making', title: 'Machines for model making', content: 'Compact, precise machines for model and mold making workshops — new and used.' },
      ),
      exploreMore('model_explore', 'Passende Kategorien', 'Related categories', [
        { key: 'model_explore_milling', thumbnail: '@img:machine_milling', page: 'milling_machines_page', de: { title: 'Fräsmaschinen', content: 'Werkzeugfräsmaschinen für feine Konturen.' }, en: { title: 'Milling machines', content: 'Tool milling machines for fine contours.' } },
        { key: 'model_explore_grinding', thumbnail: '@img:machine_grinding', page: 'grinding_machines_page', de: { title: 'Schleifmaschinen', content: 'Für perfekte Oberflächen.' }, en: { title: 'Grinding machines', content: 'For perfect surfaces.' } },
        { key: 'model_explore_drilling', thumbnail: '@img:machine_drilling', page: 'drilling_machines_page', de: { title: 'Bohrmaschinen', content: 'Säulenbohrmaschinen für die Werkstatt.' }, en: { title: 'Drilling machines', content: 'Column drills for the workshop.' } },
        { key: 'model_explore_saws', thumbnail: '@img:machine_saw', page: 'saws_page', de: { title: 'Sägen', content: 'Band- und Kreissägen.' }, en: { title: 'Saws', content: 'Band and circular saws.' } },
      ]),
      contactForm('model_contact', '@emp:emp_2'),
    ],
  },
};

// ── Page routing meta: admin name + per-language slug (+ category link) ─────

const meta: Record<string, { name: string; de: string; en: string; cat?: string }> = {
  homepage: { name: 'Startseite', de: '', en: '' },
  about_us_page: { name: 'Über uns', de: 'unternehmen/ueber-uns', en: 'company/about-us' },
  industries_page: { name: 'Branchen', de: 'unternehmen/branchen', en: 'company/industries' },
  career: { name: 'Karriere', de: 'unternehmen/karriere', en: 'company/career' },
  news_page: { name: 'Aktuelles', de: 'unternehmen/aktuelles', en: 'company/news' },
  legal_notice_page: { name: 'Impressum', de: 'impressum', en: 'legal-notice' },
  privacy_policy_page: { name: 'Datenschutz', de: 'datenschutz', en: 'privacy-policy' },
  gantry_machines_page: { name: 'Portalfräsmaschinen', de: 'produkte/portalfraesmaschinen', en: 'products/gantry-machines' },
  fs10_page: { name: 'FS10', de: 'produkte/portalfraesmaschinen/fs10', en: 'products/gantry-machines/fs10' },
  fs15_page: { name: 'FS15', de: 'produkte/portalfraesmaschinen/fs15', en: 'products/gantry-machines/fs15' },
  fs20_page: { name: 'FS20', de: 'produkte/portalfraesmaschinen/fs20', en: 'products/gantry-machines/fs20' },
  instock_page: { name: 'Vorratsmaschinen', de: 'produkte/portalfraesmaschinen/vorratsmaschinen', en: 'products/gantry-machines/instock-machines', cat: 'instock_machines' },
  used_machines_page: { name: 'Gebrauchtmaschinen', de: 'produkte/gebrauchtmaschinen', en: 'products/used-machines' },
  cnc_mills_page: { name: 'CNC-Fräsmaschinen', de: 'produkte/gebrauchtmaschinen/cnc-fraesmaschinen', en: 'products/used-machines/cnc-milling-machines', cat: 'cnc_mills' },
  conventional_mills_page: { name: 'Konventionelle Fräsen', de: 'produkte/gebrauchtmaschinen/konventionelle-fraesen', en: 'products/used-machines/conventional-mills', cat: 'conventional_mills' },
  lathes_page: { name: 'Drehmaschinen', de: 'produkte/gebrauchtmaschinen/drehmaschinen', en: 'products/used-machines/lathes', cat: 'lathes' },
  milling_machines_page: { name: 'Fräsmaschinen', de: 'produkte/gebrauchtmaschinen/fraesmaschinen', en: 'products/used-machines/milling-machines', cat: 'milling_machines' },
  grinding_machines_page: { name: 'Schleifmaschinen', de: 'produkte/gebrauchtmaschinen/schleifmaschinen', en: 'products/used-machines/grinding-machines', cat: 'grinding_machines' },
  drilling_machines_page: { name: 'Bohrmaschinen', de: 'produkte/gebrauchtmaschinen/bohrmaschinen', en: 'products/used-machines/drilling-machines', cat: 'drilling_machines' },
  saws_page: { name: 'Sägen', de: 'produkte/gebrauchtmaschinen/saegen', en: 'products/used-machines/saws', cat: 'saws' },
  other_machines_page: { name: 'Sonstige Maschinen', de: 'produkte/gebrauchtmaschinen/sonstige-maschinen', en: 'products/used-machines/other-machines', cat: 'other_machines' },
  milling_tools_page: { name: 'Fräswerkzeuge', de: 'produkte/fraeswerkzeuge', en: 'products/milling-tools' },
  styrospeed_hs_page: { name: 'Styrospeed HS', de: 'produkte/fraeswerkzeuge/styrospeed-hs', en: 'products/milling-tools/styrospeed-hs' },
  shank_rasp_cutter_page: { name: 'Raspelfräser', de: 'produkte/fraeswerkzeuge/zylinderschaft-raspelfraeser', en: 'products/milling-tools/shank-rasp-cutter' },
  special_milling_cutter_page: { name: 'Sonderfräser', de: 'produkte/fraeswerkzeuge/sonderfraeser', en: 'products/milling-tools/special-milling-cutter' },
  briquetting_press_page: { name: 'Brikettierpressen', de: 'produkte/brikettierpressen', en: 'products/briquetting-presses' },
  metals_page: { name: 'Metalle', de: 'produkte/brikettierpressen/metalle', en: 'products/briquetting-presses/metals' },
  plastics_page: { name: 'Kunststoffe', de: 'produkte/brikettierpressen/kunststoffe', en: 'products/briquetting-presses/plastics' },
  styrofoam_page: { name: 'Styropor', de: 'produkte/brikettierpressen/styropor', en: 'products/briquetting-presses/styrofoam' },
  styrofoam_processing_page: { name: 'Styroporbearbeitung', de: 'produkte/styroporbearbeitung', en: 'products/styrofoam-processing' },
  raw_material_page: { name: 'Rohmaterial', de: 'produkte/rohmaterial', en: 'products/raw-material' },
  adhesive_page: { name: 'Kleber', de: 'produkte/kleber', en: 'products/adhesive' },
  hollow_milling_spindle_page: { name: 'Hohlfrässpindeln', de: 'produkte/hohlfraesspindeln', en: 'products/hollow-milling-spindles' },
  suction_system_page: { name: 'Absaugungen', de: 'produkte/absaugungen', en: 'products/suction-systems' },
  shredder_page: { name: 'Zerkleinerer', de: 'produkte/zerkleinerer', en: 'products/shredders' },
  presses_page: { name: 'Pressen', de: 'produkte/pressen', en: 'products/presses' },
  hybrid_page: { name: 'Hybrid', de: 'produkte/hybrid', en: 'products/hybrid' },
  model_construction_machines_page: { name: 'Modellbaumaschinen', de: 'produkte/modellbaumaschinen', en: 'products/model-construction-machines' },
  machine_maintenance_page: { name: 'Maschinenerhaltung', de: 'dienstleistungen/maschinenerhaltung', en: 'services/machine-maintenance' },
  machine_marketing_page: { name: 'Maschinenvermarktung', de: 'dienstleistungen/maschinenvermarktung', en: 'services/machine-marketing' },
  machine_modernization_page: { name: 'Maschinenmodernisierung', de: 'dienstleistungen/maschinenmodernisierung', en: 'services/machine-modernization' },
};

for (const [key, m] of Object.entries(meta)) {
  const page = pages[key];
  if (!page) throw new Error(`pageMeta references unknown page '${key}'`);
  page.name = m.name;
  page.slug = { de: m.de, en: m.en };
  if (m.cat) {
    page.kind = 'machine_category';
    page.category = `@cat:${m.cat}`;
  }
}
for (const key of Object.keys(pages)) {
  if (!pages[key].slug) throw new Error(`Page '${key}' has no entry in pageMeta`);
}

export const pageFixtures: { global: Record<string, unknown>; pages: Record<string, PageSpec> } = {
  global: {
    status: 'published',
    seed_key: 'singleton_global',
    site_name: 'STYROTEC GmbH & Co. KG',
    site_description: 'Portalfräsmaschinen, Styroporbearbeitung, Gebrauchtmaschinen und Maschinen-Dienstleistungen aus Baienfurt.',
    keywords: 'Styrotec, Portalfräsmaschinen, Styropor, CNC, Gebrauchtmaschinen, Baienfurt',
    contact_email: 'info@styrotec.com',
    contact_phone: '+49 751 56050-20',
    address: 'Kartonstraße 2\n88255 Baienfurt',
  },
  pages,
};
