<script lang="ts">
	import { _ } from 'svelte-i18n';
	import DefaultContent from './default-content.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	// --- TYPES from DefaultContent ---
	type ContentHeader = {
		__component: 'partial-components.content-header';
		sectionTitle: string;
		description: string;
		isDarkMode: boolean;
		sortOrder?: number;
	};

	type ContentTable = {
		__component: 'partial-components.content-table';
		title: string;
		tables: {
			title: string;
			tableColumns: {
				columnLabel: string;
				tableRows: {
					rowLabel: string;
					rowValue: string;
				}[];
			}[];
			sortOrder?: number;
		}[];
		sortOrder?: number;
	};

	type ComponentData = ContentHeader | ContentTable;

	// --- TYPES for this component's props ---
	type FileAsset = {
		url: string;
		// other potential file properties
	};

	type TableEntry = {
		title: string;
		description?: string;
		file: FileAsset;
		sortOrder: number;
	};

	let data: TableEntry[] = $props();

	// --- DATA TRANSFORMATION ---
	const transformedData: ComponentData[] = $derived.by(() => {
		// Guard against empty or undefined data
		if (!data || Object.keys(data).length === 0) {
			return [];
		}

		// The data from props might be an object, so we get its values.
		// Then sort entries by the provided sortOrder.
		const sortedEntries = Object.values(data).sort(
			(a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
		);

		// 1. Create the Header component data
		const header: ContentHeader = {
			__component: 'partial-components.content-header',
			sectionTitle: $_('downloads.title') || 'Downloads',
			description:
				$_('downloads.description') || 'Here you can find all relevant documents for download.',
			isDarkMode: false, // Assuming a light mode default for this page
			sortOrder: 1
		};

		// 2. Create the Table component data by generating the row/value pairs
		const descriptionColumnRows = sortedEntries.map((entry) => ({
			rowLabel: entry.title,
			rowValue: entry.description ?? ''
		}));

		const fileColumnRows = sortedEntries.map((entry) => {
			const fileUrl = entry.file?.url ?? '';
			const fullUrl =
				!PUBLIC_BACKEND_URL.includes('https') && fileUrl
					? `${PUBLIC_BACKEND_URL}${fileUrl}`
					: fileUrl;
			return {
				rowLabel: entry.title,
				rowValue: fullUrl
			};
		});

		const table: ContentTable = {
			__component: 'partial-components.content-table',
			title: '',
			sortOrder: 2,
			tables: [
				{
					title: '',
					tableColumns: [
						{
							columnLabel: $_('downloads.columns.description') || 'Description',
							tableRows: descriptionColumnRows
						},
						{
							columnLabel: $_('downloads.columns.file') || 'File',
							tableRows: fileColumnRows
						}
					]
				}
			]
		};

		return [header, table];
	});
</script>

{#if transformedData.length > 0}
	<DefaultContent {...transformedData} />
{:else}
	<!-- Optional: show a message if there is no data to display -->
	<div class="container py-16 text-center">
		<p>{$_('downloads.no_data') || 'No download entries available.'}</p>
	</div>
{/if}
