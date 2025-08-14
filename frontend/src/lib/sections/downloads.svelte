<!-- lib/components/downloads-table.svelte -->
<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Download } from 'lucide-svelte';
	import { SafeData } from '$lib/utils/validation';
	import { cn } from '$lib/utils';
	import { _ } from 'svelte-i18n';

	// --- PROPS ---
	let { downloads: rawDownloads }: { downloads?: any[] } = $props();

	// --- DATA VALIDATION ---
	const downloadsArray = Array.isArray(rawDownloads) ? rawDownloads : [];

	const validatedDownloads = downloadsArray
		.map((item, index) => {
			const itemSafe = new SafeData(item);

			const title = itemSafe.getString('title');
			const file = itemSafe.getObject<{ url: string }>('file');

			if (!title || !file?.url) {
				console.warn(
					`DownloadsTable: Item at index ${index} is missing required data (title or file.url).`,
					{ title: !!title, fileUrl: !!file?.url }
				);
				return null;
			}

			return {
				title: title,
				description: itemSafe.getString('description'),
				file: {
					url: file.url
				}
			};
		})
		.filter((item): item is NonNullable<typeof item> => item !== null);

	function getDownloadUrl(file: { url: string } | null | undefined): string {
		if (!file?.url) return '#';
		return !PUBLIC_BACKEND_URL.includes('https') ? `${PUBLIC_BACKEND_URL}${file.url}` : file.url;
	}
</script>

<section class=" my-16 scroll-mt-24 px-4 sm:container sm:mx-auto lg:max-w-5xl xl:max-w-7xl">
	{#if validatedDownloads.length > 0}
		<div class="overflow-x-auto">
			<Table.Root>
				<Table.Header>
					<Table.Row
						class={cn(
							'border-secondary/20 text-foreground bg-foreground/15 hover:bg-foreground/20'
						)}
					>
						<Table.Head class="font-semibold">{$_('title')}</Table.Head>
						<Table.Head class="w-full font-semibold">{$_('description')}</Table.Head>
						<Table.Head class="w-[48px] text-center font-semibold">{$_('file')}</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each validatedDownloads as download}
						<Table.Row class={cn('border-foreground/20 bg-foreground/5 hover:bg-foreground/10')}>
							<Table.Cell class={cn('sm:min-w-[300px] min-w-[130px] font-medium')}>
								{download.title}
							</Table.Cell>
							<Table.Cell class={cn(' w-full font-medium')}>
								{download.description ?? '-'}
							</Table.Cell>
							<Table.Cell class={cn('text-center')}>
								<a
									href={getDownloadUrl(download.file)}
									target="_blank"
									rel="noopener noreferrer"
									download
									class="inline-flex items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900"
									aria-label="Download {download.title}"
								>
									<Download class="h-5 w-5" />
								</a>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{:else}
		<div
			class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 py-16 text-center"
		>
			<Download class="mb-4 size-12 text-neutral-400" />
			<h3 class="text-lg font-semibold text-neutral-800">No Downloads Available</h3>
			<p class="max-w-md text-neutral-500">
				Documents and files will be displayed here when available.
			</p>
		</div>
	{/if}
</section>
