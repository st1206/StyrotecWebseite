<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
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
						'text-center font-sans text-4xl font-bold uppercase'
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
		<div class="grid grid-cols-6 justify-center gap-8 md:gap-16">
			{#each data.cards as card, i}
				{#if card}
					<div
						id={card.anchor}
						class={cn(
							'shadow-primary relative col-span-6 mx-auto flex h-full w-full scroll-mt-24 flex-col overflow-hidden rounded-lg transition duration-300 ease-in-out',
							data.isDarkMode ? 'bg-secondary/10 text-secondary' : 'text-secondary bg-foreground',
							i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row',
							card.thumbnail && !card.content ? 'md:col-span-3 xl:col-span-2' : '',
							!card.thumbnail && card.content && data.cards.length > 1 ? 'md:col-span-3' : '',
							data.cards.length > 1 &&
								i + 1 === data.cards.length &&
								!card.thumbnail &&
								data.cards.length % 2 !== 0
								? 'md:col-start-3'
								: ''
						)}
					>
						{#if card.thumbnail}
							<div
								class={cn(
									'relative w-full shrink-0',
									card.content ? 'md:w-[40%]' : 'w-full',
									'aspect-[3/2]'
								)}
							>
								<img
									class="absolute inset-0 h-full w-full object-cover"
									src={!PUBLIC_BACKEND_URL.includes('https')
										? `${PUBLIC_BACKEND_URL}${card.thumbnail.url}`
										: card.thumbnail.url}
									alt={card.thumbnail.alternativeText}
								/>

								{#if !card.content}
									<div
										class="bg-foreground/90 absolute bottom-0 flex w-full flex-wrap items-center justify-between gap-x-2 p-2 px-4"
									>
										<h4 class="text-secondary font-sans text-2xl font-bold lg:text-2xl">
											{@html card.title}
										</h4>
										<div class="flex">
											{#if card.redirectButtons.length}
												{#each card.redirectButtons as button}
													<Button href={getRedirectLink(button.redirectSlug)} class="h-8 px-2">
														<span class="h-4 skew-x-[15deg] text-sm">{button.label}</span>
													</Button>
												{/each}
											{/if}
										</div>
									</div>
								{/if}
							</div>
						{/if}

						{#if card.content}
							<div class="flex flex-grow flex-col justify-between p-6 md:p-10">
								<div>
									<h3 class="font-sans text-lg font-bold sm:text-3xl xl:text-4xl">{card.title}</h3>
									<div
										class={cn(
											data.isDarkMode ? 'text-secondary/90' : 'text-secondary/80',
											'prose prose-neutral prose-sm xl:prose-lg mt-2 max-w-none'
										)}
									>
										{@html card.content}
									</div>
								</div>
								{#if card.redirectButtons.length}
									<div class="mt-6 flex flex-wrap gap-4">
										{#each card.redirectButtons as button}
											<Button href={getRedirectLink(button.redirectSlug)}>
												<span class="h-5 skew-x-[15deg]">{button.label}</span>
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
