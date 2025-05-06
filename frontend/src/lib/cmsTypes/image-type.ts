/** One image rendition (thumbnail, small, medium, etc.) */
export interface ImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number; // kilobytes
	sizeInBytes: number;
	url: string;
}

/** Strapi-style media item */
export interface ImageAsset {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: Record<string, ImageFormat>;
	hash: string;
	ext: string;
	mime: string;
	size: number; // kilobytes
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: unknown | null;
	createdAt: string; // ISO 8601 date-time
	updatedAt: string;
	publishedAt: string;
}
