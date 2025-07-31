<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Icons } from '$lib/assets/icons';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { _ } from 'svelte-i18n';

	let data: { brochures: { thumbnail: ImageAsset; file: any }[] } = $props();
</script>

<section id="prospekte" class="my-16 w-full px-4 sm:container sm:mx-auto lg:max-w-4xl">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
		{#each data.brochures as brochure}
			<div class="relative">
				<div
					class={cn(
						'bg-foreground/90 absolute bottom-0 flex h-[80px] w-full translate-y-[0.5px] items-end pb-1 [clip-path:polygon(0%_0%,150%_100%,100%_100%,0%_100%)]'
					)}
				>
					<Button variant="link" class={cn('text-secondary gap-2 font-sans text-xl font-bold')}>
						<Icons.download class="size-5" />
						{$_('button.print')}
					</Button>
				</div>
				<img
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${brochure.thumbnail.formats?.['large']?.url || brochure.thumbnail.url}`
						: brochure.thumbnail.url}
					alt={brochure.thumbnail.alternativeText}
					class="shadow-foreground bg-secondary w-full object-cover"
				/>
			</div>
		{/each}
	</div>
</section>
