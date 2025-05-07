import type {
	ApiAboutUsPageAboutUsPage,
	ApiChipPressesPageChipPressesPage,
	ApiFs10PageFs10Page,
	ApiFs15PageFs15Page,
	ApiFs20PageFs20Page,
	ApiGantryMachinesPageGantryMachinesPage,
	ApiHomeHome,
	ApiIndustriesPageIndustriesPage,
	ApiMetalsPageMetalsPage,
	ApiMillingToolsPageMillingToolsPage
} from '$lib/cmsTypes/contentTypes';
import { buildPopulateQuery } from './apiParamsBuilder';

// The mapping interface uses keys that match your cmsTypeKey values.
export interface CMSTypeMap {
	home: ApiHomeHome;
	gantryMachinesPage: ApiGantryMachinesPageGantryMachinesPage;
	fs10Page: ApiFs10PageFs10Page;
	fs15Page: ApiFs15PageFs15Page;
	fs20Page: ApiFs20PageFs20Page;
	chipPressesPage: ApiChipPressesPageChipPressesPage;
	metalsPage: ApiMetalsPageMetalsPage;
	industriesPage: ApiIndustriesPageIndustriesPage;
	millingToolsPage: ApiMillingToolsPageMillingToolsPage;
	aboutUsPage: ApiAboutUsPageAboutUsPage;
}

// Define the supported languages
export type Lang = 'de' | 'en';

// Template literal for the slug key (e.g. "deSlug" or "enSlug")
export type SlugKey = `${Lang}Slug`;

// Core shape of a page
export type PageContent = {
	deSlug: string;
	enSlug: string;
	cmsTypeKey: keyof CMSTypeMap;
	cmsApiSlug: string;
	cmsApiParams?: string;
	sections: Array<{
		sectionKey: string;
		props?: Record<string, any>; // eslint-disable-line
	}>;
};

function withApiParams<T extends Record<string, PageContent>>(obj: T): T {
	for (const page of Object.values(obj)) {
		if (!page.cmsApiParams) {
			page.cmsApiParams = buildPopulateQuery(page.sections.map((s) => s.sectionKey));
		}
	}
	return obj;
}

// A unified pages object: each page is keyed by a unique page identifier.
const pagesConfig: Record<string, PageContent> = {
	home: {
		deSlug: 'start',
		enSlug: 'home',
		cmsTypeKey: 'home',
		cmsApiSlug: 'home',
		sections: []
	},

	gantryMachines: {
		deSlug: 'produkte/portalfraesmaschinen',
		enSlug: 'products/gantry-machines',
		cmsTypeKey: 'gantryMachinesPage',
		cmsApiSlug: 'gantry-machines-page',
		sections: [
			{ sectionKey: 'heroCarousel' },
			{ sectionKey: 'heroTextImage' },
			{ sectionKey: 'uspList' },
			{ sectionKey: 'exploreMore' }
		]
	},

	fs10: {
		deSlug: 'produkte/portalfraesmaschinen/fs10',
		enSlug: 'products/gantry-machines/fs10',
		cmsTypeKey: 'fs10Page',
		cmsApiSlug: 'fs10-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'exploreVariants'
			},
			{
				sectionKey: 'optionBlocks'
			}
		]
	},

	// fs15: {
	// 	deSlug: 'produkte/portalfraesmaschinen/fs15',
	// 	enSlug: 'products/gantry-machines/fs15',
	// 	cmsTypeKey: 'fs15Page',
	// 	cmsApiSlug: 'fs15-page',
	// 	sections: [
	// 		{
	// 			sectionKey: 'heroDualImage'
	// 		},
	// 		{
	// 			sectionKey: 'exploreVariants'
	// 		},
	// 		{
	// 			sectionKey: 'exploreOptions'
	// 		}
	// 	]
	// },

	// fs20: {
	// 	deSlug: 'produkte/portalfraesmaschinen/fs20',
	// 	enSlug: 'products/gantry-machines/fs20',
	// 	cmsTypeKey: 'fs20Page',
	// 	cmsApiSlug: 'fs20-page',
	// 	sections: [{ sectionKey: 'heroDualImage' }]
	// },

	// chipPresses: {
	// 	deSlug: 'produkte/brikettierpressen',
	// 	enSlug: 'products/chip-presses',
	// 	cmsTypeKey: 'chipPressesPage',
	// 	cmsApiSlug: 'chip-presses-page',
	// 	sections: [
	// 		{ sectionKey: 'heroCarousel' },
	// 		{ sectionKey: 'heroTextImage' },
	// 		{ sectionKey: 'uspList' },
	// 		{ sectionKey: 'exploreMore' }
	// 	]
	// },

	// metals: {
	// 	deSlug: 'produkte/brikettierpressen/metalle',
	// 	enSlug: 'products/chip-presses/metals',
	// 	cmsTypeKey: 'metalsPage',
	// 	cmsApiSlug: 'metals-page',
	// 	sections: [
	// 		{
	// 			sectionKey: 'heroDualImage'
	// 		},
	// 		{
	// 			sectionKey: 'exploreVariants'
	// 		}
	// 	]
	// },

	industries: {
		deSlug: 'branchen',
		enSlug: 'industries',
		cmsTypeKey: 'industriesPage',
		cmsApiSlug: 'industries-page',
		sections: [
			{
				sectionKey: 'pageHeader'
			},
			{
				sectionKey: 'defaultCards'
			}
		]
	},

	// millingTools: {
	// 	deSlug: 'produkte/styroporbearbeitung/fraeswerkzeuge',
	// 	enSlug: 'products/styrofoam-processing/milling-tools',
	// 	cmsTypeKey: 'millingToolsPage',
	// 	cmsApiSlug: 'milling-tools-page',
	// 	sections: [
	// 		{
	// 			sectionKey: 'defaultContent'
	// 		}
	// 	]
	// },

	aboutUs: {
		deSlug: 'unternehmen/ueber-uns',
		enSlug: 'company/about-us',
		cmsTypeKey: 'aboutUsPage',
		cmsApiSlug: 'about-us-page',
		sections: [
			{
				sectionKey: 'heroMedia'
			},
			{
				sectionKey: 'history'
			},
			{
				sectionKey: 'defaultCards'
			},
			{
				sectionKey: 'defaultCardsTwo'
			}
		]
	}
};
export const pages: Record<string, PageContent> = withApiParams(pagesConfig);
