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
		'defaultContent.images',
		'defaultContent.image'
	],
	pageHeader: ['pageHeader'],
	pageHeaderTwo: ['pageHeaderTwo'],
	pageHeaderThree: ['pageHeaderThree'],
	heroMedia: ['heroMedia.media', 'heroMedia.imageCards', 'heroMedia.imageCards.employee.picture'],
	history: ['history.historyEntries'],
	defaultCards: ['defaultCards.cards.thumbnail', 'defaultCards.cards.redirectButtons'],
	defaultCardsTwo: ['defaultCardsTwo.cards.thumbnail', 'defaultCardsTwo.cards.redirectButtons'],
	collectionTypeCards: ['collectionTypeCards'],
	collectionTypeCardsTwo: ['collectionTypeCardsTwo'],
	collectionTypeCardsThree: ['collectionTypeCardsThree'],
	contactForm: ['contactForm.employee.contactPicture'],
	seo: ['seo']
};

export function buildPopulateQuery(sectionKeys: string[]): string {
	const segments = new Set<string>();

	for (const key of sectionKeys) {
		populateBySection[key]?.forEach((path) => segments.add(`populate=${path}`));
	}

	return [...segments].join('&'); // e.g. "populate=a&populate=b"
}
