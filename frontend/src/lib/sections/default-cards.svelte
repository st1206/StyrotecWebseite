<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn, getRedirectLink } from '$lib/utils';

	let data: {
		sectionTitle?: string;
		description?: string;
		cards: {
			title: string;
			content?: string;
			redirectButtons: {
				label: string;
				redirectSlug: string;
			}[];
			thumbnail?: ImageAsset;
			anchor?: string;
		}[];
		anchor?: string;
		isDarkMode?: string;
	} = $props();
</script>

{#if data.isDarkMode}
	<div
		class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
	></div>
{/if}

<section
	id={data.anchor}
	class={cn(data.isDarkMode ? 'bg-foreground py-8 pb-12' : 'my-16 sm:my-24', 'scroll-mt-32')}
>
	<div class="mx-3 sm:container sm:mx-auto lg:w-full">
		{#if data.sectionTitle}
			<!-- Heading -->
			<div class="mb-16">
				<h2
					class={cn(
						data.isDarkMode ? 'text-secondary' : 'text-foreground',
						'font-boldFont text-center text-4xl uppercase'
					)}
				>
					{data.sectionTitle}
				</h2>
				<p
					class={cn(
						data.isDarkMode ? 'text-secondary' : 'text-foreground',
						'prose prose-neutral prose-sm lg:prose-base xl:prose-lg mx-auto mt-2 max-w-5xl text-center'
					)}
				>
					{@html data.description}
				</p>
			</div>
		{/if}
		<div class={cn('grid grid-cols-6 justify-center gap-16')}>
			{#each data.cards as card, i}
				{#if card}
					<div
						id={card.anchor}
						class={cn(
							data.isDarkMode ? 'bg-secondary/10 text-secondary' : 'bg-foreground text-secondary',
							i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row',
							card.thumbnail && !card.content ? 'md:col-span-3 xl:col-span-2' : '',
							!card.thumbnail && card.content && data.cards.length > 1 ? 'md:col-span-3' : '',
							data.cards.length > 1 &&
								i + 1 === data.cards.length &&
								!card.thumbnail &&
								data.cards.length % 2 !== 0
								? 'md:col-start-3'
								: '',
							'shadow-primary relative col-span-6 mx-auto flex scroll-mt-24 flex-col gap-4 transition duration-300 ease-in-out'
						)}
					>
						{#if card.thumbnail}
							<div class="max-h-content w-full">
								<img
									class="{!card.content
										? 'aspect-square'
										: 'md:max-w-[450px] lg:max-w-[600px] xl:max-w-[800px]'} h-full w-max object-cover"
									src={!PUBLIC_BACKEND_URL.includes('https')
										? `${PUBLIC_BACKEND_URL}${card.thumbnail.url}`
										: card.thumbnail.url}
									alt={card.thumbnail.alternativeText}
								/>
							</div>
						{/if}
						{#if !card.content}
							<div
								class="bg-foreground/90 flex {card.title.length > 20
									? 'flex-col lg:flex-row'
									: card.title.length > 30
										? 'flex-col lg:flex-row xl:flex-col'
										: 'flex-row'} absolute bottom-0 w-full justify-between gap-2 p-4 pt-2"
							>
								<h4 class="text-secondary font-boldFont text-2xl lg:text-3xl">
									{@html card.title}
								</h4>
								<div class="flex">
									{#if card.redirectButtons.length}
										{#each card.redirectButtons as button}
											<Button size="sm" href={getRedirectLink(button.redirectSlug)}>
												<span class="skew-x-[15deg]">{button.label}</span>
											</Button>
										{/each}
									{/if}
								</div>
							</div>
						{/if}
						{#if card.content}
							<div
								class={cn(
									card.thumbnail ? 'w-full' : 'w-full',
									'flex flex-col justify-between p-10'
								)}
							>
								<div>
									<h3 class="font-boldFont text-lg sm:text-3xl xl:text-4xl">{card.title}</h3>
									<div
										class={cn(
											data.isDarkMode ? 'text-secondary/90' : 'text-secondary/80',
											'prose prose-neutral prose-sm xl:prose-lg mt-2'
										)}
									>
										{@html card.content}
									</div>
								</div>
								{#if card.redirectButtons.length}
									<div class="mt-6 flex gap-4">
										{#each card.redirectButtons as button}
											<Button href={getRedirectLink(button.redirectSlug)}>
												<span class="skew-x-[15deg]">{button.label}</span>
											</Button>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

{#if data.isDarkMode}
	<div
		class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
	></div>
{/if}
