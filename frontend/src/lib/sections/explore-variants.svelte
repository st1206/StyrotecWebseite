<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { innerWidth } from 'svelte/reactivity/window';

	let data = $props();

	let accordionRef: HTMLDivElement | null = $state(null);
	let accordionHeight: number | null = $state(262);

	// onMount(() => {
	// 	if (accordionRef) {
	// 		accordionHeight = accordionRef.clientHeight;
	// 	}
	// });
</script>

<section class="mb-32 mt-20 px-2 sm:container sm:mx-auto lg:mt-28 xl:my-36">
	<h2 class="font-boldFont mb-12 text-center text-3xl uppercase md:text-4xl">
		{data.sectionTitle}
	</h2>

	<div class="grid grid-cols-1 justify-center gap-20 md:grid-cols-2 xl:mx-10 xl:grid-cols-1">
		{#each data.variantCards as variant, i}
			<BlurFade once={true} delay={0.1 + i * 0.1} duration={0.3}>
				<Card.Root
					class="bg-foreground 
						w-full
						overflow-hidden
						py-8 shadow-[5px_5px_0_#f6a313]
						transition
						duration-500
						hover:shadow-[10px_10px_0_#f6a313]
						focus:outline-none
						xl:-skew-x-[10deg]
						"
				>
					<div class="flex flex-col gap-8 xl:skew-x-[10deg] xl:flex-row xl:px-24">
						{#if variant.image}
							<img
								class="h-[350px] object-contain"
								src={!PUBLIC_BACKEND_URL.includes('https')
									? `${PUBLIC_BACKEND_URL}${variant.image.formats['large']?.url || variant.image.url}`
									: variant.image.url}
								alt={variant.image.alternativeText}
							/>
						{/if}
						<div class="flex w-full flex-col">
							<Card.Header class="pt-0">
								<Card.Title class="text-center">
									<h3 class="font-boldFont text-secondary text-3xl xl:text-4xl">{variant.title}</h3>
								</Card.Title>
							</Card.Header>

							<div bind:this={accordionRef}>
								<Card.Content>
									<ScrollArea
										class="w-full pr-2"
										style="height: {(innerWidth?.current ?? 0) < 1440
											? 'auto'
											: accordionHeight + 'px'}"
									>
										<Accordion.Root type="single" class="flex w-full flex-col gap-2 ">
											{#each variant.accordionItems as item, j}
												<Accordion.Item value="item-{j + 1}">
													<Accordion.Trigger class="text-secondary font-sans font-medium">
														{item.title}
													</Accordion.Trigger>
													<Accordion.Content class="text-secondary bg-secondary/5">
														{#each item.accordionItemLines as line, k}
															<div class="flex justify-between">
																<span>{line.key}</span>
																<span>{line.value}</span>
															</div>
														{/each}
													</Accordion.Content>
												</Accordion.Item>
											{/each}
										</Accordion.Root>
									</ScrollArea>
								</Card.Content>
							</div>
						</div>
					</div>
				</Card.Root>
			</BlurFade>
		{/each}
	</div>
</section>
