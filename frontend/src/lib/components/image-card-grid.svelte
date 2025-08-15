<!-- src/lib/components/sections/ImageCardGrid.svelte -->
<script lang="ts">
	import { Icons } from '$lib/assets/icons';
	import { cn } from '$lib/utils';
	import { _ } from 'svelte-i18n';

	type Card = {
		title: string;
		subtitle?: string;
		imageUrl?: string | null;
		altText: string;
		isImageTransparent: boolean;
	};

	type Props = {
		cards: Card[];
		isDarkMode?: boolean;
		class?: string;
	};

	let { cards, isDarkMode = false, class: className = '' }: Props = $props();

	function handleAssetError(event: Event) {
		const element = event.target as HTMLElement;
		const fallback = element.nextElementSibling as HTMLElement | null;
		if (fallback) {
			element.style.display = 'none';
			fallback.style.display = 'flex';
		}
	}
</script>

{#if cards.length > 0}
	<div
		class={cn('mt-16 grid grid-cols-1 flex-wrap gap-12 md:grid-cols-2 xl:grid-cols-3', className)}
	>
		{#each cards as card}
			<div
				class={cn(
					'relative',
					isDarkMode ? 'bg-secondary/10' : 'bg-foreground/10',
					!card.subtitle && 'shadow-primary'
				)}
			>
				{#if card.imageUrl}
					<!-- Card image with fallback -->
					<img
						src={card.imageUrl}
						alt={card.altText}
						class="mx-auto h-[300px] w-auto object-cover object-top lg:h-[330px] xl:h-[400px]"
						style="display: block;"
						onerror={handleAssetError}
						loading="lazy"
					/>
					<!-- Fallback for broken card image -->
					<div
						class={cn(
							'text-muted-foreground flex h-[300px] flex-col items-center justify-center lg:h-[330px] xl:h-[400px]',
							isDarkMode ? 'bg-secondary/20' : 'bg-muted'
						)}
						style="display: none;"
					>
						<Icons.user class="mb-2 size-12 opacity-50" />
						<p class="px-4 text-center text-sm">{card.title}</p>
						<p class="mt-1 text-xs opacity-75">
							{$_('common.imageNotAvailable') || 'Image not available'}
						</p>
					</div>
				{:else}
					<!-- No image available -->
					<div
						class={cn(
							'text-muted-foreground flex h-[300px] flex-col items-center justify-center lg:h-[330px] xl:h-[400px]',
							isDarkMode ? 'bg-secondary/20' : 'bg-muted'
						)}
					>
						<Icons.user class="mb-2 size-12 opacity-50" />
						<p class="px-4 text-center text-sm">{card.title}</p>
						<p class="mt-1 text-xs opacity-75">
							{$_('common.noImageAvailable') || 'No image available'}
						</p>
					</div>
				{/if}

				<div
					class={cn(
						'bg-foreground/90 absolute bottom-0 flex w-full flex-col justify-between p-2 px-4'
					)}
				>
					<h4 class={cn('text-secondary font-sans text-3xl font-bold')}>
						{card.title}
					</h4>
					{#if card.subtitle}
						<h5 class="text-primary">{card.subtitle}</h5>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<!-- Empty cards state -->
	<div class="mt-16 flex flex-col items-center justify-center py-8 text-center">
		<Icons.users class={cn('mb-4 size-12', isDarkMode ? 'opacity-30' : 'text-muted-foreground')} />
		<p class={cn(isDarkMode ? 'text-secondary/70' : 'text-muted-foreground')}>
			{$_('media.noCardsAvailable') || 'No cards available'}
		</p>
	</div>
{/if}
