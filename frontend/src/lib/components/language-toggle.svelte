<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from './ui/button';
	import { languages } from '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';
	import { Icons } from '$lib/assets/icons';
</script>

{#if $locale}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button
				variant="secondary"
				class="hover:shadow-primary -skew-x-[15deg] text-xl shadow-[3px_3px_0_transparent] transition duration-500"
			>
				<span class="text-muted-foreground flex skew-x-[15deg] items-center gap-2">
					<Icons.globe class="size-4" />
					{$_('sprachen.local')}
				</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="bg-secondary border-none shadow-[3px_3px_0_#F6A313]">
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
