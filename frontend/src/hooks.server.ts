import { dev } from '$app/environment';
import { DEFAULT_LOCALE, LANG_KEY } from '$lib/i18n';
import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.cookies.get(LANG_KEY)) {
		const defaultLocale = DEFAULT_LOCALE.slice(0, 2);
		event.cookies.set(LANG_KEY, defaultLocale, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 30 * 6 // 6 months
		});
	}

	// PERMANENT ROUTES
	// if (event.url.pathname.startsWith('/')) {
	//     redirect(308, '/');
	// }

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
