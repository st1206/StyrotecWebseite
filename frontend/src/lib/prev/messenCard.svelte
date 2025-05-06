<script lang="ts">
	import type { ApiMessenMessen } from '$lib/cmsTypes/contentTypes';
	import type { AttributesOf } from '$lib/cmsTypes/types';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { _ } from 'svelte-i18n';

	let { messe }: { messe: AttributesOf<ApiMessenMessen> } = $props();
</script>

<a href={messe.MesseLink} target="_blank">
	<div
		class="rounded-lg bg-secondary bg-center shadow-[10px_10px_20px_rgba(0,0,0,0.75)] hover:scale-105 md:w-[350px] lg:w-[420px] xl:w-[600px]"
		style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
			? `${PUBLIC_BACKEND_URL}${messe.Bilder[0].url}`
			: messe.Bilder[0].url})"
	>
		<div class="rounded-lg bg-secondary/65 md:w-[350px] lg:w-[420px] xl:w-[600px]">
			<div class="p-12">
				<h5 class="left-0 top-0 text-5xl font-bold text-primary-foreground">
					{messe.Messename}
				</h5>
				<div class="text-xl">
					{#if messe.Messename !== 'Momentan Keine Messe'}
						{messe.Messeanfang.split('-').reverse().join('.')} - {messe.Messeende.split('-')
							.reverse()
							.join('.')}
					{/if}
				</div>

				<div class="mt-24 font-boldFont text-2xl">
					{#if messe.Messestand !== 'Kein Stand'}
						{$_('news.messestand')}: {messe.Messestand}
					{/if}
				</div>
			</div>
		</div>
	</div>
</a>
