<script lang="ts">
  import { edit } from '$lib/directus-visual-edit';

  interface Props {
    item: Record<string, unknown>;
    lang?: string;
    basePath?: string;
  }
  let { item }: Props = $props();
  const dark = $derived(Boolean(item.is_dark_mode));
</script>

<section
  id={(item.anchor as string) || undefined}
  data-dark={dark ? 'true' : undefined}
  data-directus={edit({ collection: 'block_content_header', item: item.id as string, fields: ['translations'] })}
>
  {#if dark}
    <!-- angled transition into dark group (hidden when previous section is also dark) -->
    <div
      class="mt-24 h-14 w-full translate-y-[1px] bg-foreground [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:mt-28 [[data-dark]+[data-dark]_&]:hidden"
    ></div>
  {/if}

  <div class={dark ? 'bg-foreground text-secondary' : ''}>
    <div class="px-4 sm:container 2xl:px-0">
      <div class="flex flex-col items-center gap-2 {dark ? 'py-16' : 'pb-16 pt-28'}">
        <h2 class="text-center font-sans text-4xl font-bold {dark ? 'text-secondary' : 'text-foreground'}">
          {item.section_title}
        </h2>
        {#if item.description}
          <div
            class="prose prose-neutral max-w-5xl text-justify lg:prose-lg {dark ? 'prose-invert text-secondary' : 'text-foreground'}"
          >
            <p>{item.description}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>

  {#if dark}
    <!-- angled transition out of dark group (hidden when next section is also dark) -->
    <div
      class="mb-32 h-14 w-full -translate-y-[1px] bg-foreground [clip-path:polygon(100%_0%,0%_0%,0%_100%)] [[data-dark]:has(+[data-dark])_&]:hidden"
    ></div>
  {/if}
</section>
