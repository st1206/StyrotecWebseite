<script lang="ts">
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import type { Employee } from '$lib/models/employee';
	import type { ProductDataSheet } from '$lib/models/productDataSheet';
	import { cn, resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import ContactForm from '$lib/sections/contact-form.svelte';
	import { GalleryImage, GalleryThumbnail, Lightbox, LightboxGallery } from 'svelte-lightbox';
	import { Icons } from '$lib/assets/icons';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Accordion from '$lib/components/ui/accordion';
	import { languages } from '$lib/i18n';
	import { tick } from 'svelte';

	let data: {
		contactForm: any;
		contactPerson: Employee;
		description: StrapiRichTextNode[];
		productDataSheet: ProductDataSheet;
		pictures: ImageAsset[];
		slug: string;
	} = $props();

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
		},
		{ label: 'ID', value: data.productDataSheet.internalId }
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
						if (value === null || value === undefined) return false;
						if (typeof value === 'string' && value.trim() === '') return false;
						if (typeof value === 'object' && !Array.isArray(value)) return false;
						if (Array.isArray(value) && value.length === 0) return false;
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
</svelte:head>

<section
	class="mt-28 grid grid-cols-1 gap-x-16 gap-y-12 px-4 sm:container lg:grid-cols-2 print:mt-8 print:block"
>
	<div class="flex flex-col">
		<div style="--lightbox-arrow-color: white;">
			<LightboxGallery
				arrowsConfig={{ color: '#ffffff', character: 'loop', enableKeyboardControl: true }}
			>
				<svelte:fragment slot="thumbnail">
					{#if selectedImage}
						<GalleryThumbnail id={data.pictures.findIndex((item) => item.id === selectedImage.id)}>
							<div class="h-[550px] w-full overflow-hidden rounded-lg">
								<img
									src={!PUBLIC_BACKEND_URL.includes('https')
										? `${PUBLIC_BACKEND_URL}${selectedImage.formats?.['large']?.url || selectedImage.url}`
										: selectedImage.url}
									alt={selectedImage.alternativeText || data.productDataSheet.name}
									class="h-full w-full cursor-pointer object-cover object-center print:hidden"
								/>
								<img
									src={!PUBLIC_BACKEND_URL.includes('https')
										? `${PUBLIC_BACKEND_URL}${data.pictures[0].formats?.['large']?.url || data.pictures[0].url}`
										: data.pictures[0].url}
									alt={data.pictures[0].alternativeText || data.productDataSheet.name}
									class="hidden h-full w-full cursor-pointer object-cover object-center print:block"
								/>
							</div>
						</GalleryThumbnail>
					{/if}
				</svelte:fragment>

				{#each data.pictures as image, i (image.id)}
					<GalleryImage id={i} class="size-[600px] md:size-[800px]">
						<img
							src={!PUBLIC_BACKEND_URL.includes('https')
								? `${PUBLIC_BACKEND_URL}${image.formats?.['large']?.url || image.url}`
								: image.url}
							alt={image.alternativeText || `Image ${image.id}`}
							class="h-full w-full object-contain object-center"
						/>
					</GalleryImage>
				{/each}
			</LightboxGallery>
		</div>
		<div class="mx-auto mt-4 w-full max-w-2xl lg:max-w-none print:hidden">
			<div class="grid grid-cols-5 gap-2 sm:gap-4">
				{#each data.pictures as image, i (image.id)}
					<button
						onclick={() => (selectedImage = image)}
						class="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
					>
						<span
							class={cn(
								'absolute inset-0 overflow-hidden rounded-md ',
								selectedImage.id === image.id ? 'ring-primary ring-2 ring-offset-2' : ''
							)}
						>
							<img
								src={!PUBLIC_BACKEND_URL.includes('https')
									? `${PUBLIC_BACKEND_URL}${image.formats?.['thumbnail']?.url || image.url}`
									: image.url}
								alt={image.alternativeText || `Thumbnail ${i + 1}`}
								class="h-full w-full object-cover object-center"
							/>
						</span>
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

		<div class="mt-4 flex flex-col gap-4 sm:flex-row print:hidden">
			<Button href={`${page.url.pathname}#contact-form`}>
				<Icons.mail class="mr-2 size-5 skew-x-[15deg]" />
				<span class="skew-x-[15deg]">{$_('button.requestNow')}</span>
			</Button>
			<Button variant="outline" onclick={() => window.print()} aria-label="Print page">
				<Icons.download class="mr-1 size-4 skew-x-[15deg]" />
				<span class="skew-x-[15deg]">{$_('button.print')}</span>
			</Button>
		</div>

		<!-- Details Accordion for Screen View -->
		<Accordion.Root
			class="mt-4 flex w-full flex-col gap-2 print:hidden"
			type="single"
			value="details"
		>
			<Accordion.Item value="details">
				<Accordion.Trigger
					class="bg-foreground/5 text-foreground hover:bg-foreground/10 font-sans font-medium"
				>
					{$_('details')}
				</Accordion.Trigger>
				<Accordion.Content>
					<div class="overflow-x-auto pt-2">
						<Table.Root>
							<Table.Body>
								{#each tableRows as row}
									<Table.Row class="bg-foreground/5 hover:bg-foreground/10 border-foreground/20">
										<Table.Cell
											class="bg-foreground/10 hover:bg-foreground/15 w-1/3 p-2  font-medium sm:w-1/4"
										>
											{row?.label}
										</Table.Cell>
										<Table.Cell class="p-2 font-medium">{row?.value}</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="technicalSpecifications">
				<Accordion.Trigger
					class="bg-foreground/5 text-foreground hover:bg-foreground/10 font-sans font-medium"
				>
					{$_('technicalSpecifications')}
				</Accordion.Trigger>
				<Accordion.Content>
					<div class="overflow-x-auto pt-2">
						<Table.Root>
							<Table.Body>
								{#each additionalTableRows as row}
									<Table.Row class="bg-foreground/5 hover:bg-foreground/10 border-foreground/20">
										<Table.Cell
											class="bg- bg-foreground/10 hover:bg-foreground/15 w-1/3 p-2 font-medium sm:w-1/4"
										>
											{row.label}
										</Table.Cell>
										<Table.Cell class="p-2 font-medium">{row.value}</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<!-- Details Table for Print View -->
		<div class="mt-10 hidden print:block">
			<h3 class="text-2xl font-bold">{$_('details')}</h3>
			<Table.Root>
				<Table.Body>
					{#each additionalTableRows as row}
						<Table.Row class="bg-foreground/5 border-foreground/20">
							<Table.Cell class="bg-foreground/10 w-1/3 p-2 font-medium sm:w-1/4">
								{row.label}
							</Table.Cell>
							<Table.Cell class="p-2 font-medium">{row.value}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
			<h3 class="pt-8 text-2xl font-bold">{$_('technicalSpecifications')}</h3>
			<Table.Root>
				<Table.Body>
					{#each additionalTableRows as row}
						<Table.Row class="bg-foreground/5 border-foreground/20">
							<Table.Cell class="bg-foreground/10 w-1/3 p-2 font-medium sm:w-1/4">
								{row.label}
							</Table.Cell>
							<Table.Cell class="p-2 font-medium">{row.value}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
		<!-- Description Section -->
		<div class="mt-10 print:mt-8">
			<h2 class="mb-4 text-2xl font-bold">{$_('description')}</h2>
			<div class="prose prose-neutral prose-sm md:prose-base max-w-none text-gray-600">
				{#if data.description}
					{@html resolveRichText(data.description)}
				{:else}
					<p>No description available for this product.</p>
				{/if}
			</div>
		</div>
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
