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
    subtitle: Schema.Attribute.String;
    thumbnail: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageComponentsExploreMore extends Struct.ComponentSchema {
  collectionName: 'components_page_components_explore_mores';
  info: {
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

export interface PageComponentsHeroCarousel extends Struct.ComponentSchema {
  collectionName: 'components_page_components_hero_carousel';
  info: {
    description: '';
    displayName: 'HeroCarousel';
    icon: 'picture';
  };
  attributes: {
    pictures: Schema.Attribute.Media<'images', true> &
      Schema.Attribute.Required;
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
    thumbnail: Schema.Attribute.Media<'images' | 'files'>;
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

export interface TestJzhvglkjh extends Struct.ComponentSchema {
  collectionName: 'components_test_jzhvglkjhs';
  info: {
    displayName: 'jzhvglkjh';
    icon: 'car';
  };
  attributes: {
    kjhk: Schema.Attribute.Date;
  };
}

export interface TestLjhKhj extends Struct.ComponentSchema {
  collectionName: 'components_test_ljh_khjs';
  info: {
    description: '';
    displayName: 'ljh khj';
    icon: 'bell';
  };
  attributes: {
    nested: Schema.Attribute.Component<'test.test-component', true>;
  };
}

export interface TestTest extends Struct.ComponentSchema {
  collectionName: 'components_test_tests';
  info: {
    displayName: 'test';
    icon: 'car';
  };
  attributes: {
    cnc_maschinen: Schema.Attribute.Relation<
      'oneToOne',
      'api::cnc-machine.cnc-machine'
    >;
  };
}

export interface TestTestComponent extends Struct.ComponentSchema {
  collectionName: 'components_test_test_components';
  info: {
    description: '';
    displayName: 'TestComponent';
    icon: 'arrowLeft';
  };
  attributes: {
    anothernest: Schema.Attribute.Component<'test.test', true>;
    test: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page-components.basic-text-image': PageComponentsBasicTextImage;
      'page-components.explore-more': PageComponentsExploreMore;
      'page-components.hero-carousel': PageComponentsHeroCarousel;
      'partial-components.preview-card': PartialComponentsPreviewCard;
      'partial-components.usp-list': PartialComponentsUspList;
      'test.jzhvglkjh': TestJzhvglkjh;
      'test.ljh-khj': TestLjhKhj;
      'test.test': TestTest;
      'test.test-component': TestTestComponent;
    }
  }
}
