<script lang="ts">
  import type { Lang } from '$lib/config/routes';
  import HeroCarousel from './sections/HeroCarousel.svelte';
  import HeroDualImage from './sections/HeroDualImage.svelte';
  import HeroMedia from './sections/HeroMedia.svelte';
  import TextImage from './sections/TextImage.svelte';
  import PageHeader from './sections/PageHeader.svelte';
  import UspList from './sections/UspList.svelte';
  import ExploreMore from './sections/ExploreMore.svelte';
  import ExploreVariants from './sections/ExploreVariants.svelte';
  import History from './sections/History.svelte';
  import DefaultCards from './sections/DefaultCards.svelte';
  import CollectionList from './sections/CollectionList.svelte';
  import ContactForm from './sections/ContactForm.svelte';
  import ContentHeader from './sections/ContentHeader.svelte';
  import ContentTextImage from './sections/ContentTextImage.svelte';
  import ContentImages from './sections/ContentImages.svelte';
  import ContentAccordion from './sections/ContentAccordion.svelte';
  import ContentTable from './sections/ContentTable.svelte';
  import Spacer from './sections/Spacer.svelte';

  interface Section {
    id: number;
    collection: string;
    item: Record<string, unknown>;
  }

  interface Props {
    sections: Section[];
    lang: Lang;
    /** current page path without lang prefix — used for machine detail links */
    basePath?: string;
  }

  let { sections, lang, basePath = '' }: Props = $props();

  const components: Record<string, unknown> = {
    block_hero_carousel: HeroCarousel,
    block_hero_dual: HeroDualImage,
    block_hero_media: HeroMedia,
    block_text_image: TextImage,
    block_page_header: PageHeader,
    block_usp_list: UspList,
    block_explore_more: ExploreMore,
    block_explore_variants: ExploreVariants,
    block_history: History,
    block_default_cards: DefaultCards,
    block_collection_list: CollectionList,
    block_contact_form: ContactForm,
    block_content_header: ContentHeader,
    block_content_text_image: ContentTextImage,
    block_content_images: ContentImages,
    block_content_accordion: ContentAccordion,
    block_content_table: ContentTable,
    block_spacer: Spacer,
  };
</script>

{#each sections as section (section.id)}
  {@const Component = components[section.collection] as import('svelte').Component<{
    item: Record<string, unknown>;
    lang: Lang;
    basePath?: string;
  }> | undefined}
  {#if Component}
    <Component item={section.item} {lang} {basePath} />
  {:else if import.meta.env.DEV}
    <div class="max-w-6xl mx-auto px-6 py-4 text-sm text-red-500 border border-dashed border-red-300 rounded my-2">
      Unknown section type: {section.collection}
    </div>
  {/if}
{/each}
