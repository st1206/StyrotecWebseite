type PopulateRule = string[];

const populateBySection: Record<string, PopulateRule> = {
	heroCarousel: ['heroCarousel.images'],
	heroTextImage: ['heroTextImage.image'],
	uspList: ['uspList.uspItems'],
	uspListOne: ['uspListOne.uspItems'],
	exploreMore: ['exploreMore.previewCards.thumbnail'],
	heroDualImage: ['heroDualImage.image', 'heroDualImage.heroTextImage.image'],
	exploreVariants: [
		'exploreVariants.variantCards.image',
		'exploreVariants.variantCards.accordionItems.accordionItemLines'
	],
	optionBlocks: ['optionBlocks.accordionItems.image', 'optionBlocks.tableColumns.tableRows'],
	defaultContent: [
		'defaultContent.tables.tableColumns.tableRows',
		'defaultContent.accordions.accordionItems.image',
		'defaultContent.imageCards.image',
		'defaultContent.image',
		'defaultContent.spacer'
	],
	defaultContentOne: [
		'defaultContentOne.tables.tableColumns.tableRows',
		'defaultContentOne.accordions.accordionItems.image',
		'defaultContentOne.imageCards.image',
		'defaultContentOne.image',
		'defaultContent.spacer'
	],
	defaultContentTwo: [
		'defaultContentTwo.tables.tableColumns.tableRows',
		'defaultContentTwo.accordions.accordionItems.image',
		'defaultContentTwo.imageCards.image',
		'defaultContentTwo.image',
		'defaultContent.spacer'
	],
	defaultContentThree: [
		'defaultContentThree.tables.tableColumns.tableRows',
		'defaultContentThree.accordions.accordionItems.image',
		'defaultContentThree.imageCards.image',
		'defaultContentThree.image',
		'defaultContent.spacer'
	],
	pageHeader: ['pageHeader'],
	pageHeaderTwo: ['pageHeaderTwo'],
	pageHeaderThree: ['pageHeaderThree'],
	pageHeaderFour: ['pageHeaderFour'],
	heroMedia: ['heroMedia.media', 'heroMedia.imageCards', 'heroMedia.imageCards.employee.picture'],
	history: ['history.historyEntries'],
	defaultCards: ['defaultCards.cards.thumbnail', 'defaultCards.cards.redirectButtons'],
	defaultCardsTwo: ['defaultCardsTwo.cards.thumbnail', 'defaultCardsTwo.cards.redirectButtons'],
	collectionTypeComponents: ['collectionTypeComponents'],
	collectionTypeComponentsOne: ['collectionTypeComponentsOne'],
	collectionTypeComponentsTwo: ['collectionTypeComponentsTwo'],
	collectionTypeComponentsThree: ['collectionTypeComponentsThree'],
	contactForm: ['contactForm.employee.contactPicture'],
	seo: ['seo'],
	spacer: ['spacer'],
	spacerOne: ['spacer'],
	spacerTwo: ['spacer'],
	spacerThree: ['spacer'],
	spacerFour: ['spacer']
};

export function buildPopulateQuery(sectionKeys: string[]): string {
	const segments = new Set<string>();

	for (const key of sectionKeys) {
		populateBySection[key]?.forEach((path) => segments.add(`populate=${path}`));
	}

	return [...segments].join('&'); // e.g. "populate=a&populate=b"
}
