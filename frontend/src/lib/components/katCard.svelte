<script lang="ts">
	import { _ } from 'svelte-i18n';

	let { titel, text, image, link }: { titel: any; text: String; image: any; link: any } = $props();
</script>

<div
	class="mt-[5%] h-auto w-[90%] rounded-lg bg-cover md:w-[45%]"
	style="background-image: url({image})"
>
	<div class="relative h-full w-full rounded-lg bg-primary-foreground/80">
		<h1
			class="px-[10%] pb-[5%] pt-[10%] font-boldFont text-xl text-secondary md:text-2xl lg:text-3xl xl:text-4xl"
		>
			{titel}
		</h1>
		<p
			class="md:text-md w-full px-[10%] pb-[20%] text-justify text-sm text-secondary md:pb-[30%] lg:pb-[30%] lg:text-lg xl:text-xl"
		>
			{text}
		</p>

		<a
			href={link}
			class="absolute bottom-4 left-4 rounded-md bg-primary p-2 font-boldFont text-xl text-secondary hover:scale-105 md:bottom-8 md:left-8 lg:bottom-16 lg:left-16"
			>{$_('portalfraes.cta')}</a
		>
	</div>
</div>
