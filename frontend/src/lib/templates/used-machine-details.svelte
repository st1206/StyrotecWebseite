<script lang="ts">
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { Employee } from '$lib/models/employee';
	import type { ProductDataSheet } from '$lib/models/productDataSheet';
	import PageHeader from '$lib/sections/page-header.svelte';
	import { resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import * as Table from '$lib/components/ui/table';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import ContactForm from '$lib/sections/contact-form.svelte';
	import { Lightbox } from 'svelte-lightbox';
	import { siteData } from '$lib/config/metadata';
	import { Icons } from '$lib/assets/icons';

	let data: {
		contactForm: any;
		contactPerson: Employee;
		description: StrapiRichTextNode[];
		productDataSheet: ProductDataSheet;
		pictures: ImageAsset[];
		slug: string;
	} = $props();

	const pageHeaderProps: { headline: string } = { headline: data.productDataSheet.name };

	const contentImages: {
		__component: string;
		title?: string;
		images: ImageAsset[];
	}[] = [
		{
			__component: 'partial-components.content-images',
			images: data.pictures
		}
	];

	const tableRows = [
		{
			label: 'ID',
			value: data.productDataSheet.internalId
		},
		{
			label: $_('productDataSheet.designation'),
			value: data.productDataSheet.designation
		},
		{
			label: $_('productDataSheet.modelType'),
			value: data.productDataSheet.modelType
		},
		{
			label: $_('productDataSheet.manufacturer'),
			value: data.productDataSheet.manufacturer
		},
		{
			label: $_('productDataSheet.yearOfManufacture'),
			value: data.productDataSheet.yearOfManufacture
		},
		{
			label: $_('productDataSheet.condition'),
			value: $_(`productDataSheet.${data.productDataSheet.condition}`)
		},
		{
			label: $_('productDataSheet.location'),
			value: data.productDataSheet.location
		},
		{
			label: $_('productDataSheet.dimensions'),
			value: data.productDataSheet.dimensions
		},
		{
			label: $_('productDataSheet.weight'),
			value: data.productDataSheet.weight
		}
	];

	// Keys already handled by the tableRows above
	const explicitlyHandledKeys = new Set([
		'internalId',
		'designation',
		'modelType',
		'manufacturer',
		'yearOfManufacture',
		'condition',
		'location',
		'dimensions',
		'weight',
		'name'
	]);

	const baseIgnoreKeys = new Set([
		'pictures',
		'slug',
		'locale',
		'contactForm',
		'contactPerson',
		'description',
		'productDataSheet',
		'id',
		'documentId',
		'updatedAt',
		'createdAt',
		'publishedAt'
	]);

	const additionalTableRows = $derived(
		data
			? Object.entries(data)
					.filter(([key, value]) => {
						if (explicitlyHandledKeys.has(key) || baseIgnoreKeys.has(key)) {
							return false;
						}
						// Filter out non-displayable types or empty values
						if (value === null || value === undefined) return false;
						if (typeof value === 'string' && value.trim() === '') return false;
						// Exclude generic objects (non-arrays) from auto-display
						if (typeof value === 'object' && !Array.isArray(value)) return false;
						if (Array.isArray(value) && value.length === 0) return false;
						// Allow numbers (incl 0), booleans, non-empty strings, non-empty arrays
						return true;
					})
					.map(([key, value]) => {
						return {
							label: $_(key),
							value
						};
					})
			: []
	);
</script>

<svelte:head>
	<title>{data.productDataSheet.name}</title>
	<meta name="description" content={data.productDataSheet.designation} />
	<meta property="og:title" content={data.productDataSheet.name} />
	<meta property="og:description" content={siteData.siteDescription} />
	<meta property="og:url" content={`https://example.com/${page.url.pathname}`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteData.siteName} />
</svelte:head>

<div class="flex flex-col md:items-end justify-between sm:container md:flex-row print:items-center">
	<PageHeader {...pageHeaderProps} />
	<div class="mx-auto my-6 flex gap-2 md:m-4 md:mt-28">
		<Button size="sm" variant="outline" class="print:hidden" onclick={() => window.print()}>
			<Icons.download class="mr-1 size-4 skew-x-[15deg]" />
			<span class="skew-x-[15deg]">{$_('button.print')}</span>
		</Button>
		<Button size="sm" class="w-[180px] print:hidden" href={`${page.url.pathname}#contact-form`}>
			<Icons.mail class="mr-1 size-4 skew-x-[15deg]" />
			<span class="skew-x-[15deg]">{$_('button.requestNow')}</span>
		</Button>
		<Button
			size="sm"
			class="hidden w-[180px] items-center text-center print:flex"
			href={`mailto:${data.contactPerson?.email || ''}`}
		>
			<Icons.mail class="mr-1 size-4 skew-x-[15deg]" />
			<span class="skew-x-[15deg]">{$_('button.requestNow')}</span>
		</Button>
	</div>
</div>

<section class="mb-20 px-4 sm:container sm:mx-auto">
	<Separator class="bg-primary" />

	<div class="grid grid-cols-1 gap-16 lg:grid-cols-3">
		<div class="col-span-1 lg:col-span-2">
			<BlurFade once={true} delay={0.2} duration={0.2}>
				<div class="my-6">
					<Table.Root>
						<Table.Body>
							{#each tableRows as row}
								<Table.Row class="border-foreground/20 bg-foreground/5 hover:bg-foreground/20">
									<Table.Cell class="bg-foreground/5 w-[100px] sm:w-[150px]">
										{row?.label}
									</Table.Cell>
									<Table.Cell class="min-w-[100px] text-center font-medium">
										{row?.value}
									</Table.Cell>
								</Table.Row>
							{/each}
							{#each additionalTableRows as row}
								<Table.Row class="border-foreground/20 bg-foreground/5 hover:bg-foreground/20">
									<Table.Cell class="bg-foreground/5 w-[100px] sm:w-[150px]">
										{row.label}
									</Table.Cell>
									<Table.Cell class="min-w-[100px] text-center font-medium">
										{row.value}
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</BlurFade>

			<BlurFade once={true} delay={0.25} duration={0.2}>
				{#if data.description}
					<Separator class="bg-primary" />
					<p
						class="prose prose-neutral marker:text-primary prose-sm md:prose-base lg:prose-lg my-6 max-w-7xl"
					>
						{@html resolveRichText(data.description)}
					</p>
				{/if}
			</BlurFade>
			<Separator class="bg-primary mt-6 lg:hidden" />
		</div>
		<div class="lg:mt-6">
			<BlurFade once={true} delay={0.2} duration={0.2}>
				{#if contentImages}
					{#each contentImages as item}
						<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
							{#each item.images as image}
								<Lightbox transitionDuration={50}>
									<img
										class="shadow-primary w-full object-cover"
										src={!PUBLIC_BACKEND_URL.includes('https')
											? `${PUBLIC_BACKEND_URL}${image.formats['large']?.url || image.url}`
											: image.url}
										alt={image.alternativeText}
									/>
								</Lightbox>
							{/each}
						</div>
					{/each}
				{/if}
			</BlurFade>
		</div>
	</div>
</section>

<ContactForm contactForm={data.contactForm} employee={data.contactPerson} />
