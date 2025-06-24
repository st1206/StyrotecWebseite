<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { _ } from 'svelte-i18n';
	import * as Accordion from '$lib/components/ui/accordion';
	import { dateFormatter, resolveRichText, type StrapiRichTextNode } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';

	let data: {
		fairs: {
			name: string;
			description: string;
			content: StrapiRichTextNode[];
			city: string;
			startDate: string;
			endDate: string;
			externalLink: string;
			logo: ImageAsset;
		}[];
	} = $props();
</script>

<section class="my-16 scroll-mt-16 px-4 sm:container sm:mx-auto lg:max-w-5xl xl:max-w-7xl">
	<Accordion.Root type="single" class="flex w-full flex-col gap-4">
		{#each data.fairs as item, i}
			<Accordion.Item value="item-{i + 1}" class="border-none">
				<Accordion.Trigger
					class="text-foreground font-base grid h-max grid-cols-12 items-center text-start"
				>
					{#if item.logo}
						<img
							src={!PUBLIC_BACKEND_URL.includes('https')
								? `${PUBLIC_BACKEND_URL}${item.logo.url}`
								: item.logo.url}
							alt={item.name}
							class="col-span-3 mr-8 max-h-[70px] rounded-lg object-contain"
						/>
					{:else}
						<div class="col-span-3"></div>
					{/if}
					<div class="col-span-8 flex flex-col gap-2">
						<h4 class="text-lg">
							{dateFormatter.format(new Date(item.startDate))} - {dateFormatter.format(
								new Date(item.endDate)
							)} | {item.city}
						</h4>
						<h2 class="text-3xl font-bold">{item.name}</h2>
						<h3 class="text-xs">{item.description}</h3>
					</div>
				</Accordion.Trigger>
				{#if item.content && item.content.length > 0}
					<Accordion.Content>
						<div class="grid w-full grid-cols-12">
							<p
								class="prose prose-neutral prose-sm lg:prose-base xl:prose-lg col-span-8 col-start-4 mx-auto mt-2 max-w-5xl"
							>
								{@html resolveRichText(item.content)}
							</p>
						</div>
					</Accordion.Content>
				{/if}
			</Accordion.Item>
			<Separator />
		{/each}
	</Accordion.Root>
</section>
