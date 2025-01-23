// typescript type für Menu Item
export type MenuRoute = typeof menu[0];

export const menu = [
    {
      id: 0,
      label: "Produkte",
      link: "/produkte",
      megaMenu: [
        {
          title: "Portalfräsmaschinen",
          items: [
            { label: "FS 10", link: "/produkte/portalfräsmaschinen" },
            { label: "FS 15", link: "/products/2" },
            { label: "FS 20", link: "/products/3" },
            { label: "Hybrid - 3D", link: "/products/3" },
            { label: "Vorratsmaschinen", link: "/products/3" },
          ],
        },
        {
          title: "Spänepressen", link:"/",
          items: [
            { label: "Metalle", link: "/products/a" },
            { label: "Kunststoffe", link: "/products/b" },
            { label: "Styropor", link: "/products/c" },
          ],
        },
        {
          title: "Styroporbearbeitung",
          items: [
            { label: "Fräswerkzeuge", link: "/products/x" },
            { label: "Hohfrässpindeln", link: "/products/y" },
            { label: "Absaugungen", link: "/products/3" },
            { label: "Zerkleinerer", link: "/products/3" },
            { label: "Pressen", link: "/products/3" },
            { label: "Rohmaterial", link: "/products/3" },
            { label: "Kleber", link: "/products/3" },
          ],
        },
        {
          title: "Gebrauchtmaschinen",
          items: [
            { label: "CNC - Maschinen", link: "/produkte/gebrauchtmaschinen/cnc-maschinen" },
            { label: "CNC - Zubehör", link: "/products/y" },
            { label: "Modellbaumaschinen", link: "/products/3" },
            { label: "Holzbearbeitungsmaschinen", link: "/products/3" },
          ],
        },
      ],
    },
    { 
      id: 1,
      label: "Dienstleistungen", 
      link: "/about",
      megaMenu: [
        {
          title: "Maschinenerhaltung",
          items: [
            { label: "Spindelservice", link: "/dienstleistungen/spindelservice" },
            { label: "Wartungen", link: "/products/2" },
            { label: "Reparaturen", link: "/products/3" },
            { label: "Maschinenumzüge", link: "/products/3" },
          ],
        },
        {
          title: "Maschinenvermarktung",
          items: [
            { label: "Bewertung", link: "/products/a" },
            { label: "Vermittlung", link: "/products/b" },
            { label: "Ankauf", link: "/products/c" },
          ],
        },
        {
          title: "Maschinenmodernisierung",
          items: [
            { label: "Retrofit", link: "/products/x" },
            { label: "Überholung", link: "/products/y" },
          ],
        },
      ],
   },

    { 
      id: 2,
      label: "Branchen", 
      link: "/branchen",
      megaMenu: [
        {
          title: "Branchen",
          items: [
            { label: "Automobil", link: "/products/1" },
            { label: "Schiffsbau", link: "/products/2" },
            { label: "Modellbau", link: "/products/3" },
            { label: "Kunststoffindustrie", link: "/products/3" },
            { label: "Betonindustrie", link: "/products/3" },
            { label: "Werbetechnik", link: "/products/3" },
            { label: "aerospace", link: "/products/3" },
            { label: "Kunst", link: "/products/3" },
          ],
        },
      ],
  },
  { 
      id: 3,
      label: "Unternehmen", 
      link: "/unternehmen",
      megaMenu: [
        {
          title: "Über Uns",
          items: [
            { label: "Werte", link: "/products/1" },
            { label: "Visionen", link: "/products/2" },
            { label: "Mission", link: "/products/3" },
            { label: "Nachhaltigkeit", link: "/products/3" },
            { label: "Geschichte", link: "/unternehmen/geschichte" },
          ],
        },
        {
          title: "Karriere",
          items: [
            { label: "Stellenausschreibung", link: "/products/a" },
          ],
        },
        {
          title: "News",
          items: [
            { label: "Anwenderstories", link: "/products/x" },
            { label: "Referenzen", link: "/products/y" },
          ],
        },
        {
          title: "Team",
          items: [
            { label: "Berichte", link: "/products/x" },
            { label: "Messen", link: "/products/y" },
          ],
        },
      ],
   },
  ];