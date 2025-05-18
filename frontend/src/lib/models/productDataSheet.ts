import type { ImageAsset } from '$lib/cmsTypes/image-type';

export type ProductDataSheet = {
	internalId: string;
	name: string;
	designation: string;
	modelType: string;
	manufacturer: string;
	yearOfManufacture: string;
	condition: 'neu' | 'überholt' | 'gebraucht, sehr gut' | 'gebraucht, gut' | 'gebraucht';
	location: string;
	pictures: ImageAsset[];
};
