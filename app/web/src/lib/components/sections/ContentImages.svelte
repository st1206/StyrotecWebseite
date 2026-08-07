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
  const dark = $derived(Boolean(item.is_dark_mode));
</script>

<section
  data-dark={dark ? 'true' : undefined}
  data-directus={edit({ collection: 'block_content_images', item: item.id as string, fields: ['image_cards'] })}
>
  {#if dark}
    <div
      class="mt-24 h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28 [[data-dark]+[data-dark]_&]:hidden"
    ></div>
  {/if}

  <div class={dark ? 'bg-foreground text-secondary' : ''}>
    <div class="px-4 sm:container 2xl:px-0">
      <div class="mx-auto py-16">
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
          {#each cards as card}
            <figure
              class="relative {dark ? 'bg-secondary/10' : 'bg-foreground/10'} {card.subtitle ? '' : 'shadow-primary'}"
            >
              {#if card.image}
                <img
                  src={assetUrl(card.image as string, { width: 700, format: 'webp' })}
                  alt={(card.title as string) ?? ''}
                  loading="lazy"
                  class="mx-auto h-[300px] w-auto lg:h-[330px] xl:h-[400px] {card.is_image_transparent ? 'object-contain' : 'object-cover object-top'}"
                />
              {/if}
              {#if card.title || card.subtitle}
                <figcaption class="absolute bottom-0 flex w-full flex-col justify-between bg-foreground/90 p-2 px-4">
                  {#if card.title}
                    <div class="font-sans text-3xl font-bold text-secondary">{card.title}</div>
                  {/if}
                  {#if card.subtitle}
                    <div class="text-primary">{card.subtitle}</div>
                  {/if}
                </figcaption>
              {/if}
            </figure>
          {/each}
        </div>
      </div>
    </div>
  </div>

  {#if dark}
    <div
      class="mb-32 h-14 w-full -translate-y-[1px] bg-foreground [clip-path:polygon(100%_0%,0%_0%,0%_100%)] [[data-dark]:has(+[data-dark])_&]:hidden"
    ></div>
  {/if}
</section>
