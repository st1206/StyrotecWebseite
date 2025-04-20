<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let data = $props();
</script>

<section
	class="bg-secondary mx-auto mb-32 mt-20 flex w-full flex-col gap-16 sm:container lg:my-36 lg:flex-row"
>
	<div class="flex w-full flex-col items-center justify-center">
		<div class="mb-4">
			<h2 class="font-boldFont text-right text-3xl uppercase md:text-4xl xl:text-5xl">
				{data.title}
			</h2>
			<h3 class="text-right text-2xl uppercase xl:text-3xl">
				{data.subtitle}
			</h3>
		</div>
		<p class="prose lg:prose-lg xl:prose-xl">
			{@html data.content}
		</p>
	</div>
	{#if data.thumbnail}
		<img
			src={!PUBLIC_BACKEND_URL.includes('https')
				? `${PUBLIC_BACKEND_URL}${data.thumbnail.formats['large']?.url || data.thumbnail.url}`
				: data.thumbnail.url}
			alt={data.thumbnail.alternativeText}
			class="mx-auto h-[300px] w-4/5 object-cover shadow-[5px_5px_0_#f6a313] md:h-[300px] lg:h-[330px] lg:w-auto xl:h-[400px]"
		/>
	{/if}
</section>
