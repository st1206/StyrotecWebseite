import { dev } from '$app/environment';
import { LANG_KEY } from '$lib/i18n';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	const body = await event.request.json();

	if (!body.lang) {
		console.log('No language provided');
		return new Response(
			JSON.stringify({ error: { message: 'No language provided', status: 400 } }),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}

	const locale = body.lang.slice(0, 2);
	event.cookies.set(LANG_KEY, locale, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 30 * 6 // 6 months
	});

	return new Response(JSON.stringify({ error: null }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
