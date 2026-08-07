<script lang="ts">
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const items = $derived(((item.items as Array<{ name?: string }> | null) ?? []).filter((i) => i?.name));
  const isNameLong = $derived(items.some((i) => (i.name ?? '').length > 50));
</script>

{#if items.length > 0}
  <!-- Angled lead-in wedge -->
  <div class="bg-foreground h-14 w-full translate-y-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)]"></div>

  <section
    class="bg-foreground w-full"
    data-directus={edit({ collection: 'block_usp_list', item: item.id as string, fields: ['translations'] })}
  >
    <div class="container py-16 xl:py-24">
      <div
        class="{!isNameLong ? 'sm:w-max' : ''} text-secondary mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {#each items as usp}
          <div class="flex gap-3 font-sans text-xl font-semibold sm:text-2xl lg:text-2xl">
            <span class="text-primary mt-1 flex-shrink-0">&#x2713;</span>
            <div class="flex-1">
              <p class="break-words sm:break-normal">{usp.name}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Angled lead-out wedge -->
  <div class="bg-foreground h-14 w-full -translate-y-[1px] [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"></div>
{/if}
