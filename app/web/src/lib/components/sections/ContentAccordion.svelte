<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();

  const entries = $derived((item.items as Array<Record<string, unknown>> | null) ?? []);
  const dark = $derived(Boolean(item.is_dark_mode));

  /** single-open accordion, first entry open by default (mirrors the old site) */
  let openIndex = $state(0);
</script>

<section
  data-dark={dark ? 'true' : undefined}
  data-directus={edit({ collection: 'block_content_accordion', item: item.id as string, fields: ['translations', 'items'] })}
>
  {#if dark}
    <div
      class="mt-24 h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28 [[data-dark]+[data-dark]_&]:hidden"
    ></div>
  {/if}

  <div class={dark ? 'bg-foreground text-secondary' : ''}>
    <div class="px-4 sm:container 2xl:px-0">
      <div class="h-full w-full py-16 lg:mx-auto">
        {#if item.title}
          <h3 class="my-4 text-center font-sans text-2xl font-bold {dark ? 'text-secondary' : 'text-foreground'}">
            {item.title}
          </h3>
        {/if}

        <div class="flex w-full flex-col gap-4">
          {#each entries as entry, i (entry.id)}
            <div>
              <button
                class="flex w-full items-center justify-between border-b border-primary p-4 text-left font-sans font-medium uppercase transition-colors {dark
                  ? 'bg-secondary/10 text-secondary hover:bg-secondary/15'
                  : 'bg-foreground/10 text-foreground hover:bg-foreground/15'}"
                onclick={() => (openIndex = openIndex === i ? -1 : i)}
              >
                <span>
                  {entry.title}
                  {#if entry.subtitle}
                    <span class="mt-0.5 block text-xs font-bold normal-case tracking-wide text-primary">
                      {entry.subtitle}
                    </span>
                  {/if}
                </span>
                <svg
                  class="ml-auto size-4 shrink-0 transition-transform duration-200 {openIndex === i ? 'rotate-180' : ''}"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {#if openIndex === i}
                <div class="flex flex-col gap-6 p-4 sm:flex-row {dark ? 'bg-secondary/5' : 'bg-foreground/5'}">
                  {#if entry.image}
                    <img
                      src={assetUrl(entry.image as string, { width: 700, format: 'webp' })}
                      alt={(entry.title as string) ?? ''}
                      loading="lazy"
                      class="h-[220px] w-full shrink-0 sm:w-72 {entry.is_image_transparent ? 'object-contain' : 'object-cover'}"
                    />
                  {/if}
                  {#if entry.description}
                    <p class="prose-sm flex-1 text-justify font-sans {dark ? 'text-secondary' : 'text-foreground'}">
                      {entry.description}
                    </p>
                  {/if}
                </div>
              {/if}
            </div>
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
