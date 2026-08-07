<script lang="ts">
  import { assetUrl } from '$lib/assets';
  import { t } from '$lib/config/nav';
  import type { Lang } from '$lib/config/routes';

  interface Machine {
    id: string;
    slug?: string;
    name?: string;
    designation?: string;
    manufacturer?: string;
    location?: string;
    available?: boolean;
    year_of_manufacture?: number;
    pictures?: Array<{ directus_files_id: string }>;
  }

  interface Props {
    machines: Machine[];
    lang: Lang;
    /** current page path (without lang prefix) — machine links are `<basePath>/<slug>` */
    basePath: string;
  }
  let { machines, lang, basePath }: Props = $props();

  let availableOnly = $state(false);
  const visible = $derived(availableOnly ? machines.filter((m) => m.available) : machines);
</script>

<div class="max-w-6xl mx-auto px-6 pb-16">
  <div class="mb-8 flex items-center justify-between">
    <p class="font-sans text-sm font-medium text-muted-foreground">
      {visible.length} / {machines.length} {t('machines', lang)}
    </p>
    <label class="flex cursor-pointer items-center gap-2 font-sans text-sm font-medium">
      <input type="checkbox" bind:checked={availableOnly} class="size-4 accent-[hsl(var(--primary))]" />
      {t('inStockOnly', lang)}
    </label>
  </div>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each visible as m (m.id)}
      {@const pictureId = m.pictures?.[0]?.directus_files_id}
      <a
        href={`/${lang}/${basePath}/${m.slug}`}
        class="group block overflow-hidden bg-foreground text-secondary shadow-primary transition duration-300 ease-in-out hover:scale-[101%] hover:shadow-[8px_8px_0_hsl(var(--primary))] focus:outline-none"
      >
        <div class="relative aspect-video bg-muted">
          {#if pictureId}
            <img
              src={assetUrl(pictureId, { width: 600, height: 400, fit: 'cover', format: 'webp' })}
              alt={m.name ?? ''}
              class="h-full w-full object-cover"
              loading="lazy"
            />
          {/if}
          <span
            class="absolute right-0 top-0 -ml-px px-3 py-1 font-sans text-xs font-bold uppercase tracking-wide {m.available
              ? 'bg-primary text-primary-foreground'
              : 'bg-foreground text-secondary'}"
          >
            {m.available ? t('available', lang) : t('sold', lang)}
          </span>
        </div>
        <div class="p-4">
          <h3 class="font-sans text-lg font-bold uppercase group-hover:text-primary">{m.name}</h3>
          <p class="mt-1 text-sm text-secondary/80">
            {m.manufacturer}{m.year_of_manufacture ? ` · ${t('yearBuilt', lang)} ${m.year_of_manufacture}` : ''}
          </p>
          {#if m.location}<p class="mt-1 text-sm text-secondary/60">{m.location}</p>{/if}
        </div>
      </a>
    {/each}
  </div>
</div>
