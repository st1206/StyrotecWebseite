import type {
	ApiGantryMachinePageGantryMachinePage,
	ApiHomeHome
} from '$lib/cmsTypes/contentTypes';

// The mapping interface uses keys that match your cmsTypeKey values.
export interface CMSTypeMap {
	home: ApiHomeHome;
	gantryMachinePage: ApiGantryMachinePageGantryMachinePage;
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
	home: {
		deSlug: 'start',
		enSlug: 'home',
		cmsTypeKey: 'home',
		cmsApiSlug: 'home',
		sections: [
			{
				sectionKey: 'test',
				props: { headline: 'Welcome!' }
			}
		]
	},
	usedMachines: {
		deSlug: 'produkte/gebrauchtmaschinen',
		enSlug: 'products/used-machines',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Used Machines' } }]
	},
	cncMachines: {
		deSlug: 'produkte/gebrauchtmaschinen/cnc-maschinen',
		enSlug: 'products/used-machines/cnc-machines',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'CNC Machines' } }]
	},
	conventionalMachines: {
		deSlug: 'produkte/gebrauchtmaschinen/modellbaumaschinen',
		enSlug: 'products/used-machines/conventional-machines',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'heroCarousel', props: {} }]
	},
	gantryMachines: {
		deSlug: 'produkte/portalfraesmaschinen',
		enSlug: 'products/gantry-machines',
		cmsApiParams:
			'populate=heroCarousel.pictures&populate=basicTextImage.thumbnail&populate=uspList&populate=exploreMore.previewCards.thumbnail',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
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
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'FS 10' } }]
	},
	fs15: {
		deSlug: 'produkte/portalfraesmaschinen/fs15',
		enSlug: 'products/gantry-machines/fs15',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'FS 15' } }]
	},
	fs20: {
		deSlug: 'produkte/portalfraesmaschinen/fs20',
		enSlug: 'products/gantry-machines/fs20',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'FS 20' } }]
	},
	hybrid3D: {
		deSlug: 'produkte/portalfraesmaschinen/hybrid-3d',
		enSlug: 'products/gantry-machines/hybrid-3d',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Hybrid 3D' } }]
	},
	stockMachines: {
		deSlug: 'produkte/portalfraesmaschinen/vorratsmaschinen',
		enSlug: 'products/gantry-machines/stock-machines',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'In Stock Machines' } }]
	},
	chipPresses: {
		deSlug: 'produkte/spaenepressen',
		enSlug: 'products/chip-presses',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Chip Presses' } }]
	},
	synthetics: {
		deSlug: 'produkte/spaenepressen/kunststoffe',
		enSlug: 'products/chip-presses/synthetics',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Synthetics' } }]
	},
	metals: {
		deSlug: 'produkte/spaenepressen/metalle',
		enSlug: 'products/chip-presses/metals',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Metals' } }]
	},
	styrofoam: {
		deSlug: 'produkte/spaenepressen/styropor',
		enSlug: 'products/chip-presses/styrofoam',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Styrofoam' } }]
	},
	styrofoamProcessing: {
		deSlug: 'produkte/styroporbearbeitung',
		enSlug: 'products/styrofoam-processing',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Styrofoam Processing' } }]
	},
	suction: {
		deSlug: 'produkte/styroporbearbeitung/absaugungen',
		enSlug: 'products/styrofoam-processing/suction',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Suction' } }]
	},
	millingTools: {
		deSlug: 'produkte/styroporbearbeitung/fraeswerkzeuge',
		enSlug: 'products/styrofoam-processing/milling-tools',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Milling Tools' } }]
	},
	hollowMillingSpindles: {
		deSlug: 'produkte/styroporbearbeitung/hohlfraesspindeln',
		enSlug: 'products/styrofoam-processing/hollow-milling-spindles',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Hollow Milling Spindles' } }]
	},
	shredder: {
		deSlug: 'produkte/styroporbearbeitung/zerkleinerer',
		enSlug: 'products/styrofoam-processing/shredder',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Shredder' } }]
	},
	material: {
		deSlug: 'produkte/styroporbearbeitung/material',
		enSlug: 'products/styrofoam-processing/material',
		cmsTypeKey: 'gantryMachinePage',
		cmsApiSlug: 'gantry-machine-page',
		sections: [{ sectionKey: 'test', props: { headline: 'Material' } }]
	}
};
