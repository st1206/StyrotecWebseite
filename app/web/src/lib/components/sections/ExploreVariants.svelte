<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const cards = $derived((item.variant_cards as Array<Record<string, unknown>> | null) ?? []);
  let open = $state<Record<string, boolean>>({});
</script>

<section
  class="max-w-6xl mx-auto px-2 sm:px-6 py-16 lg:py-24"
  data-directus={edit({ collection: 'block_explore_variants', item: item.id as string, fields: ['translations', 'variant_cards'] })}
>
  {#if item.section_title}
    <h2 class="mb-12 text-center font-sans text-3xl md:text-4xl font-bold uppercase">{item.section_title}</h2>
  {/if}

  <div class="grid grid-cols-1 justify-center gap-20 md:grid-cols-2 xl:mx-10 xl:grid-cols-1">
    {#each cards as card}
      <div
        class="w-full overflow-hidden bg-foreground py-8 shadow-primary transition duration-500 hover:shadow-[8px_8px_0_hsl(var(--primary))] focus:outline-none xl:-skew-x-[10deg]"
      >
        <div class="grid grid-cols-1 items-center gap-8 xl:skew-x-[10deg] xl:grid-cols-5 xl:px-24">
          {#if card.image}
            <img
              src={assetUrl(card.image as string, { width: 900, format: 'webp' })}
              alt=""
              class="mx-auto h-[350px] object-contain px-4 xl:col-span-2"
            />
          {/if}
          <div class="flex w-full flex-col px-6 xl:col-span-3 xl:px-0">
            <h3 class="mb-6 text-center font-sans text-3xl font-bold text-secondary xl:text-4xl">
              {card.title}
            </h3>
            {#if Array.isArray(card.rows) && card.rows.length > 0}
              {@const key = String(card.id)}
              <div>
                <button
                  class="flex w-full items-center justify-between bg-secondary/5 p-4 text-left font-sans font-medium uppercase text-secondary transition-colors hover:bg-secondary/10"
                  onclick={() => (open[key] = !open[key])}
                >
                  {card.spec_title ?? 'Details'}
                  <span class="ml-auto shrink-0 text-secondary/60 transition-transform duration-200" class:rotate-180={open[key]}>▾</span>
                </button>
                {#if open[key]}
                  <dl class="bg-secondary/5 px-4 pb-4 pt-2 text-sm text-secondary">
                    {#each card.rows as Array<{ label?: string; value?: string }> as line}
                      <div class="flex justify-between gap-4 py-1">
                        <dt class="text-secondary/70">{line.label}</dt>
                        <dd class="text-right font-medium">{line.value}</dd>
                      </div>
                    {/each}
                  </dl>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
