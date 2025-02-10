// typescript type für Menu Item
export type MenuRoute = typeof menu;

export const menu = [
	{
		id: 1,
		label: 'Produkte',
		link: '/produkte',
		megaMenu: [
			{
				title: 'Portalfräsmaschinen',
				link: '/produkte/portalfräsmaschinen',
				items: [
					{ label: 'FS 10', link: '/produkte/portalfräsmaschinen/fs10' },
					{ label: 'FS 15', link: '/produkte/portalfräsmaschinen/f15' },
					{ label: 'FS 20', link: '/produkte/portalfräsmaschinen/fs20' },
					{ label: 'Hybrid - 3D', link: '/produkte/portalfräsmaschinen/hybrid-3d' },
					{ label: 'Vorratsmaschinen', link: '/produkte/portalfräsmaschinen/vorratsmaschinen' }
				]
			},
			{
				title: 'Spänepressen',
				link: '/produkte/spänepressen',
				items: [
					{ label: 'Metalle', link: '/produkte/spänepressen/metalle' },
					{ label: 'Kunststoffe', link: '/produkte/spänepressen/kunststoffe' },
					{ label: 'Styropor', link: '/produkte/spänepressen/styropor' }
				]
			},
			{
				title: 'Styroporbearbeitung',
				link: '/produkte/styroporbearbeitung',
				items: [
					{ label: 'Fräswerkzeuge', link: '/produkte/styroporbearbeitung/fräswerkzeug' },
					{ label: 'Hohlfrässpindeln', link: '/produkte/styroporbearbeitung/hohlfrässpindeln' },
					{ label: 'Absaugungen', link: '/produkte/styroporbearbeitung/absaugungen' },
					{ label: 'Zerkleinerer', link: '/produkte/styroporbearbeitung/zerkleinerer' },
					{ label: 'Pressen', link: '/produkte/styroporbearbeitung/pressen' },
					{ label: 'Rohmaterial', link: '/produkte/styroporbearbeitung/rohmaterial' },
					{ label: 'Kleber', link: '/produkte/styroporbearbeitung/kleber' }
				]
			},
			{
				title: 'Gebrauchtmaschinen',
				link: '/produkte/gebrauchtmaschinen',
				items: [
					{ label: 'CNC - Maschinen', link: '/produkte/gebrauchtmaschinen/cnc-maschinen' },
					{ label: 'CNC - Zubehör', link: '/produkte/gebrauchtmaschinen/zubehör' },
					{ label: 'Modellbaumaschinen', link: '/produkte/gebrauchtmaschinen/modellbaumaschinen' },
					{ label: 'Holzbearbeitungsmaschinen', link: '/produkte/gebrauchtmaschinen/holzbearbeitungsmaschinen' }
				]
			}
		]
	},
	{
		id: 2,
		label: 'Dienstleistungen',
		link: '/about',
		megaMenu: [
			{
				title: 'Maschinenerhaltung',
				link: '/dienstleistungen/maschinenerhaltung',
				items: [
					{ label: 'Spindelservice', link: '/dienstleistungen/maschinenerhaltung/spindelservice' },
					{ label: 'Wartungen', link: '/dienstleistungen/maschinenerhaltung/wartungen' },
					{ label: 'Reparaturen', link: '/dienstleistungen/maschinenerhaltung/reparaturen' },
					{ label: 'Maschinenumzüge', link: '/dienstleistungen/maschinenerhaltung/maschinenumzüge' }
				]
			},
			{
				title: 'Maschinenvermarktung',
				link: '/dienstleistungen/maschinenvermarktung',
				items: [
					{ label: 'Bewertung', link: '/dienstleistungen/maschinenvermarktung/bewertung' },
					{ label: 'Vermittlung', link: '/dienstleistungen/maschinenvermarktung/vermittlung' },
					{ label: 'Ankauf', link: '/dienstleistungen/maschinenvermarktung/ankauf' }
				]
			},
			{
				title: 'Maschinenmodernisierung',
				link: '/dienstleistungen/maschinenmodernisierung',
				items: [
					{ label: 'Retrofit', link: '/dienstleistungen/maschinenmodernisierung/retrofit' },
					{ label: 'Überholung', link: '/dienstleistungen/maschinenmodernisierung/überholung' }
				]
			}
		]
	},

	{
		id: 3,
		label: 'Branchen',
		link: '/branchen',
		megaMenu: [
			{
				title: 'Branchen',
				link: '/branchen/branchen',
				items: [
					{ label: 'Automobil', link: '/branchen/branchen/automobil' },
					{ label: 'Schiffsbau', link: '/branchen/branchen/schiffsbau' },
					{ label: 'Modellbau', link: '/branchen/branchen/modellbau' },
					{ label: 'Kunststoffindustrie', link: '/branchen/branchen/kunststoffindustrie' },
					{ label: 'Betonindustrie', link: '/branchen/branchen/betonindustrie' },
					{ label: 'Werbetechnik', link: '/branchen/branchen/werbetechnik' },
					{ label: 'aerospace', link: '/branchen/branchen/aerospace' },
					{ label: 'Kunst', link: '/branchen/branchen/kunst' }
				]
			}
		]
	},
	{
		id: 4,
		label: 'Unternehmen',
		link: '/unternehmen',
		megaMenu: [
			{
				title: 'Über Uns',
				link: '/unternehmen/über-uns',
				items: [
					{ label: 'Werte', link: '/unternehmen/über-uns/werte' },
					{ label: 'Visionen', link: '/unternehmen/über-uns/vision' },
					{ label: 'Mission', link: '/unternehmen/über-uns/mission' },
					{ label: 'Nachhaltigkeit', link: '/unternehmen/über-uns/nachhaltigkeit' },
					{ label: 'Geschichte', link: '/unternehmen/über-uns/geschichte' }
				]
			},
			{
				title: 'Karriere',
				link: '/unternehmen/karriere',
				items: [{ label: 'Stellenausschreibung', link: '/unternehmen/karriere/stellenausschreibung' }]
			},
			{
				title: 'News',
				link: '/unternehmen/news',
				items: [
					{ label: 'Anwenderstories', link: '/unternehmen/news/anwenderstories' },
					{ label: 'Referenzen', link: '/unternehmen/news/referenzen' }
				]
			},
			{
				title: 'Team',
				link: '/unternehmen/team',
				items: [
					{ label: 'Berichte', link: '/unternehmen/team/berichte' },
					{ label: 'Messen', link: '/unternehmen/team/messen' }
				]
			}
		]
	}
] as const;
// en: [
// 	{
// 		id: 1,
// 		label: 'Products',
// 		link: '/produkte',
// 		megaMenu: [
// 			{
// 				title: 'Portal Milling Machines',
// 				link: '/portalfräsmaschinen',
// 				items: [
// 					{ label: 'FS 10', link: '/produkte/portalfräsmaschinen' },
// 					{ label: 'FS 15', link: '/products/2' },
// 					{ label: 'FS 20', link: '/products/3' },
// 					{ label: 'Hybrid - 3D', link: '/products/3' },
// 					{ label: 'Stock machines', link: '/products/3' }
// 				]
// 			},
// 			{
// 				title: 'Briquettpress',
// 				link: '/spänepressen',
// 				items: [
// 					{ label: 'Metalls', link: '/products/a' },
// 					{ label: 'Plastics', link: '/products/b' },
// 					{ label: 'Styrofoam', link: '/products/c' }
// 				]
// 			},
// 			{
// 				title: 'Styrofoam machining',
// 				link: '/styroporbearbeitung',
// 				items: [
// 					{ label: 'Milling Tools', link: '/products/x' },
// 					{ label: 'Hollow Milling Spindle', link: '/products/y' },
// 					{ label: 'Suction', link: '/products/3' },
// 					{ label: 'Shredder', link: '/products/3' },
// 					{ label: 'Presses', link: '/products/3' },
// 					{ label: 'Raw Material', link: '/products/3' },
// 					{ label: 'Adhesive', link: '/products/3' }
// 				]
// 			},
// 			{
// 				title: 'Used machines',
// 				link: '/produkte/gebrauchtmaschinen',
// 				items: [
// 					{ label: 'CNC - Sachines', link: '/produkte/gebrauchtmaschinen/cnc-maschinen' },
// 					{ label: 'CNC - Accessories', link: '/products/y' },
// 					{ label: 'Model Building Machines', link: '/products/3' },
// 					{ label: 'Woodworking Machines ', link: '/products/3' }
// 				]
// 			}
// 		]
// 	},
// 	{
// 		id: 2,
// 		label: 'Services',
// 		link: '/about',
// 		megaMenu: [
// 			{
// 				title: 'Machine Maintenance',
// 				link: '/',
// 				items: [
// 					{ label: 'Spindle Service', link: '/dienstleistungen/spindelservice' },
// 					{ label: 'Maintenance', link: '/products/2' },
// 					{ label: 'Repairs', link: '/products/3' },
// 					{ label: 'Moving Machines', link: '/products/3' }
// 				]
// 			},
// 			{
// 				title: 'Machine Marketing',
// 				link: '/',
// 				items: [
// 					{ label: 'Evaluation', link: '/products/a' },
// 					{ label: 'Mediation', link: '/products/b' },
// 					{ label: 'Purchase', link: '/products/c' }
// 				]
// 			},
// 			{
// 				title: 'Machine Modernization',
// 				link: '/',
// 				items: [
// 					{ label: 'Retrofit', link: '/products/x' },
// 					{ label: 'Overhaul', link: '/products/y' }
// 				]
// 			}
// 		]
// 	},

// 	{
// 		id: 3,
// 		label: 'Industries',
// 		link: '/branchen',
// 		megaMenu: [
// 			{
// 				title: 'Industries',
// 				link: '/',
// 				items: [
// 					{ label: 'Automotive', link: '/products/1' },
// 					{ label: 'Shipbuilding', link: '/products/2' },
// 					{ label: 'Modell Making', link: '/products/3' },
// 					{ label: 'Plastic Industrie', link: '/products/3' },
// 					{ label: 'Concrete Industrie', link: '/products/3' },
// 					{ label: 'Advertising Technology', link: '/products/3' },
// 					{ label: 'Aerospace', link: '/products/3' },
// 					{ label: 'Art', link: '/products/3' }
// 				]
// 			}
// 		]
// 	},
// 	{
// 		id: 4,
// 		label: 'Company',
// 		link: '/unternehmen',
// 		megaMenu: [
// 			{
// 				title: 'About us',
// 				link: '/',
// 				items: [
// 					{ label: 'Values', link: '/products/1' },
// 					{ label: 'Vision', link: '/products/2' },
// 					{ label: 'Mission', link: '/products/3' },
// 					{ label: 'Sustainability', link: '/products/3' },
// 					{ label: 'History', link: '/unternehmen/geschichte' }
// 				]
// 			},
// 			{
// 				title: 'Career',
// 				link: '/',
// 				items: [{ label: 'Job Openings', link: '/products/a' }]
// 			},
// 			{
// 				title: 'News',
// 				link: '/',
// 				items: [
// 					{ label: 'User Stories', link: '/products/x' },
// 					{ label: 'References', link: '/products/y' }
// 				]
// 			},
// 			{
// 				title: 'Team',
// 				link: '/',
// 				items: [
// 					{ label: 'Reports', link: '/products/x' },
// 					{ label: 'Fairs', link: '/products/y' }
// 				]
// 			}
// 		]
// 	}
// ]
