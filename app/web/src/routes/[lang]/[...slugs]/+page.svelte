<script lang="ts">
  import SectionRenderer from '$lib/components/SectionRenderer.svelte';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import MachineDetail from '$lib/components/machine/MachineDetail.svelte';

  let { data } = $props();
</script>

{#if data.kind === 'page'}
  <SeoHead
    title={data.page.seo_page_title as string}
    description={data.page.seo_page_description as string}
    keywords={data.page.seo_keywords as string}
    lang={data.lang}
    alternates={data.alternates}
    global={data.global}
  />
  <SectionRenderer sections={data.page.sections} lang={data.lang} basePath={data.basePath} />
{:else if data.kind === 'detail'}
  <SeoHead
    title={`${data.machine.name ?? ''} | ${data.global?.site_name ?? 'STYROTEC'}`}
    description={(data.machine.designation as string) ?? null}
    lang={data.lang}
    alternates={data.alternates}
    global={data.global}
  />
  <MachineDetail
    machine={data.machine}
    collection="machines"
    lang={data.lang}
    backHref={`/${data.lang}/${data.basePath}`}
  />
{/if}
