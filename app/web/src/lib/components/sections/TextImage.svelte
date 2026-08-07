<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();
</script>

<section
  class="bg-secondary mx-auto mb-32 mt-20 flex w-full flex-col gap-16 px-4 sm:container lg:my-36 lg:flex-row"
  data-directus={edit({ collection: 'block_text_image', item: item.id as string, fields: ['translations', 'image'] })}
>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="mb-4">
      {#if item.title}
        <h2 class="text-right font-sans text-3xl font-bold sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl">
          {item.title}
        </h2>
      {/if}
      {#if item.subtitle}
        <h3 class="text-right text-2xl uppercase xl:text-3xl">{item.subtitle}</h3>
      {/if}
    </div>
    {#if item.content}
      <div
        class="prose prose-sm prose-neutral md:prose-base xl:prose-lg max-w-none whitespace-pre-line text-center lg:text-start"
      >
        {item.content}
      </div>
    {/if}
  </div>

  {#if item.image}
    <div class="mx-auto flex w-full max-w-lg items-center justify-center">
      <img
        src={assetUrl(item.image as string, { width: 1000, format: 'webp' })}
        alt={(item.title as string) || ''}
        class="shadow-primary h-[300px] w-full object-cover lg:h-[330px] xl:h-[400px]"
        loading="lazy"
      />
    </div>
  {/if}
</section>
