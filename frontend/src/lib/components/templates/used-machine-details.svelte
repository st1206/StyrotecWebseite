<script lang="ts">
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import type { Employee } from '$lib/models/employee';
	import type { ProductDataSheet } from '$lib/models/productDataSheet';
	import { resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import ContactForm from '$lib/sections/contact-form.svelte';
	import { Lightbox } from 'svelte-lightbox';
	import { Icons } from '$lib/assets/icons';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Tabs from '$lib/components/ui/tabs';
	import { languages } from '$lib/i18n';

	let data: {
		contactForm: any;
		contactPerson: Employee;
		description: StrapiRichTextNode[];
		productDataSheet: ProductDataSheet;
		pictures: ImageAsset[];
		slug: string;
	} = $props();

	// State for the image gallery
	let selectedImage = $state(data.pictures[0]);

	const languageCodes = languages.map((l) => l.shortCode);
	const breadcrumbs = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		const filtered = segments.filter((seg, idx) => {
			return !(idx === 0 && languageCodes.includes(seg));
		});
		return filtered.map((segment, i, arr) => {
			const langPrefix = languageCodes.includes(page.url.pathname.split('/')[1])
				? '/' + page.url.pathname.split('/')[1]
				: '';
			const href = langPrefix + '/' + arr.slice(0, i + 1).join('/');
			const label = segment
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
			return { href, label };
		});
	});

	const tableRows = [
		// { label: 'ID', value: data.productDataSheet.internalId },
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

	const explicitlyHandledKeys = new Set(tableRows.map((r) => r.label.toLowerCase()));
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
		'publishedAt',
		'name'
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
	<meta property="og:description" content={data.productDataSheet.designation} />
	<meta property="og:url" content={`${page.url.pathname}`} />
	<meta property="og:type" content="website" />
	{#if selectedImage}
		<meta
			property="og:image"
			content={!PUBLIC_BACKEND_URL.includes('https')
				? `${PUBLIC_BACKEND_URL}${selectedImage.formats?.['large']?.url || selectedImage.url}`
				: selectedImage.url}
		/>
	{/if}
</svelte:head>

<section
	class="mt-28 grid grid-cols-1 gap-x-16 gap-y-12 px-4 sm:container lg:grid-cols-2 print:mt-8 print:block"
>
	<div class="flex flex-col">
		<div class="w-full overflow-hidden rounded-lg">
			{#if selectedImage}
				<Lightbox transitionDuration={50}>
					<img
						src={!PUBLIC_BACKEND_URL.includes('https')
							? `${PUBLIC_BACKEND_URL}${selectedImage.formats?.['large']?.url || selectedImage.url}`
							: selectedImage.url}
						alt={selectedImage.alternativeText || data.productDataSheet.name}
						class="h-full w-full cursor-pointer object-cover object-center transition-opacity duration-300"
					/>
				</Lightbox>
			{/if}
		</div>
		<div class="mx-auto mt-4 w-full max-w-2xl lg:max-w-none print:hidden">
			<div class="grid grid-cols-5 gap-2 sm:gap-4">
				{#each data.pictures as image, i (image.id)}
					<button
						onclick={() => (selectedImage = image)}
						class="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
					>
						<span class="absolute inset-0 overflow-hidden rounded-md">
							<img
								src={!PUBLIC_BACKEND_URL.includes('https')
									? `${PUBLIC_BACKEND_URL}${image.formats?.['thumbnail']?.url || image.url}`
									: image.url}
								alt={image.alternativeText || `Thumbnail ${i + 1}`}
								class="h-full w-full object-cover object-center"
							/>
						</span>
						{#if selectedImage.id === image.id}
							<span
								class="ring-primary pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
								aria-hidden="true"
							></span>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="flex flex-col">
		<div class="print:hidden">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/">{$_('nav.home')}</Breadcrumb.Link>
					</Breadcrumb.Item>
					{#each breadcrumbs as crumb, i}
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							{#if i === breadcrumbs.length - 1}
								<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
							{:else}
								<Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
							{/if}
						</Breadcrumb.Item>
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</div>

		<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl print:mt-8">
			{data.productDataSheet.name}
		</h1>

		<div class="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
			<Button href={`${page.url.pathname}#contact-form`}>
				<Icons.mail class="mr-2 size-5 skew-x-[15deg]" />
				<span class="skew-x-[15deg]">{$_('button.requestNow')}</span>
			</Button>
			<Button variant="outline" onclick={() => window.print()} aria-label="Print page">
				<Icons.download class="mr-1 size-4 skew-x-[15deg]" />
				<span class="skew-x-[15deg]">{$_('button.print')}</span>
			</Button>
		</div>

		<Tabs.Root value="details" class="mt-10 print:mt-0 print:flex print:flex-col">
			<Tabs.List class="print:hidden">
				<Tabs.Trigger value="details">{$_('details')}</Tabs.Trigger>
				<Tabs.Trigger value="description">{$_('description')}</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="description" class="print:order-2 print:mt-8 print:block">
				<h3 class="mb-4 text-xl font-semibold sm:hidden print:block">{$_('description')}</h3>
				<div class="prose prose-neutral prose-sm md:prose-base max-w-none text-gray-600">
					{#if data.description}
						{@html resolveRichText(data.description)}
					{:else}
						<p>No description available for this product.</p>
					{/if}
				</div>
			</Tabs.Content>

			<Tabs.Content value="details" class="print:order-1 print:block">
				<h3 class="mb-4 mt-8 text-xl font-semibold sm:hidden print:block">{$_('details')}</h3>
				<div class="overflow-x-auto">
					<Table.Root>
						<Table.Body>
							{#each tableRows as row}
								<Table.Row class="bg-foreground/5 hover:bg-foreground/10 border-foreground/20">
									<Table.Cell
										class="bg-foreground/10 hover:bg-foreground/15 w-1/3 font-medium sm:w-1/4"
									>
										{row?.label}
									</Table.Cell>
									<Table.Cell class="font-medium ">{row?.value}</Table.Cell>
								</Table.Row>
							{/each}
							{#each additionalTableRows as row}
								<Table.Row class="bg-foreground/5 hover:bg-foreground/10 border-foreground/20">
									<Table.Cell
										class="bg- bg-foreground/10 hover:bg-foreground/15 w-1/3 font-medium sm:w-1/4"
									>
										{row.label}
									</Table.Cell>
									<Table.Cell class="font-medium ">{row.value}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</section>

<section class="my-12 hidden sm:container print:block">
	<h2 class="mb-4 text-2xl font-bold">{$_('additionalImages')}</h2>
	<div class="grid grid-cols-2 gap-6">
		{#each data.pictures as image (image.id)}
			<div class="break-inside-avoid">
				<img
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${image.formats?.['large']?.url || image.url}`
						: image.url}
					alt={image.alternativeText || 'Product image'}
					class="w-full rounded-lg object-cover"
				/>
			</div>
		{/each}
	</div>
</section>

<ContactForm contactForm={data.contactForm} employee={data.contactPerson} />
