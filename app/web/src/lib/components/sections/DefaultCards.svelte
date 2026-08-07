<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item, lang = 'de' }: Props = $props();

  const cards = $derived((item.cards as Array<Record<string, unknown>> | null) ?? []);
  const dark = $derived(Boolean(item.is_dark_mode));
</script>

<section
  id={(item.anchor as string) || undefined}
  class="scroll-mt-24 {dark ? 'my-16 lg:my-24' : 'py-16 lg:py-24'}"
  data-directus={edit({ collection: 'block_default_cards', item: item.id as string, fields: ['translations', 'cards'] })}
>
  {#if dark}
    <div class="h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)]"></div>
  {/if}

  <div class={dark ? 'bg-foreground py-8 pb-12' : ''}>
    <div class="max-w-6xl mx-auto px-3 sm:px-6">
      {#if item.section_title}
        <div class="mb-16 text-center">
          <h2 class="font-sans text-3xl md:text-4xl font-bold uppercase {dark ? 'text-secondary' : 'text-foreground'}">
            {item.section_title}
          </h2>
          {#if item.description}
            <p class="mx-auto mt-2 max-w-3xl text-center {dark ? 'text-secondary/80' : 'text-muted-foreground'}">
              {item.description}
            </p>
          {/if}
        </div>
      {/if}

      <div class="grid gap-8 md:gap-16">
        {#each cards as card, i}
          <div
            id={(card.anchor as string) || undefined}
            class="flex w-full scroll-mt-24 flex-col overflow-hidden shadow-primary {i % 2 === 1
              ? 'md:flex-row-reverse'
              : 'md:flex-row'} {dark ? 'bg-secondary/10 text-secondary' : 'bg-foreground text-secondary'}"
          >
            {#if card.thumbnail}
              <div class="relative aspect-[4/2] w-full shrink-0 md:w-[60%]">
                <img
                  src={assetUrl(card.thumbnail as string, { width: 900, format: 'webp' })}
                  alt=""
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            {/if}
            <div class="flex flex-grow flex-col justify-between p-6 md:p-10">
              <div>
                <h3 class="font-sans text-lg font-bold sm:text-3xl xl:text-4xl">{card.title}</h3>
                {#if card.content}
                  <p class="mt-2 max-w-none leading-relaxed {dark ? 'text-secondary/90' : 'text-secondary/80'}">
                    {card.content}
                  </p>
                {/if}
              </div>
              {#if card.target_page && card.button_label}
                {@const targetSlug = (card.target_page as { slug?: string }).slug}
                <div class="mt-6 flex flex-wrap gap-4">
                  <a
                    href={`/${lang}${targetSlug ? `/${targetSlug}` : ''}`}
                    class="inline-flex h-10 -skew-x-[15deg] items-center justify-center bg-primary px-4 py-2 font-sans text-sm font-bold tracking-wide text-primary-foreground no-underline transition duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none"
                  >
                    <span class="skew-x-[15deg]">{card.button_label}</span>
                  </a>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#if dark}
    <div class="h-14 w-full -translate-y-[1px] bg-foreground [clip-path:polygon(100%_0%,0%_0%,0%_100%)]"></div>
  {/if}
</section>
