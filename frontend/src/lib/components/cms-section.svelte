<script lang="ts">
	import { sectionMap } from '$lib/sections';
	import {
		SafeData,
		SectionValidator,
		type ValidationResult,
		type ValidationError,
		createError,
		createWarning
	} from '$lib/validation';
	import ErrorBoundary from './error-boundary.svelte';
	import LoadingSkeleton from './loading-skeleton.svelte';
	import { _ } from 'svelte-i18n';

	interface Props {
		sectionKey: string;
		sectionData: any;
		sectionProps?: Record<string, any>;
		contactForm?: any;
		loading?: boolean;
		error?: Error | null;
	}

	let {
		sectionKey,
		sectionData,
		sectionProps = {},
		contactForm,
		loading = false,
		error = null
	}: Props = $props();

	const SectionComponent = sectionMap[sectionKey as keyof typeof sectionMap];

	// Validate section data and get detailed error information
	let validationResult = $state<ValidationResult | null>(null);
	let safeData = $state<SafeData | null>(null);

	$effect(() => {
		if (sectionData && sectionKey !== 'seo') {
			const validator = new SectionValidator(sectionKey, sectionData);
			safeData = new SafeData(sectionData);

			// Comprehensive validation for different section types
			if (sectionKey.includes('hero')) {
				if (sectionKey.includes('carousel')) {
					validator.images('images', 'Hero carousel images');
				} else if (sectionKey.includes('textImage')) {
					validator.required('title', 'Hero title').image('image', 'Hero image');
				} else if (sectionKey.includes('dualImage')) {
					validator.required('title', 'Hero title');
					// Image is optional for dual image heroes
				} else if (sectionKey.includes('media')) {
					validator.required('title', 'Hero title');
				}
			} else if (sectionKey.includes('cards') || sectionKey.includes('Cards')) {
				if (sectionKey.includes('collectionType')) {
					// Collection type cards have different validation
					validator.custom((data) => {
						const errors: ValidationError[] = [];
						if (data.error) {
							errors.push(createError('collection', data.error));
						}
						if (!data.type) {
							errors.push(createWarning('type', 'Collection type is missing'));
						}
						return errors;
					});
				} else {
					validator.arrayNotEmpty('cards', 'Cards array').custom((data) => {
						const errors: ValidationError[] = [];
						if (data.cards && Array.isArray(data.cards)) {
							data.cards.forEach((card: any, index: number) => {
								if (!card?.title) {
									errors.push(createError(`cards[${index}].title`, 'Card title is missing'));
								}
							});
						}
						return errors;
					});
				}
			} else if (sectionKey.includes('usp')) {
				validator.arrayNotEmpty('uspItems', 'USP items').custom((data) => {
					const errors: ValidationError[] = [];
					if (data.uspItems && Array.isArray(data.uspItems)) {
						data.uspItems.forEach((item: any, index: number) => {
							if (!item?.name && !item?.title) {
								errors.push(createError(`uspItems[${index}]`, 'USP item has no name or title'));
							}
						});
					}
					return errors;
				});
			} else if (sectionKey.includes('exploreMore')) {
				validator.arrayNotEmpty('previewCards', 'Preview cards');
			} else if (sectionKey.includes('exploreVariants')) {
				validator.arrayNotEmpty('variantCards', 'Variant cards');
			} else if (sectionKey.includes('exploreOptions') || sectionKey.includes('optionBlocks')) {
				validator.custom((data) => {
					const errors: ValidationError[] = [];

					if (!data || typeof data !== 'object') {
						errors.push(createError('data', 'No data provided'));
						return errors;
					}

					// Convert to array if it's an object with numeric keys
					let blocks = Array.isArray(data)
						? data
						: Object.keys(data)
								.filter((key) => !isNaN(Number(key)))
								.map((key) => data[key])
								.filter(Boolean);

					if (blocks.length === 0) {
						errors.push(createWarning('blocks', 'No content blocks found'));
					}

					return errors;
				});
			} else if (sectionKey.includes('defaultContent')) {
				// Default content can have various structures, so we're more lenient
				validator.custom((data) => {
					const errors: ValidationError[] = [];
					if (!data || (Array.isArray(data) && data.length === 0)) {
						errors.push(createWarning('content', 'No content blocks provided'));
					}
					return errors;
				});
			} else if (sectionKey.includes('pageHeader')) {
				validator.required('headline', 'Page header headline');
			} else if (sectionKey.includes('history')) {
				validator.arrayNotEmpty('historyEntries', 'History entries');
			} else if (sectionKey.includes('contactForm')) {
				// Contact form validation is handled separately
			}

			validationResult = validator.getResult();
		}
	});

	function getSkeletonType(key: string): 'hero' | 'card' | 'content' | 'table' | 'carousel' {
		if (key.includes('hero')) return 'hero';
		if (key.includes('carousel')) return 'carousel';
		if (key.includes('cards') || key.includes('Cards')) return 'card';
		if (key.includes('table') || key.includes('Table')) return 'table';
		return 'content';
	}

	function handleSectionError(err: Error) {
		console.error(`Error in section ${sectionKey}:`, err);
	}

	function getDetailedErrorMessage(): string {
		if (error) {
			return `Runtime error: ${error.message}`;
		}

		if (validationResult && !validationResult.isValid) {
			const validator = new SectionValidator(sectionKey, sectionData);
			return validator.getErrorMessage();
		}

		if (!sectionData) {
			return `No data provided for section "${sectionKey}"`;
		}

		if (!SectionComponent) {
			return `Section component "${sectionKey}" not found in section map`;
		}

		return 'Unknown error occurred';
	}

	function getWarningMessage(): string {
		if (validationResult && validationResult.warnings.length > 0) {
			const validator = new SectionValidator(sectionKey, sectionData);
			return validator.getWarningMessage();
		}
		return '';
	}

	const hasComponent = $derived.by(() =>
		Boolean(sectionMap[sectionKey as keyof typeof sectionMap])
	);
</script>

<ErrorBoundary onError={handleSectionError} fallback="This section could not be loaded.">
	{#snippet children()}
		{#if loading}
			<LoadingSkeleton type={getSkeletonType(sectionKey)} />
		{:else if error || (validationResult && !validationResult.isValid)}
			<div class="border-destructive/20 bg-destructive/5 rounded-lg border p-4 text-center">
				<div
					class="bg-destructive/10 mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full"
				>
					<svg
						class="text-destructive h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<p class="text-destructive mb-2 text-sm font-medium">
					{$_('error.sectionFailed', { default: 'Section could not be loaded' })}
				</p>
				<p class="text-muted-foreground mb-2 text-xs">
					Section: <code class="bg-muted rounded px-1">{sectionKey}</code>
				</p>
				<details class="mx-auto mt-4 max-w-7xl">
					<summary
						class="text-muted-foreground hover:text-foreground mb-2 cursor-pointer text-center text-xs"
					>
						{$_('error.showDetails', { default: 'Show details' })}
					</summary>
					<div class="bg-muted rounded p-2 text-left text-xs">
						<p class="text-destructive mb-1 font-medium">Error Details:</p>
						<p class="text-muted-foreground">{getDetailedErrorMessage()}</p>

						{#if validationResult && validationResult.errors.length > 0}
							<div class="mt-2">
								<p class="text-destructive mb-1 font-medium">Validation Errors:</p>
								<ul class="list-inside list-disc space-y-1">
									{#each validationResult.errors as error}
										<li class="text-muted-foreground">
											<code class="bg-background rounded px-1">{error.field}</code>: {error.message}
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</details>
			</div>
		{:else if SectionComponent && sectionData}
			<!-- Show warnings if any -->
			{#if validationResult && validationResult.warnings.length > 0}
				<div class="mx-auto mb-4 max-w-7xl rounded-lg border border-yellow-200 bg-yellow-50 p-3">
					<div class="flex items-center">
						<svg
							class="mr-2 h-4 w-4 text-yellow-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
						<p class="text-xs text-yellow-800">
							Section has {validationResult.warnings.length} warning(s)
						</p>
					</div>
					<details class="mt-4">
						<summary class="cursor-pointer text-xs text-yellow-700 hover:text-yellow-900">
							Show warnings
						</summary>
						<ul class="mt-1 list-inside list-disc space-y-1">
							{#each validationResult?.warnings || [] as warning}
								<li class="text-xs text-yellow-700">
									<code class="rounded bg-yellow-100 px-1">{warning.field}</code>: {warning.message}
								</li>
							{/each}
						</ul>
					</details>
				</div>
			{/if}

			<SectionComponent {...sectionData} {...sectionProps} {contactForm} />
		{:else if sectionKey !== 'seo'}
			<div class="border-muted bg-muted/20 rounded-lg border p-4 text-center">
				<p class="text-muted-foreground text-sm">
					{hasComponent ? 'No data available' : `Section "${sectionKey}" not found`}
				</p>
				<p class="text-muted-foreground mt-1 text-xs">
					{getDetailedErrorMessage()}
				</p>
			</div>
		{/if}
	{/snippet}
</ErrorBoundary>
