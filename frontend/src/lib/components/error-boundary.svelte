<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { Button } from './ui/button';

	interface Props {
		fallback?: string;
		showDetails?: boolean;
		onError?: (error: Error) => void;
		children: any;
	}

	let {
		fallback = 'Something went wrong. Please try refreshing the page.',
		showDetails = false,
		onError,
		children
	}: Props = $props();

	let hasError = $state(false);
	let error: Error | null = $state(null);

	onMount(() => {
		const handleError = (event: ErrorEvent) => {
			hasError = true;
			error = event.error;
			onError?.(event.error);
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			hasError = true;
			error = new Error(event.reason);
			onError?.(error);
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleUnhandledRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleUnhandledRejection);
		};
	});

	function retry() {
		hasError = false;
		error = null;
	}
</script>

{#if hasError}
	<div class="border-destructive/20 bg-destructive/5 rounded-lg border p-6 text-center">
		<div
			class="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
		>
			<svg class="text-destructive h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
				/>
			</svg>
		</div>

		<h3 class="text-destructive mb-2 text-lg font-semibold">
			{$_('error.title', { default: 'Error' })}
		</h3>

		<p class="text-muted-foreground mb-4 text-sm">
			{$_(fallback, { default: fallback })}
		</p>

		{#if showDetails && error}
			<details class="mb-4 text-left">
				<summary
					class="text-muted-foreground hover:text-foreground cursor-pointer text-sm font-medium"
				>
					{$_('error.showDetails', { default: 'Show technical details' })}
				</summary>
				<pre
					class="bg-muted text-muted-foreground mt-2 overflow-auto rounded p-2 text-xs">{error.message}
{error.stack}</pre>
			</details>
		{/if}

		<div class="w-full">
			<Button onclick={retry} size="sm" class="mx-auto">
				{$_('error.retry', { default: 'Try again' })}
			</Button>
		</div>
	</div>
{:else}
	{@render children()}
{/if}
