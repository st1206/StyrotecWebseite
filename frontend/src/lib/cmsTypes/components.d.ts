import type { Schema, Struct } from '@strapi/strapi';

export interface PageComponentsBasicTextImage extends Struct.ComponentSchema {
  collectionName: 'components_page_components_basic_text_images';
  info: {
    description: '';
    displayName: 'basicTextImage';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDU5NzExOTksImp0aSI6ImQyOGE2YzI1LWM0MWYtNDkzZC05YzA4LTUxMjcwNzQ5ZDkxNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImZiNTMwYzIyIn0.Q3GyCISvyZOUR0DhrPkNdm-S13YsHndUpvOjacfv6e3UIPniOlO7xmNT-PCo0HZF0ljrGLQZYICR7G7r0u4C4A';
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

export interface PageComponentsExploreOptions extends Struct.ComponentSchema {
  collectionName: 'components_page_components_explore_options';
  info: {
    description: '';
    displayName: 'exploreOptions';
    icon: 'layer';
  };
  attributes: {
    options: Schema.Attribute.Component<
      'partial-components.option-accordion-item',
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
    basicTextImage: Schema.Attribute.Component<
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

export interface PartialComponentsOptionAccordionItem
  extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_accordion_items';
  info: {
    description: '';
    displayName: 'optionAccordionItem';
    icon: 'filter';
  };
  attributes: {
    optionItems: Schema.Attribute.Component<
      'partial-components.option-item',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartialComponentsOptionItem extends Struct.ComponentSchema {
  collectionName: 'components_partial_components_option_items';
  info: {
    description: '';
    displayName: 'optionItem';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDU5NzExOTksImp0aSI6ImQyOGE2YzI1LWM0MWYtNDkzZC05YzA4LTUxMjcwNzQ5ZDkxNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImZiNTMwYzIyIn0.Q3GyCISvyZOUR0DhrPkNdm-S13YsHndUpvOjacfv6e3UIPniOlO7xmNT-PCo0HZF0ljrGLQZYICR7G7r0u4C4A';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDU5NzExOTksImp0aSI6ImQyOGE2YzI1LWM0MWYtNDkzZC05YzA4LTUxMjcwNzQ5ZDkxNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImZiNTMwYzIyIn0.Q3GyCISvyZOUR0DhrPkNdm-S13YsHndUpvOjacfv6e3UIPniOlO7xmNT-PCo0HZF0ljrGLQZYICR7G7r0u4C4A';
          output: 'HTML';
          preset: 'rich';
        }
      >;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    redirectSlug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    subtitle: Schema.Attribute.String;
    thumbnail: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'page-components.explore-options': PageComponentsExploreOptions;
      'page-components.explore-variants': PageComponentsExploreVariants;
      'page-components.hero-carousel': PageComponentsHeroCarousel;
      'page-components.hero-dual-image': PageComponentsHeroDualImage;
      'partial-components.option-accordion-item': PartialComponentsOptionAccordionItem;
      'partial-components.option-item': PartialComponentsOptionItem;
      'partial-components.preview-card': PartialComponentsPreviewCard;
      'partial-components.usp-list': PartialComponentsUspList;
      'partial-components.variant-accordion-item': PartialComponentsVariantAccordionItem;
      'partial-components.variant-accordion-item-line': PartialComponentsVariantAccordionItemLine;
      'partial-components.variant-card': PartialComponentsVariantCard;
    }
  }
}
