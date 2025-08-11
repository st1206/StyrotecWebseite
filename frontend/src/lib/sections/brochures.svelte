<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Icons } from '$lib/assets/icons';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import { SafeData } from '$lib/validation';
	import { handleImageError, optimizeImageUrl } from '$lib/image';

	let data: { brochures?: { thumbnail?: ImageAsset; file?: any }[] } = $props();

	const safe = new SafeData(data);
	const rawBrochures = safe.getArray<any>('brochures', []);

	const brochures = rawBrochures
		.map((brochure, index) => {
			const brochureSafe = new SafeData(brochure);
			const thumbnail = brochureSafe.getObject('thumbnail');
			const file = brochureSafe.getObject('file');

			if (!thumbnail || !file) {
				console.warn(`Brochure at index ${index} missing thumbnail or file:`, {
					thumbnail: !!thumbnail,
					file: !!file
				});
				return null;
			}

			const thumbnailSafe = new SafeData(thumbnail);
			const fileSafe = new SafeData(file);

			return {
				thumbnail: {
					url: thumbnailSafe.getString('url', ''),
					formats: thumbnailSafe.getObject('formats', {}) as Record<string, any>,
					alternativeText: thumbnailSafe.getString('alternativeText', 'Brochure thumbnail')
				},
				file: {
					url: fileSafe.getString('url', ''),
					name: fileSafe.getString('name', 'Download')
				},
				isValid: !!(thumbnailSafe.getString('url') && fileSafe.getString('url'))
			};
		})
		.filter(Boolean);

	function getBrochureImageUrl(thumbnail: any): string {
		if (!thumbnail?.url) return '';

		const formats = (thumbnail.formats as Record<string, any>) || {};
		const largeUrl =
			formats.large?.url || formats.medium?.url || formats.small?.url || thumbnail.url;

		return optimizeImageUrl(largeUrl, PUBLIC_BACKEND_URL);
	}

	function getDownloadUrl(file: any): string {
		if (!file?.url) return '#';

		return !PUBLIC_BACKEND_URL.includes('https') ? `${PUBLIC_BACKEND_URL}${file.url}` : file.url;
	}
</script>

<section id="prospekte" class="my-16 w-full px-4 sm:container sm:mx-auto lg:max-w-4xl">
	{#if brochures.length > 0}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
			{#each brochures as brochure}
				{#if brochure?.isValid}
					<div class="group relative">
						<div
							class={cn(
								'bg-foreground/90 absolute bottom-0 z-10 flex h-[80px] w-full translate-y-[0.5px] items-end pb-1 [clip-path:polygon(0%_0%,150%_100%,100%_100%,0%_100%)]'
							)}
						>
							<Button
								variant="link"
								class={cn(
									'text-secondary gap-2 font-sans text-xl font-bold transition-colors hover:text-white'
								)}
								onclick={() => {
									const downloadUrl = getDownloadUrl(brochure.file);
									if (downloadUrl !== '#') {
										window.open(downloadUrl, '_blank');
									}
								}}
							>
								<Icons.download class="size-5" />
								{$_('button.print')}
							</Button>
						</div>

						<!-- Main image -->
						<img
							src={getBrochureImageUrl(brochure.thumbnail)}
							alt={brochure.thumbnail.alternativeText}
							class="bg-secondary shadow-foreground w-full object-cover transition-transform group-hover:scale-105"
							style="display: block;"
							onerror={handleImageError}
							loading="lazy"
						/>

						<!-- Fallback for broken images -->
						<div
							class="bg-secondary text-muted-foreground shadow-foreground flex h-48 w-full flex-col items-center justify-center"
							style="display: none;"
						>
							<Icons.download class="mb-2 size-12 opacity-50" />
							<p class="px-4 text-center text-sm">
								{brochure.file.name || $_('button.print')}
							</p>
							<p class="mt-1 text-xs opacity-75">
								{$_('common.imageNotAvailable') || 'Image not available'}
							</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{:else}
		<!-- Empty state -->
		<div class="flex flex-col items-center justify-center py-16 text-center">
			<Icons.download class="mb-4 size-16 opacity-30" />
			<h3 class="mb-2 text-lg font-semibold">
				{$_('brochures.noBrochures') || 'No brochures available'}
			</h3>
			<p class="text-muted-foreground max-w-md">
				{$_('brochures.noBrochuresDescription') ||
					'Brochures and documentation will be displayed here when available.'}
			</p>
		</div>
	{/if}
</section>
