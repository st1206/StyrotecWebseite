<script lang="ts">
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { Button } from '$lib/components/ui/button';
	import { cn, getRedirectLink } from '$lib/utils';
	import { SafeData } from '$lib/validation';
	import { getOptimizedImageUrl, getImageAltText, handleImageError } from '$lib/image';

	let {
		sectionTitle = '',
		description = '',
		cards: rawCards = [],
		anchor = '',
		isDarkMode = false
	}: {
		sectionTitle?: string;
		description?: string;
		cards?: ({
			title?: string;
			content?: string;
			redirectButtons?: {
				label?: string;
				redirectSlug?: string;
				isPrimaryAction?: boolean;
			}[];
			thumbnail?: ImageAsset;
			anchor?: string;
		} | null)[];
		anchor?: string;
		isDarkMode?: boolean;
	} = $props();

	// --- Derived State ---
	const validCards = $derived(
		rawCards.flatMap((card) => {
			if (!card) return []; // Filter out null/undefined cards

			const cardSafe = new SafeData(card);
			const title = cardSafe.getString('title');

			// A card must have a title to be valid
			if (!title) return [];

			const thumbnail = cardSafe.getObject<ImageAsset>('thumbnail');
			const thumbnailUrl = getOptimizedImageUrl(thumbnail, ['medium', 'small']);

			const validButtons = cardSafe.getArray('redirectButtons', []).flatMap((btn) => {
				if (!btn) return [];
				const btnSafe = new SafeData(btn);
				const label = btnSafe.getString('label');
				const redirectSlug = btnSafe.getString('redirectSlug');
				if (!label || !redirectSlug) return [];
				return [
					{
						label,
						redirectSlug,
						isPrimaryAction: btnSafe.getBoolean('isPrimaryAction')
					}
				];
			});

			return [
				{
					title,
					content: cardSafe.getString('content'),
					anchor: cardSafe.getString('anchor'),
					thumbnailUrl,
					thumbnailAlt: getImageAltText(thumbnail, title),
					redirectButtons: validButtons
				}
			];
		})
	);

	const hasValidCards = $derived(validCards.length > 0);
</script>

{#if isDarkMode}
	<div
		class="bg-foreground mt-20 h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28"
	></div>
{/if}

<section
	id={anchor}
	class={cn(isDarkMode ? 'bg-foreground py-8 pb-12' : 'my-16 sm:my-24', 'scroll-mt-32')}
>
	<div class="mx-3 sm:container sm:mx-auto lg:w-full">
		{#if sectionTitle}
			<div class="mb-16 text-center">
				<h2
					class={cn(
						'font-sans text-4xl font-bold uppercase',
						isDarkMode ? 'text-secondary' : 'text-foreground'
					)}
				>
					{sectionTitle}
				</h2>
				{#if description}
					<div
						class={cn(
							'prose prose-sm prose-neutral lg:prose-base xl:prose-lg mx-auto mt-2 max-w-5xl text-center',
							isDarkMode ? 'text-secondary' : 'text-foreground'
						)}
					>
						{#if description.includes('<')}
							{@html description}
						{:else}
							<p>{description}</p>
						{/if}
					</div>
				{/if}
			</div>
		{/if}

		{#if hasValidCards}
			<div class="grid grid-cols-6 justify-center gap-8 md:gap-16">
				{#each validCards as card, i}
					{@const hasContent = !!card.content}
					{@const primaryAction = card.redirectButtons.find((b) => b.isPrimaryAction)}
					{@const visibleButtons = card.redirectButtons.filter((b) => !b.isPrimaryAction)}
					{@const CardElement = primaryAction ? 'a' : 'div'}

					<svelte:element
						this={CardElement}
						href={primaryAction ? getRedirectLink(primaryAction.redirectSlug) : undefined}
						id={card.anchor}
						class={cn(
							'shadow-primary relative col-span-6 mx-auto flex h-full w-full scroll-mt-24 flex-col overflow-hidden rounded-lg transition',
							isDarkMode ? 'bg-secondary/10 text-secondary' : 'bg-foreground text-secondary',
							i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row',
							card.thumbnailUrl && !hasContent ? 'md:col-span-3 xl:col-span-2' : '',
							!card.thumbnailUrl && hasContent && validCards.length > 1 ? 'md:col-span-3' : '',
							validCards.length > 1 &&
								i + 1 === validCards.length &&
								!card.thumbnailUrl &&
								validCards.length % 2 !== 0
								? 'md:col-start-3'
								: '',
							primaryAction ? 'hover:scale-[101%] hover:shadow-[10px_10px_0_#f6a313]' : ''
						)}
					>
						<!-- Simplified Image Section -->
						{#if card.thumbnailUrl}
							<div
								class={cn(
									'relative aspect-[3/2] w-full shrink-0',
									hasContent ? 'md:w-[40%]' : 'w-full'
								)}
							>
								<img
									class="absolute inset-0 h-full w-full object-cover"
									src={card.thumbnailUrl}
									alt={card.thumbnailAlt}
									loading="lazy"
									onerror={handleImageError}
								/>
								<div class="bg-muted absolute inset-0 hidden flex-col items-center justify-center">
									<svg
										class="text-muted-foreground mb-2 size-8"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<p class="text-muted-foreground text-xs">Image not available</p>
								</div>

								{#if !hasContent}
									<div
										class="bg-foreground/90 absolute bottom-0 flex w-full flex-wrap items-center justify-between gap-x-2 p-2 px-4"
									>
										<h4 class="text-secondary font-sans text-2xl font-bold lg:text-2xl">
											{#if card.title.includes('<')}
												{@html card.title}
											{:else}
												{card.title}
											{/if}
										</h4>
										{#if visibleButtons.length > 0}
											<div class="flex">
												{#each visibleButtons as button}
													<Button href={getRedirectLink(button.redirectSlug)} class="h-8 px-2">
														<span class="h-4 skew-x-[15deg] text-sm">{button.label}</span>
													</Button>
												{/each}
											</div>
										{/if}
									</div>
								{/if}
							</div>
						{/if}

						<!-- Content Section -->
						{#if hasContent}
							<div class="flex flex-grow flex-col justify-between p-6 md:p-10">
								<div>
									<h3 class="font-sans text-lg font-bold sm:text-3xl xl:text-4xl">
										{#if card.title.includes('<')}
											{@html card.title}
										{:else}
											{card.title}
										{/if}
									</h3>
									<div
										class={cn(
											'prose prose-sm prose-neutral xl:prose-lg mt-2 max-w-none',
											isDarkMode ? 'text-secondary/90' : 'text-secondary/80'
										)}
									>
										{#if (card.content || '').includes('<')}
											{@html card.content}
										{:else}
											<p>{card.content}</p>
										{/if}
									</div>
								</div>
								{#if visibleButtons.length > 0}
									<div class="mt-6 flex flex-wrap gap-4">
										{#each visibleButtons as button}
											<Button href={getRedirectLink(button.redirectSlug)}>
												<span class="h-5 skew-x-[15deg]">{button.label}</span>
											</Button>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</svelte:element>
				{/each}
			</div>
		{:else}
			<!-- Fallback for no valid cards -->
			<div class="py-16 text-center">
				<div class="bg-muted mx-auto mb-4 flex size-16 items-center justify-center rounded-lg">
					<svg
						class="text-muted-foreground size-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
						/>
					</svg>
				</div>
				<h3 class="text-muted-foreground mb-2 text-lg font-semibold">No cards available</h3>
				<p class="text-muted-foreground text-sm">No cards were provided for this section.</p>
			</div>
		{/if}
	</div>
</section>

{#if isDarkMode}
	<div
		class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
	></div>
{/if}
