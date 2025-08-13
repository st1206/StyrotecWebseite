import type { ImageAsset } from '$lib/types/cmsTypes/image-type';

export interface Employee {
	name: string;
	email: string;
	tel: number;
	position: string;
	picture: ImageAsset;
	contactPicture: ImageAsset;
}
