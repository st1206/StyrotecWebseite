import type { ImageAsset } from '$lib/cmsTypes/image-type';

// Base section interface
export interface BaseSection {
	id?: string;
	className?: string;
}

// Common types used across sections
export interface RedirectButton {
	label: string;
	redirectSlug: string;
	isPrimaryAction?: boolean;
}

export interface USPItem {
	title: string;
	content: string;
	icon?: string;
}

export interface AccordionItem {
	title: string;
	content: string;
	image?: ImageAsset;
	accordionItemLines?: Array<{
		title: string;
		content: string;
	}>;
}

export interface TableColumn {
	title: string;
	tableRows: Array<{
		content: string;
	}>;
}

export interface Table {
	tableColumns: TableColumn[];
}

export interface PreviewCard {
	title: string;
	content?: string;
	thumbnail?: ImageAsset;
	redirectSlug?: string;
}

export interface VariantCard {
	title: string;
	content?: string;
	image?: ImageAsset;
	accordionItems?: AccordionItem[];
}

export interface Card {
	title: string;
	content?: string;
	thumbnail?: ImageAsset;
	redirectButtons: RedirectButton[];
	anchor?: string;
}

export interface HistoryEntry {
	year: string;
	title: string;
	content: string;
}

export interface Employee {
	name: string;
	position: string;
	email?: string;
	phone?: string;
	picture?: ImageAsset;
	contactPicture?: ImageAsset;
}

// Section-specific interfaces
export interface HeroTextImageSection extends BaseSection {
	title: string;
	subtitle: string;
	content: string;
	image: ImageAsset;
}

export interface HeroCarouselSection extends BaseSection {
	title?: string;
	subtitle?: string;
	images: ImageAsset[];
}

export interface HeroDualImageSection extends BaseSection {
	title?: string;
	subtitle?: string;
	content?: string;
	image?: ImageAsset;
	heroTextImage?: HeroTextImageSection;
}

export interface HeroMediaSection extends BaseSection {
	title?: string;
	subtitle?: string;
	content?: string;
	media?: ImageAsset;
	imageCards?: Array<{
		title: string;
		content: string;
		employee?: Employee;
	}>;
}

export interface USPListSection extends BaseSection {
	sectionTitle?: string;
	description?: string;
	uspItems: USPItem[];
}

export interface ExploreMoreSection extends BaseSection {
	sectionTitle?: string;
	description?: string;
	previewCards: PreviewCard[];
}

export interface ExploreVariantsSection extends BaseSection {
	sectionTitle?: string;
	description?: string;
	variantCards: VariantCard[];
}

export interface ExploreOptionsSection extends BaseSection {
	sectionTitle?: string;
	description?: string;
	accordionItems: AccordionItem[];
	tableColumns?: TableColumn[];
}

export interface DefaultCardsSection extends BaseSection {
	sectionTitle?: string;
	description?: string;
	cards: Card[];
}

export interface DefaultContentSection extends BaseSection {
	title?: string;
	content?: string;
	image?: ImageAsset;
	images?: ImageAsset[];
	tables?: Table[];
	accordions?: {
		accordionItems: AccordionItem[];
	}[];
}

export interface PageHeaderSection extends BaseSection {
	title: string;
	subtitle?: string;
	content?: string;
}

export interface HistorySection extends BaseSection {
	sectionTitle?: string;
	description?: string;
	historyEntries: HistoryEntry[];
}

export interface CollectionTypeCardsSection extends BaseSection {
	collectionApiSlug?: string;
	type?: string;
}

export interface CollectionTypeTableSection extends BaseSection {
	collectionApiSlug?: string;
	type?: string;
}

export interface ContactFormSection extends BaseSection {
	title?: string;
	subtitle?: string;
	content?: string;
	employee?: Employee;
}

export interface UsedMachineDetailsSection extends BaseSection {
	// This will be populated with specific machine data
	[key: string]: any;
}

export interface SEOSection {
	pageTitle: string;
	pageDescription: string;
	keywords?: string;
}

// Union type of all section data types
export type SectionData =
	| HeroTextImageSection
	| HeroCarouselSection
	| HeroDualImageSection
	| HeroMediaSection
	| USPListSection
	| ExploreMoreSection
	| ExploreVariantsSection
	| ExploreOptionsSection
	| DefaultCardsSection
	| DefaultContentSection
	| PageHeaderSection
	| HistorySection
	| CollectionTypeCardsSection
	| CollectionTypeTableSection
	| ContactFormSection
	| UsedMachineDetailsSection
	| SEOSection;
// Section key to data type mapping
export interface SectionTypeMap {
	// Hero sections
	heroTextImage: HeroTextImageSection;
	heroTextImageOne: HeroTextImageSection;
	heroTextImageTwo: HeroTextImageSection;
	heroTextImageThree: HeroTextImageSection;
	heroTextImageFour: HeroTextImageSection;

	heroCarousel: HeroCarouselSection;
	heroCarouselOne: HeroCarouselSection;
	heroCarouselTwo: HeroCarouselSection;
	heroCarouselThree: HeroCarouselSection;

	heroDualImage: HeroDualImageSection;
	heroDualImageOne: HeroDualImageSection;
	heroDualImageThree: HeroDualImageSection;

	heroMedia: HeroMediaSection;
	heroMediaOne: HeroMediaSection;
	heroMediaTwo: HeroMediaSection;
	heroMediaThree: HeroMediaSection;

	// USP sections
	uspList: USPListSection;
	uspListOne: USPListSection;
	uspListTwo: USPListSection;
	uspListThree: USPListSection;
	uspListFour: USPListSection;
	uspListFive: USPListSection;

	// Explore sections
	exploreMore: ExploreMoreSection;
	exploreMoreOne: ExploreMoreSection;
	exploreMoreTwo: ExploreMoreSection;
	exploreMoreThree: ExploreMoreSection;
	exploreMoreFour: ExploreMoreSection;

	exploreVariants: ExploreVariantsSection;
	exploreVariantsOne: ExploreVariantsSection;
	exploreVariantsTwo: ExploreVariantsSection;

	optionBlocks: ExploreOptionsSection;
	optionBlocksOne: ExploreOptionsSection;
	optionBlocksTwo: ExploreOptionsSection;

	// Content sections
	defaultCards: DefaultCardsSection;
	defaultCardsOne: DefaultCardsSection;
	defaultCardsTwo: DefaultCardsSection;
	defaultCardsThree: DefaultCardsSection;

	defaultContent: DefaultContentSection;
	defaultContentOne: DefaultContentSection;
	defaultContentTwo: DefaultContentSection;
	defaultContentThree: DefaultContentSection;

	// Header sections
	pageHeader: PageHeaderSection;
	pageHeaderOne: PageHeaderSection;
	pageHeaderTwo: PageHeaderSection;
	pageHeaderThree: PageHeaderSection;
	pageHeaderFour: PageHeaderSection;

	// Other sections
	history: HistorySection;
	historyOne: HistorySection;
	historyTwo: HistorySection;

	collectionTypeCards: CollectionTypeCardsSection;
	collectionTypeCardsOne: CollectionTypeCardsSection;
	collectionTypeCardsTwo: CollectionTypeCardsSection;
	collectionTypeCardsThree: CollectionTypeCardsSection;

	collectionTypeTable: CollectionTypeTableSection;
	collectionTypeTableTwo: CollectionTypeTableSection;
	collectionTypeTableThree: CollectionTypeTableSection;

	contactForm: ContactFormSection;
	usedMachineDetails: UsedMachineDetailsSection;
	seo: SEOSection;
}

// Helper type to get section data type from section key
export type GetSectionData<K extends keyof SectionTypeMap> = SectionTypeMap[K];

// Section configuration with type safety
export interface TypedSectionConfig<K extends keyof SectionTypeMap = keyof SectionTypeMap> {
	sectionKey: K;
	props?: Partial<GetSectionData<K>>;
}

// Type-safe section array
export type TypedSections = Array<TypedSectionConfig>;
