import type { Schema, Struct } from '@strapi/strapi';

export interface AAchseExtraAchsen extends Struct.ComponentSchema {
  collectionName: 'components_a_achse_extra_achsens';
  info: {
    displayName: 'extraAchsen';
    icon: 'apps';
  };
  attributes: {};
}

export interface ExtraAchsenExtraAchsen extends Struct.ComponentSchema {
  collectionName: 'components_extra_achsen_extra_achsens';
  info: {
    displayName: 'extraAchsen';
  };
  attributes: {
    aAchse: Schema.Attribute.String & Schema.Attribute.Required;
    cAchse: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'a-achse.extra-achsen': AAchseExtraAchsen;
      'extra-achsen.extra-achsen': ExtraAchsenExtraAchsen;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
    }
  }
}
