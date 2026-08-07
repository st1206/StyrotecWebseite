<script lang="ts">
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const entries = $derived(
    (((item.entries as Array<Record<string, unknown>> | null) ?? []) as Array<Record<string, unknown>>)
      .slice()
      .sort((a, b) => ((a.year as number) ?? 0) - ((b.year as number) ?? 0)),
  );
</script>

<section
  id="historie"
  class="my-20 scroll-mt-24 px-4 lg:my-32"
  data-directus={edit({ collection: 'block_history', item: item.id as string, fields: ['translations', 'entries'] })}
>
  <div class="mx-auto w-full max-w-6xl">
    {#if item.section_title}
      <h2 class="mb-16 text-center font-sans text-3xl md:text-4xl font-bold uppercase text-foreground">
        {item.section_title}
      </h2>
    {/if}

    <!-- ***** MOBILE (< md) LAYOUT: single rail on the left ***** -->
    <div class="relative md:hidden">
      <div class="absolute bottom-0 left-[22px] top-0 w-1 bg-primary"></div>
      {#each entries as entry, i}
        <div class="relative flex w-full items-center gap-8 {i < entries.length - 1 ? 'pb-10' : ''}">
          <div class="z-10 flex min-h-12 min-w-12 shrink-0 items-center justify-center bg-foreground">
            <span class="text-sm font-bold text-primary">{entry.year}</span>
          </div>
          <div
            class="w-full bg-foreground p-4 text-secondary shadow-primary transition duration-300 ease-in-out hover:shadow-[8px_8px_0_hsl(var(--primary))]"
          >
            <h3 class="text-md font-sans font-bold uppercase">{entry.title}</h3>
            {#if entry.description}<p class="mt-1 text-sm text-secondary/80">{entry.description}</p>{/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- ***** DESKTOP/TABLET (md AND UP) LAYOUT: alternating sides ***** -->
    {#each entries as entry, i}
      <div class="hidden md:grid md:grid-cols-9">
        {#if i % 2 === 0}
          <!-- Left-aligned card -->
          <div class="col-span-4 py-4">
            <div
              class="bg-foreground p-2 text-secondary shadow-primary transition duration-300 ease-in-out hover:shadow-[8px_8px_0_hsl(var(--primary))] md:p-4"
            >
              <h3 class="text-md font-sans font-bold uppercase md:text-xl lg:text-2xl">{entry.title}</h3>
              {#if entry.description}<p class="mt-1 text-sm text-secondary/80">{entry.description}</p>{/if}
            </div>
          </div>

          <!-- Timeline column -->
          <div class="relative col-span-1 flex items-center justify-center">
            <div class="h-full w-1 bg-primary"></div>
            <div class="absolute z-10 flex min-h-12 min-w-12 items-center justify-center bg-foreground">
              <p class="text-sm font-bold text-primary">{entry.year}</p>
            </div>
          </div>

          <!-- Empty right column -->
          <div class="col-span-4"></div>
        {:else}
          <!-- Empty left column -->
          <div class="col-span-4"></div>

          <!-- Timeline column -->
          <div class="relative col-span-1 flex items-center justify-center">
            <div class="h-full w-1 bg-primary"></div>
            <div class="absolute z-10 flex min-h-12 min-w-12 items-center justify-center bg-foreground">
              <p class="text-sm font-bold text-primary">{entry.year}</p>
            </div>
          </div>

          <div class="col-span-4 py-4">
            <div
              class="bg-foreground p-2 text-secondary shadow-primary transition duration-300 ease-in-out hover:shadow-[8px_8px_0_hsl(var(--primary))] md:p-4"
            >
              <h3 class="text-md font-sans font-bold uppercase md:text-xl lg:text-2xl">{entry.title}</h3>
              {#if entry.description}<p class="mt-1 text-sm text-secondary/80">{entry.description}</p>{/if}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>
