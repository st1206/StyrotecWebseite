import type { Schema, Struct } from '@strapi/strapi';

export interface PageComponentsBasicTextImage extends Struct.ComponentSchema {
  collectionName: 'components_page_components_basic_text_images';
  info: {
    description: '';
    displayName: 'heroTextImage';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyOTc1OTksImp0aSI6ImMyMTI4NzEyLTI0NGEtNDg2My1iMDMyLTBhMDg4M2ViYjFjNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDBiMzRjNTkifQ.NEHvT9L5g2Udrb7VzeOMjkb1fWToQYc4UPOtgo1r1rRZ3qtR3A7Zbbdxy4CuL0sTdXIZatiLy0o7Jcqqs2bpkw';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    image: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    keyphrase: Schema.Attribute.String & Schema.Attribute.Required;
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
    subKeyword: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsIndustryCard extends Struct.ComponentSchema {
  collectionName: 'components_page_components_industry_cards';
  info: {
    description: '';
    displayName: 'defaultCard';
  };
  attributes: {
    anchor: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyOTc1OTksImp0aSI6ImMyMTI4NzEyLTI0NGEtNDg2My1iMDMyLTBhMDg4M2ViYjFjNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDBiMzRjNTkifQ.NEHvT9L5g2Udrb7VzeOMjkb1fWToQYc4UPOtgo1r1rRZ3qtR3A7Zbbdxy4CuL0sTdXIZatiLy0o7Jcqqs2bpkw';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    redirectButtons: Schema.Attribute.Component<
      'partial-components.redirect-button',
      true
    >;
    thumbnail: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface PageComponentsPageHeader extends Struct.ComponentSchema {
  collectionName: 'components_page_components_page_headers';
  info: {
    displayName: 'pageHeader';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
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
      'partial-components.option-accordion-item',
      true
    >;
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
    darkMode: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyOTc1OTksImp0aSI6ImMyMTI4NzEyLTI0NGEtNDg2My1iMDMyLTBhMDg4M2ViYjFjNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDBiMzRjNTkifQ.NEHvT9L5g2Udrb7VzeOMjkb1fWToQYc4UPOtgo1r1rRZ3qtR3A7Zbbdxy4CuL0sTdXIZatiLy0o7Jcqqs2bpkw';
          output: 'HTML';
          preset: 'rich';
        }
      >;
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
    tables: Schema.Attribute.Component<'partial-components.option-table', true>;
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
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyOTc1OTksImp0aSI6ImMyMTI4NzEyLTI0NGEtNDg2My1iMDMyLTBhMDg4M2ViYjFjNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDBiMzRjNTkifQ.NEHvT9L5g2Udrb7VzeOMjkb1fWToQYc4UPOtgo1r1rRZ3qtR3A7Zbbdxy4CuL0sTdXIZatiLy0o7Jcqqs2bpkw';
          output: 'HTML';
          preset: 'rich';
        }
      >;
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

export interface PartialComponentsOptionAccordionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_accordion_items';
  info: {
    description: '';
    displayName: 'accordion';
    icon: 'filter';
  };
  attributes: {
    accordionItems: Schema.Attribute.Component<
      'partial-components.option-item',
      true
    > &
      Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsOptionItem extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_items';
  info: {
    description: '';
    displayName: 'accordionItem';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyOTc1OTksImp0aSI6ImMyMTI4NzEyLTI0NGEtNDg2My1iMDMyLTBhMDg4M2ViYjFjNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDBiMzRjNTkifQ.NEHvT9L5g2Udrb7VzeOMjkb1fWToQYc4UPOtgo1r1rRZ3qtR3A7Zbbdxy4CuL0sTdXIZatiLy0o7Jcqqs2bpkw';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    sortOrder: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsOptionTable extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_tables';
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

export interface PartialComponentsOptionTextImage
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_text_images';
  info: {
    description: '';
    displayName: 'optionTextImage';
  };
  attributes: {
    accordion: Schema.Attribute.Component<
      'partial-components.option-accordion-item',
      true
    > &
      Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.Required;
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
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYyOTc1OTksImp0aSI6ImMyMTI4NzEyLTI0NGEtNDg2My1iMDMyLTBhMDg4M2ViYjFjNyIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDBiMzRjNTkifQ.NEHvT9L5g2Udrb7VzeOMjkb1fWToQYc4UPOtgo1r1rRZ3qtR3A7Zbbdxy4CuL0sTdXIZatiLy0o7Jcqqs2bpkw';
          output: 'HTML';
          preset: 'rich';
        }
      >;
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

export interface PartialComponentsRedirectButton
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_redirect_buttons';
  info: {
    description: '';
    displayName: 'redirectButton';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
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
    displayName: 'variantAccordionItemLine';
    icon: 'puzzle';
  };
  attributes: {
    key: Schema.Attribute.String & Schema.Attribute.Required;
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
      'page-components.explore-more': PageComponentsExploreMore;
      'page-components.explore-variants': PageComponentsExploreVariants;
      'page-components.hero-carousel': PageComponentsHeroCarousel;
      'page-components.hero-dual-image': PageComponentsHeroDualImage;
      'page-components.industry-card': PageComponentsIndustryCard;
      'page-components.page-header': PageComponentsPageHeader;
      'partial-components.content-accordion': PartialComponentsContentAccordion;
      'partial-components.content-header': PartialComponentsContentHeader;
      'partial-components.content-images': PartialComponentsContentImages;
      'partial-components.content-table': PartialComponentsContentTable;
      'partial-components.content-text-image': PartialComponentsContentTextImage;
      'partial-components.option-accordion-item': PartialComponentsOptionAccordionItem;
      'partial-components.option-item': PartialComponentsOptionItem;
      'partial-components.option-table': PartialComponentsOptionTable;
      'partial-components.option-text-image': PartialComponentsOptionTextImage;
      'partial-components.preview-card': PartialComponentsPreviewCard;
      'partial-components.redirect-button': PartialComponentsRedirectButton;
      'partial-components.table-column': PartialComponentsTableColumn;
      'partial-components.table-row': PartialComponentsTableRow;
      'partial-components.usp-list': PartialComponentsUspList;
      'partial-components.variant-accordion-item': PartialComponentsVariantAccordionItem;
      'partial-components.variant-accordion-item-line': PartialComponentsVariantAccordionItemLine;
      'partial-components.variant-card': PartialComponentsVariantCard;
    }
  }
}
