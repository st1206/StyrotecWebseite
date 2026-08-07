<script lang="ts">
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();
</script>

<header
  id={(item.anchor as string) || undefined}
  class="mt-28 max-w-4xl scroll-mt-24 px-4 sm:container sm:mx-auto sm:mt-36 lg:w-full xl:px-0 print:mt-8"
  data-directus={edit({ collection: 'block_page_header', item: item.id as string, fields: ['translations'] })}
>
  {#if item.headline}
    <h1 class="mb-4 text-center font-sans text-4xl font-bold xl:text-5xl">{item.headline}</h1>
  {/if}
  {#if item.description}
    <p class="prose prose-neutral prose-sm lg:prose-base xl:prose-lg mx-auto mb-8 max-w-5xl text-center">
      {item.description}
    </p>
  {/if}
</header>
