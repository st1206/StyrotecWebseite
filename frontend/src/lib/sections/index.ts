import BasicTextImage from './basic-text-image.svelte';
import HeroCarousel from './hero-carousel.svelte';
import ExploreMore from './explore-more.svelte';
import UspList from './usp-list.svelte';
import HeroDualImage from './hero-dual-image.svelte';
import ExploreVariants from './explore-variants.svelte';
import ExploreOptions from './explore-options.svelte';

export const sectionMap = {
	heroCarousel: HeroCarousel,
	basicTextImage: BasicTextImage,
	uspList: UspList,
	exploreMore: ExploreMore,
	heroDualImage: HeroDualImage,
	exploreVariants: ExploreVariants,
	exploreOptions: ExploreOptions
} as const;
