import type { Schema, Struct } from '@strapi/strapi';

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

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTabelle extends Struct.ComponentSchema {
  collectionName: 'components_shared_tabelles';
  info: {
    displayName: 'Tabelle';
  };
  attributes: {
    xy: Schema.Attribute.String;
    xyachse: Schema.Attribute.String;
  };
}

export interface TabelleFuenfAchsDaten extends Struct.ComponentSchema {
  collectionName: 'components_tabelle_fuenf_achs_datens';
  info: {
    displayName: 'f\u00FCnfAchsDaten';
  };
  attributes: {
    aAchse: Schema.Attribute.String;
    cAchse: Schema.Attribute.String;
  };
}

export interface TabelleTechnischeDaten extends Struct.ComponentSchema {
  collectionName: 'components_tabelle_technische_datens';
  info: {
    description: '';
    displayName: 'Technische Daten';
    icon: 'apps';
  };
  attributes: {
    AchsbeschleunigungXYZ: Schema.Attribute.String;
    Anschlussleistung: Schema.Attribute.String;
    Aufspannflaeche: Schema.Attribute.String;
    Blasluft: Schema.Attribute.String;
    Drehmoment: Schema.Attribute.String;
    Gewicht: Schema.Attribute.String;
    Kuehlmittelzufuhr: Schema.Attribute.String;
    Optionen: Schema.Attribute.String;
    Platzbedarf: Schema.Attribute.String;
    Spindeldrehzahl: Schema.Attribute.String;
    Spindelleistung: Schema.Attribute.String;
    Steuerung: Schema.Attribute.String;
    VorschubgeschwindigkeitX: Schema.Attribute.String;
    VorschubgeschwindigkeitZ: Schema.Attribute.String;
    Vorsicherung: Schema.Attribute.String;
    Werkzeugabspannung: Schema.Attribute.String;
    Werkzeugaufnahme: Schema.Attribute.String;
    xAchse: Schema.Attribute.String;
    yAchse: Schema.Attribute.String;
    zAchse: Schema.Attribute.String;
    Zusatzausstattung: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.tabelle': SharedTabelle;
      'tabelle.fuenf-achs-daten': TabelleFuenfAchsDaten;
      'tabelle.technische-daten': TabelleTechnischeDaten;
    }
  }
}
