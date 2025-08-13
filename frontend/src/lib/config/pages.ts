import type {
	ApiAboutUsPageAboutUsPage,
	ApiBriquettingPressPageBriquettingPressPage,
	ApiCncMillsPageCncMillsPage,
	ApiDrillingMachinesPageDrillingMachinesPage,
	ApiGrindingMachinesPageGrindingMachinesPage,
	ApiLathesPageLathesPage,
	ApiMillingMachinesPageMillingMachinesPage,
	ApiSawsPageSawsPage,
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
	ApiAdhesivePageAdhesivePage,
	ApiCareerCareer
} from '$lib/cmsTypes/contentTypes';
import { buildPopulateQuery } from './apiParamsBuilder';
import type { TypedSectionConfig } from '$lib/types/sections';

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
	grindingMachinesPage: ApiGrindingMachinesPageGrindingMachinesPage;
	lathesPage: ApiLathesPageLathesPage;
	millingMachinesPage: ApiMillingMachinesPageMillingMachinesPage;
	sawsPage: ApiSawsPageSawsPage;
	machineMaintenancePage: ApiMachineMaintenancePageMachineMaintenancePage;
	machineModernizationPage: ApiMachineModernizationPageMachineModernizationPage;
	machineMarketingPage: ApiMachineMarketingPageMachineMarketingPage;
	legalNotice: ApiLegalNoticePageLegalNoticePage;
	newsPage: ApiNewsPageNewsPage;
	career: ApiCareerCareer;
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
	sections: Array<TypedSectionConfig>;
};

// Legacy support for existing code
export type LegacyPageContent = {
	deSlug: string;
	enSlug: string;
	cmsTypeKey: keyof CMSTypeMap;
	cmsApiSlug: string;
	cmsApiParams?: string;
	sections: Array<{
		sectionKey: string;
		props?: Record<string, any>;
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
	privacyPolicy: {
		deSlug: 'datenschutz',
		enSlug: 'privacy-policy',
		cmsTypeKey: 'legalNotice',
		cmsApiSlug: 'privacy-policy-page',
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
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},
	metals: {
		deSlug: 'produkte/brikettierpressen/metalle',
		enSlug: 'products/briquetting-press/metals',
		cmsTypeKey: 'metalsPage',
		cmsApiSlug: 'metals-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'defaultContent' },
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
			{ sectionKey: 'defaultContent' },
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
			{ sectionKey: 'defaultContent' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	hollowMillingSpindles: {
		deSlug: 'produkte/styroporbearbeitung/hohlfrässpindeln',
		enSlug: 'products/styrofoam-processing/hollow-milling-spindle',
		cmsTypeKey: 'hollowMillingSpindlePage',
		cmsApiSlug: 'hollow-milling-spindle-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'exploreVariants' },
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
			{ sectionKey: 'exploreVariants' },
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
			{ sectionKey: 'defaultContent' },
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
			{ sectionKey: 'defaultContent' },
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
			{ sectionKey: 'defaultContent' },
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	adhesives: {
		deSlug: 'produkte/styroporbearbeitung/kleber',
		enSlug: 'products/styrofoam-processing/adhesive',
		cmsTypeKey: 'adhesivePage',
		cmsApiSlug: 'adhesive-page',
		sections: [
			{ sectionKey: 'heroDualImage' },
			{ sectionKey: 'defaultContent' },
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
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
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
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
		]
	},

	fs20: {
		deSlug: 'produkte/portalfraesmaschinen/fs20',
		enSlug: 'products/gantry-machines/fs20',
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
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
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
				sectionKey: 'spacer'
			},
			{
				sectionKey: 'defaultContent'
			},
			{
				sectionKey: 'contactForm'
			},
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
				sectionKey: 'collectionTypeCards'
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
			},
			{ sectionKey: 'seo' }
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
			},
			{ sectionKey: 'seo' }
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
			{ sectionKey: 'contactForm' },
			{ sectionKey: 'seo' }
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
				sectionKey: 'exploreMore'
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
				sectionKey: 'exploreMore'
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

	grindingMachines: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen/schleifmaschinen',
		enSlug: 'produkte/gebrauchtmaschinen/model-construction-machines/grinding-machines',
		cmsTypeKey: 'grindingMachinesPage',
		cmsApiSlug: 'grinding-machines-page',
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

	lathes: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen/drehmaschinen',
		enSlug: 'produkte/gebrauchtmaschinen/model-construction-machines/lathes',
		cmsTypeKey: 'lathesPage',
		cmsApiSlug: 'lathes-page',
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

	millingMachines: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen/fräsmaschinen',
		enSlug: 'produkte/gebrauchtmaschinen/model-construction-machines/milling-machines',
		cmsTypeKey: 'millingMachinesPage',
		cmsApiSlug: 'milling-machines-page',
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

	saws: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen/saegen',
		enSlug: 'produkte/gebrauchtmaschinen/model-construction-machines/saw-machines',
		cmsTypeKey: 'sawsPage',
		cmsApiSlug: 'saws-page',
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
			{ sectionKey: 'defaultContent' },
			{ sectionKey: 'pageHeaderThree' },
			{ sectionKey: 'defaultContentOne' },
			{ sectionKey: 'pageHeaderFour' },
			{ sectionKey: 'defaultContentTwo' },
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
			{ sectionKey: 'defaultContent' },
			{ sectionKey: 'pageHeaderTwo' },
			{ sectionKey: 'defaultContentOne' },
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
			{ sectionKey: 'defaultContent' },
			{ sectionKey: 'pageHeaderTwo' },
			{ sectionKey: 'defaultContentOne' },
			{ sectionKey: 'pageHeaderThree' },
			{ sectionKey: 'defaultContentTwo' },
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
				sectionKey: 'heroCarousel'
			},
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
			},
			{ sectionKey: 'seo' }
		]
	},

	career: {
		deSlug: 'unternehmen/karriere',
		enSlug: 'company/career',
		cmsTypeKey: 'career',
		cmsApiSlug: 'career',
		sections: [
			{
				sectionKey: 'heroCarousel'
			},
			{
				sectionKey: 'collectionTypeCards'
			},
			{
				sectionKey: 'contactForm'
			},
			{ sectionKey: 'seo' }
		]
	}
};
export const pages: Record<string, PageContent> = withApiParams(pagesConfig);
