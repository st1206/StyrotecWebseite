<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import imgNorbert from '$lib/assets/images/norbert_schreibtisch.jpg';
</script>

<div class="mt-32 flex flex-col gap-16 p-[5%] xl:gap-32">
	<div
		class=" bg-primary-foreground border-2 border-solid p-4 shadow-[10px_20px_60px_rgba(0,0,0,0.95)] xl:mx-[10%] xl:p-24"
	>
		<h3 class="text-secondary text-2xl uppercase xl:text-5xl">
			Übersicht über unsere Gebrauchtmaschinen
		</h3>
	</div>
	<div class=" border-2 border-solid bg-opacity-15 shadow-[10px_20px_60px_rgba(0,0,0,0.95)]">
		<h3 class="p-3 text-xl font-medium">CNC Maschinen</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				Entdecken Sie unsere große Auswahl an gebrauchten CNC-Fräsmaschinen namhafter Hersteller.
				Jede Maschine wird sorgfältig geprüft, um höchste Qualität und volle Funktionalität zu
				gewährleisten. Profitieren Sie von Flexibilität, Ressourcenschonung und leisten Sie einen
				wertvollen Beitrag zur Kreislaufwirtschaft.
			</div>
			<Button
				class="relative -bottom-[290px] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">Mehr erfahren</a></Button
			>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[-10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
	</div>

	<div class=" border-2 border-solid bg-opacity-15 shadow-[10px_20px_60px_rgba(0,0,0,0.95)]">
		<h3 class="p-3 text-xl font-medium">CNC Zubehör</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				Maximieren Sie die Leistung Ihrer CNC-Maschine mit unserem hochwertigen Zubehör. Ob
				Spannmittel, Werkzeughalter oder Ersatzteile bei uns finden Sie alles, um Ihre Produktion
				effizienter und präziser zu gestalten. Unsere geprüften Zubehörteile garantieren
				Langlebigkeit und höchste Kompatibilität.
			</div>
			<Button
				class="relative -bottom-[290px] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-zubehör">Mehr erfahren</a></Button
			>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[-10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
	</div>

	<div class=" border-2 border-solid bg-opacity-15 shadow-[10px_20px_60px_rgba(0,0,0,0.95)]">
		<h3 class="p-3 text-xl font-medium">Holzbearbeitungsmaschinen</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				Ob für Tischlerei, Möbelbau oder Industrie - unsere gebrauchten Holzbearbeitungsmaschinen
				bieten höchste Präzision und Effizienz. Alle Maschinen sind voll funktionsfähig, geprüft und
				bereit für den nächsten Einsatz. Sparen Sie Kosten und setzen Sie auf nachhaltige
				Maschinenlösungen.
			</div>
			<Button
				class="relative -bottom-[290px] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">Mehr erfahren</a></Button
			>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[-10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
	</div>

	<div class="mb-12 border-2 border-solid bg-opacity-15 shadow-[10px_20px_60px_rgba(0,0,0,0.95)]">
		<h3 class="p-3 text-xl font-medium">Modellbaumaschinen</h3>
		<div class="flex flex-col xl:flex-row">
			<div class="w-full p-3 xl:w-[50%]">
				Für feinste Detailarbeiten und höchste Präzision: Unsere gebrauchten Modellbaumaschinen sind
				ideal für Modellbau, Prototyping und Feinarbeiten. Wir bieten eine Auswahl an hochwertigen
				Maschinen, die Ihre kreativen Projekte auf das nächste Level heben.
			</div>
			<Button
				class="relative -bottom-[290px] shadow-[10px_10px_10px_rgba(0,0,0,0.55)] xl:right-[90px]"
				><a href="/produkte/gebrauchtmaschinen/cnc-maschinen">Mehr erfahren</a></Button
			>
			<div class=" xl:w-[50%]">
				<img
					class="border-secondary-foreground relative bottom-[-10%] h-[250px] border-4 xl:right-[-20%]"
					src={imgNorbert}
					alt="bild"
				/>
			</div>
		</div>
	</div>
</div>
