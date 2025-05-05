<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { cn } from '$lib/utils';

	let data: {
		keyword: string;
		subKeyword: string;
		image: ImageAsset;
		heroTextImage: { title: string; subtitle: string; content: string; image: ImageAsset };
	} = $props();
</script>

<section class="mt-20 lg:container lg:mx-auto lg:mt-32 lg:w-full">
	<BlurFade once={true} delay={0} duration={0.3}>
		<div class="relative">
			<div
				class="bg-foreground/95 absolute h-[130px] w-2/5 [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] lg:h-[200px]"
			>
				<h1
					class={cn(
						data.keyword.length <= 5 ? 'w-3/5 lg:w-2/5' : 'w-1/2',
						'font-boldFont text-secondary pt-6 text-center text-3xl lg:pt-12 lg:text-4xl xl:text-5xl'
					)}
				>
					{data.keyword}
				</h1>
			</div>
			<img
				src={!PUBLIC_BACKEND_URL.includes('https')
					? `${PUBLIC_BACKEND_URL}${data.image.formats['large']?.url || data.image.url}`
					: data.image.url}
				alt="FS10 Titelbild"
				class="shadow-foreground bg-secondary z-20 h-[300px] w-full object-cover lg:h-[600px]"
			/>
			<BlurFade once={true} delay={0.2} duration={0.3}>
				<div
					class="bg-foreground absolute bottom-0 right-0 hidden h-[200px] w-2/5 [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block"
				></div>
			</BlurFade>
		</div>
	</BlurFade>

	<div class="relative w-full">
		<BlurFade once={true} delay={0.3} duration={0.3}>
			<div
				class="absolute left-0 flex h-[410px] w-full flex-col items-center justify-center px-2 sm:px-8 lg:w-3/5"
			>
				<div class="mb-4">
					<h2 class="font-boldFont text-right text-3xl uppercase sm:text-4xl xl:text-5xl">
						{data.heroTextImage.title}
					</h2>
					<h3 class="text-right text-2xl uppercase xl:text-3xl">
						{data.heroTextImage.subtitle}
					</h3>
				</div>
				<p class="prose prose-neutral xl:prose-lg">
					{@html data.heroTextImage.content}
				</p>
			</div>
		</BlurFade>

		<BlurFade once={true} delay={0.1} duration={0.3}>
			<div
				class="shadow-foreground absolute right-0 hidden h-[600px] w-2/5 -translate-y-[194px] lg:block"
			>
				<div
					class="bg-foreground/95 absolute bottom-0 right-0 z-30 h-1/4 w-2/3 [clip-path:polygon(0%_100%,100%_100%,100%_0%)]"
				>
					<h2 class="font-boldFont text-secondary absolute bottom-6 right-7 text-3xl xl:text-4xl">
						{data.subKeyword}
					</h2>
				</div>
				<img
					src={!PUBLIC_BACKEND_URL.includes('https')
						? `${PUBLIC_BACKEND_URL}${data.heroTextImage.image.formats['large']?.url || data.heroTextImage.image.url}`
						: data.heroTextImage.image.url}
					alt={data.heroTextImage.image.alternativeText}
					class="h-full w-full object-cover [clip-path:polygon(0%_33.2%,100%_0%,100%_100%,0%_100%)]"
				/>
			</div>
		</BlurFade>
	</div>
	<div class="h-[410px]"></div>
</section>
