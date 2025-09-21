import { error, type Actions } from '@sveltejs/kit';
import type { AttributesOf } from '$lib/types/cmsTypes/types';
import { pages, type CMSTypeMap, type Lang, type SlugKey } from '$lib/config/pages';
import { loadCMSData, CMSFetchError } from '$lib/server/utils';
import { contactFormSchema } from '$lib/models/contact-form-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { EMAIL_ADRESS, EMAIL_HOST, EMAIL_PASSWORD, VERCEL_ENV } from '$env/static/private';
import { getContactFormTemplate, getContactFormText } from '$lib/server/email';
import nodemailer from 'nodemailer';

export const prerender = VERCEL_ENV === 'development' ? false : true;

export async function entries() {
	const routes = [];
	const languages: Lang[] = ['de', 'en']; // Only prerender German pages for testing

	// Generate routes for German pages only
	for (const [pageKey, pageConfig] of Object.entries(pages)) {
		for (const lang of languages) {
			const slugKey = `${lang}Slug` as SlugKey;
			const slug = pageConfig[slugKey];

			// Skip dynamic detail pages (they contain {slug} or {id})
			if (!slug.includes('{')) {
				routes.push({
					lang,
					slugs: slug
				});
			}
		}
	}

	return routes;
}

// Helper functions remain the same
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

async function processCollectionType(collectionData: any, lang: string) {
	if (!collectionData || !collectionData.collectionApiSlug) {
		console.warn('Missing collectionApiSlug for collection type.', collectionData);
		return null;
	}

	try {
		const type = collectionData.type || 'defaultCards';
		const fetchedData = await getCMSDataForCollection(
			{ cmsApiSlug: collectionData.collectionApiSlug },
			lang
		);
		return { ...fetchedData, type };
	} catch (err) {
		console.error(
			`Failed to process collection type for ${collectionData.collectionApiSlug}:`,
			err
		);
		// Return a fallback structure to prevent page crashes
		return {
			type: collectionData.type || 'defaultCards',
			error: err instanceof CMSFetchError ? err.message : 'Failed to load collection data'
		};
	}
}

export const load = async <L extends Lang>({ params }: { params: { lang: L; slugs?: string } }) => {
	const { lang, slugs } = params;
	if (!slugs) error(404, 'Page not found');

	const slugKey = `${lang}Slug` as SlugKey;
	const cleanSlug = slugs.replace(/\/$/, '').split('#')[0];

	let matchedPage;
	let cmsData: any;

	// 1. First, try to find a direct match for a regular/listing page
	matchedPage = Object.values(pages).find((page) => page[slugKey] === cleanSlug);

	if (matchedPage) {
		// --- REGULAR / LISTING PAGE LOGIC ---
		try {
			cmsData = await getCMSDataForPage(matchedPage, lang);

			// Define an array of keys to check for collection types
			const collectionTypeKeys = [
				'collectionTypeComponents',
				'collectionTypeComponentsOne',
				'collectionTypeComponentsTwo',
				'collectionTypeComponentsThree'
			];

			// Only process collections that actually exist to reduce API calls
			const existingCollections = collectionTypeKeys.filter((key) => cmsData[key]);
			if (existingCollections.length > 0) {
				// Use Promise.all to fetch all collections in parallel
				const collectionPromises = existingCollections.map(async (key) => {
					return { key, data: await processCollectionType(cmsData[key], lang) };
				});

				// Wait for all collection promises to resolve
				const results = await Promise.all(collectionPromises);

				// Update cmsData with the processed collection data
				results.forEach(({ key, data }) => {
					if (data) {
						cmsData[key] = data;
					}
				});
			}
		} catch (err) {
			console.error(`Failed to load CMS data for page ${matchedPage.cmsApiSlug}:`, err);

			// During build time (prerendering), provide fallback data instead of throwing errors
			if (process.env.NODE_ENV === 'production' || process.env.BUILDING) {
				console.warn(`Using fallback data for page ${matchedPage.cmsApiSlug} during build`);
				cmsData = {
					title: `${matchedPage.cmsApiSlug} (Fallback)`,
					description: 'Content temporarily unavailable',
					sections: [],
					// Add any other required fields based on your CMS structure
					...Object.fromEntries(
						[
							'collectionTypeComponents',
							'collectionTypeComponentsOne',
							'collectionTypeComponentsTwo',
							'collectionTypeComponentsThree'
						].map((key) => [key, null])
					)
				};
			} else {
				// For critical page data in development, we still throw the error
				if (err instanceof CMSFetchError && err.statusCode < 500) {
					throw err;
				}

				// For server errors, provide a fallback
				error(503, 'Content temporarily unavailable. Please try again later.');
			}
		}
	} else {
		// --- DETAIL PAGE LOGIC (FALLBACK) ---
		// If no direct match, assume it's a detail page (e.g., .../category/item-slug)
		const slugParts = cleanSlug.split('/');
		if (slugParts.length < 2 || slugParts.some((part) => part.startsWith('.'))) {
			error(404, 'Page not found');
		}

		const id = slugParts.pop(); // The last part is the item's slug/id
		const categoryPath = slugParts.join('/'); // The rest is the category path

		// 2. Find the specific category page configuration
		const categoryPage = Object.values(pages).find((page) => page[slugKey] === categoryPath);

		if (!categoryPage) {
			console.error(`Category page config not found for path: ${categoryPath}`);
			error(404, `Content category not found`);
		}

		// 3. Find the "template" page for the detail view layout.
		// We search up the path for a config with a placeholder like `/{...}`
		let detailPageTemplate = null;
		const tempPathParts = [...slugParts];
		while (tempPathParts.length > 0) {
			const potentialBasePath = tempPathParts.join('/');
			detailPageTemplate = Object.values(pages).find((page) =>
				page[slugKey]?.startsWith(`${potentialBasePath}/{`)
			);
			if (detailPageTemplate) break;
			tempPathParts.pop();
		}

		if (!detailPageTemplate) {
			console.error(`Detail page template not found for category: ${categoryPath}`);
			error(404, `Detail page template not found`);
		}

		// 4. Fetch data for the template page (the shell/layout)
		try {
			cmsData = await getCMSDataForPage(detailPageTemplate, lang);

			// 5. Use the category page's enSlug to get the collection API slug
			const collectionApiSlug = categoryPage.enSlug.split('/').pop();
			if (!collectionApiSlug) {
				console.error(`Could not determine collection API slug from: ${categoryPage.enSlug}`);
				error(500, 'Server configuration error');
			}

			// 6. Fetch the specific item from the collection
			const collectionItems = await getCMSDataForCollection(
				{
					cmsApiSlug: collectionApiSlug,
					cmsApiParams: `filters[slug][$eq]=${id}&populate=${'productDataSheet'}&populate=pictures&populate=contactPerson.picture&populate=contactPerson.contactPicture`
				},
				lang
			);

			if (!collectionItems.length) {
				console.error(
					`Detail entry with slug '${id}' not found in collection '${collectionApiSlug}'`
				);
				error(404, 'Detail entry not found');
			}

			// 7. Merge the specific item data into the page's CMS data
			cmsData = {
				...cmsData,
				[cmsData.componentKey]: collectionItems[0]
			};
		} catch (err) {
			console.error(`Failed to load detail page data for ${id}:`, err);

			// During build time (prerendering), provide fallback data instead of throwing errors
			if (process.env.NODE_ENV === 'production' || process.env.BUILDING) {
				console.warn(`Using fallback data for detail page ${id} during build`);
				cmsData = {
					...cmsData,
					[cmsData.componentKey || 'detailItem']: {
						title: `${id} (Fallback)`,
						description: 'Content temporarily unavailable',
						slug: id
						// Add any other required fields for detail items
					}
				};
			} else {
				if (err instanceof CMSFetchError) {
					if (err.statusCode === 404) {
						error(404, 'Content not found');
					} else if (err.statusCode < 500) {
						throw err;
					}
				}

				error(503, 'Content temporarily unavailable. Please try again later.');
			}
		}

		// The matched page for the final return is the template
		matchedPage = detailPageTemplate;
	}

	if (!matchedPage) {
		error(404, 'Page not found');
	}

	console.log(cmsData);

	return {
		lang,
		pageContent: {
			...matchedPage,
			cmsData,
			contactFormBuilder: await superValidate(zod(contactFormSchema))
		}
	};
};

// export const actions: Actions = {
// 	default: async ({ request }) => {
// 		const form = await superValidate(request, zod(contactFormSchema));

// 		if (!form.valid) {
// 			return fail(400, {
// 				form
// 			});
// 		}

// 		const transportData = {
// 			host: EMAIL_HOST,
// 			port: 587,
// 			secure: false, // A new SMTP connection is created for every message
// 			auth: {
// 				user: EMAIL_ADRESS,
// 				pass: EMAIL_PASSWORD
// 			}
// 		};

// 		const transporter = nodemailer.createTransport(transportData);

// 		const mailOptions = {
// 			from: EMAIL_ADRESS,
// 			to: form.data.mailToContactPerson,
// 			subject: 'Kontaktanfrage',
// 			text: getContactFormText(form.data),
// 			html: getContactFormTemplate(form.data),
// 			replyTo: form.data.email
// 		};

// 		try {
// 			await transporter.verify();
// 			console.log('Server is ready to take messages');
// 		} catch (err) {
// 			console.error('Verification failed', err);
// 			return message(form, 'SMTP server not reachable', {
// 				status: 403
// 			});
// 		}

// 		try {
// 			const info = await transporter.sendMail(mailOptions);

// 			console.log('Message sent: %s', info.messageId);
// 			return message(form, 'success');
// 		} catch (err: unknown) {
// 			console.error('Error while sending mail', err);
// 			return message(form, err, {
// 				status: 403
// 			});
// 		}
// 	}
// };
