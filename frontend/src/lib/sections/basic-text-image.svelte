<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let data = $props();
</script>

<section class="mx-auto my-36 flex w-full gap-16 bg-secondary sm:container">
	<div class="flex w-full flex-col items-center justify-center">
		<div class="mb-4">
			<h2 class="text-right font-boldFont text-xl uppercase md:text-3xl lg:text-4xl xl:text-6xl">
				{data.title}
			</h2>
			<h3 class="text-right text-xl uppercase md:text-2xl lg:text-4xl">
				{data.subtitle}
			</h3>
		</div>
		<p class="prose lg:prose-xl xl:prose-2xl">
			{@html data.content}
		</p>
	</div>
	{#if data.thumbnail}
		<img
			src={!PUBLIC_BACKEND_URL.includes('https')
				? `${PUBLIC_BACKEND_URL}${data.thumbnail.formats['large']?.url || data.thumbnail.url}`
				: data.thumbnail.url}
			alt={data.thumbnail.alternativeText}
			class="object-cover shadow-[5px_5px_0_#f6a313] lg:h-[300px] xl:h-[400px]"
		/>
	{/if}
</section>
