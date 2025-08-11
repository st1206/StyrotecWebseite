import { loadCMSDataSafe } from '$lib/server/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { lang } }) => {
	const socialMediaChannels =
		(await loadCMSDataSafe<{ name: string; externalLink: string }[]>(
			'social-media-channels',
			'de',
			'populate=*'
		)) || [];

	return {
		lang: lang,
		socialMediaChannels: socialMediaChannels
	};
};
