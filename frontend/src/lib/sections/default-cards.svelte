<script lang="ts">
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { Button } from '$lib/components/ui/button';
	import { cn, getRedirectLink } from '$lib/utils';
	import { SafeData } from '$lib/validation';
	import { getOptimizedImageUrl, getImageAltText, handleImageError } from '$lib/image';

	let data: {
		sectionTitle?: string;
		description?: string;
		cards?: {
			title?: string;
			content?: string;
			redirectButtons?: {
				label?: string;
				redirectSlug?: string;
				isPrimaryAction?: boolean;
			}[];
			thumbnail?: ImageAsset;
			anchor?: string;
		}[];
		anchor?: string;
		isDarkMode?: string;
	} = $props();

	// Create safe data accessor
	const safe = new SafeData(data);
	const sectionTitle = safe.getString('sectionTitle');
	const description = safe.getString('description');
	const anchor = safe.getString('anchor');
	const isDarkMode = safe.getString('isDarkMode');
	type CardButton = { label?: string; redirectSlug?: string; isPrimaryAction?: boolean };
	type CardInput = {
		title?: string;
		content?: string;
		redirectButtons?: CardButton[];
		thumbnail?: ImageAsset;
		anchor?: string;
	};
	const rawCards = safe.getArray<CardInput>('cards', []);

	// Helper function to get optimized image URL
	const formatPreference = ['medium', 'small'];

	interface CardViewModel {
		title: string;
		content?: string;
		anchor?: string;
		thumbnail?: ImageAsset;
		thumbnailUrl: string;
		thumbnailAlt: string;
		redirectButtons: { label: string; redirectSlug: string; isPrimaryAction: boolean }[];
		hasValidThumbnail: boolean;
		hasContent: boolean;
		hasButtons: boolean;
	}

	const validCards: CardViewModel[] = $derived.by(() =>
		rawCards
			.filter((card) => card && typeof card === 'object')
			.map((card) => {
				const cardSafe = new SafeData(card);
				const title = cardSafe.getString('title', 'Untitled Card');
				const content = cardSafe.getString('content');
				const anchor = cardSafe.getString('anchor');
				const thumbnail = card.thumbnail;
				const thumbnailUrl = getOptimizedImageUrl(thumbnail, formatPreference);
				const thumbnailAlt = getImageAltText(thumbnail, title);

				// Process buttons
				const rawButtons = cardSafe.getArray<CardButton>('redirectButtons', []);
				const validButtons = rawButtons
					.filter((btn) => btn && typeof btn === 'object')
					.map((btn: CardButton) => {
						const btnSafe = new SafeData(btn);
						return {
							label: btnSafe.getString('label', 'Learn More'),
							redirectSlug: btnSafe.getString('redirectSlug', '#'),
							isPrimaryAction: Boolean(btn.isPrimaryAction)
						};
					})
					.filter((btn) => btn.label && btn.redirectSlug);

				return {
					title,
					content,
					anchor,
					thumbnail,
					thumbnailUrl,
					thumbnailAlt,
					redirectButtons: validButtons,
					hasValidThumbnail: Boolean(thumbnailUrl),
					hasContent: Boolean(content),
					hasButtons: validButtons.length > 0
				};
			})
			.filter((card) => card.title)
	);

	const hasValidCards = $derived.by(() => validCards.length > 0);
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
			<!-- Heading -->
			<div class="mb-16">
				<h2
					class={cn(
						isDarkMode ? 'text-secondary' : 'text-foreground',
						'text-center font-sans text-4xl font-bold uppercase'
					)}
				>
					{sectionTitle}
				</h2>
				{#if description}
					<div
						class={cn(
							isDarkMode ? 'text-secondary' : 'text-foreground',
							'prose prose-sm prose-neutral lg:prose-base xl:prose-lg mx-auto mt-2 max-w-5xl text-center'
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
					{@const primaryAction = (card.redirectButtons || []).find((b) => b.isPrimaryAction)}
					{@const visibleButtons = (card.redirectButtons || []).filter((b) => !b.isPrimaryAction)}
					{@const CardElement = primaryAction ? 'a' : 'div'}

					<svelte:element
						this={CardElement}
						href={primaryAction ? getRedirectLink(primaryAction.redirectSlug || '#') : undefined}
						id={card.anchor}
						class={cn(
							'shadow-primary relative col-span-6 mx-auto flex h-full w-full scroll-mt-24 flex-col overflow-hidden rounded-lg transition duration-300 ease-in-out',
							isDarkMode ? 'bg-secondary/10 text-secondary' : 'bg-foreground text-secondary',
							i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row',
							card.hasValidThumbnail && !card.hasContent ? 'md:col-span-3 xl:col-span-2' : '',
							!card.hasValidThumbnail && card.hasContent && validCards.length > 1
								? 'md:col-span-3'
								: '',
							validCards.length > 1 &&
								i + 1 === validCards.length &&
								!card.hasValidThumbnail &&
								validCards.length % 2 !== 0
								? 'md:col-start-3'
								: '',
							primaryAction ? 'hover:scale-[101%] hover:shadow-[10px_10px_0_#f6a313] ' : ''
						)}
					>
						<!-- Image section with robust error handling -->
						{#if card.hasValidThumbnail}
							<div
								class={cn(
									'relative w-full shrink-0',
									card.hasContent ? 'md:w-[40%]' : 'w-full',
									'aspect-[3/2]'
								)}
							>
								<img
									class="absolute inset-0 h-full w-full object-cover"
									src={card.thumbnailUrl}
									alt={card.thumbnailAlt}
									loading="lazy"
									onerror={handleImageError}
								/>
								<!-- Fallback for broken images -->
								<div class="bg-muted absolute inset-0 flex flex-col items-center justify-center">
									<svg
										class="text-muted-foreground mb-2 h-8 w-8"
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

								{#if !card.hasContent}
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
										<!-- Render only the non-primary buttons -->
										{#if visibleButtons.length > 0}
											<div class="flex">
												{#each visibleButtons as button}
													<Button
														href={getRedirectLink(button.redirectSlug || '#')}
														class="h-8 px-2"
													>
														<span class="h-4 skew-x-[15deg] text-sm">{button.label}</span>
													</Button>
												{/each}
											</div>
										{/if}
									</div>
								{/if}
							</div>
						{:else if card.thumbnail}
							<!-- Thumbnail provided but invalid -->
							<div
								class={cn(
									'border-muted-foreground/20 bg-muted relative flex w-full shrink-0 items-center justify-center border-2 border-dashed',
									card.hasContent ? 'md:w-[40%]' : 'w-full',
									'aspect-[3/2]'
								)}
							>
								<div class="text-center">
									<svg
										class="text-muted-foreground mx-auto mb-2 h-8 w-8"
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
									<p class="text-muted-foreground text-xs">Invalid image</p>
								</div>

								{#if !card.hasContent}
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
									</div>
								{/if}
							</div>
						{/if}

						{#if card.hasContent}
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
											isDarkMode ? 'text-secondary/90' : 'text-secondary/80',
											'prose prose-sm prose-neutral xl:prose-lg mt-2 max-w-none'
										)}
									>
										{#if (card.content || '').includes('<')}
											{@html card.content}
										{:else}
											<p>{card.content}</p>
										{/if}
									</div>
								</div>
								<!-- Render only the non-primary buttons -->
								{#if visibleButtons.length > 0}
									<div class="mt-6 flex flex-wrap gap-4">
										{#each visibleButtons as button}
											<Button href={getRedirectLink(button.redirectSlug || '#')}>
												<span class="h-5 skew-x-[15deg]">{button.label}</span>
											</Button>
										{/each}
									</div>
								{/if}
							</div>
						{/if}

						<!-- Show warning if card has no buttons -->
						{#if !card.hasButtons && !primaryAction}
							<div class="border-t border-yellow-200 bg-yellow-50 p-4">
								<p class="text-center text-xs text-yellow-800">
									No action buttons available for this card
								</p>
							</div>
						{/if}
					</svelte:element>
				{/each}
			</div>
		{:else}
			<!-- No valid cards fallback -->
			<div class="py-16 text-center">
				<div class="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
					<svg
						class="text-muted-foreground h-8 w-8"
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
				{#if rawCards.length > 0}
					<p class="text-muted-foreground text-sm">
						{rawCards.length} card(s) provided but none could be displayed properly
					</p>
				{:else}
					<p class="text-muted-foreground text-sm">No cards were provided for this section</p>
				{/if}
			</div>
		{/if}
	</div>
</section>

{#if isDarkMode}
	<div
		class="bg-foreground mb-32 h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"
	></div>
{/if}

<section
	id={data.anchor}
	class={cn(data.isDarkMode ? 'bg-foreground py-8 pb-12' : 'my-16 sm:my-24', 'scroll-mt-32')}
>
	<div class="mx-3 sm:container sm:mx-auto lg:w-full">
		{#if data.sectionTitle && data.cards}
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
						'prose prose-sm prose-neutral lg:prose-base xl:prose-lg mx-auto mt-2 max-w-5xl text-center'
					)}
				>
					{@html data.description}
				</p>
			</div>
		{/if}
		<div class="grid grid-cols-6 justify-center gap-8 md:gap-16">
			{#each data.cards ?? [] as card, i}
				{#if card}
					{@const primaryAction = (card.redirectButtons || []).find((b) => b.isPrimaryAction)}
					{@const visibleButtons = (card.redirectButtons || []).filter((b) => !b.isPrimaryAction)}
					{@const CardElement = primaryAction ? 'a' : 'div'}

					<svelte:element
						this={CardElement}
						href={primaryAction ? getRedirectLink(primaryAction.redirectSlug || '#') : undefined}
						id={card.anchor}
						class={cn(
							'shadow-primary relative col-span-6 mx-auto flex h-full w-full scroll-mt-24 flex-col overflow-hidden rounded-lg transition duration-300 ease-in-out',
							data.isDarkMode ? 'bg-secondary/10 text-secondary' : 'bg-foreground text-secondary',
							i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row',
							card.thumbnail && !card.content ? 'md:col-span-3 xl:col-span-2' : '',
							!card.thumbnail && card.content && (data.cards?.length ?? 0) > 1
								? 'md:col-span-3'
								: '',
							(data.cards?.length ?? 0) > 1 &&
								i + 1 === (data.cards?.length ?? 0) &&
								!card.thumbnail &&
								(data.cards?.length ?? 0) % 2 !== 0
								? 'md:col-start-3'
								: '',
							primaryAction ? 'hover:scale-[101%] hover:shadow-[10px_10px_0_#f6a313] ' : ''
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
									src={getOptimizedImageUrl(card.thumbnail, formatPreference)}
									alt={getImageAltText(card.thumbnail, card.title || 'Image')}
								/>

								{#if !card.content}
									<div
										class="bg-foreground/90 absolute bottom-0 flex w-full flex-wrap items-center justify-between gap-x-2 p-2 px-4"
									>
										<h4 class="text-secondary font-sans text-2xl font-bold lg:text-2xl">
											{@html card.title}
										</h4>
										<!-- Render only the non-primary buttons -->
										<div class="flex">
											{#if visibleButtons.length}
												{#each visibleButtons as button}
													<Button
														href={getRedirectLink(button.redirectSlug || '#')}
														class="h-8 px-2"
													>
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
									<h3 class="font-sans text-lg font-bold sm:text-3xl xl:text-4xl">
										{card.title}
									</h3>
									<div
										class={cn(
											data.isDarkMode ? 'text-secondary/90' : 'text-secondary/80',
											'prose prose-sm prose-neutral xl:prose-lg mt-2 max-w-none'
										)}
									>
										{@html card.content}
									</div>
								</div>
								<!-- Render only the non-primary buttons -->
								{#if visibleButtons.length}
									<div class="mt-6 flex flex-wrap gap-4">
										{#each visibleButtons as button}
											<Button href={getRedirectLink(button.redirectSlug || '#')}>
												<span class="h-5 skew-x-[15deg]">{button.label}</span>
											</Button>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</svelte:element>
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
