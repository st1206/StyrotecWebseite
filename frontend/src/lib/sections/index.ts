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
import CollectionTypeTable from './collection-type-table.svelte';

export const sectionMap = {
	heroCarousel: HeroCarousel,
	heroCarouselOne: HeroCarousel,
	heroCarouselTwo: HeroCarousel,
	heroCarouselThree: HeroCarousel,
	heroTextImage: HeroTextImage,
	heroTextImageOne: HeroTextImage,
	heroTextImageTwo: HeroTextImage,
	heroTextImageThree: HeroTextImage,
	heroTextImageFour: HeroTextImage,
	uspList: UspList,
	uspListOne: UspList,
	uspListTwo: UspList,
	uspListThree: UspList,
	uspListFour: UspList,
	uspListFive: UspList,
	exploreMore: ExploreMore,
	exploreMoreOne: ExploreMore,
	exploreMoreTwo: ExploreMore,
	exploreMoreThree: ExploreMore,
	exploreMoreFour: ExploreMore,
	heroDualImage: HeroDualImage,
	heroDualImageOne: HeroDualImage,
	heroDualImageThree: HeroDualImage,
	exploreVariants: ExploreVariants,
	exploreVariantsOne: ExploreVariants,
	exploreVariantsTwo: ExploreVariants,
	optionBlocks: ExploreOptions,
	optionBlocksOne: ExploreOptions,
	optionBlocksTwo: ExploreOptions,
	pageHeader: PageHeader,
	pageHeaderOne: PageHeader,
	pageHeaderTwo: PageHeader,
	pageHeaderThree: PageHeader,
	pageHeaderFour: PageHeader,
	defaultCards: DefaultCards,
	defaultCardsOne: DefaultCards,
	defaultCardsTwo: DefaultCards,
	defaultCardsThree: DefaultCards,
	defaultContent: DefaultContent,
	defaultContentOne: DefaultContent,
	defaultContentTwo: DefaultContent,
	defaultContentThree: DefaultContent,
	heroMedia: heroMedia,
	heroMediaOne: heroMedia,
	heroMediaTwo: heroMedia,
	heroMediaThree: heroMedia,
	history: History,
	historyOne: History,
	historyTwo: History,
	collectionTypeCards: CollectionTypeCards,
	collectionTypeCardsOne: CollectionTypeCards,
	collectionTypeCardsTwo: CollectionTypeCards,
	collectionTypeCardsThree: CollectionTypeCards,
	collectionTypeTable: CollectionTypeTable,
	collectionTypeTableTwo: CollectionTypeTable,
	collectionTypeTableThree: CollectionTypeTable,
	usedMachineDetails: UsedMachineDetails,
	contactForm: ContactForm
} as const;
