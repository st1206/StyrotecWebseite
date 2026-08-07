<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
  import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

  let { data, children } = $props();

  // Directus Visual Editor overlay — only active inside the preview iframe
  onMount(async () => {
    if (!data.preview) return;
    try {
      const { apply } = await import('@directus/visual-editing');
      apply({
        directusUrl: env.PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055',
        onSaved: () => window.location.reload(),
      });
    } catch (e) {
      console.warn('Visual editor not available', e);
    }
  });
</script>

<div class="min-h-screen flex flex-col">
  {#if !data.preview}
    <SiteHeader lang={data.lang} siteName={(data.global?.site_name as string) ?? 'STYROTEC'} slugMap={data.slugMap} languages={data.languages} />
  {/if}

  <main class="flex-1">
    {@render children()}
  </main>

  {#if !data.preview}
    <SiteFooter lang={data.lang} global={data.global} socials={data.socials} slugMap={data.slugMap} />
  {/if}
</div>
