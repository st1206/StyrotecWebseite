<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import type { Employee } from '$lib/models/employee';

	type ImageCard = {
		title: string;
		subtitle: string;
		image: ImageAsset;
		employee: Employee;
		sortOrder: number;
	};

	let data: {
		title: string;
		description: string;
		media: { name: string; url: string; size: number; mime: string } | ImageAsset;
		imageCards: ImageCard[];
		anchor: string;
	} = $props();

	const snapshot = $state.snapshot(data.imageCards);
	const sortedCards: ImageCard[] = $derived.by(() => {
		return Object.values(snapshot).sort((a, b) => {
			const orderA = a.sortOrder ?? 0;
			const orderB = b.sortOrder ?? 0;
			return orderA - orderB;
		});
	});
</script>

<section id={data.anchor} class="mt-20 scroll-mt-32 lg:container lg:mx-auto lg:mt-32 lg:w-full">
	<div class="bg-foreground lg:shadow-primary">
		{#if data.media.mime === 'video/mp4'}
			<video
				autoplay
				loop
				muted
				class="max-h-[750px] w-full object-cover object-top [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
			>
				<source
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${data.media.url}`
						: data.media.url}
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
		{:else if data.media.mime === 'image/png'}
			<img
				src={!PUBLIC_BACKEND_URL.includes('https')
					? `${PUBLIC_BACKEND_URL}${data.media.url}`
					: data.media.url}
				alt="hero"
				class="max-w- max-h-[750px] w-full object-cover object-top [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
			/>
		{/if}

		<div class="p-8">
			<div class="space-y-4 text-center">
				<h2 class="font-boldFont text-secondary text-4xl">
					{data.title}
				</h2>
				<p class="prose prose-neutral lg:prose-lg text-secondary mx-auto max-w-5xl text-center">
					{@html data.description}
				</p>
			</div>
			<div class="mt-16 grid grid-cols-1 flex-wrap gap-12 md:grid-cols-2 xl:grid-cols-3">
				{#each sortedCards as card}
					<div class="bg-foreground/10 relative shadow-xl">
						{#if card.image}
							<img
								src={!PUBLIC_BACKEND_URL.includes('https')
									? `${PUBLIC_BACKEND_URL}${card.image.formats['large']?.url || card.image.url}`
									: card.image.url}
								alt={card.image.alternativeText}
								class="mx-auto h-[300px] w-auto object-cover object-top lg:h-[330px] xl:h-[400px]"
							/>
						{:else}
							<img
								src={!PUBLIC_BACKEND_URL.includes('https')
									? `${PUBLIC_BACKEND_URL}${card.employee.picture.formats['large']?.url || card.employee.picture.url}`
									: card.employee.picture.url}
								alt={card.employee.picture.alternativeText}
								class="h-[300px] w-full object-cover object-top lg:h-[330px] xl:h-[400px]"
							/>
						{/if}
						<div
							class="bg-foreground/90 absolute bottom-0 flex w-full flex-col justify-between p-2 px-4"
						>
							<h4 class="text-secondary font-boldFont text-3xl">
								{card.employee ? card.employee.name : card.title}
							</h4>
							<h5 class="text-primary">
								{card.employee ? card.employee.position : card.subtitle}
							</h5>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
