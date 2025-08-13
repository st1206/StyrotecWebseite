<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Icons } from '$lib/assets/icons';
	import type { ImageAsset } from '$lib/types/cmsTypes/image-type';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { _ } from 'svelte-i18n';
	import { SafeData } from '$lib/utils/validation';
	import { handleImageError, optimizeImageUrl } from '$lib/utils/image';

	let data: { brochures?: { title: string; thumbnail: ImageAsset; file: any }[] } = $props();

	const safe = new SafeData(data);
	const rawBrochures = safe.getArray<any>('brochures', []);

	const brochures = rawBrochures
		.map((brochure, index) => {
			const brochureSafe = new SafeData(brochure);
			const title = brochureSafe.getString('title');
			const thumbnail = brochureSafe.getObject('thumbnail');
			const file = brochureSafe.getObject('file');

			if (!title || !thumbnail || !file) {
				console.warn(`Brochure at index ${index} missing data:`, {
					title: !!title,
					thumbnail: !!thumbnail,
					file: !!file
				});
				return null;
			}

			const thumbnailSafe = new SafeData(thumbnail);
			const fileSafe = new SafeData(file);

			return {
				title: title,
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
					<button
						type="button"
						onclick={() => {
							const downloadUrl = getDownloadUrl(brochure.file);
							if (downloadUrl !== '#') {
								window.open(downloadUrl, '_blank');
							}
						}}
						class="group relative cursor-pointer"
					>
						<!-- [clip-path:polygon(0%_0%,300%_100%,100%_100%,0%_100%)] -->
						<div
							class={cn(
								'bg-foreground/90 absolute bottom-0 z-10 flex w-full translate-y-[0.5px] items-end'
							)}
						>
							<Button
								variant="link"
								class={cn(
									'text-secondary line-clamp-1 gap-2 truncate font-sans text-xl font-bold transition-colors hover:text-white'
								)}
								onclick={() => {
									const downloadUrl = getDownloadUrl(brochure.file);
									if (downloadUrl !== '#') {
										window.open(downloadUrl, '_blank');
									}
								}}
							>
								{brochure.title}
							</Button>
						</div>

						<!-- Main image -->
						<img
							src={getBrochureImageUrl(brochure.thumbnail)}
							alt={brochure.thumbnail.alternativeText}
							class="bg-secondary shadow-foreground w-full object-cover transition ease-in-out group-hover:shadow-[8px_8px_0_#33312e]"
							style="display: block;"
							onerror={handleImageError}
							loading="eager"
						/>

						<div
							class="bg-foreground/90 absolute top-0 flex h-16 w-full justify-end p-3 [clip-path:polygon(100%_0,70%_0,100%_100%)]"
						>
							<Icons.download class="text-secondary size-4" />
						</div>

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
					</button>
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
