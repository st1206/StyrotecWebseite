import { Icons } from '$lib/assets/icons';

export type MenuRoute = typeof menu;

export const menu = [
	{
		id: 1,
		key: 'products',
		menuRoutes: [
			{
				key: 'gantryMachines',
				anchor: null,
				routeChildren: [
					{ key: 'fs10', anchor: null },
					{ key: 'fs15', anchor: null },
					{ key: 'fs20', anchor: null },
					{ key: 'hybrid3D', anchor: null },
					{ key: 'stockMachines', anchor: null }
				]
			},
			{
				key: 'chipPresses',
				anchor: null,
				routeChildren: [
					{ key: 'metals', anchor: null },
					{ key: 'synthetics', anchor: null },
					{ key: 'styrofoam', anchor: null }
				]
			},
			{
				key: 'styrofoamProcessing',
				anchor: null,
				routeChildren: [
					{ key: 'millingTools', anchor: null },
					{ key: 'hollowMillingSpindles', anchor: null },
					{ key: 'suction', anchor: null },
					{ key: 'shredder', anchor: null },
					{ key: 'presses', anchor: null },
					{ key: 'rawmaterial', anchor: null },
					{ key: 'glue', anchor: null }
				]
			},
			{
				key: 'usedMachines',
				anchor: null,
				routeChildren: [
					{ key: 'cncMachines', anchor: null },
					// { key: 'cncComponentParts', link: '/produkte/gebrauchtmaschinen/cnc-zubehoer' },
					{ key: 'conventionalMachines', anchor: null } // ?!? Modellbaumaschinen !== Konventionelle
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
		key: 'services',
		menuRoutes: [
			{
				key: 'maschinenerhaltung',
				anchor: null,
				routeChildren: [
					{ key: 'spindelservice', anchor: null },
					{ key: 'wartungen', anchor: null },
					{ key: 'reparaturen', anchor: null },
					{ key: 'maschinenumzüge', anchor: null }
				]
			},
			{
				key: 'maschinenvermarktung',
				anchor: null,
				routeChildren: [
					{ key: 'bewertung', anchor: null },
					{ key: 'vermittlung', anchor: null },
					{ key: 'ankauf', anchor: null }
				]
			},
			{
				key: 'maschinenmodernisierung',
				anchor: null,
				routeChildren: [
					{ key: 'retrofit', anchor: null },
					{ key: 'überholung', anchor: null }
				]
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
		key: 'company',
		menuRoutes: [
			{
				key: 'aboutUs',
				anchor: null,
				routeChildren: [
					{ key: 'team', anchor: '#team' },
					{ key: 'history', anchor: '#historie' },
					{ key: 'values', anchor: '#werte' },
					{ key: 'sustainability', anchor: '#nachhaltigkeit' }
				]
			},
			{
				key: 'company',
				anchor: null,
				routeChildren: [{ key: 'jobs', anchor: null }]
			},
			{
				key: 'news',
				anchor: null,
				routeChildren: [
					{ key: 'references', anchor: null },
					{ key: 'fairs', anchor: null }
				]
			}
		]
	}
] as const;
