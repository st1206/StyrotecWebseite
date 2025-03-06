<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Menu } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Label } from '$lib/components/ui/label';
	import { menu } from '$lib/config/routes';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { innerHeight } from 'svelte/reactivity/window';
	import { Icons } from '$lib/assets/icons';
	import { _ } from 'svelte-i18n';

	let open = $state<boolean>(false);
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger class="flex h-full items-center">
		<Menu class="text-primary size-6" />
	</Sheet.Trigger>
	<Sheet.Content side="top" class="pb-18 h-screen bg-white">
		<Sheet.Header class="bg-primary-foreground w-full px-4 py-4">
			<a class="ml-2 w-24" href="/"><img src={Icons.logo} alt="Logo Styrotec" /></a>
		</Sheet.Header>
		<ScrollArea
			class="w-full p-6 pr-4"
			style={!innerHeight.current ? 'height: auto' : `height: ${innerHeight.current}px`}
		>
			<div class="flex h-full w-full flex-col gap-8">
				{#each menu as item}
					<div>
						
						<Label class="text-primary text-xl font-medium">{$_(`nav.${item.key}`) ?? item.key}</Label>
						{#each item.megaMenu as child}
							<Accordion.Root type="single" >
								<Accordion.Item value={$_(`nav.${item.key}`) ?? item.key}>
									<Accordion.Trigger>{$_(`nav.${child.key}`) ?? child.key}</Accordion.Trigger>
									<Accordion.Content>
										<div class="flex flex-col gap-2">
											<!-- Übersichtseite link -->
											<a onclick={() => (open = false)} class="text-md font-boldFont" href={child.link}>
												{$_(`nav.${child.key}`) ?? child.key}
											</a>
											{#each child.items as childItem}
												<a onclick={() => (open = false)} class="text-md" href={childItem.link}>
													{$_(`nav.${childItem.key}`) ?? childItem.key}
												</a>
											{/each}
										</div>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						{/each}
					</div>
				{/each}
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
