<script lang="ts">
	import { _ } from 'svelte-i18n';

	import * as Accordion from '$lib/components/ui/accordion';
</script>

<div class="w-full">
	<div
		class="relative z-0 h-auto w-full bg-gradient-to-b from-primary/65 via-primary to-secondary-foreground"
	>
		<div
			class="flex flex-col justify-center gap-2 px-4 py-[5%] md:flex-row md:justify-around md:px-0"
		>
			<!-- Ansprechpartner Card -->
			<div
				class="w-[90%] rounded-lg bg-primary-foreground bg-[url($lib/assets/images/rolf_schreibtisch.jpg)] bg-cover bg-center text-secondary md:w-[40%]"
			>
				<div class="h-full w-full rounded-lg bg-primary-foreground/35">
					<div class="flex flex-row">
						<div class="w-[50%] p-16 text-left">
							<h1 class="text-3xl uppercase">Ihr Direkter Ansprechpartner:</h1>
							<br />
							<span class="text-xl">Rolf Röhm </span> <br />
							<span class="text-xl">Vertrieb</span>
							<!-- TODO verlinkung zur richtigen kontaktSeite-->
						</div>
					</div>
					<div class="flex flex-row gap-4 px-8">
						<div class="w-[50%]">
							<h2 class="w-full">{$_(`kontaktformular.name`)}</h2>
							<!-- <Input class="text-primary-foreground  bg-secondary border-primary w-full" /> -->
						</div>
						<div class="w-[50%]">
							<h2 class="w-full">{$_(`kontaktformular.firma`)}</h2>
							<!-- <Input class="text-primary-foreground  bg-secondary border-primary w-full" /> -->
						</div>
					</div>
					<div class="mt-4 flex flex-row gap-4 px-8">
						<div class="w-[50%]">
							<h2 class="w-full">{$_(`kontaktformular.email`)}</h2>
							<!-- <Input class="text-primary-foreground  bg-secondary border-primary w-full" /> -->
						</div>
						<div class="w-[50%]">
							<h2 class="w-full">{$_(`kontaktformular.tel`)}</h2>
							<!-- <Input class="text-primary-foreground  bg-secondary border-primary w-full" /> -->
						</div>
					</div>
					<div class="px-8 pb-8">
						<h2 class="w-full">{$_(`kontaktformular.nachricht`)}</h2>
						<!-- <Textarea class="text-primary-foreground h-[100px] w-auto xl:w-[100%]" innerClass="bg-secondary " divClass="border-primary"/> -->
					</div>
				</div>
			</div>

			<!-- Newsletter + weiterleitung zu Kontaktformular-->
			<div
				class="h-[500px] w-[90%] rounded-lg bg-primary-foreground p-16 text-secondary md:w-[40%]"
			>
				<Accordion.Root type="single" class="">
					<Accordion.Item value="item-1">
						<Accordion.Trigger>Newsletter</Accordion.Trigger>
						<Accordion.Content class="xl:text-xl">
							<!-- TODO: Inhalt zu news etc. -->
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</div>
	</div>

	<div></div>
</div>

<div
	class="absolute left-[5%] top-10 flex flex-col text-secondary xl:left-[30%] xl:flex-row xl:flex-wrap"
></div>
