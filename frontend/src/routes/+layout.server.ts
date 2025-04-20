// src/routes/+layout.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { lang } }) => {
	return { lang };
};
