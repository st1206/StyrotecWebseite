import { loadCMSData } from '$lib/server/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { lang } }) => {
	const socialMediaChannels = await loadCMSData<{ name: string; link: string }>(
		'social-media-channels',
		'de',
		'populate=*'
	);
	return {
		lang: lang,
		socialMediaChannels: socialMediaChannels
	};
};
