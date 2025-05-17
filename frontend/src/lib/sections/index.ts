import HeroTextImage from './hero-text-image.svelte';
import HeroCarousel from './hero-carousel.svelte';
import ExploreMore from './explore-more.svelte';
import UspList from './usp-list.svelte';
import HeroDualImage from './hero-dual-image.svelte';
import ExploreVariants from './explore-variants.svelte';
import ExploreOptions from './explore-options.svelte';
import PageHeader from './page-header.svelte';
import DefaultCards from './default-cards.svelte';
import DefaultContent from './default-content.svelte';
import heroMedia from './hero-media.svelte';
import History from './history.svelte';
import CollectionTypeCards from './collection-type-cards.svelte';
import UsedMachineDetails from '$lib/templates/used-machine-details.svelte';
import ContactForm from './contact-form.svelte';

export const sectionMap = {
	heroCarousel: HeroCarousel,
	heroTextImage: HeroTextImage,
	uspList: UspList,
	exploreMore: ExploreMore,
	heroDualImage: HeroDualImage,
	exploreVariants: ExploreVariants,
	optionBlocks: ExploreOptions,
	pageHeader: PageHeader,
	defaultCards: DefaultCards,
	defaultCardsTwo: DefaultCards,
	defaultContent: DefaultContent,
	heroMedia: heroMedia,
	history: History,
	collectionTypeCards: CollectionTypeCards,
	usedMachineDetails: UsedMachineDetails,
	contactForm: ContactForm
} as const;
