// src/routes/+layout.server.ts
import { loadCMSData } from '$lib/server/utils';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactFormSchema } from '$lib/models/contact-form-schema';

export const prerender = true;

export const load = async () => {
	const lang = 'de';

	const socialMediaChannels = await loadCMSData<{ name: string; link: string }>(
		'social-media-channels',
		lang,
		'populate=*'
	);

	return {
		lang,
		socialMediaChannels,
		contactForm: await superValidate(zod(contactFormSchema))
	};
};
