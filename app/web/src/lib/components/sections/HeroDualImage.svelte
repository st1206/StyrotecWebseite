<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const keyword = $derived((item.keyword as string) ?? '');
  const subKeyword = $derived((item.sub_keyword as string) ?? '');
  const hasSecondaryImage = $derived(Boolean(item.secondary_image));
  const hasContent = $derived(Boolean(item.title || item.subtitle || item.content));
</script>

<section
  class="mt-20 lg:container lg:mx-auto lg:mt-32 lg:w-full"
  data-directus={edit({ collection: 'block_hero_dual', item: item.id as string, fields: ['translations', 'image', 'secondary_image'] })}
>
  <div class="relative">
    <!-- Keyword banner (signature clip-path wedge, top-left) -->
    {#if keyword}
      <div
        class="{keyword.length <= 5
          ? 'w-2/5'
          : 'w-3/5'} bg-foreground/95 absolute hidden h-[130px] [clip-path:polygon(0%_0%,100%_0%,50%_50%,0%_100%)] md:block lg:h-[200px]"
      >
        <h1
          class="{keyword.length <= 5 ? 'w-3/5 lg:w-2/5' : 'w-1/2'} {keyword.length <= 15
            ? 'xl:text-5xl'
            : ''} text-secondary pt-6 text-center font-sans text-3xl font-bold lg:pt-12 lg:text-4xl"
        >
          {keyword}
        </h1>
      </div>
    {/if}

    <!-- Main hero image -->
    {#if item.image}
      <img
        src={assetUrl(item.image as string, { width: 1600, format: 'webp' })}
        alt={keyword || ''}
        class="bg-secondary shadow-foreground z-20 h-[300px] w-full object-cover lg:h-[600px]"
        loading="eager"
      />
    {:else}
      <div class="bg-secondary shadow-foreground z-20 h-[300px] w-full lg:h-[600px]"></div>
    {/if}

    <!-- Angled sub-keyword banner on the hero image (bottom-right) -->
    {#if hasSecondaryImage}
      <div
        class="bg-foreground absolute bottom-0 right-0 hidden h-[200px] w-2/5 [clip-path:polygon(50%_50%,100%_0%,100%_100%,0%_100%)] lg:block"
      >
        {#if subKeyword}
          <h2 class="text-secondary absolute bottom-12 right-10 font-sans text-3xl font-bold xl:text-4xl">
            {subKeyword}
          </h2>
        {/if}
      </div>
    {/if}
  </div>

  <div class="relative w-full">
    {#if hasContent}
      <div
        class="{hasSecondaryImage
          ? 'absolute left-0 h-[430px] pt-20 sm:pt-0 lg:w-3/5'
          : 'px-20 pt-16 lg:w-full'} flex w-full flex-col items-center justify-center px-6 sm:px-12"
      >
        <div class="mb-4">
          {#if item.title}
            <h2
              class="{hasSecondaryImage
                ? 'text-right'
                : 'text-center'} font-sans text-3xl font-bold uppercase sm:text-4xl xl:text-5xl"
            >
              {item.title}
            </h2>
          {/if}
          {#if item.subtitle}
            <h3
              class="{hasSecondaryImage ? 'text-right' : 'text-center'} text-2xl uppercase xl:text-3xl"
            >
              {item.subtitle}
            </h3>
          {/if}
        </div>
        {#if item.content}
          <p
            class="{hasSecondaryImage
              ? ''
              : 'max-w-7xl text-center'} prose prose-neutral xl:prose-lg max-w-none whitespace-pre-line"
          >
            {item.content}
          </p>
        {/if}
      </div>
    {/if}

    <!-- Angled secondary image -->
    {#if hasSecondaryImage}
      <div class="shadow-foreground absolute right-0 hidden h-[600px] w-2/5 -translate-y-[194px] lg:block">
        {#if subKeyword}
          <div
            class="{subKeyword.length <= 10
              ? 'h-1/5 w-2/3'
              : subKeyword.length > 15
                ? 'h-1/3 w-5/6'
                : 'h-1/4 w-3/4'} bg-foreground/95 absolute bottom-0 right-0 z-30 [clip-path:polygon(0%_100%,100%_100%,100%_0%)]"
          >
            <h2 class="text-secondary absolute bottom-5 right-7 font-sans text-3xl font-bold xl:text-4xl">
              {subKeyword}
            </h2>
          </div>
        {/if}
        <img
          src={assetUrl(item.secondary_image as string, { width: 1000, format: 'webp' })}
          alt={(item.title as string) || ''}
          class="h-full w-full object-cover [clip-path:polygon(0%_33.2%,100%_0%,100%_100%,0%_100%)]"
          loading="lazy"
        />
      </div>
    {/if}
  </div>

  {#if hasSecondaryImage}
    <div class="h-[430px] md:h-[400px]"></div>
  {/if}
</section>
