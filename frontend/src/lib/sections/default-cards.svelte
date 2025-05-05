<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let data: {
		title: string;
		content: string;
		redirectButtons: {
			label: string;
			link: string;
		}[];
		thumbnail: ImageAsset;
		anchor: string;
	}[] = $props();
</script>

<section class="mx-3 my-16 flex flex-col gap-16 sm:container sm:mx-auto sm:my-24 lg:w-full">
	{#each data as card, index}
		<div
			id={card.anchor}
			class="shadow-primary bg-foreground mx-auto flex w-full scroll-mt-24 flex-col gap-4 md:flex-row
			{index % 2 !== 0 ? 'md:flex-row-reverse' : ''}"
		>
			{#if card.thumbnail}
				<div class="max-h-content w-full md:w-3/5">
					<img
						class="h-full w-full object-cover"
						src={!PUBLIC_BACKEND_URL.includes('https')
							? `${PUBLIC_BACKEND_URL}${card.thumbnail.url}`
							: card.thumbnail.url}
						alt={card.thumbnail.alternativeText}
					/>
				</div>
			{/if}
			<div class={cn(card.thumbnail ? 'w-full md:w-2/5' : 'w-full', 'p-10')}>
				<div class="text-secondary">
					<h3 class="font-boldFont text-lg xl:text-3xl">{card.title}</h3>
					<div class="mt-2">{@html card.content}</div>
				</div>
				<div class="mt-8 flex gap-4">
					{#each card.redirectButtons as button}
						<Button href={button.link}>
							<span class="skew-x-[15deg]">{button.label}</span>
						</Button>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</section>
