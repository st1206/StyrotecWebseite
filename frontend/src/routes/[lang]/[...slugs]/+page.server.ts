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
import { getContactFormTemplate, getContactFormText } from '$lib/server/email';

function getCMSDataForPage<K extends keyof CMSTypeMap>(
	page: { cmsApiSlug: string; cmsApiParams?: string; cmsTypeKey: K },
	lang: string
): Promise<AttributesOf<CMSTypeMap[K]>> {
	return loadCMSData<CMSTypeMap[K]>(page.cmsApiSlug, lang, page.cmsApiParams);
}

function getCMSDataForCollection<T>(
	collection: { cmsApiSlug: string; cmsApiParams?: string },
	lang: string
): Promise<AttributesOf<T>[]> {
	return loadCMSData<T[]>(collection.cmsApiSlug, lang, collection.cmsApiParams);
}

export const load = async <L extends Lang>({ params }: { params: { lang: L; slugs?: string } }) => {
	const { lang, slugs } = params;
	if (!slugs) error(404, 'Page not found');

	const slugParts = slugs.split('/').filter(Boolean); // ['gebrauchtmaschinen', 'cnc-fraesen', '42']
	const slugKey = `${lang}Slug` as SlugKey;

	let matchedPage;
	let cmsData;

	if (slugParts.length === 4 && !slugParts.some((part) => part.startsWith('.'))) {
		// 1. Match the detail page
		const [prefix, categorySlug, subCategorySlug, id] = slugParts;
		matchedPage = Object.values(pages).find((page) =>
			page[slugKey]?.startsWith(`${prefix}/${categorySlug}/{`)
		);

		if (!matchedPage) {
			console.error(`Detail page config not found for ${slugParts}`);
			error(404, `Detail page config not found for ${slugParts}`);
		}

		cmsData = await getCMSDataForPage(matchedPage, lang);

		// 2. Match the category page (like "cncMachines")
		const categoryPage = Object.values(pages).find(
			(page) => page[slugKey] === `${prefix}/${categorySlug}/${subCategorySlug}`
		);

		if (!categoryPage) {
			console.error(`Category page not found for ${matchedPage.cmsApiSlug}`);
			error(404, `Category page not found for ${matchedPage.cmsApiSlug}`);
		}

		// 3. Use its enSlug to query the right collection data
		const collectionApiSlug = categoryPage.enSlug.split('/').pop();

		const collectionItems = await getCMSDataForCollection(
			{
				cmsApiSlug: collectionApiSlug!,
				cmsApiParams: `filters[slug][$eq]=${id}&populate=${'productDataSheet'}&populate=pictures&populate=contactPerson.picture&populate=contactPerson.contactPicture`
			},
			lang
		);

		if (!collectionItems.length) {
			console.error('Detail entry not found');
			error(404, 'Detail entry not found');
		}

		cmsData = {
			...cmsData,
			//@ts-expect-error tbd.
			[cmsData.componentKey]: collectionItems[0]
		};
	} else {
		// handle regular pages (e.g., gebrauchtmaschinen/cnc-fraesen)
		const cleanSlug = slugs.replace(/\/$/, '').split('#')[0];

		matchedPage = Object.values(pages).find((page) => page[slugKey] === cleanSlug);

		if (!matchedPage) {
			console.error(`Page not found for ${cleanSlug}`);
			error(404, 'Page not found');
		}

		cmsData = await getCMSDataForPage(matchedPage, lang);

		if ('collectionTypeCards' in cmsData && cmsData.collectionTypeCards) {
			cmsData.collectionTypeCards = await getCMSDataForCollection(
				{
					cmsApiSlug: cmsData.collectionTypeCards.collectionApiSlug
				},
				lang
			);
		}
	}

	return {
		lang,
		pageContent: {
			...matchedPage,
			cmsData,
			contactFormBuilder: await superValidate(zod(contactFormSchema))
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

		const transportData = {
			host: EMAIL_HOST,
			port: 587,
			secure: false, // A new SMTP connection is created for every message
			auth: {
				user: EMAIL_ADRESS,
				pass: EMAIL_PASSWORD
			}
		};

		const transporter = nodemailer.createTransport(transportData);

		const mailOptions = {
			from: EMAIL_ADRESS,
			to: form.data.mailToContactPerson,
			subject: 'Kontaktanfrage',
			text: getContactFormText(form.data),
			html: getContactFormTemplate(form.data),
			replyTo: form.data.email
		};

		try {
			await transporter.verify();
			console.log('Server is ready to take messages');
		} catch (err) {
			console.error('Verification failed', err);
			return message(form, 'SMTP server not reachable', {
				status: 403
			});
		}

		try {
			const info = await transporter.sendMail(mailOptions);

			console.log('Message sent: %s', info.messageId);
			return message(form, 'success');
		} catch (err: unknown) {
			console.error('Error while sending mail', err);
			return message(form, err, {
				status: 403
			});
		}
	}
};
