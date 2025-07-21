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
	ApiPlasticsPagePlasticsPage,
	ApiStyrofoamPageStyrofoamPage,
	ApiMillingToolsPageMillingToolsPage,
	ApiModelConstructionMachinesPageModelConstructionMachinesPage,
	ApiStyrofoamProcessingPageStyrofoamProcessingPage,
	ApiUsedMachinesDetailsPageUsedMachinesDetailsPage,
	ApiUsedMachinesPageUsedMachinesPage,
	ApiNewsPageNewsPage,
	ApiMachineModernizationPageMachineModernizationPage,
	ApiMachineMarketingPageMachineMarketingPage,
	ApiMachineMaintenancePageMachineMaintenancePage,
	ApiHybridPageHybridPage,
	ApiInstockPageInstockPage,
	ApiHollowMillingSpindlePageHollowMillingSpindlePage,
	ApiSuctionSystemPageSuctionSystemPage,
	ApiShredderPageShredderPage,
	ApiPressesPagePressesPage,
	ApiRawMaterialPageRawMaterialPage,
	ApiAdhesivePageAdhesivePage
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
	hybridPage: ApiHybridPageHybridPage;
	instockPage: ApiInstockPageInstockPage;
	metalsPage: ApiMetalsPageMetalsPage;
	plasticsPage: ApiPlasticsPagePlasticsPage;
	styrofoamPage: ApiStyrofoamPageStyrofoamPage;
	industriesPage: ApiIndustriesPageIndustriesPage;
	millingToolsPage: ApiMillingToolsPageMillingToolsPage;
	hollowMillingSpindlePage: ApiHollowMillingSpindlePageHollowMillingSpindlePage;
	suctionSystemPage: ApiSuctionSystemPageSuctionSystemPage;
	shredderPage: ApiShredderPageShredderPage;
	pressesPage: ApiPressesPagePressesPage;
	rawMaterialPage: ApiRawMaterialPageRawMaterialPage;
	adhesivePage: ApiAdhesivePageAdhesivePage;
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
	metals: {
		deSlug: 'produkte/brikettierpressen/metalle',
		enSlug: 'products/briquetting-press/metals',
		cmsTypeKey: 'metalsPage',
		cmsApiSlug: 'metals-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'exploreVariants' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},
	plastics: {
		deSlug: 'produkte/brikettierpressen/plastik',
		enSlug: 'products/briquetting-press/plastics',
		cmsTypeKey: 'plasticsPage',
		cmsApiSlug: 'plastics-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'exploreVariants' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},
	styrofoam: {
		deSlug: 'produkte/brikettierpressen/styropor',
		enSlug: 'products/briquetting-press/styrofoam',
		cmsTypeKey: 'styrofoamPage',
		cmsApiSlug: 'styrofoam-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'exploreVariants' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
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
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	millingTools: {
		deSlug: 'produkte/styroporbearbeitung/fräswerkzeuge',
		enSlug: 'products/styrofoam-processing/milling-tools',
		cmsTypeKey: 'millingToolsPage',
		cmsApiSlug: 'milling-tools-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	hollowMillingSpindle: {
		deSlug: 'produkte/styroporbearbeitung/hohlfrässpindeln',
		enSlug: 'products/styrofoam-processing/hollow-milling-spindle',
		cmsTypeKey: 'hollowMillingSpindlePage',
		cmsApiSlug: 'hollow-milling-spindle-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	suctionSystems: {
		deSlug: 'produkte/styroporbearbeitung/absaugungen',
		enSlug: 'products/styrofoam-processing/suction-systems',
		cmsTypeKey: 'suctionSystemPage',
		cmsApiSlug: 'suction-system-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	shredder: {
		deSlug: 'produkte/styroporbearbeitung/zerkleinerer',
		enSlug: 'products/styrofoam-processing/shredder',
		cmsTypeKey: 'shredderPage',
		cmsApiSlug: 'shredder-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	presses: {
		deSlug: 'produkte/brikettierpressen/styropor',
		enSlug: 'products/briquetting-press/styrofoam',
		cmsTypeKey: 'styrofoamPage',
		cmsApiSlug: 'styrofoam-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'exploreVariants' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	rawMaterial: {
		deSlug: 'produkte/styroporbearbeitung/rohmaterial',
		enSlug: 'products/styrofoam-processing/raw-materials',
		cmsTypeKey: 'rawMaterialPage',
		cmsApiSlug: 'raw-material-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	adhesive: {
		deSlug: 'produkte/styroporbearbeitung/kleber',
		enSlug: 'products/styrofoam-processing/adhesive',
		cmsTypeKey: 'adhesivePage',
		cmsApiSlug: 'adhesive-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
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

	hybrid: {
		deSlug: 'produkte/portalfraesmaschinen/hybrid',
		enSlug: 'products/gantry-machines/hybrid',
		cmsTypeKey: 'hybridPage',
		cmsApiSlug: 'hybrid-page',
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
			{ sectionKey: 'contactForm' },
			{
				sectionKey: 'seo'
			}
		]
	},
	instock: {
		deSlug: 'produkte/portalfraesmaschinen/vorratsmaschinen',
		enSlug: 'products/gantry-machines/instock',
		cmsTypeKey: 'instockPage',
		cmsApiSlug: 'instock-page',
		sections: [
			{
				sectionKey: 'heroDualImage'
			},
			{
				sectionKey: 'exploreMore'
			},
			{ sectionKey: 'contactForm' },
			{
				sectionKey: 'seo'
			}
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

	woodworkingMachines: {
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
			{ sectionKey: 'pageHeaderTwo' },
			{ sectionKey: 'pageHeaderThree' },
			{ sectionKey: 'pageHeaderFour' },
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
			{ sectionKey: 'pageHeader' },
			{ sectionKey: 'pageHeaderTwo' },
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
			{ sectionKey: 'pageHeader' },
			{ sectionKey: 'pageHeaderTwo' },
			{ sectionKey: 'pageHeaderThree' },
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
