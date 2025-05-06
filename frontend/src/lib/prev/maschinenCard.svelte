<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	let { maschine } = $props();
</script>

<a href={`/produkte/gebrauchtmaschinen/cnc-maschinen/${maschine.slug}`}>
	<div
		class="h-[400px] w-[400px] rounded-lg bg-cover bg-center md:h-[450px] md:w-[450px]"
		style="background-image: url({!PUBLIC_BACKEND_URL.includes('https')
			? `${PUBLIC_BACKEND_URL}${maschine.Bilder[0].url}`
			: maschine.Bilder[0].formats.small.url})"
	>
		<div class="h-full w-full rounded-lg bg-primary-foreground bg-opacity-50 p-12 text-secondary">
			<h1 class="left-0 top-0 mb-2 text-5xl font-bold">
				{maschine.Titel}
			</h1>
			<h2 class="text-4xl">{maschine.Bezeichnung}</h2>
			<span class="text-xl">Baujahr: {maschine.Baujahr}</span>
		</div>
	</div>
</a>
