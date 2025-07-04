<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import BlurFade from '$lib/components/blur-fade.svelte';
	import { innerWidth } from 'svelte/reactivity/window';
	import type { ImageAsset } from '$lib/cmsTypes/image-type';

	let data: {
		sectionTitle: string;
		variantCards: {
			image: ImageAsset;
			title: string;
			accordionItems: { title: string; accordionItemLines: { label: string; value: string }[] }[];
		}[];
	} = $props();

	let accordionHeight: number | null = $state(280);
</script>

<section class="mx-2 mb-32 mt-12 sm:container sm:mx-auto lg:mt-28 xl:my-36">
	<h2 class="font-sans font-bold mb-12 text-center text-3xl uppercase md:text-4xl">
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
					<div
						class="grid grid-cols-1 items-center gap-8 xl:skew-x-[10deg] xl:grid-cols-5 xl:px-24"
					>
						{#if variant.image}
							<img
								class="col-span-2 mx-auto h-[350px] object-contain xl:col-span-2"
								src={!PUBLIC_BACKEND_URL.includes('https')
									? `${PUBLIC_BACKEND_URL}${variant.image.formats['large']?.url || variant.image.url}`
									: variant.image.url}
								alt={variant.image.alternativeText}
							/>
						{/if}
						<div class="col-span-2 flex w-full flex-col xl:col-span-3">
							<Card.Header class="pt-0">
								<Card.Title class="text-center">
									<h3 class="font-sans font-bold text-secondary text-3xl xl:text-4xl">{variant.title}</h3>
								</Card.Title>
							</Card.Header>

							<div>
								<Card.Content>
									<ScrollArea
										class="w-full pr-2"
										style="height: {(innerWidth?.current ?? 0) < 1440
											? 'auto'
											: accordionHeight + 'px'}"
									>
										<Accordion.Root type="single" class="flex w-full flex-col gap-4">
											{#each variant.accordionItems as item, j}
												<Accordion.Item value="item-{j + 1}">
													<Accordion.Trigger class="text-secondary font-sans font-medium">
														{item.title}
													</Accordion.Trigger>
													<Accordion.Content class="text-secondary bg-secondary/5">
														{#each item.accordionItemLines as line, k}
															<div class="flex justify-between">
																<span>{line.label}</span>
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
