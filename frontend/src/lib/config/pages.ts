import type {
	ApiChipPressesPageChipPressesPage,
	ApiFs10PageFs10Page,
	ApiFs15PageFs15Page,
	ApiGantryMachinesPageGantryMachinesPage,
	ApiHomeHome,
	ApiMetalsPageMetalsPage
} from '$lib/cmsTypes/contentTypes';

// The mapping interface uses keys that match your cmsTypeKey values.
export interface CMSTypeMap {
	home: ApiHomeHome;
	gantryMachinesPage: ApiGantryMachinesPageGantryMachinesPage;
	fs10Page: ApiFs10PageFs10Page;
	fs15Page: ApiFs15PageFs15Page;
	chipPressesPage: ApiChipPressesPageChipPressesPage;
	metalsPage: ApiMetalsPageMetalsPage;
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
		props: Record<string, any>; // eslint-disable-line
	}>;
};

// A unified pages object: each page is keyed by a unique page identifier.
export const pages: Record<string, PageContent> = {
	gantryMachines: {
		deSlug: 'produkte/portalfraesmaschinen',
		enSlug: 'products/gantry-machines',
		cmsApiParams:
			'populate=heroCarousel.images&populate=basicTextImage.image&populate=uspList&populate=exploreMore.previewCards.thumbnail',
		cmsTypeKey: 'gantryMachinesPage',
		cmsApiSlug: 'gantry-machines-page',
		sections: [
			{ sectionKey: 'heroCarousel', props: { headline: 'Karussel' } },
			{ sectionKey: 'basicTextImage', props: { headline: 'Basic Text Image' } },
			{ sectionKey: 'uspList', props: { headliner: 'USP List' } },
			{ sectionKey: 'exploreMore', props: { headliner: 'Preview Cards' } }
		]
	},

	fs10: {
		deSlug: 'produkte/portalfraesmaschinen/fs10',
		enSlug: 'products/gantry-machines/fs10',
		cmsApiParams:
			'populate=heroDualImage.image&populate=heroDualImage.basicTextImage.image&populate=exploreVariants.variantCards.image&populate=exploreVariants.variantCards.accordionItems.accordionItemLines&populate=exploreOptions.options.optionItems.image',
		cmsTypeKey: 'fs10Page',
		cmsApiSlug: 'fs10-page',
		sections: [
			{
				sectionKey: 'heroDualImage',
				props: { headline: 'FS 10' }
			},
			{
				sectionKey: 'exploreVariants',
				props: { headline: 'Explore Variants' }
			},
			{
				sectionKey: 'exploreOptions',
				props: { headline: 'Explore Options' }
			}
		]
	},

	fs15: {
		deSlug: 'produkte/portalfraesmaschinen/fs15',
		enSlug: 'products/gantry-machines/fs15',
		cmsApiParams:
			'populate=heroDualImage.image&populate=heroDualImage.basicTextImage.image&populate=exploreVariants.variantCards.image&populate=exploreVariants.variantCards.accordionItems.accordionItemLines&populate=exploreOptions.options.optionItems.image',
		cmsTypeKey: 'fs15Page',
		cmsApiSlug: 'fs15-page',
		sections: [
			{
				sectionKey: 'heroDualImage',
				props: { headline: 'FS 15' }
			},
			{
				sectionKey: 'exploreVariants',
				props: { headline: 'Explore Variants' }
			},
			{
				sectionKey: 'exploreOptions',
				props: { headline: 'Explore Options' }
			}
		]
	},

	chipPresses: {
		deSlug: 'produkte/spaenepressen',
		enSlug: 'products/chip-presses',
		cmsTypeKey: 'chipPressesPage',
		cmsApiParams:
			'populate=heroCarousel.images&populate=basicTextImage.image&populate=uspList&populate=exploreMore.previewCards.thumbnail',
		cmsApiSlug: 'chip-presses-page',
		sections: [
			{ sectionKey: 'heroCarousel', props: { headline: 'Karussel' } },
			{ sectionKey: 'basicTextImage', props: { headline: 'Basic Text Image' } },
			{ sectionKey: 'uspList', props: { headliner: 'USP List' } },
			{ sectionKey: 'exploreMore', props: { headliner: 'Preview Cards' } }
		]
	},

	metals: {
		deSlug: 'produkte/spaenepressen/metalle',
		enSlug: 'products/chip-presses/metals',
		cmsTypeKey: 'metalsPage',
		cmsApiParams:
			'populate=heroDualImage.image&populate=heroDualImage.basicTextImage.image&populate=exploreVariants.variantCards.image&populate=exploreVariants.variantCards.accordionItems.accordionItemLines&populate=exploreOptions.options.optionItems.image',
		cmsApiSlug: 'metals-page',
		sections: [
			{
				sectionKey: 'heroDualImage',
				props: { headline: 'Metalle' }
			},
			{
				sectionKey: 'exploreVariants',
				props: { headline: 'Explore Variants' }
			},
			{
				sectionKey: 'exploreOptions',
				props: { headline: 'Explore Options' }
			}
		]
	}
};
