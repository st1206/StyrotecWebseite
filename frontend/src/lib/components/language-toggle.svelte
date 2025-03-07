<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from './ui/button';
	import { languages } from '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';
	import { getIconComponent } from '$lib/utils';
</script>

{#if $locale}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="secondary" size="sm">
				<div class="text-xl filter grayscale">	&#x1f310 {$_('sprachen.local')}</div>
				
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="bg-secondary">
			<DropdownMenu.RadioGroup bind:value={$locale}>
				{#each languages as language (language.code)}
					<DropdownMenu.RadioItem value={language.code} class="flex cursor-pointer gap-2">
						
						<span>{language.label}</span>
					</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
