<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { SafeData } from '$lib/utils/validation';
	import * as Accordion from '$lib/components/ui/accordion';
	import { getDownloadUrl, resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import { Icons } from '$lib/assets/icons';
	import { Button } from '$lib/components/ui/button';

	let {
		jobAds: rawJobAds = []
	}: {
		jobAds?: {
			title: string;
			description?: string;
			content: StrapiRichTextNode[];
			file?: any;
		}[];
	} = $props();

	const jobAds = $derived(
		rawJobAds.flatMap((jobAd) => {
			if (!jobAd) return [];

			const jobAdSafe = new SafeData(jobAd);
			const title = jobAdSafe.getString('title');
			const description = jobAdSafe.getString('description');
			const content = jobAdSafe.getArray<StrapiRichTextNode>('content', []);

			if (!title || !description || !content) return [];

			const file = jobAdSafe.getObject('file');

			return [
				{
					title,
					description: jobAdSafe.getString('description'),
					content,
					file,
					hasContent: content.length > 0
				}
			];
		})
	);

	$inspect(jobAds);
</script>

<section class="my-16 scroll-mt-24 px-4 sm:container sm:mx-auto lg:max-w-5xl xl:max-w-7xl">
	{#if jobAds.length > 0}
		<Accordion.Root type="single" class="flex w-full flex-col gap-4">
			{#each jobAds as item, i}
				<div class="bg-foreground shadow-primary transition ease-in-out">
					<Accordion.Item value="item-{i + 1}" class="text-secondary border-none">
						<Accordion.Trigger class="bg-transparent hover:bg-transparent">
							<div class="font-base grid w-full grid-cols-12 items-center text-start">
								<div class="col-span-10 col-start-1 mt-8 flex flex-col gap-2 sm:mt-0">
									<h2 class="text-3xl font-bold">{item.title}</h2>

									{#if item.description}
										<h3 class="text-xs">{item.description}</h3>
									{/if}
								</div>
							</div>
						</Accordion.Trigger>

						<Accordion.Content>
							<div class="grid grid-cols-12">
								<Separator class="bg-secondary/20 col-span-12 col-start-1" />
								<div
									class="prose prose-sm text-secondary prose-neutral lg:prose-base xl:prose-base col-span-9 mt-2 max-w-5xl sm:col-start-1"
								>
									{#if item.hasContent}
										{@html resolveRichText(item.content)}
									{:else}
										<p class="text-center text-sm">
											{$_('fairs.noAdditionalInfo') || 'No additional information available'}
										</p>
									{/if}
								</div>
								<div class="col-span-3 m-2">
									<Button
										class="ml-auto w-max"
										onclick={() => {
											const downloadUrl = getDownloadUrl(item.file);
											if (downloadUrl !== '#') {
												window.open(downloadUrl, '_blank');
											}
										}}
									>
										<span class="skew-x-[15deg]">
											{$_('button.learnMore')}
										</span>
									</Button>
								</div>
							</div>
						</Accordion.Content>
					</Accordion.Item>
					{#if i < jobAds.length - 1}
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
