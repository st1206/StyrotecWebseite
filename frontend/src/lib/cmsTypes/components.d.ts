import type { Schema, Struct } from '@strapi/strapi';

export interface PageComponentsHeroCarousel extends Struct.ComponentSchema {
  collectionName: 'components_page_components_hero_carousel';
  info: {
    description: '';
    displayName: 'HeroCarousel';
    icon: 'picture';
  };
  attributes: {
    Bilder: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
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
      'page-components.hero-carousel': PageComponentsHeroCarousel;
      'test.jzhvglkjh': TestJzhvglkjh;
      'test.ljh-khj': TestLjhKhj;
      'test.test': TestTest;
      'test.test-component': TestTestComponent;
    }
  }
}
