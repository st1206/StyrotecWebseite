<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const cards = $derived((item.image_cards as Array<Record<string, unknown>> | null) ?? []);
</script>

<section
  id={(item.anchor as string) || undefined}
  class="mt-20 scroll-mt-24 lg:container lg:mx-auto lg:mt-32 lg:w-full"
  data-directus={edit({ collection: 'block_hero_media', item: item.id as string, fields: ['translations', 'media', 'image_cards'] })}
>
  <div class="bg-foreground lg:shadow-primary">
    {#if item.media}
      <img
        src={assetUrl(item.media as string, { width: 2000, format: 'webp' })}
        alt={(item.title as string) || ''}
        class="max-h-[650px] w-full object-cover object-top [clip-path:polygon(0%_0%,100%_0%,100%_90%,0%_100%)]"
        loading="eager"
      />
    {/if}

    <div class="p-8">
      {#if item.title || item.description}
        <div class="space-y-4 text-center">
          {#if item.title}
            <h2 class="text-secondary font-sans text-4xl font-bold">{item.title}</h2>
          {/if}
          {#if item.description}
            <p class="prose prose-neutral text-secondary lg:prose-lg mx-auto max-w-5xl text-center">
              {item.description}
            </p>
          {/if}
        </div>
      {/if}

      {#if cards.length > 0}
        <div class="mt-16 grid grid-cols-1 flex-wrap gap-12 md:grid-cols-2 xl:grid-cols-3">
          {#each cards as card}
            {@const employee = card.employee as Record<string, unknown> | null}
            {@const imageId = (card.image as string) ?? (employee?.picture as string)}
            {@const cardTitle = (card.title as string) ?? (employee?.name as string)}
            {@const cardSubtitle = (card.subtitle as string) ?? (employee?.position as string)}
            <div class="bg-secondary/10 relative {!cardSubtitle ? 'shadow-primary' : ''}">
              {#if imageId}
                <img
                  src={assetUrl(imageId, { width: 600, format: 'webp' })}
                  alt={cardTitle || ''}
                  class="mx-auto h-[300px] w-auto object-cover object-top lg:h-[330px] xl:h-[400px]"
                  loading="lazy"
                />
              {:else}
                <div class="h-[300px] w-full lg:h-[330px] xl:h-[400px]"></div>
              {/if}
              {#if cardTitle}
                <div class="bg-foreground/90 absolute bottom-0 flex w-full flex-col justify-between p-2 px-4">
                  <h4 class="text-secondary font-sans text-3xl font-bold">{cardTitle}</h4>
                  {#if cardSubtitle}
                    <h5 class="text-primary">{cardSubtitle}</h5>
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
