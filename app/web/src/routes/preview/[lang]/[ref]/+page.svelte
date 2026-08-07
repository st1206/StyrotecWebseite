<script lang="ts">
  import SectionRenderer from '$lib/components/SectionRenderer.svelte';
  import { editField } from '$lib/directus-visual-edit';

  let { data } = $props();
</script>

<div class="sticky top-0 z-50 flex justify-between bg-primary px-4 py-2 font-sans text-xs font-bold text-primary-foreground">
  <span>🔍 Preview: {data.page.name} — {data.page.status}</span>
  <span
    data-directus={editField('pages', data.page.id, 'translations')}
    class="cursor-pointer underline decoration-dashed"
  >
    SEO: {data.page.seo_page_title ?? '—'}
  </span>
</div>

<SectionRenderer sections={data.page.sections} lang={data.lang} basePath={data.basePath} />
