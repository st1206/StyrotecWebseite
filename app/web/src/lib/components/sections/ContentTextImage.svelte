<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';
  import BlockEditorRenderer from '$lib/rich-text/BlockEditorRenderer.svelte';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const dark = $derived(Boolean(item.is_dark_mode));
  const position = $derived((item.image_position as string) ?? 'right');
  const sizeClass = $derived(
    ({ xs: 'md:w-1/4', sm: 'md:w-2/5', md: 'md:w-1/2', lg: 'md:w-3/5', xl: 'md:w-3/4' })[
      (item.image_size as string) ?? 'md'
    ] ?? 'md:w-1/2',
  );
  const horizontal = $derived(position === 'left' || position === 'right');
</script>

<section
  data-dark={dark ? 'true' : undefined}
  data-directus={edit({ collection: 'block_content_text_image', item: item.id as string, fields: ['translations', 'image', 'image_position', 'image_size'] })}
>
  {#if dark}
    <div
      class="mt-24 h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28 [[data-dark]+[data-dark]_&]:hidden"
    ></div>
  {/if}

  <div class={dark ? 'bg-foreground text-secondary' : ''}>
    <div class="px-4 sm:container 2xl:px-0">
      <div class="mx-auto py-16">
        <div
          class="flex flex-col gap-6 sm:gap-4 lg:gap-12 {position === 'left' ? 'md:flex-row' : ''} {position === 'right' ? 'md:flex-row-reverse' : ''}"
        >
          {#if item.image}
            <img
              src={assetUrl(item.image as string, { width: 1000, format: 'webp' })}
              alt={(item.title as string) ?? ''}
              loading="lazy"
              class="max-h-[400px] w-full object-cover {item.is_image_transparent ? '' : 'shadow-primary'} {horizontal ? sizeClass : ''} {position === 'bottom' ? 'order-2' : 'order-1'}"
            />
          {/if}

          <div class="min-w-0 flex-1 {position === 'bottom' ? 'order-1' : 'order-2'}">
            {#if item.title}
              <h3 class="my-2 font-sans text-2xl font-bold {dark ? 'text-secondary' : 'text-foreground'}">
                {item.title}
              </h3>
            {/if}
            {#if item.content}
              <div class="prose prose-neutral max-w-none text-justify xl:prose-lg {dark ? 'prose-invert' : ''}">
                <BlockEditorRenderer content={item.content} />
              </div>
            {/if}
          </div>
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
