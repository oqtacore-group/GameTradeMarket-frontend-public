import { Product, WithContext } from 'schema-dts';

export interface IMetaTags {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  title?: string;
  description?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterUrl?: string;

  host?: string;
}

export interface IPropsLayout {
  metaTags: IMetaTags;
  children: any;
  googleProductInformationJSONLD?: WithContext<Product>;
}
