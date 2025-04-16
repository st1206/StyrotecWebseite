import auto from '$lib/assets/images/branchen/auto_hell.png';
import ads from '$lib/assets/images/branchen/ads_hell.png';
import art from '$lib/assets/images/branchen/art_hell.png';
import beton from '$lib/assets/images/branchen/beton_hell.png';
import kunststoff from '$lib/assets/images/branchen/kunststoff_hell.png';
import modell from '$lib/assets/images/branchen/modell_hell.png';
import plane from '$lib/assets/images/branchen/plane_hell.png';
import ship from '$lib/assets/images/branchen/ship_hell.png';

export type MenuRoute = typeof menu;

export const menu = [
	{
		id: 1,
		key: 'products',
		megaMenu: [
			{
				key: 'gantryMachines',
				items: [
					{ key: 'fs10', link: '/produkte/portalfraesmaschinen/fs10' },
					{ key: 'fs15', link: '/produkte/portalfraesmaschinen/fs15' },
					{ key: 'fs20', link: '/produkte/portalfraesmaschinen/fs20' },
					{ key: 'hybrid3D', link: '/produkte/portalfraesmaschinen/hybrid-3d' },
					{ key: 'stockMachines', link: '/produkte/portalfraesmaschinen/vorratsmaschinen' }
				]
			},
			{
				key: 'chipPresses',
				items: [
					{ key: 'metals', link: '/produkte/spaenepressen/metalle' },
					{ key: 'synthetics', link: '/produkte/spaenepressen/kunststoffe' },
					{ key: 'styrofoam', link: '/produkte/spaenepressen/styropor' }
				]
			},
			{
				key: 'styrofoamProcessing',
				items: [
					{ key: 'millingTools', link: '/produkte/styroporbearbeitung/fräswerkzeuge' },
					{ key: 'hollowMillingSpindles', link: '/produkte/styroporbearbeitung/hohlfrässpindeln' },
					{ key: 'suction', link: '/produkte/styroporbearbeitung/absaugungen' },
					{ key: 'shredder', link: '/produkte/styroporbearbeitung/zerkleinerer' },
					// { key: 'presses', link: '/produkte/spaenepressen/styropor' },
					{ key: 'material', link: '/produkte/styroporbearbeitung/material/#rohmaterial' },
					{ key: 'material', link: '/produkte/styroporbearbeitung/material/#kleber' }
				]
			},
			{
				key: 'usedMachines',
				items: [
					{ key: 'cncMachines', link: '/produkte/gebrauchtmaschinen/cnc-maschinen' },
					// { key: 'cncComponentParts', link: '/produkte/gebrauchtmaschinen/cnc-zubehoer' },
					{ key: 'conventionalMachines', link: '/produkte/gebrauchtmaschinen/modellbaumaschinen' } // ?!? Modellbaumaschinen !== Konventionelle
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
					{ key: 'automobil', link: '/branchen/#automobil', ImageUrl: auto },
					{ key: 'schiffsbau', link: '/branchen/#schiffsbau', ImageUrl: ship },
					{ key: 'aerospace', link: '/branchen/#aerospace', ImageUrl: plane },
					{ key: 'modellbau', link: '/branchen/#modellbau', ImageUrl: modell },
					{
						key: 'kunststoffindustrie',
						link: '/branchen/#kunststoffindustrie',
						ImageUrl: kunststoff
					},
					{ key: 'betonindustrie', link: '/branchen/#betonindustrie', ImageUrl: beton },
					{ key: 'werbetechnik', link: '/branchen/#werbetechnik', ImageUrl: ads },
					{ key: 'kunst', link: '/branchen/#kunst', ImageUrl: art }
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
				key: 'ueberUns',
				link: '/unternehmen/ueber-uns',
				items: [
					{ key: 'team', link: '/unternehmen/ueber-uns/#team' },
					{ key: 'werte-mission-vission', link: '/unternehmen/ueber-uns/#werte' },
					{ key: 'historie', link: '/unternehmen/ueber-uns/#historie' },
					{ key: 'nachhaltigkeit', link: '/unternehmen/ueber-uns/#nachhaltigkeit' }
				]
			},
			{
				key: 'karriere',
				link: '/unternehmen/karriere',
				items: [
					{ key: 'stellenausschreibung', link: '/unternehmen/karriere/#stellenausschreibung' }
				]
			},
			{
				key: 'news',
				link: '/unternehmen/news-termine',
				items: [
					//{ key: 'anwenderstories', link: '/unternehmen/news-termine/#anwenderstories' },
					{ key: 'referenzen', link: '/unternehmen/news-termine/#referenzen' },
					{ key: 'messen', link: '/unternehmen/news-termine/#messen' }
				]
			}
		]
	}
] as const;
