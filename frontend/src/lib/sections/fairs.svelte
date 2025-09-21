<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import { _ } from 'svelte-i18n';
	import { SafeData } from '$lib/utils/validation';
	import { optimizeImageUrl, handleImageError } from '$lib/utils/image';
	import * as Accordion from '$lib/components/ui/accordion';
	import { dateFormatter, resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { Icons } from '$lib/assets/icons';
	import { Button } from '$lib/components/ui/button';

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
			logo?: ImageAsset | null;
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

<section class="my-16 scroll-mt-24 px-4 sm:container sm:mx-auto lg:max-w-5xl xl:max-w-7xl">
	{#if fairs.length > 0}
		<Accordion.Root type="single" class="flex w-full flex-col gap-4">
			{#each fairs as item, i}
				<div
					class="bg-foreground shadow-primary transition ease-in-out hover:shadow-[8px_8px_0_#f6a313] sm:skew-x-[-15deg]"
				>
					<Accordion.Item value="item-{i + 1}" class="text-secondary border-none sm:skew-x-[15deg]">
						<Accordion.Trigger
							class="bg-transparent hover:bg-transparent sm:skew-x-[-15deg] sm:[&>svg]:skew-x-[15deg]"
						>
							<div
								class="font-base grid w-full grid-cols-12 items-center text-start sm:skew-x-[15deg]"
							>
								<div class="col-span-12 mr-8 sm:col-span-3">
									{#if item.logoUrl}
										<img
											src={item.logoUrl}
											alt={item.logo?.alternativeText || item.name}
											class="max-h-[100px] rounded-lg sm:max-h-[70px] sm:w-full sm:object-contain"
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

								<div class="col-span-8 mt-8 flex flex-col gap-2 sm:mt-0">
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
							</div>
						</Accordion.Trigger>

						<Accordion.Content>
							<Separator class="bg-secondary/20" />
							<div class="grid grid-cols-12">
								<div
									class="prose prose-sm text-secondary prose-neutral lg:prose-base xl:prose-base col-span-7 mt-2 max-w-5xl sm:col-start-4"
								>
									{#if item.hasContent}
										{@html resolveRichText(item.content)}
									{:else}
										<p class="text-center text-sm">
											{$_('fairs.noAdditionalInfo') || 'No additional information available'}
										</p>
									{/if}
								</div>
								<div class="col-span-2 mt-2">
									<Button class="w-max" href={item.externalLink}>
										<span class="skew-x-[15deg]">
											{$_('button.learnMore')}
										</span>
									</Button>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					{#if i < fairs.length - 1}
						<Separator />
					{/if}
				</div>
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
