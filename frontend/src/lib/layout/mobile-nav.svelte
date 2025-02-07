<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import imgLogo from '$lib/images/Logo_weiseSchrift_orange.png';
	import { Menu } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { menu } from '$lib/config/routes';
	import { Label } from '$lib/components/ui/label';

	let menu2use = menu.de;
</script>


<Sheet.Root>
	<Sheet.Trigger class="flex h-full items-center">
		<Menu class="text-primary size-6" />
	</Sheet.Trigger>
	<Sheet.Content side="top" class="h-screen bg-white pb-18">
		<Sheet.Header class="bg-primary-foreground absolute left-0 top-0 w-full px-4 py-4">
			<a class="ml-2 w-24" href="/"><img src={imgLogo} alt="Logo Styrotec" /></a>
		</Sheet.Header>
		<div class="mt-[73px] flex h-full w-full flex-col gap-8 overflow-y-auto">
			{#each menu2use as item}
				<div>
					<Label class="text-primary text-xl font-medium">{item.label}</Label>
					{#each item.megaMenu as child}
						<Accordion.Root type="single">
							<Accordion.Item value={child.title}>
								<Accordion.Trigger>{child.title}</Accordion.Trigger>
								<Accordion.Content>
									<div class="flex flex-col gap-2">
										{#each child.items as childItem}
											<a class="text-md" href={childItem.link}>{childItem.label}</a>
										{/each}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					{/each}
				</div>
			{/each}
		</div>
	</Sheet.Content>
</Sheet.Root>
