// src/routes/+layout.ts
import { loadCMSData } from '$lib/server/utils';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactFormSchema } from '$lib/schemas/contact-form-schema';

export const load: LayoutServerLoad = async ({ locals: { lang } }) => {
	const socialMediaChannels = await loadCMSData<{ name: string; link: string }>(
		'social-media-channels',
		'de',
		'populate=*'
	);
	return {
		lang: lang,
		socialMediaChannels: socialMediaChannels,
		contactForm: await superValidate(zod(contactFormSchema))
	};
};
