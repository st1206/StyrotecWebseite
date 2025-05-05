<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from './ui/button';
	import { languages } from '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';
	import { Icons } from '$lib/assets/icons';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { get } from 'svelte/store';

	let { fullWidth = false }: { fullWidth?: boolean } = $props();

	function switchLanguage(lang: { code: string; shortCode: string }) {
		if (get(locale) === lang.code) {
			return;
		}
		const { pathname, search, hash } = page.url;
		const segments = pathname.split('/').filter(Boolean);

		if (segments.length) {
			segments[0] = lang.shortCode;
		}

		const target = `/${segments.join('/')}${search}${hash}`;
		locale.set(lang.code);
		goto(target);
	}
</script>

{#if $locale}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={fullWidth ? 'w-full' : ''}>
			<Button variant="secondary" class={cn(fullWidth ? 'w-full' : '', '-skew-x-[15deg]')}>
				<span class="flex skew-x-[15deg] items-center gap-2">
					<Icons.globe class="size-4" />
					<span class="h-[18px] text-sm">
						{languages.find((lang) => $locale === lang.code)?.shortLabel || 'ERR'}
					</span>
				</span>
			</Button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content>
			<DropdownMenu.RadioGroup bind:value={$locale}>
				{#each languages as language, i (language.code)}
					<!-- add on:select that calls the helper -->
					<DropdownMenu.RadioItem
						value={language.code}
						class="flex cursor-pointer gap-2"
						onclick={() => switchLanguage(language)}
					>
						<span>{language.label}</span>
					</DropdownMenu.RadioItem>
					{#if i + 1 < languages.length}
						<DropdownMenu.Separator />
					{/if}
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
