<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { _ } from 'svelte-i18n';
	import { SafeData } from '$lib/validation';
	import { optimizeImageUrl, handleImageError } from '$lib/image';
	import * as Accordion from '$lib/components/ui/accordion';
	import { dateFormatter, resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { Icons } from '$lib/assets/icons';

	let {
		fairs: rawFairs = []
	}: {
		fairs?: ({
			name?: string;
			description?: string;
			content?: StrapiRichTextNode[];
			city?: string;
			startDate?: string;
			endDate?: string;
			externalLink?: string;
			logo?: ImageAsset;
		} | null)[];
	} = $props();

	const fairs = $derived(
		rawFairs.flatMap((fair) => {
			if (!fair) return [];

			const fairSafe = new SafeData(fair);
			const name = fairSafe.getString('name');
			const startDate = fairSafe.getString('startDate');
			const endDate = fairSafe.getString('endDate');

			if (!name) return [];

			const formattedStartDate = startDate ? dateFormatter.format(new Date(startDate)) : '';
			const formattedEndDate = endDate ? dateFormatter.format(new Date(endDate)) : '';

			let displayDate = '';
			if (formattedStartDate && formattedEndDate && formattedStartDate !== formattedEndDate) {
				displayDate = `${formattedStartDate} - ${formattedEndDate}`;
			} else if (formattedStartDate) {
				displayDate = formattedStartDate;
			}

			const logo = fairSafe.getObject<ImageAsset>('logo');
			const content = fairSafe.getArray<StrapiRichTextNode>('content', []);

			return [
				{
					name,
					description: fairSafe.getString('description'),
					content,
					city: fairSafe.getString('city'),
					externalLink: fairSafe.getString('externalLink'),
					logo,
					logoUrl: optimizeImageUrl(new SafeData(logo).getImageUrl(), PUBLIC_BACKEND_URL),
					displayDate,
					hasContent: content.length > 0
				}
			];
		})
	);
</script>

<section class="my-16 scroll-mt-16 px-4 sm:container sm:mx-auto lg:max-w-5xl xl:max-w-7xl">
	{#if fairs.length > 0}
		<Accordion.Root type="single" class="flex w-full flex-col gap-4">
			{#each fairs as item, i}
				<Accordion.Item value="item-{i + 1}" class="border-none">
					<Accordion.Trigger
						class="font-base text-foreground grid h-max grid-cols-12 items-center text-start"
					>
						<div class="col-span-3 mr-8">
							{#if item.logoUrl}
								<img
									src={item.logoUrl}
									alt={item.logo?.alternativeText || item.name}
									class="max-h-[70px] w-full rounded-lg object-contain"
									style="display: block;"
									onerror={handleImageError}
									loading="lazy"
								/>
								<div
									class="bg-secondary/20 text-muted-foreground flex max-h-[70px] flex-col items-center justify-center rounded-lg p-2"
									style="display: none;"
								>
									<Icons.calendar class="mb-1 size-6 opacity-50" />
									<p class="text-center text-xs">{item.name}</p>
								</div>
							{:else}
								<div
									class="bg-secondary/20 text-muted-foreground flex max-h-[70px] flex-col items-center justify-center rounded-lg p-2"
								>
									<Icons.calendar class="mb-1 size-6 opacity-50" />
									<p class="text-center text-xs">{item.name}</p>
								</div>
							{/if}
						</div>

						<div class="col-span-8 flex flex-col gap-2">
							{#if item.displayDate || item.city}
								<h4 class="text-lg">
									{item.displayDate}
									{#if item.displayDate && item.city}|{/if}
									{item.city}
								</h4>
							{/if}

							<h2 class="text-3xl font-bold">{item.name}</h2>

							{#if item.description}
								<h3 class="text-xs">{item.description}</h3>
							{/if}
						</div>
					</Accordion.Trigger>

					<Accordion.Content>
						<div class="grid w-full grid-cols-12">
							<div
								class="prose prose-sm prose-neutral lg:prose-base xl:prose-lg col-span-8 col-start-4 mx-auto mt-2 max-w-5xl"
							>
								{#if item.hasContent}
									{@html resolveRichText(item.content)}
								{:else}
									<p class="text-muted-foreground text-center text-sm">
										{$_('fairs.noAdditionalInfo') || 'No additional information available'}
									</p>
								{/if}
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>
				{#if i < fairs.length - 1}
					<Separator />
				{/if}
			{/each}
		</Accordion.Root>
	{:else}
		<!-- Empty state -->
		<div class="flex flex-col items-center justify-center py-16 text-center">
			<Icons.calendar class="mb-4 size-16 opacity-30" />
			<h3 class="mb-2 text-lg font-semibold">
				{$_('fairs.noFairs') || 'No fairs or events available'}
			</h3>
			<p class="text-muted-foreground max-w-md">
				{$_('fairs.noFairsDescription') ||
					'Information about upcoming fairs and events will be displayed here when available.'}
			</p>
		</div>
	{/if}
</section>
