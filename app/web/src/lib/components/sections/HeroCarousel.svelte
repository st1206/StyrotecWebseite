<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { assetUrl, srcset } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const images = $derived(
    ((item.images as Array<{ directus_files_id: string }> | null) ?? [])
      .map((f) => f?.directus_files_id)
      .filter(Boolean),
  );
  const speed = $derived((item.carousel_speed as number) || 4000);

  let index = $state(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    if (timer) clearInterval(timer);
    if (images.length > 1) {
      timer = setInterval(() => {
        index = (index + 1) % images.length;
      }, speed);
    }
  }

  function goToSlide(i: number) {
    index = (i + images.length) % images.length;
    startTimer();
  }

  onMount(startTimer);
  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<section
  class="mx-auto mt-20 lg:container lg:mt-32 lg:w-full"
  data-directus={edit({ collection: 'block_hero_carousel', item: item.id as string, fields: ['translations', 'images', 'carousel_speed'] })}
>
  <div class="shadow-primary relative h-[350px] overflow-hidden md:h-[500px] lg:h-[600px]">
    {#each images as id, i}
      <img
        src={assetUrl(id, { width: 1600, format: 'webp' })}
        srcset={srcset(id, [800, 1600, 2400]) ?? undefined}
        sizes="100vw"
        alt=""
        loading={i === 0 ? 'eager' : 'lazy'}
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style="opacity: {i === index ? 1 : 0}"
      />
    {/each}

    <!-- Gradient and title overlay -->
    <div
      class="from-foreground/100 via-foreground/40 pointer-events-none absolute inset-0 z-10 bg-gradient-to-r to-transparent"
    >
      {#if item.keyphrase}
        <div class="absolute inset-y-0 z-20 flex items-center pl-8">
          <h1 class="font-sans text-4xl font-bold text-white drop-shadow-md lg:text-5xl">
            {item.keyphrase}
          </h1>
        </div>
      {/if}
    </div>

    <!-- Navigation controls -->
    {#if images.length > 1}
      <div class="absolute bottom-5 left-10 z-20 flex items-center gap-1">
        <button type="button" aria-label="Go to previous slide" onclick={() => goToSlide(index - 1)}>
          <svg
            class="text-secondary/70 hover:text-secondary size-5 transition"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div class="flex items-center space-x-2">
          {#each images as _, i}
            <button
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              class="h-2 w-2 transition focus:outline-none {i === index
                ? 'bg-primary'
                : 'bg-secondary/70 hover:bg-secondary'}"
              onclick={() => goToSlide(i)}
            ></button>
          {/each}
        </div>
        <button type="button" aria-label="Go to next slide" onclick={() => goToSlide(index + 1)}>
          <svg
            class="text-secondary/70 hover:text-secondary size-5 transition"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</section>
