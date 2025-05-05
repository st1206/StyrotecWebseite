import { Icons } from '$lib/assets/icons';

export type MenuRoute = typeof menu;

export const menu = [
	{
		id: 1,
		key: 'products',
		menuRoutes: [
			{
				key: 'gantryMachines',
				routeChildren: [
					{ key: 'fs10' },
					{ key: 'fs15' },
					{ key: 'fs20' },
					{ key: 'hybrid3D' },
					{ key: 'stockMachines' }
				]
			},
			{
				key: 'chipPresses',
				routeChildren: [{ key: 'metals' }, { key: 'synthetics' }, { key: 'styrofoam' }]
			},
			{
				key: 'styrofoamProcessing',
				routeChildren: [
					{ key: 'millingTools' },
					{ key: 'hollowMillingSpindles' },
					{ key: 'suction' },
					{ key: 'shredder' },
					{ key: 'presses' },
					{ key: 'rawmaterial' },
					{ key: 'glue' }
				]
			},
			{
				key: 'usedMachines',
				routeChildren: [
					{ key: 'cncMachines' },
					// { key: 'cncComponentParts', link: '/produkte/gebrauchtmaschinen/cnc-zubehoer' },
					{ key: 'conventionalMachines' } // ?!? Modellbaumaschinen !== Konventionelle
					// {
					// 	key: 'holzbearbeitungsmaschinen',
					// 	link: '/produkte/gebrauchtmaschinen/modellbaumaschinen'
					// }
				]
			}
		]
	},
	{
		id: 2,
		key: 'dienstleistungen',
		menuRoutes: [
			{
				key: 'maschinenerhaltung',
				routeChildren: [
					{ key: 'spindelservice' },
					{ key: 'wartungen' },
					{ key: 'reparaturen' },
					{ key: 'maschinenumzüge' }
				]
			},
			{
				key: 'maschinenvermarktung',
				link: '/dienstleistungen/maschinenvermarktung',
				routeChildren: [{ key: 'bewertung' }, { key: 'vermittlung' }, { key: 'ankauf' }]
			},
			{
				key: 'maschinenmodernisierung',
				link: '/dienstleistungen/maschinenmodernisierung',
				routeChildren: [{ key: 'retrofit' }, { key: 'überholung' }]
			}
		]
	},
	{
		id: 3,
		key: 'industries',
		menuRoutes: [
			{ key: 'automobil', anchor: '#automobil', icon: Icons.automotiveIndustry },
			{ key: 'schiffsbau', anchor: '#schiffsbau', icon: Icons.shipBuildingIndustry },
			{ key: 'aerospace', anchor: '#aerospace', icon: Icons.aerospaceIndustry },
			{ key: 'modellbau', anchor: '#modellbau', icon: Icons.modelMakingIndustry },
			{
				key: 'kunststoffindustrie',
				anchor: '#kunststoffindustrie',
				icon: Icons.plasticsIndustry
			},
			{
				key: 'betonindustrie',
				anchor: '#betonindustrie',
				icon: Icons.concreteIndustry
			},
			{ key: 'werbetechnik', anchor: '#werbetechnik', icon: Icons.adIndustry },
			{ key: 'kunst', anchor: '#kunst', icon: Icons.artIndustry }
		]
	},
	{
		id: 4,
		key: 'unternehmen',
		menuRoutes: [
			{
				key: 'ueberUns',
				routeChildren: [
					{ key: 'team', link: '/unternehmen/ueber-uns/#team' },
					{ key: 'werte-mission-vission', link: '/unternehmen/ueber-uns/#werte' },
					{ key: 'historie', link: '/unternehmen/ueber-uns/#historie' },
					{ key: 'nachhaltigkeit', link: '/unternehmen/ueber-uns/#nachhaltigkeit' }
				]
			},
			{
				key: 'karriere',
				link: '/unternehmen/karriere',
				routeChildren: [
					{ key: 'stellenausschreibung', link: '/unternehmen/karriere/#stellenausschreibung' }
				]
			},
			{
				key: 'news',
				link: '/unternehmen/news-termine',
				routeChildren: [
					//{ key: 'anwenderstories', link: '/unternehmen/news-termine/#anwenderstories' },
					{ key: 'referenzen', link: '/unternehmen/news-termine/#referenzen' },
					{ key: 'messen', link: '/unternehmen/news-termine/#messen' }
				]
			}
		]
	}
] as const;
