import type { Component } from 'svelte';
import Anvil from '@lucide/svelte/icons/anvil';
import Boxes from '@lucide/svelte/icons/boxes';
import FlaskConical from '@lucide/svelte/icons/flask-conical';
import LayoutGrid from '@lucide/svelte/icons/layout-grid';
import type { Lang } from './routes.js';

/**
 * Static navigation tree (route keys from routes.ts) + the small set of UI
 * strings the shell needs. Mirrors the old site's four top-level menus.
 */

export interface NavGroup {
  label: Record<string, string>;
  /** column groups of route keys; items with an icon render as icon cards (old site's Branchen panel) */
  columns: Array<{
    heading?: Record<string, string>;
    items: Array<{ key: string; label: Record<string, string>; icon?: Component }>;
  }>;
}

const l = (de: string, en: string): Record<string, string> => ({ de, en });

/** label for the requested language, falling back en → de (UI strings are curated per language) */
export function pickLabel(rec: Record<string, string>, lang: Lang): string {
  return rec[lang] ?? rec.en ?? rec.de ?? Object.values(rec)[0] ?? '';
}

export const navGroups: NavGroup[] = [
  {
    label: l('Produkte', 'Products'),
    columns: [
      {
        heading: l('Portalfräsmaschinen', 'Gantry mills'),
        items: [
          { key: 'gantry_machines_page', label: l('Übersicht', 'Overview') },
          { key: 'fs10_page', label: l('FS10', 'FS10') },
          { key: 'fs15_page', label: l('FS15', 'FS15') },
          { key: 'fs20_page', label: l('FS20', 'FS20') },
          { key: 'instock_page', label: l('Vorratsmaschinen', 'In-stock machines') },
          { key: 'hybrid_page', label: l('Hybrid', 'Hybrid') },
        ],
      },
      {
        heading: l('Gebrauchtmaschinen', 'Used machines'),
        items: [
          { key: 'used_machines_page', label: l('Übersicht', 'Overview') },
          { key: 'cnc_mills_page', label: l('CNC-Fräsmaschinen', 'CNC milling machines') },
          { key: 'conventional_mills_page', label: l('Konventionelle Fräsen', 'Conventional mills') },
          { key: 'lathes_page', label: l('Drehmaschinen', 'Lathes') },
          { key: 'milling_machines_page', label: l('Fräsmaschinen', 'Milling machines') },
          { key: 'grinding_machines_page', label: l('Schleifmaschinen', 'Grinding machines') },
          { key: 'drilling_machines_page', label: l('Bohrmaschinen', 'Drilling machines') },
          { key: 'saws_page', label: l('Sägen', 'Saws') },
          { key: 'other_machines_page', label: l('Sonstige Maschinen', 'Other machines') },
        ],
      },
      {
        heading: l('Werkzeuge & Zubehör', 'Tools & accessories'),
        items: [
          { key: 'milling_tools_page', label: l('Fräswerkzeuge', 'Milling tools') },
          { key: 'styrospeed_hs_page', label: l('Styrospeed HS', 'Styrospeed HS') },
          { key: 'shank_rasp_cutter_page', label: l('Raspelfräser', 'Rasp cutters') },
          { key: 'special_milling_cutter_page', label: l('Sonderfräser', 'Special cutters') },
          { key: 'hollow_milling_spindle_page', label: l('Hohlfrässpindeln', 'Hollow spindles') },
          { key: 'suction_system_page', label: l('Absaugungen', 'Suction systems') },
        ],
      },
      {
        heading: l('Styropor & Recycling', 'Styrofoam & recycling'),
        items: [
          { key: 'styrofoam_processing_page', label: l('Styroporbearbeitung', 'Styrofoam processing') },
          { key: 'briquetting_press_page', label: l('Brikettierpressen', 'Briquetting presses') },
          { key: 'shredder_page', label: l('Zerkleinerer', 'Shredders') },
          { key: 'presses_page', label: l('Pressen', 'Presses') },
          { key: 'raw_material_page', label: l('Rohmaterial', 'Raw material') },
          { key: 'adhesive_page', label: l('Kleber', 'Adhesive') },
          { key: 'model_construction_machines_page', label: l('Modellbaumaschinen', 'Model construction') },
        ],
      },
    ],
  },
  {
    label: l('Dienstleistungen', 'Services'),
    columns: [
      {
        items: [
          { key: 'machine_maintenance_page', label: l('Maschinenerhaltung', 'Machine maintenance') },
          { key: 'machine_modernization_page', label: l('Maschinenmodernisierung', 'Machine modernization') },
          { key: 'machine_marketing_page', label: l('Maschinenvermarktung', 'Machine marketing') },
        ],
      },
    ],
  },
  {
    label: l('Branchen', 'Industries'),
    columns: [
      {
        items: [
          { key: 'industries_page', label: l('Branchenübersicht', 'Industry overview'), icon: LayoutGrid },
          { key: 'metals_page', label: l('Metalle', 'Metals'), icon: Anvil },
          { key: 'plastics_page', label: l('Kunststoffe', 'Plastics'), icon: FlaskConical },
          { key: 'styrofoam_page', label: l('Styropor', 'Styrofoam'), icon: Boxes },
        ],
      },
    ],
  },
  {
    label: l('Unternehmen', 'Company'),
    columns: [
      {
        items: [
          { key: 'about_us_page', label: l('Über uns', 'About us') },
          { key: 'news_page', label: l('Aktuelles', 'News') },
          { key: 'career', label: l('Karriere', 'Career') },
        ],
      },
    ],
  },
];

export const ui = {
  inStockOnly: l('Nur verfügbare', 'In stock only'),
  machines: l('Maschinen', 'machines'),
  available: l('Verfügbar', 'Available'),
  sold: l('Verkauft', 'Sold'),
  learnMore: l('Mehr erfahren', 'Learn more'),
  contactUs: l('Kontakt aufnehmen', 'Contact us'),
  contactHeading: l('Sprechen Sie uns an', 'Get in touch'),
  formName: l('Name', 'Name'),
  formCompany: l('Firma', 'Company'),
  formEmail: l('E-Mail', 'Email'),
  formPhone: l('Telefon', 'Phone'),
  formMessage: l('Nachricht', 'Message'),
  formSubmit: l('Nachricht senden', 'Send message'),
  formSuccess: l('Vielen Dank! Wir melden uns zeitnah bei Ihnen.', 'Thank you! We will get back to you shortly.'),
  formError: l('Senden fehlgeschlagen. Bitte prüfen Sie Ihre Angaben.', 'Submission failed. Please check your input.'),
  download: l('Herunterladen', 'Download'),
  backToOverview: l('Zurück zur Übersicht', 'Back to overview'),
  notFoundTitle: l('Seite nicht gefunden', 'Page not found'),
  notFoundText: l('Die angeforderte Seite existiert nicht oder wurde verschoben.', 'The requested page does not exist or has moved.'),
  toHomepage: l('Zur Startseite', 'Go to homepage'),
  legalNotice: l('Impressum', 'Legal notice'),
  privacyPolicy: l('Datenschutz', 'Privacy policy'),
  yearBuilt: l('Baujahr', 'Year'),
  specifications: l('Technische Daten', 'Technical specifications'),
  descriptionHeading: l('Beschreibung', 'Description'),
  contactPerson: l('Ihr Ansprechpartner', 'Your contact'),
  status: l('Status', 'Status'),
  location: l('Standort', 'Location'),
  internalId: l('Interne Nr.', 'Internal ID'),
} satisfies Record<string, Record<string, string>>;

export type UiKey = keyof typeof ui;

export function t(key: UiKey, lang: Lang): string {
  return pickLabel(ui[key], lang);
}

/** Labels for machine spec fields on the detail data sheet. */
export const specLabels: Record<string, Record<string, string>> = {
  designation: l('Bezeichnung', 'Designation'),
  manufacturer: l('Hersteller', 'Manufacturer'),
  model_type: l('Typ', 'Model'),
  year_of_manufacture: l('Baujahr', 'Year of manufacture'),
  condition_key: l('Zustand', 'Condition'),
  location: l('Standort', 'Location'),
  weight: l('Gewicht', 'Weight'),
  dimensions: l('Abmessungen', 'Dimensions'),
  number_of_axes: l('Achsen', 'Number of axes'),
  travel_x: l('Verfahrweg X', 'Travel X'),
  travel_y: l('Verfahrweg Y', 'Travel Y'),
  travel_z: l('Verfahrweg Z', 'Travel Z'),
  travel_a: l('Verfahrweg A', 'Travel A'),
  travel_c: l('Verfahrweg C', 'Travel C'),
  control_system: l('Steuerung', 'Control system'),
  milling_spindle: l('Frässpindel', 'Milling spindle'),
  tool_holder: l('Werkzeugaufnahme', 'Tool holder'),
  feed_rate_x: l('Vorschub X', 'Feed rate X'),
  feed_rate_y: l('Vorschub Y', 'Feed rate Y'),
  feed_rate_z: l('Vorschub Z', 'Feed rate Z'),
  spindle_hours: l('Spindelstunden', 'Spindle hours'),
  machine_hours: l('Maschinenstunden', 'Machine hours'),
  clamping_surface: l('Aufspannfläche', 'Clamping surface'),
  machine_serial_number: l('Seriennummer', 'Serial number'),
  spindle_speed: l('Spindeldrehzahl', 'Spindle speed'),
  table_holder: l('Tischaufnahme', 'Table holder'),
  table_size: l('Tischgröße', 'Table size'),
  table_height: l('Tischhöhe', 'Table height'),
  power: l('Leistung', 'Power'),
  center_distance: l('Spitzenweite', 'Center distance'),
  center_height: l('Spitzenhöhe', 'Center height'),
  grinding_area: l('Schleifbereich', 'Grinding area'),
  overhang: l('Ausladung', 'Overhang'),
  roller_diameter: l('Rollendurchmesser', 'Roller diameter'),
  max_cutting_height: l('Max. Schnitthöhe', 'Max. cutting height'),
  cutting_width: l('Schnittbreite', 'Cutting width'),
  type: l('Typ', 'Type'),
};

export const conditionLabels: Record<string, Record<string, string>> = {
  used: l('Gebraucht', 'Used'),
  used_good: l('Gebraucht, gut', 'Used, good'),
  used_very_good: l('Gebraucht, sehr gut', 'Used, very good'),
  overhauled: l('Überholt', 'Overhauled'),
  fully_functioning: l('Voll funktionsfähig', 'Fully functioning'),
  new: l('Neu', 'New'),
};
