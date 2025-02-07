import { BACKEND_API_TOKEN } from '$env/static/private';

export function getRequestHeaders(): Record<string, string> {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${BACKEND_API_TOKEN}`
	};
}
