import type { Schema, Struct } from '@strapi/strapi';

export interface PageComponentsBasicTextImage extends Struct.ComponentSchema {
  collectionName: 'components_page_components_basic_text_images';
  info: {
    description: '';
    displayName: 'heroTextImage';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'files' | 'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsCollectionTypeCards
  extends Struct.ComponentSchema {
  collectionName: 'components_page_components_collection_type_cards';
  info: {
    description: '';
    displayName: 'collectionTypeCards';
  };
  attributes: {
    collectionApiSlug: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['defaultCards', 'brochures', 'fairs', 'testimonials']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'defaultCards'>;
  };
}

export interface PageComponentsContactForm extends Struct.ComponentSchema {
  collectionName: 'components_page_components_contact_forms';
  info: {
    description: '';
    displayName: 'contactForm';
  };
  attributes: {
    employee: Schema.Attribute.Relation<'oneToOne', 'api::employee.employee'>;
  };
}

export interface PageComponentsDefaultCards extends Struct.ComponentSchema {
  collectionName: 'components_page_components_default_cards';
  info: {
    description: '';
    displayName: 'defaultCards';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'partial-components.default-card', true> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    isDarkMode: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface PageComponentsExploreMore extends Struct.ComponentSchema {
  collectionName: 'components_page_components_explore_mores';
  info: {
    description: '';
    displayName: 'exploreMore';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    previewCards: Schema.Attribute.Component<
      'partial-components.preview-card',
      true
    > &
      Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsExploreVariants extends Struct.ComponentSchema {
  collectionName: 'components_page_components_explore_variants';
  info: {
    description: '';
    displayName: 'exploreVariants';
    icon: 'oneToMany';
  };
  attributes: {
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    variantCards: Schema.Attribute.Component<
      'partial-components.variant-card',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface PageComponentsHeroCarousel extends Struct.ComponentSchema {
  collectionName: 'components_page_components_hero_carousel';
  info: {
    description: '';
    displayName: 'HeroCarousel';
    icon: 'picture';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    keyphrase: Schema.Attribute.String;
  };
}

export interface PageComponentsHeroDualImage extends Struct.ComponentSchema {
  collectionName: 'components_page_components_hero_dual_images';
  info: {
    description: '';
    displayName: 'heroDualImage';
    icon: 'picture';
  };
  attributes: {
    heroTextImage: Schema.Attribute.Component<
      'page-components.basic-text-image',
      false
    > &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    keyword: Schema.Attribute.String & Schema.Attribute.Required;
    subKeyword: Schema.Attribute.String;
  };
}

export interface PageComponentsHeroMedia extends Struct.ComponentSchema {
  collectionName: 'components_page_components_hero_medias';
  info: {
    description: '';
    displayName: 'heroMedia';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    imageCards: Schema.Attribute.Component<
      'partial-components.image-card',
      true
    >;
    media: Schema.Attribute.Media<'files' | 'videos' | 'images'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsHistory extends Struct.ComponentSchema {
  collectionName: 'components_page_components_histories';
  info: {
    description: '';
    displayName: 'history';
  };
  attributes: {
    historyEntries: Schema.Attribute.Component<
      'partial-components.history-entry',
      true
    > &
      Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface PageComponentsPageHeader extends Struct.ComponentSchema {
  collectionName: 'components_page_components_page_headers';
  info: {
    description: '';
    displayName: 'pageHeader';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsSeo extends Struct.ComponentSchema {
  collectionName: 'components_page_components_seos';
  info: {
    description: '';
    displayName: 'seo';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    pageDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsUspList extends Struct.ComponentSchema {
  collectionName: 'components_page_components_usp_lists';
  info: {
    description: '';
    displayName: 'uspList';
  };
  attributes: {
    uspItems: Schema.Attribute.Component<'partial-components.usp-list', true> &
      Schema.Attribute.Required;
  };
}

export interface PartialComponentsAccordion extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_accordions';
  info: {
    description: '';
    displayName: 'accordion';
    icon: 'filter';
  };
  attributes: {
    accordionItems: Schema.Attribute.Component<
      'partial-components.accordion-item',
      true
    > &
      Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_accordion_items';
  info: {
    description: '';
    displayName: 'accordionItem';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'>;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsContentAccordion
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_content_accordions';
  info: {
    description: '';
    displayName: 'contentAccordion';
  };
  attributes: {
    accordions: Schema.Attribute.Component<
      'partial-components.accordion',
      true
    > &
      Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String;
  };
}

export interface PartialComponentsContentHeader extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_content_headers';
  info: {
    description: '';
    displayName: 'contentHeader';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    isDarkMode: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsContentImages extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_content_images';
  info: {
    description: '';
    displayName: 'contentImages';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String;
  };
}

export interface PartialComponentsContentTable extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_content_tables';
  info: {
    description: '';
    displayName: 'contentTable';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    tables: Schema.Attribute.Component<'partial-components.table', true>;
    title: Schema.Attribute.String;
  };
}

export interface PartialComponentsContentTextImage
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_content_text_images';
  info: {
    description: '';
    displayName: 'contentTextImage';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files'>;
    imagePosition: Schema.Attribute.Enumeration<
      ['top', 'bottom', 'left', 'right']
    > &
      Schema.Attribute.DefaultTo<'right'>;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String;
  };
}

export interface PartialComponentsDefaultCard extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_default_cards';
  info: {
    description: '';
    displayName: 'defaultCard';
  };
  attributes: {
    anchor: Schema.Attribute.String;
    content: Schema.Attribute.Text;
    redirectButtons: Schema.Attribute.Component<
      'partial-components.redirect-button',
      true
    >;
    thumbnail: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsHistoryEntry extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_history_entries';
  info: {
    description: '';
    displayName: 'historyEntry';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

export interface PartialComponentsImageCard extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_image_cards';
  info: {
    description: '';
    displayName: 'imageCard';
  };
  attributes: {
    employee: Schema.Attribute.Relation<'oneToOne', 'api::employee.employee'>;
    image: Schema.Attribute.Media<'images' | 'files'>;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface PartialComponentsPreviewCard extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_preview_cards';
  info: {
    description: '';
    displayName: 'previewCard';
    icon: 'cursor';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    isImageTransparent: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    redirectSlug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    subtitle: Schema.Attribute.String;
    thumbnail: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsProductDataSheet
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_machine_data_sheets';
  info: {
    description: '';
    displayName: 'productDataSheet';
  };
  attributes: {
    condition: Schema.Attribute.Enumeration<
      [
        'gebraucht',
        'gebraucht, gut',
        'gebraucht, sehr gut',
        '\u00FCberholt',
        'voll funktionsf\u00E4hig',
        'neu',
      ]
    >;
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    dimensions: Schema.Attribute.String & Schema.Attribute.Required;
    internalId: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    manufacturer: Schema.Attribute.String & Schema.Attribute.Required;
    modelType: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    weight: Schema.Attribute.String & Schema.Attribute.Required;
    yearOfManufacture: Schema.Attribute.BigInteger & Schema.Attribute.Required;
  };
}

export interface PartialComponentsRedirectButton
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_redirect_buttons';
  info: {
    description: '';
    displayName: 'redirectButton';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    redirectSlug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsTable extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_tables';
  info: {
    description: '';
    displayName: 'table';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    tableColumns: Schema.Attribute.Component<
      'partial-components.table-column',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsTableColumn extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_table_columns';
  info: {
    description: '';
    displayName: 'tableColumn';
  };
  attributes: {
    columnLabel: Schema.Attribute.String & Schema.Attribute.Required;
    tableRows: Schema.Attribute.Component<
      'partial-components.table-row',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface PartialComponentsTableRow extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_table_rows';
  info: {
    description: '';
    displayName: 'tableRow';
  };
  attributes: {
    rowLabel: Schema.Attribute.String & Schema.Attribute.Required;
    rowValue: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsTextImage extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_text_images';
  info: {
    description: '';
    displayName: 'optionTextImage';
  };
  attributes: {
    accordions: Schema.Attribute.Component<
      'partial-components.accordion-item',
      true
    > &
      Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface PartialComponentsUspList extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_usp_lists';
  info: {
    description: '';
    displayName: 'uspItem';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsVariantAccordionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_variant_accordion_items';
  info: {
    description: '';
    displayName: 'variantAccordionItem';
    icon: 'bulletList';
  };
  attributes: {
    accordionItemLines: Schema.Attribute.Component<
      'partial-components.variant-accordion-item-line',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsVariantAccordionItemLine
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_variant_accordion_item_lines';
  info: {
    description: '';
    displayName: 'variantAccordionItemLine';
    icon: 'puzzle';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface PartialComponentsVariantCard extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_variant_cards';
  info: {
    description: '';
    displayName: 'variantCard';
    icon: 'priceTag';
  };
  attributes: {
    accordionItems: Schema.Attribute.Component<
      'partial-components.variant-accordion-item',
      true
    > &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page-components.basic-text-image': PageComponentsBasicTextImage;
      'page-components.collection-type-cards': PageComponentsCollectionTypeCards;
      'page-components.contact-form': PageComponentsContactForm;
      'page-components.default-cards': PageComponentsDefaultCards;
      'page-components.explore-more': PageComponentsExploreMore;
      'page-components.explore-variants': PageComponentsExploreVariants;
      'page-components.hero-carousel': PageComponentsHeroCarousel;
      'page-components.hero-dual-image': PageComponentsHeroDualImage;
      'page-components.hero-media': PageComponentsHeroMedia;
      'page-components.history': PageComponentsHistory;
      'page-components.page-header': PageComponentsPageHeader;
      'page-components.seo': PageComponentsSeo;
      'page-components.usp-list': PageComponentsUspList;
      'partial-components.accordion': PartialComponentsAccordion;
      'partial-components.accordion-item': PartialComponentsAccordionItem;
      'partial-components.content-accordion': PartialComponentsContentAccordion;
      'partial-components.content-header': PartialComponentsContentHeader;
      'partial-components.content-images': PartialComponentsContentImages;
      'partial-components.content-table': PartialComponentsContentTable;
      'partial-components.content-text-image': PartialComponentsContentTextImage;
      'partial-components.default-card': PartialComponentsDefaultCard;
      'partial-components.history-entry': PartialComponentsHistoryEntry;
      'partial-components.image-card': PartialComponentsImageCard;
      'partial-components.preview-card': PartialComponentsPreviewCard;
      'partial-components.product-data-sheet': PartialComponentsProductDataSheet;
      'partial-components.redirect-button': PartialComponentsRedirectButton;
      'partial-components.table': PartialComponentsTable;
      'partial-components.table-column': PartialComponentsTableColumn;
      'partial-components.table-row': PartialComponentsTableRow;
      'partial-components.text-image': PartialComponentsTextImage;
      'partial-components.usp-list': PartialComponentsUspList;
      'partial-components.variant-accordion-item': PartialComponentsVariantAccordionItem;
      'partial-components.variant-accordion-item-line': PartialComponentsVariantAccordionItemLine;
      'partial-components.variant-card': PartialComponentsVariantCard;
    }
  }
}
