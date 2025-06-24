import { loadCMSData } from '$lib/server/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { lang } }) => {
	let socialMediaChannels: { name: string; externalLink: string }[] = [];
	try {
		socialMediaChannels = await loadCMSData<{ name: string; externalLink: string }>(
			'social-media-channels',
			'de',
			'populate=*'
		);
	} catch (error) {
		console.error('Failed to load social media channels:', error);
	}
	return {
		lang: lang,
		socialMediaChannels: socialMediaChannels
	};
};
