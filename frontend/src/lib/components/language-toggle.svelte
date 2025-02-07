<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from './ui/button';
	import { languages } from '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import { getIconComponent } from '$lib/utils';
</script>

{#if $locale}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="secondary" size="icon">
				<svelte:component this={getIconComponent($locale)} class="size-6" />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.RadioGroup bind:value={$locale}>
				{#each languages as language (language.code)}
					<DropdownMenu.RadioItem value={language.code} class="flex cursor-pointer gap-2">
						<svelte:component this={getIconComponent(language.code)} class="size-6" />
						<span>{language.label}</span>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
