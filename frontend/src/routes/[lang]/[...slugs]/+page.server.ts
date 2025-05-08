import { error, fail, type Actions } from '@sveltejs/kit';
import type { AttributesOf } from '$lib/cmsTypes/types';
import { pages, type CMSTypeMap, type Lang, type SlugKey } from '$lib/config/pages';
import { loadCMSData } from '$lib/server/utils';
import { contactFormSchema } from '$lib/models/contact-form-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms';
import nodemailer from 'nodemailer';
import { EMAIL_ADRESS, EMAIL_HOST, EMAIL_PASSWORD } from '$env/static/private';

/**
 * Helper to load CMS data for a given page.
 * Uses the page’s `cmsApiSlug` to perform the fetch,
 * and uses `cmsTypeKey` to assign the return type via CMSTypeMap.
 */
function getCMSDataForPage<K extends keyof CMSTypeMap>(
	page: { cmsApiSlug: string; cmsApiParams?: string; cmsTypeKey: K },
	lang: string
): Promise<AttributesOf<CMSTypeMap[K]>> {
	return loadCMSData<CMSTypeMap[K]>(page.cmsApiSlug, lang, page.cmsApiParams);
}

export const load = async <L extends Lang>({ params }: { params: { lang: L; slugs?: string } }) => {
	const { lang, slugs } = params;
	if (!slugs) {
		console.error('No Slugs:', params.lang, params.slugs);
		error(404, 'Page not found');
	}

	// Remove hash fragments (anything after '#'), and normalize
	let cleanSlug = slugs.split('#')[0];
	if (cleanSlug.endsWith('/')) {
		cleanSlug = cleanSlug.slice(0, -1);
	}

	// Compute the slug key based on the current language ("deSlug" or "enSlug")
	const slugKey = `${lang}Slug` as SlugKey;

	// Look through the unified pages object to find a matching page.
	const matchedPage = Object.values(pages).find((page) => page[slugKey] === cleanSlug);
	if (!matchedPage) {
		console.error('Error matching page:', params.lang, params.slugs);
		error(404, 'Page not found');
	}

	// Load CMS data using the page's cmsApiSlug and assign the type via cmsTypeKey.
	const cmsData = await getCMSDataForPage(matchedPage, lang);

	return {
		lang,
		pageContent: {
			...matchedPage,
			cmsData
		}
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(contactFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log(form);

		const transporter = nodemailer.createTransport({
			host: EMAIL_HOST,
			port: 587,
			secure: false, // true für Port 465, false für andere Ports
			auth: {
				user: EMAIL_ADRESS,
				pass: EMAIL_PASSWORD
			}
		});

		const mailOptions = {
			from: EMAIL_ADRESS,
			to: form.data.email,
			subject: form.data.name,
			text: form.data.message,
			html: form.data.message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(error);
				return message(form, 'No spam please', {
					status: 403
				});
			}
			console.log('E-Mail gesendet: ' + info.response);
			return message(form, 'success');
		});
	}
};
