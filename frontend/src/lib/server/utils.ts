import { BACKEND_API_KEY } from '$env/static/private';

export function getRequestHeaders(): Record<string, string> {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${BACKEND_API_KEY}`
	};
}
