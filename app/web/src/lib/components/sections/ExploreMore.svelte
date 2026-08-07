<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item, lang = 'de' }: Props = $props();

  const cards = $derived((item.preview_cards as Array<Record<string, unknown>> | null) ?? []);
</script>

<section
  class="max-w-6xl mx-auto px-6 py-16 lg:py-24"
  data-directus={edit({ collection: 'block_explore_more', item: item.id as string, fields: ['translations', 'preview_cards'] })}
>
  {#if item.section_title}
    <div class="mb-16">
      <h2 class="text-center font-sans text-3xl md:text-4xl font-bold uppercase">{item.section_title}</h2>
      {#if item.description}
        <p class="mx-auto mt-2 max-w-3xl text-center text-muted-foreground">{item.description}</p>
      {/if}
    </div>
  {/if}

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
    {#each cards as card}
      {@const targetSlug = (card.target_page as { slug?: string } | null)?.slug}
      <a
        href={card.target_page ? `/${lang}${targetSlug ? `/${targetSlug}` : ''}` : undefined}
        class="group relative block h-[300px] w-full overflow-hidden bg-muted-foreground shadow-primary transition duration-500 hover:shadow-[8px_8px_0_hsl(var(--primary))] focus:outline-none lg:h-[400px]"
      >
        {#if card.thumbnail}
          <div class="absolute z-10 h-full w-full transition duration-300 ease-in-out group-hover:backdrop-blur-sm"></div>
          <div class="relative h-full w-full {card.is_image_transparent ? 'px-4 pb-[80px] pt-4' : ''}">
            <img
              src={assetUrl(card.thumbnail as string, { width: 700, format: 'webp' })}
              alt=""
              class="mx-auto h-full {card.is_image_transparent ? 'object-contain' : 'w-full object-cover'}"
            />
          </div>
        {/if}

        <!-- slide-up overlay: only the title bar peeks out until hover -->
        <div
          class="absolute bottom-0 left-0 right-0 z-20 w-full translate-y-[calc(100%-4.25rem)] overflow-hidden transition-transform duration-200 ease-in-out group-hover:translate-y-0"
        >
          <div
            class="w-full translate-y-[1px] bg-foreground {String(card.title ?? '').length < 20
              ? '[clip-path:polygon(0%_0%,60%_0%,80%_100%,0%_100%)]'
              : ''}"
          >
            <h3 class="p-5 font-sans font-bold text-secondary">{card.title}</h3>
          </div>

          <div class="bg-foreground px-5 pb-5 pt-2">
            {#if card.subtitle}
              <h4 class="mb-1 font-sans font-medium text-primary">{card.subtitle}</h4>
            {/if}
            {#if card.content}
              <p class="text-justify font-sans text-sm font-medium text-secondary {card.subtitle ? '' : 'mt-3'}">
                {card.content}
              </p>
            {/if}
            {#if card.cta_text}
              <span class="mt-3 inline-block font-sans text-sm font-bold text-primary">{card.cta_text} →</span>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>
