<script lang="ts">
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { Employee } from '$lib/models/employee';
	import type { ProductDataSheet } from '$lib/models/productDataSheet';
	import DefaultContent from '$lib/sections/default-content.svelte';
	import PageHeader from '$lib/sections/page-header.svelte';
	import { resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import * as Table from '$lib/components/ui/table';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';

	let data: {
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
			label: $_('designation'),
			value: data.productDataSheet.designation
		},
		{
			label: $_('modelType'),
			value: data.productDataSheet.modelType
		},
		{
			label: $_('manufacturer'),
			value: data.productDataSheet.manufacturer
		},
		{
			label: $_('yearOfManufacture'),
			value: data.productDataSheet.yearOfManufacture
		},
		{
			label: $_('condition'),
			value: data.productDataSheet.condition
		},
		{
			label: $_('location'),
			value: data.productDataSheet.location
		}
	];
</script>

<div class="flex flex-col items-end justify-between sm:container md:flex-row print:items-center">
	<PageHeader {...pageHeaderProps} />
	<div class="mx-auto my-6 flex gap-2 md:m-4 md:mt-28">
		<Button variant="outline" class="w-[100px] print:hidden " onclick={() => window.print()}>
			<span class="skew-x-[15deg]">{$_('print')}</span>
		</Button>
		<Button class="w-[150px] print:hidden" href={`${page.url.pathname}#contact-form`}>
			<span class="skew-x-[15deg]">{$_('request_now')}</span>
		</Button>
		<Button
			class="hidden w-[150px] text-center print:block"
			href={`mailto:${data.contactPerson.email}`}
		>
			<span class="skew-x-[15deg]">{$_('request_now')}</span>
		</Button>
	</div>
</div>

<section class="px-4 sm:container sm:mx-auto">
	<Separator class="bg-primary w-full" />

	<BlurFade once={true} delay={0.2} duration={0.2}>
		<div class="my-6">
			<Table.Root>
				<Table.Body>
					{#each tableRows as row, idx}
						<Table.Row class="bg-foreground/5 hover:bg-foreground/20 border-foreground/20">
							<Table.Cell class="bg-foreground/5 w-[100px] sm:w-[150px]">
								{row?.label}
							</Table.Cell>
							<Table.Cell class="min-w-[100px] text-center font-medium">
								{row?.value}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</BlurFade>

	<BlurFade once={true} delay={0.25} duration={0.2}>
		{#if data.description}
			<Separator class="bg-primary w-full" />
			<p class="prose prose-neutral marker:text-primary prose-sm md:prose-base xl:prose-lg my-6">
				{@html resolveRichText(data.description)}
			</p>
		{/if}
	</BlurFade>
	<Separator class="bg-primary my-6 w-full" />
</section>

<DefaultContent {...contentImages} />
