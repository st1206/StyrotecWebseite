import type {
	ApiAboutUsPageAboutUsPage,
	ApiBriquettingPressPageBriquettingPressPage,
	ApiCncMillsPageCncMillsPage,
	ApiDrillingMachinesPageDrillingMachinesPage,
	ApiFs10PageFs10Page,
	ApiFs15PageFs15Page,
	ApiFs20PageFs20Page,
	ApiGantryMachinesPageGantryMachinesPage,
	ApiHomeHome,
	ApiIndustriesPageIndustriesPage,
	ApiLegalNoticePageLegalNoticePage,
	ApiMetalsPageMetalsPage,
	ApiMillingToolsPageMillingToolsPage,
	ApiModelConstructionMachinesPageModelConstructionMachinesPage,
	ApiStyrofoamProcessingPageStyrofoamProcessingPage,
	ApiUsedMachinesDetailsPageUsedMachinesDetailsPage,
	ApiUsedMachinesPageUsedMachinesPage,
	ApiNewsPageNewsPage,
	ApiMachineModernizationPageMachineModernizationPage,
	ApiMachineMarketingPageMachineMarketingPage,
	ApiMachineMaintenancePageMachineMaintenancePage
} from '$lib/cmsTypes/contentTypes';
import { buildPopulateQuery } from './apiParamsBuilder';

// The mapping interface uses keys that match your cmsTypeKey values.
export interface CMSTypeMap {
	home: ApiHomeHome;
	briquettpressPage: ApiBriquettingPressPageBriquettingPressPage;
	styorofoamProcessingPage: ApiStyrofoamProcessingPageStyrofoamProcessingPage;
	gantryMachinesPage: ApiGantryMachinesPageGantryMachinesPage;
	fs10Page: ApiFs10PageFs10Page;
	fs15Page: ApiFs15PageFs15Page;
	fs20Page: ApiFs20PageFs20Page;
	metalsPage: ApiMetalsPageMetalsPage;
	industriesPage: ApiIndustriesPageIndustriesPage;
	millingToolsPage: ApiMillingToolsPageMillingToolsPage;
	aboutUsPage: ApiAboutUsPageAboutUsPage;
	usedMachinesPage: ApiUsedMachinesPageUsedMachinesPage;
	cncMillsPage: ApiCncMillsPageCncMillsPage;
	usedMachinesDetailsPage: ApiUsedMachinesDetailsPageUsedMachinesDetailsPage;
	modelConstructionMachinesPage: ApiModelConstructionMachinesPageModelConstructionMachinesPage;
	drillingMachinesPage: ApiDrillingMachinesPageDrillingMachinesPage;
	machineMaintenancePage: ApiMachineMaintenancePageMachineMaintenancePage;
	machineModernizationPage: ApiMachineModernizationPageMachineModernizationPage;
	machineMarketingPage: ApiMachineMarketingPageMachineMarketingPage;
	legalNotice: ApiLegalNoticePageLegalNoticePage;
	newsPage: ApiNewsPageNewsPage;
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
	legalNotice: {
		deSlug: 'impressum',
		enSlug: 'legal-notice',
		cmsTypeKey: 'legalNotice',
		cmsApiSlug: 'legal-notice-page',
		sections: [
			{
				sectionKey: 'defaultContent'
			}
		]
	},
	briquettPress: {
		deSlug: 'produkte/brikettierpressen',
		enSlug: 'products/briquetting-press',
		cmsTypeKey: 'briquettpressPage',
		cmsApiSlug: 'briquetting-press-page',
		sections: [
			{ sectionKey: 'heroCarousel' },
			{ sectionKey: 'heroTextImage' },
			{ sectionKey: 'uspList' },
			{ sectionKey: 'exploreMore' },
			{ sectionKey: 'contactForm' }
		]
	},
	styrofoamProcessing: {
		deSlug: 'produkte/styroporbearbeitung',
		enSlug: 'products/styrofoam-processing',
		cmsTypeKey: 'styorofoamProcessingPage',
		cmsApiSlug: 'styrofoam-processing-page',
		sections: [
			{ sectionKey: 'heroCarousel' },
			{ sectionKey: 'heroTextImage' },
			{ sectionKey: 'uspList' },
			{ sectionKey: 'exploreMore' },
			{ sectionKey: 'contactForm' }
		]
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
			{ sectionKey: 'exploreMore' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
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
			},
			{ sectionKey: 'contactForm' }
		]
	},

	fs15: {
		deSlug: 'produkte/portalfraesmaschinen/fs15',
		enSlug: 'products/gantry-machines/fs15',
		cmsTypeKey: 'fs15Page',
		cmsApiSlug: 'fs15-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'exploreVariants'
			},
			{
				sectionKey: 'optionBlocks'
			},
			{ sectionKey: 'contactForm' }
		]
	},

	fs20: {
		deSlug: 'produkte/portalfraesmaschinen/fs10',
		enSlug: 'products/gantry-machines/fs10',
		cmsTypeKey: 'fs20Page',
		cmsApiSlug: 'fs20-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'exploreVariants'
			},
			{
				sectionKey: 'optionBlocks'
			},
			{ sectionKey: 'contactForm' }
		]
	},

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
	},

	usedMachines: {
		deSlug: 'produkte/gebrauchtmaschinen',
		enSlug: 'products/used-machines',
		cmsTypeKey: 'usedMachinesPage',
		cmsApiSlug: 'used-machines-page',
		sections: [
			{
				sectionKey: 'heroCarousel'
			},
			{
				sectionKey: 'exploreMore'
			},
			{ sectionKey: 'contactForm' }
		]
	},

	usedMachinesDetails: {
		deSlug: 'produkte/gebrauchtmaschinen/{slug}/{id}',
		enSlug: 'products/used-machines/{slug}/{id}',
		cmsTypeKey: 'usedMachinesDetailsPage',
		cmsApiSlug: 'used-machines-details-page',
		sections: [
			{
				sectionKey: 'usedMachineDetails'
			}
		]
	},

	cncMills: {
		deSlug: 'produkte/gebrauchtmaschinen/cnc-fraesen',
		enSlug: 'products/used-machines/cnc-mills',
		cmsTypeKey: 'cncMillsPage',
		cmsApiSlug: 'cnc-mills-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'collectionTypeCards'
			},
			{
				sectionKey: 'seo'
			}
		]
	},

	modelConstructionMachines: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen',
		enSlug: 'produkte/gebrauchtmaschinen/model-construction-machines',
		cmsTypeKey: 'modelConstructionMachinesPage',
		cmsApiSlug: 'model-construction-machines-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'defaultCards'
			},
			{
				sectionKey: 'seo'
			},
			{
				sectionKey: 'contactForm'
			}
		]
	},

	drillingMachines: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen/bohrmaschinen',
		enSlug: 'produkte/gebrauchtmaschinen/model-construction-machines/drilling-machines',
		cmsTypeKey: 'drillingMachinesPage',
		cmsApiSlug: 'drilling-machines-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'collectionTypeCards'
			},
			{
				sectionKey: 'seo'
			},
			{
				sectionKey: 'contactForm'
			}
		]
	},

	machineMaintenance: {
		deSlug: 'dienstleistungen/maschinenerhaltung',
		enSlug: 'services/machine-maintenance',
		cmsTypeKey: 'machineMaintenancePage',
		cmsApiSlug: 'machine-maintenance-page',
		sections: [
			{ sectionKey: 'heroCarousel' },
			{ sectionKey: 'heroTextImage' },
			{ sectionKey: 'uspList' },
			{ sectionKey: 'pageHeader' },
			{ sectionKey: 'uspListOne' },
			{ sectionKey: 'history' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	machineModernization: {
		deSlug: 'dienstleistungen/maschinenmodernisierung',
		enSlug: 'services/machine-modernization',
		cmsTypeKey: 'machineModernizationPage',
		cmsApiSlug: 'machine-modernization-page',
		sections: [
			{ sectionKey: 'heroCarousel' },
			{ sectionKey: 'heroTextImage' },
			{ sectionKey: 'uspList' },
			{ sectionKey: 'exploreMore' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	machineMarketing: {
		deSlug: 'dienstleistungen/maschinenvermarktung',
		enSlug: 'services/machine-marketing',
		cmsTypeKey: 'machineMarketingPage',
		cmsApiSlug: 'machine-marketing-page',
		sections: [
			{ sectionKey: 'heroCarousel' },
			{ sectionKey: 'heroTextImage' },
			{ sectionKey: 'uspList' },
			{ sectionKey: 'exploreMore' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	news: {
		deSlug: 'unternehmen/news',
		enSlug: 'company/news',
		cmsTypeKey: 'newsPage',
		cmsApiSlug: 'news-page',
		sections: [
			{
				sectionKey: 'pageHeader'
			},
			{
				sectionKey: 'collectionTypeCards'
			},
			{
				sectionKey: 'pageHeaderTwo'
			},
			{
				sectionKey: 'collectionTypeCardsTwo'
			}
		]
	}
};
export const pages: Record<string, PageContent> = withApiParams(pagesConfig);
