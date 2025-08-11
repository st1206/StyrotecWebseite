<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';

	interface Props {
		type?: 'hero' | 'card' | 'content' | 'table' | 'carousel';
		count?: number;
		class?: string;
	}

	let { type = 'content', count = 1, class: className }: Props = $props();
</script>

<div class="space-y-4 {className}">
	{#if type === 'hero'}
		<Skeleton class="h-64 w-full rounded-lg" />
		<div class="space-y-2">
			<Skeleton class="h-8 w-3/4" />
			<Skeleton class="h-4 w-1/2" />
		</div>
	{:else if type === 'card'}
		{#each Array(count) as _}
			<div class="space-y-3 rounded-lg border p-4">
				<Skeleton class="h-32 w-full rounded-md" />
				<div class="space-y-2">
					<Skeleton class="h-4 w-3/4" />
					<Skeleton class="h-4 w-1/2" />
				</div>
			</div>
		{/each}
	{:else if type === 'content'}
		<div class="space-y-3">
			<Skeleton class="h-6 w-1/2" />
			<Skeleton class="h-4 w-full" />
			<Skeleton class="h-4 w-3/4" />
			<Skeleton class="h-4 w-5/6" />
		</div>
	{:else if type === 'table'}
		<div class="space-y-2">
			<div class="flex space-x-4">
				<Skeleton class="h-8 flex-1" />
				<Skeleton class="h-8 flex-1" />
				<Skeleton class="h-8 flex-1" />
			</div>
			{#each Array(count || 5) as _}
				<div class="flex space-x-4">
					<Skeleton class="h-6 flex-1" />
					<Skeleton class="h-6 flex-1" />
					<Skeleton class="h-6 flex-1" />
				</div>
			{/each}
		</div>
	{:else if type === 'carousel'}
		<div class="flex space-x-4 overflow-hidden">
			{#each Array(count || 3) as _}
				<div class="min-w-0 flex-1 space-y-2">
					<Skeleton class="h-48 w-full rounded-lg" />
					<Skeleton class="h-4 w-3/4" />
				</div>
			{/each}
		</div>
	{/if}
</div>
