<script lang="ts">
  import { page } from '$app/stores';
  import { navGroups, pickLabel } from '$lib/config/nav';
  import { hrefFor, type Lang, type SlugMap } from '$lib/config/routes';

  interface Props {
    lang: Lang;
    siteName: string;
    slugMap: SlugMap;
    languages: Array<{ short: string; name: string }>;
  }
  let { lang, siteName, slugMap, languages }: Props = $props();

  let openGroup = $state<number | null>(null);
  let mobileOpen = $state(false);

  // page loaders provide equivalent paths per language; fall back to the language root
  const otherLanguages = $derived(languages.filter((l) => l.short !== lang));
  const alternates = $derived(($page.data.alternates as Record<string, string> | undefined) ?? {});
  const hrefForLang = (short: string) => alternates[short] ?? `/${short}`;
</script>

<svelte:window onclick={() => (openGroup = null)} />

<header
  class="sticky top-0 z-40 w-full bg-foreground/90 text-secondary shadow-lg backdrop-blur transition-colors duration-200 print:static {openGroup !== null || mobileOpen ? 'bg-foreground' : ''}"
>
  <div class="flex h-20 items-center justify-between gap-2 px-4 md:container">
    <!-- Logo -->
    <a href={`/${lang}`} class="w-24 shrink-0">
      <img src="/logo.png" alt={siteName} />
    </a>

    <!-- Desktop nav -->
    <nav class="hidden h-full items-stretch navBreak:flex print:hidden">
      {#each navGroups as group, gi}
        <button
          class="-skew-x-[15deg] cursor-pointer px-4 font-sans font-bold uppercase transition duration-300 hover:bg-primary hover:text-white xl:px-8 {gi < navGroups.length - 1 ? 'border-r-2 border-white/20' : ''} {openGroup === gi ? 'bg-primary text-white' : 'text-secondary'}"
          onclick={(e) => {
            e.stopPropagation();
            openGroup = openGroup === gi ? null : gi;
          }}
        >
          <span class="block skew-x-[15deg] xl:text-lg">{pickLabel(group.label, lang)}</span>
        </button>
      {/each}
    </nav>

    <div class="hidden items-center gap-4 navBreak:flex print:hidden">
      {#each otherLanguages as language (language.short)}
        <a
          href={hrefForLang(language.short)}
          data-sveltekit-reload
          title={language.name}
          class="inline-flex h-10 -skew-x-[15deg] items-center bg-secondary px-4 font-sans font-bold text-secondary-foreground transition duration-200 hover:bg-secondary/80"
        >
          <span class="skew-x-[15deg]">{language.short.toUpperCase()}</span>
        </a>
      {/each}
      <a
        href="https://styrotec.shop/"
        target="_blank"
        rel="noopener"
        class="inline-flex h-10 -skew-x-[15deg] items-center bg-primary px-4 font-sans font-bold text-white transition duration-200 hover:scale-105 hover:bg-primary/90"
      >
        <span class="skew-x-[15deg]">Onlineshop</span>
      </a>
    </div>

    <!-- Mobile controls -->
    <div class="flex items-center gap-1 navBreak:hidden print:hidden">
      <button
        class="-mr-2 p-2 text-secondary"
        aria-label="Menu"
        onclick={(e) => {
          e.stopPropagation();
          mobileOpen = !mobileOpen;
        }}
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {#if mobileOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>
  </div>

  <!-- Desktop dropdown panel (full-width dark panel like the old site) -->
  {#if openGroup !== null}
    <div
      class="absolute inset-x-0 top-full hidden bg-foreground pb-4 shadow-lg navBreak:block print:hidden"
      role="menu"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.key === 'Escape' && (openGroup = null)}
    >
      <div class="sm:container">
        <div class="flex flex-wrap justify-around gap-10 px-6 py-12">
          {#each navGroups[openGroup].columns as column}
            {#if column.items.some((navItem) => navItem.icon)}
              <!-- icon-card grid (old site's Branchen panel) -->
              <div class="flex flex-wrap justify-center gap-6">
                {#each column.items as navItem}
                  <a href={hrefFor(slugMap, navItem.key, lang)} class="w-44 xl:w-52" onclick={() => (openGroup = null)}>
                    <div
                      class="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 bg-secondary/30 p-8 text-center font-sans text-xl font-bold text-secondary transition duration-300 ease-in-out hover:shadow-primary xl:text-2xl"
                    >
                      {#if navItem.icon}
                        <navItem.icon class="h-16 w-16 md:h-20 md:w-20" stroke-width={1.5} />
                      {/if}
                      <span>{pickLabel(navItem.label, lang)}</span>
                    </div>
                  </a>
                {/each}
              </div>
            {:else}
            <div class="flex min-w-40 flex-col gap-6">
              {#if column.heading}
                <div class="font-sans text-2xl font-bold text-primary xl:text-3xl">
                  {pickLabel(column.heading, lang)}
                </div>
                <ul class="flex flex-col gap-1">
                  {#each column.items as navItem}
                    <li>
                      <a
                        href={hrefFor(slugMap, navItem.key, lang)}
                        class="text-white hover:underline xl:text-lg"
                        onclick={() => (openGroup = null)}
                      >
                        {pickLabel(navItem.label, lang)}
                      </a>
                    </li>
                  {/each}
                </ul>
              {:else}
                <ul class="flex flex-col gap-6">
                  {#each column.items as navItem}
                    <li>
                      <a
                        href={hrefFor(slugMap, navItem.key, lang)}
                        class="font-sans text-2xl font-bold text-primary hover:underline xl:text-3xl"
                        onclick={() => (openGroup = null)}
                      >
                        {pickLabel(navItem.label, lang)}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
            {/if}
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Mobile nav -->
  {#if mobileOpen}
    <nav class="max-h-[70vh] overflow-y-auto border-t border-white/20 bg-foreground navBreak:hidden">
      <div class="flex flex-col gap-2 px-6 py-4">
        <a
          href="https://styrotec.shop/"
          target="_blank"
          rel="noopener"
          class="inline-flex h-10 w-full -skew-x-[15deg] items-center justify-center bg-primary px-4 font-sans font-bold text-white transition hover:bg-primary/90"
        >
          <span class="skew-x-[15deg]">Onlineshop</span>
        </a>
        {#each otherLanguages as language (language.short)}
          <a
            href={hrefForLang(language.short)}
            data-sveltekit-reload
            class="inline-flex h-10 w-full -skew-x-[15deg] items-center justify-center bg-secondary px-4 font-sans font-bold text-secondary-foreground transition hover:bg-secondary/80"
          >
            <span class="skew-x-[15deg]">{language.short.toUpperCase()}</span>
          </a>
        {/each}
      </div>

      {#each navGroups as group}
        <div class="border-b border-white/10 px-6 py-4">
          <div class="mb-2 font-sans text-xl font-bold uppercase text-primary">{pickLabel(group.label, lang)}</div>
          {#each group.columns as column}
            <ul class="mb-3 flex flex-col gap-1">
              {#if column.heading}
                <li class="mt-2 text-sm font-bold text-secondary/70">{pickLabel(column.heading, lang)}</li>
              {/if}
              {#each column.items as navItem}
                <li>
                  <a
                    href={hrefFor(slugMap, navItem.key, lang)}
                    class="block py-1 text-sm text-secondary hover:text-primary hover:underline"
                    onclick={() => (mobileOpen = false)}
                  >
                    {pickLabel(navItem.label, lang)}
                  </a>
                </li>
              {/each}
            </ul>
          {/each}
        </div>
      {/each}
    </nav>
  {/if}
</header>
