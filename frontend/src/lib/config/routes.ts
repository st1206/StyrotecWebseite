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
				key: 'briquettPress',
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
					{ key: 'adhesives', anchor: null }
				]
			},
			{
				key: 'usedMachines',
				anchor: null,
				routeChildren: [
					{ key: 'cncMills', anchor: null },
					{ key: 'modelConstructionMachines', anchor: null }
				]
			}
		]
	},
	{
		id: 2,
		key: 'services',
		menuRoutes: [
			{
				key: 'machineMaintenance',
				anchor: null,
				routeChildren: [
					{ key: 'spindleService', anchor: null },
					{ key: 'maintenance', anchor: null },
					{ key: 'repairs', anchor: null },
					{ key: 'machineRelocation', anchor: null }
				]
			},
			{
				key: 'machineMarketing',
				anchor: null,
				routeChildren: [
					{ key: 'evaluation', anchor: null },
					{ key: 'mediation', anchor: null },
					{ key: 'purchase', anchor: null }
				]
			},
			{
				key: 'machineModernization',
				anchor: null,
				routeChildren: [
					{ key: 'retrofit', anchor: null },
					{ key: 'overhaul', anchor: null }
				]
			}
		]
	},
	{
		id: 3,
		key: 'industries',
		menuRoutes: [
			{ key: 'automotive', anchor: '#automobil', icon: Icons.automotiveIndustry },
			{ key: 'shipbuilding', anchor: '#schiffsbau', icon: Icons.shipBuildingIndustry },
			{ key: 'aerospace', anchor: '#aerospace', icon: Icons.aerospaceIndustry },
			{ key: 'modelMaking', anchor: '#modellbau', icon: Icons.modelMakingIndustry },
			{ key: 'plasticIndustry', anchor: '#kunststoffindustrie', icon: Icons.plasticsIndustry },
			{ key: 'concreteIndustry', anchor: '#betonindustrie', icon: Icons.concreteIndustry },
			{ key: 'advertisingTechnology', anchor: '#werbetechnik', icon: Icons.adIndustry },
			{ key: 'art', anchor: '#kunst', icon: Icons.artIndustry }
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
				key: 'career',
				anchor: null,
				routeChildren: [{ key: 'jobPosting', anchor: null }]
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
