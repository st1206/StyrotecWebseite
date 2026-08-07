<script lang="ts">
  import { page } from '$app/stores';
  import type { Lang } from '$lib/config/routes';

  interface Props {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
    lang: Lang;
    /** full path per language short code, for hreflang alternates */
    alternates?: Record<string, string> | null;
    global?: Record<string, unknown> | null;
  }
  let { title, description, keywords, lang, alternates, global }: Props = $props();

  const fallbackTitle = $derived((global?.site_name as string) ?? 'STYROTEC');
  const resolvedTitle = $derived(title || fallbackTitle);
  const resolvedDescription = $derived(description || (global?.site_description as string) || '');
  const alternateEntries = $derived(Object.entries(alternates ?? {}).filter(([short]) => short !== lang));
</script>

<svelte:head>
  <title>{resolvedTitle}</title>
  {#if resolvedDescription}<meta name="description" content={resolvedDescription} />{/if}
  {#if keywords}<meta name="keywords" content={keywords} />{/if}
  <meta property="og:title" content={resolvedTitle} />
  {#if resolvedDescription}<meta property="og:description" content={resolvedDescription} />{/if}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={lang} />
  <link rel="canonical" href={$page.url.origin + $page.url.pathname} />
  {#each alternateEntries as [short, path] (short)}
    <link rel="alternate" hreflang={short} href={$page.url.origin + path} />
  {/each}
</svelte:head>
