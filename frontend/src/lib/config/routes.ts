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
				link: '/portalfräsmaschinen',
				items: [
					{ label: 'FS 10', link: '/produkte/portalfräsmaschinen' },
					{ label: 'FS 15', link: '/products/2' },
					{ label: 'FS 20', link: '/products/3' },
					{ label: 'Hybrid - 3D', link: '/products/3' },
					{ label: 'Vorratsmaschinen', link: '/products/3' }
				]
			},
			{
				title: 'Spänepressen',
				link: '/spänepressen',
				items: [
					{ label: 'Metalle', link: '/products/a' },
					{ label: 'Kunststoffe', link: '/products/b' },
					{ label: 'Styropor', link: '/products/c' }
				]
			},
			{
				title: 'Styroporbearbeitung',
				link: '/styroporbearbeitung',
				items: [
					{ label: 'Fräswerkzeuge', link: '/products/x' },
					{ label: 'Hohlfrässpindeln', link: '/products/y' },
					{ label: 'Absaugungen', link: '/products/3' },
					{ label: 'Zerkleinerer', link: '/products/3' },
					{ label: 'Pressen', link: '/products/3' },
					{ label: 'Rohmaterial', link: '/products/3' },
					{ label: 'Kleber', link: '/products/3' }
				]
			},
			{
				title: 'Gebrauchtmaschinen',
				link: '/produkte/gebrauchtmaschinen',
				items: [
					{ label: 'CNC - Maschinen', link: '/produkte/gebrauchtmaschinen/cnc-maschinen' },
					{ label: 'CNC - Zubehör', link: '/products/y' },
					{ label: 'Modellbaumaschinen', link: '/products/3' },
					{ label: 'Holzbearbeitungsmaschinen', link: '/products/3' }
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
				link: '/',
				items: [
					{ label: 'Spindelservice', link: '/dienstleistungen/spindelservice' },
					{ label: 'Wartungen', link: '/products/2' },
					{ label: 'Reparaturen', link: '/products/3' },
					{ label: 'Maschinenumzüge', link: '/products/3' }
				]
			},
			{
				title: 'Maschinenvermarktung',
				link: '/',
				items: [
					{ label: 'Bewertung', link: '/products/a' },
					{ label: 'Vermittlung', link: '/products/b' },
					{ label: 'Ankauf', link: '/products/c' }
				]
			},
			{
				title: 'Maschinenmodernisierung',
				link: '/',
				items: [
					{ label: 'Retrofit', link: '/products/x' },
					{ label: 'Überholung', link: '/products/y' }
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
				link: '/',
				items: [
					{ label: 'Automobil', link: '/products/1' },
					{ label: 'Schiffsbau', link: '/products/2' },
					{ label: 'Modellbau', link: '/products/3' },
					{ label: 'Kunststoffindustrie', link: '/products/3' },
					{ label: 'Betonindustrie', link: '/products/3' },
					{ label: 'Werbetechnik', link: '/products/3' },
					{ label: 'aerospace', link: '/products/3' },
					{ label: 'Kunst', link: '/products/3' }
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
				link: '/',
				items: [
					{ label: 'Werte', link: '/products/1' },
					{ label: 'Visionen', link: '/products/2' },
					{ label: 'Mission', link: '/products/3' },
					{ label: 'Nachhaltigkeit', link: '/products/3' },
					{ label: 'Geschichte', link: '/unternehmen/geschichte' }
				]
			},
			{
				title: 'Karriere',
				link: '/',
				items: [{ label: 'Stellenausschreibung', link: '/products/a' }]
			},
			{
				title: 'News',
				link: '/',
				items: [
					{ label: 'Anwenderstories', link: '/products/x' },
					{ label: 'Referenzen', link: '/products/y' }
				]
			},
			{
				title: 'Team',
				link: '/',
				items: [
					{ label: 'Berichte', link: '/products/x' },
					{ label: 'Messen', link: '/products/y' }
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
