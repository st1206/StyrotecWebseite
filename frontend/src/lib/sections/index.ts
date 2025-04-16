import BasicTextImage from './basic-text-image.svelte';
import HeroCarousel from './hero-carousel.svelte';
import ExploreMore from './explore-more.svelte';
import TestSection from './testSection.svelte';
import UspList from './usp-list.svelte';

export const sectionMap = {
	test: TestSection,
	heroCarousel: HeroCarousel,
	basicTextImage: BasicTextImage,
	uspList: UspList,
	exploreMore: ExploreMore
} as const;
