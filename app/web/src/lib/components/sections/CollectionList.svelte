<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { t } from '$lib/config/nav';
  import type { Lang } from '$lib/config/routes';
  import { edit } from '$lib/directus-visual-edit';
  import MachineGrid from './MachineGrid.svelte';
  import BlockEditorRenderer from '$lib/rich-text/BlockEditorRenderer.svelte';

  interface Props {
    item: Record<string, unknown>;
    lang?: Lang;
    basePath?: string;
  }
  let { item, lang = 'de', basePath = '' }: Props = $props();

  const entries = $derived((item.entries as Array<Record<string, unknown>> | null) ?? []);
  const display = $derived((item.display as string) ?? 'machine_grid');
  let open = $state<Record<string, boolean>>({});

  function fmtDate(d: unknown): string {
    if (!d || typeof d !== 'string') return '';
    return new Date(d).toLocaleDateString(lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
</script>

<section data-directus={edit({ collection: 'block_collection_list', item: item.id as string, fields: ['translations', 'source', 'display'] })}>
  {#if item.section_title}
    <div class="max-w-6xl mx-auto px-6 pt-8 pb-12">
      <h2 class="text-center font-sans text-3xl md:text-4xl font-bold uppercase">{item.section_title}</h2>
      {#if item.description}<p class="mx-auto mt-2 max-w-3xl text-center text-muted-foreground">{item.description}</p>{/if}
    </div>
  {/if}

  {#if display === 'machine_grid'}
    <MachineGrid machines={entries as never} {lang} {basePath} />
  {:else if display === 'job_ads'}
    <div class="max-w-5xl mx-auto flex flex-col gap-4 px-4 pb-16">
      {#each entries as job (job.id)}
        <div class="bg-foreground text-secondary shadow-primary transition ease-in-out">
          <button
            class="flex w-full items-center justify-between p-5 text-left"
            onclick={() => (open[String(job.id)] = !open[String(job.id)])}
          >
            <span class="flex flex-col gap-2">
              <span class="font-sans text-2xl font-bold sm:text-3xl">{job.title}</span>
              {#if job.description}<span class="block text-xs text-secondary/80">{job.description}</span>{/if}
            </span>
            <span class="ml-4 shrink-0 text-secondary/60 transition-transform duration-200" class:rotate-180={open[String(job.id)]}>▾</span>
          </button>
          {#if open[String(job.id)]}
            <div class="border-t border-secondary/20 px-5 pb-6 pt-4">
              {#if job.content}
                <div class="prose prose-sm prose-invert max-w-none">
                  <BlockEditorRenderer content={job.content} />
                </div>
              {/if}
              {#if job.file}
                <a
                  href={assetUrl(job.file as string)}
                  target="_blank"
                  rel="noopener"
                  class="mt-5 inline-flex h-10 -skew-x-[15deg] items-center justify-center bg-primary px-4 py-2 font-sans text-sm font-bold tracking-wide text-primary-foreground no-underline transition duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none"
                >
                  <span class="skew-x-[15deg]">{t('download', lang)} (PDF) →</span>
                </a>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {:else if display === 'fairs'}
    <div class="max-w-5xl mx-auto flex flex-col gap-4 px-4 pb-16">
      {#each entries as fair (fair.id)}
        <div
          class="bg-foreground text-secondary shadow-primary transition ease-in-out hover:shadow-[8px_8px_0_hsl(var(--primary))] sm:-skew-x-[15deg]"
        >
          <div class="flex flex-col items-start gap-5 p-5 sm:skew-x-[15deg] sm:flex-row sm:items-center sm:px-10">
            {#if fair.logo}
              <img
                src={assetUrl(fair.logo as string, { width: 200, format: 'webp' })}
                alt=""
                class="max-h-[100px] w-32 shrink-0 bg-secondary object-contain p-2 sm:max-h-[70px]"
                loading="lazy"
              />
            {/if}
            <div class="flex flex-1 flex-col gap-2">
              <h4 class="font-sans text-lg text-primary">
                {fmtDate(fair.start_date)} – {fmtDate(fair.end_date)}
                {#if fair.city}| {fair.city}{/if}
              </h4>
              <h3 class="font-sans text-2xl font-bold sm:text-3xl">{fair.name}</h3>
              {#if fair.description}<p class="text-xs text-secondary/80">{fair.description}</p>{/if}
              {#if fair.external_link}
                <a
                  href={fair.external_link as string}
                  target="_blank"
                  rel="noopener"
                  class="mt-1 inline-block text-sm font-bold text-primary hover:underline"
                >
                  {fair.external_link} →
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if display === 'downloads'}
    <div class="max-w-5xl mx-auto px-4 pb-16">
      <div class="overflow-x-auto">
        <div class="divide-y divide-foreground/20 border-y border-foreground/20">
          {#each entries as dl (dl.id)}
            <div class="flex items-center justify-between gap-4 bg-foreground/5 px-5 py-3 transition-colors hover:bg-foreground/10">
              <div>
                <div class="font-sans font-bold">{dl.title}</div>
                {#if dl.description}<div class="text-sm text-muted-foreground">{dl.description}</div>{/if}
              </div>
              {#if dl.file}
                <a
                  href={assetUrl(dl.file as string)}
                  target="_blank"
                  rel="noopener"
                  class="shrink-0 font-sans text-sm font-bold text-foreground transition-colors hover:text-primary"
                >
                  {t('download', lang)} ↓
                </a>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else if display === 'brochures'}
    <div id="prospekte" class="max-w-4xl mx-auto grid grid-cols-2 gap-4 px-4 pb-16 md:grid-cols-3 lg:gap-6">
      {#each entries as brochure (brochure.id)}
        <a
          href={brochure.file ? assetUrl(brochure.file as string) : undefined}
          target="_blank"
          rel="noopener"
          class="group relative block cursor-pointer"
        >
          {#if brochure.thumbnail}
            <img
              src={assetUrl(brochure.thumbnail as string, { width: 400, format: 'webp' })}
              alt=""
              class="w-full bg-secondary object-cover shadow-foreground transition ease-in-out group-hover:shadow-[8px_8px_0_hsl(var(--foreground))]"
            />
          {/if}
          <div class="absolute top-0 flex h-16 w-full justify-end bg-foreground/90 p-3 [clip-path:polygon(100%_0,70%_0,100%_100%)]">
            <svg class="size-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
          </div>
          <div class="mt-2 font-sans text-sm font-bold uppercase group-hover:text-primary">{brochure.title}</div>
        </a>
      {/each}
    </div>
  {:else if display === 'testimonials'}
    <div class="max-w-6xl mx-auto grid gap-8 px-6 pb-16 md:grid-cols-2">
      {#each entries as quote (quote.id)}
        <figure class="bg-foreground p-6 text-secondary shadow-primary transition ease-in-out hover:shadow-[8px_8px_0_hsl(var(--primary))]">
          <blockquote class="prose prose-sm prose-invert max-w-none">
            <BlockEditorRenderer content={quote.testimonial} />
          </blockquote>
          <figcaption class="mt-4 flex items-center gap-3">
            {#if quote.thumbnail}
              <img src={assetUrl(quote.thumbnail as string, { width: 100, height: 100, fit: 'cover', format: 'webp' })} alt="" class="h-10 w-10 object-cover" />
            {/if}
            <span class="font-sans text-sm font-bold text-primary">{quote.name}</span>
          </figcaption>
        </figure>
      {/each}
    </div>
  {/if}
</section>
