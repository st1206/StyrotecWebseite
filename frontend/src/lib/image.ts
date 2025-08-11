import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { ImageAsset } from '$lib/cmsTypes/image-type';

type StrapiRelationImage = {
	data?: { attributes?: Partial<ImageAsset> & { formats?: Record<string, any> } } | null;
} | null;

function extractUrlAndFormats(image: ImageAsset | StrapiRelationImage | undefined | null): {
	url: string;
	formats?: Record<string, any>;
} {
	if (!image) return { url: '' };

	if ((image as ImageAsset).url) {
		const direct = image as ImageAsset;
		return { url: direct.url || '', formats: direct.formats || undefined };
	}

	const rel = image as StrapiRelationImage;
	const url = rel?.data?.attributes?.url || '';
	const formats = rel?.data?.attributes?.formats as Record<string, any> | undefined;
	return { url, formats };
}

export function getOptimizedImageUrl(
	image: ImageAsset | StrapiRelationImage | undefined,
	preferredFormats: string[] = ['large', 'medium', 'small']
): string {
	const { url, formats } = extractUrlAndFormats(image);
	if (!url) return '';

	let byPreference = '';
	for (const key of preferredFormats) {
		const candidate = (formats as any)?.[key]?.url as string | undefined;
		if (candidate) {
			byPreference = candidate;
			break;
		}
	}

	const finalUrl = byPreference || url;
	if (!PUBLIC_BACKEND_URL.includes('https') && !finalUrl.startsWith('http')) {
		return `${PUBLIC_BACKEND_URL}${finalUrl}`;
	}
	return finalUrl;
}

export function getImageAltText(
	image: ImageAsset | StrapiRelationImage | undefined,
	fallback: string
): string {
	const directAlt = (image as ImageAsset | undefined)?.alternativeText || undefined;
	const nestedAlt = (image as any)?.data?.attributes?.alternativeText as string | undefined;
	return directAlt || nestedAlt || fallback;
}

export function handleImageError(event: Event) {
	const img = event.currentTarget as HTMLImageElement | null;
	const sibling = img?.nextElementSibling as HTMLElement | null;
	if (img && sibling) {
		img.style.display = 'none';
		sibling.style.display = 'flex';
	}
}

// Helper function to optimize image URLs with backend URL handling
export function optimizeImageUrl(url: string, backendUrl: string): string {
	if (!url) return '';

	return !backendUrl.includes('https') && !url.startsWith('http') ? `${backendUrl}${url}` : url;
}
