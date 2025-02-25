// typescript type für Menu Item
import image1 from "$lib/assets/images/logo1.jpeg"
import image2 from "$lib/assets/images/logo2.jpeg"
import image3 from "$lib/assets/images/logo3.jpeg"
import image4 from "$lib/assets/images/logo4.jpeg"
import image5 from "$lib/assets/images/logo5.jpeg"
import image6 from "$lib/assets/images/logo6.jpeg"
import image7 from "$lib/assets/images/logo1.jpeg"
import image8 from "$lib/assets/images/logo2.jpeg"

export type MenuRoute = typeof menu;

export const menu = [
	{
		id: 1,
		key: 'produkte',
		link: '/produkte',
		megaMenu: [
			{
				key: 'portalfraesmaschinen',
				link: '/produkte/portalfraesmaschinen',
				items: [
					{ key: 'fs10', link: '/produkte/portalfraesmaschinen/fs10' },
					{ key: 'fs15', link: '/produkte/portalfraesmaschinen/f15' },
					{ key: 'fs20', link: '/produkte/portalfraesmaschinen/fs20' },
					{ key: 'hybrid3D', link: '/produkte/portalfraesmaschinen/hybrid-3d' },
					{ key: 'vorratsmaschinen', link: '/produkte/portalfraesmaschinen/vorratsmaschinen' }
				]
			},
	 		{
		 		key: 'spaenepressen',
				link: '/produkte/spaenepressen',
				items: [
					{ key: 'metalle', link: '/produkte/spaenepressen/metalle' },
					{ key: 'kunststoffe', link: '/produkte/spaenepressen/kunststoffe' },
					{ key: 'styropor', link: '/produkte/spaenepressen/styropor' }
				]
			},
	 		{
	 			key: 'styroporbearbeitung',
	 			link: '/produkte/styroporbearbeitung',
	 			items: [
	 				{ key: 'fräswerkzeuge', link: '/produkte/styroporbearbeitung/fräswerkzeuge' },
	 				{ key: 'hohlfrässpindeln', link: '/produkte/styroporbearbeitung/hohlfrässpindeln' },
	 				{ key: 'absaugungen', link: '/produkte/styroporbearbeitung/absaugungen' },
	 				{ key: 'zerkleinerer', link: '/produkte/styroporbearbeitung/zerkleinerer' },
	 				{ key: 'pressen', link: '/produkte/styroporbearbeitung/pressen' },
	 				{ key: 'rohmaterial', link: '/produkte/styroporbearbeitung/rohmaterial' },
	 				{ key: 'kleber', link: '/produkte/styroporbearbeitung/kleber' }
	 			]
	 		},
	 		{
	 			key: 'gebrauchtmaschinen',
	 			link: '/produkte/gebrauchtmaschinen',
	 			items: [
	 				{ key: 'cnc-maschinen', link: '/produkte/gebrauchtmaschinen/cnc-maschinen' },
	 				{ key: 'cnc-zubehör', link: '/produkte/gebrauchtmaschinen/zubehör' },
	 				{ key: 'modellbaumaschinen', link: '/produkte/gebrauchtmaschinen/modellbaumaschinen' },
	 				{ key: 'holzbearbeitungsmaschinen', link: '/produkte/gebrauchtmaschinen/holzbearbeitungsmaschinen' }
	 			]
	 		},
	 	]
	 },
	 {
	 	id: 2,
	 	key: 'dienstleistungen',
	 	link: '/about',
	 	megaMenu: [
	 		{
	 			key: 'maschinenerhaltung',
	 			link: '/dienstleistungen/maschinenerhaltung',
	 			items: [
	 				{ key: 'spindelservice', link: '/dienstleistungen/maschinenerhaltung/spindelservice' },
	 				{ key: 'wartungen', link: '/dienstleistungen/maschinenerhaltung/wartungen' },
	 				{ key: 'reparaturen', link: '/dienstleistungen/maschinenerhaltung/reparaturen' },
	 				{ key: 'maschinenumzüge', link: '/dienstleistungen/maschinenerhaltung/maschinenumzüge' }
	 			]
	 		},
	 		{
	 			key: 'maschinenvermarktung',
	 			link: '/dienstleistungen/maschinenvermarktung',
	 			items: [
	 				{ key: 'bewertung', link: '/dienstleistungen/maschinenvermarktung/bewertung' },
	 				{ key: 'vermittlung', link: '/dienstleistungen/maschinenvermarktung/vermittlung' },
	 				{ key: 'ankauf', link: '/dienstleistungen/maschinenvermarktung/ankauf' }
	 			]
	 		},
	 		{
	 			key: 'maschinenmodernisierung',
	 			link: '/dienstleistungen/maschinenmodernisierung',
	 			items: [
	 				{ key: 'retrofit', link: '/dienstleistungen/maschinenmodernisierung/retrofit' },
	 				{ key: 'überholung', link: '/dienstleistungen/maschinenmodernisierung/überholung' }
	 			]
	 		}
	 	]
	 },
	 {
	 	id: 3,
	 	key: 'branchen',
	 	link: '/branchen',
	 	megaMenu: [
	 		{
	 			key: 'branchen',
	 			link: '/branchen/branchen',
	 			items: [
	 				{ key: 'automobil', link: '/branchen/branchen/automobil', ImageUrl: image1},
	 				{ key: 'schiffsbau', link: '/branchen/branchen/schiffsbau', ImageUrl: image2},
	 				{ key: 'modellbau', link: '/branchen/branchen/modellbau', ImageUrl: image3},
	 				{ key: 'kunststoffindustrie', link: '/branchen/branchen/kunststoffindustrie', ImageUrl: image4},
	 				{ key: 'betonindustrie', link: '/branchen/branchen/betonindustrie',  ImageUrl: image5 },
	 				{ key: 'werbetechnik', link: '/branchen/branchen/werbetechnik',  ImageUrl: image6},
	 				{ key: 'aerospace', link: '/branchen/branchen/aerospace',  ImageUrl: image7 },
	 				{ key: 'kunst', link: '/branchen/branchen/kunst', ImageUrl: image8 }
	 			]
	 		}
	 	]
	 },
	 {
	 	id: 4,
	 	key: 'unternehmen',
	 	link: '/unternehmen',
	 	megaMenu: [
	 		{
	 			key: 'überUns',
	 			link: '/unternehmen/über-uns',
	 			items: [
	 				{ key: 'werte-mission-vission', link: '/unternehmen/über-uns/werte' },
	 				{ key: 'nachhaltigkeit', link: '/unternehmen/über-uns/nachhaltigkeit' },
	 				{ key: 'geschichte', link: '/unternehmen/über-uns/geschichte' },
					{ key: 'team', link: '/unternehmen/über-uns/team'}
					
	 			]
	 		},
	 		{
	 			key: 'karriere',
	 			link: '/unternehmen/karriere',
	 			items: [
	 				{ key: 'stellenausschreibung', link: '/unternehmen/karriere/stellenausschreibung' }
				]
	 		},
	 		{
	 			key: 'news',
	 			link: '/unternehmen/news-termine',
	 			items: [
	 				{ key: 'anwenderstories', link: '/unternehmen/news-termine/#anwenderstories' },
	 				{ key: 'referenzen', link: '/unternehmen/news-termine/#referenzen' },
					{ key: 'berichte', link: '/unternehmen/news-termine/#berichte' },
	 				{ key: 'messen', link: '/unternehmen/news-termine/#messen' }
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
