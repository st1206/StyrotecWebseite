type PopulateRule = string[];

const populateBySection: Record<string, PopulateRule> = {
	heroCarousel: ['heroCarousel.images'],
	heroTextImage: ['heroTextImage.image'],
	uspList: ['uspList'],
	exploreMore: ['exploreMore.previewCards.thumbnail'],
	heroDualImage: ['heroDualImage.image', 'heroDualImage.heroTextImage.image'],
	exploreVariants: [
		'exploreVariants.variantCards.image',
		'exploreVariants.variantCards.accordionItems.accordionItemLines'
	],
	optionBlocks: [
		'optionBlocks.accordions.accordionItems.image',
		'optionBlocks.tableColumns.tableRows'
	],
	defaultContent: [
		'defaultContent.tables.tableColumns.tableRows',
		'defaultContent.accordions.accordionItems.image',
		'defaultContent.images',
		'defaultContent.image'
	]
};

export function buildPopulateQuery(sectionKeys: string[]): string {
	const segments = new Set<string>();

	for (const key of sectionKeys) {
		populateBySection[key]?.forEach((path) => segments.add(`populate=${path}`));
	}

	return [...segments].join('&'); // e.g. "populate=a&populate=b"
}
