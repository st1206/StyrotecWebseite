import { PRIVATE_BACKEND_API_TOKEN } from '$env/static/private';

export function getRequestHeaders(): Record<string, string> {
	return {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${PRIVATE_BACKEND_API_TOKEN}`
	};
}
