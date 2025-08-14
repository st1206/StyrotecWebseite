<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { Mail, User } from 'lucide-svelte';
	import { Button, buttonVariants } from './ui/button';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import { page } from '$app/state';

	type Props = {
		name: string;
		position: string;
		picture?: ImageAsset | null;
	};

	let { name, position, picture }: Props = $props();

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}

	const contactFormUrl = $derived(`${page.url.pathname}${page.url.search}#contact-form`);
</script>

<div class="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block">
	<Popover.Root>
		<Popover.Trigger
			aria-label="Open contact card"
			class={cn(
				buttonVariants({ variant: 'default' }),
				'translate-x-[36px] rotate-[270deg] skew-x-[0deg]'
			)}
		>
			<Mail class="size-4" />
			Kontakt
		</Popover.Trigger>
		<Popover.Content side="left" class="bg-foreground text-secondary mr-2 w-80 border-none p-0">
			<div class="flex flex-col">
				{#if picture && !imageError}
					<!-- Employee image with fallback logic -->
					<img
						class="aspect-[3/2] h-auto w-full object-cover object-top"
						src={!PUBLIC_BACKEND_URL.includes('https')
							? `${PUBLIC_BACKEND_URL}${picture.formats?.['medium']?.url || picture.url}`
							: picture.url}
						alt={name}
						onerror={handleImageError}
						loading="lazy"
					/>
				{:else}
					<!-- Fallback for missing or broken employee image -->
					<div
						class="bg-secondary/50 text-muted-foreground flex h-[200px] flex-col items-center justify-center"
					>
						<User class="mb-4 size-16 opacity-50" />
						<p class="text-sm font-medium">{name}</p>
						<p class="mt-1 text-xs opacity-75">Image not available</p>
					</div>
				{/if}

				<div class="p-4">
					{#if position}
						<h3 class="text-primary text-sm">{position}</h3>
					{/if}
					<h2 class="font-sans text-2xl font-bold">{name}</h2>
					<Button variant="secondary" size="sm" class="mt-4 w-max " href={contactFormUrl}>
						<span class="skew-x-[15deg]"> Jetzt kontaktieren </span>
					</Button>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
