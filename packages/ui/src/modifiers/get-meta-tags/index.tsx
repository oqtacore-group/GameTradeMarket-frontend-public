import { IMetaTags } from '@game-trade/app/src/core-layout/interfaces';

interface IProps {
  title: string;
  ogTitle: string;
  ogDescription: string;
  description: string;
  host: string;
  ogImage?: string;
  ogUrl?: string;
}

export const getMetaTags = (props: IProps): IMetaTags => {
  const {
    title,
    ogTitle,
    ogDescription,
    description,
    host,
    ogImage = 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
    ogUrl = `https://${
      process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
    }gametrade.market`,
  } = props;

  return {
    title,
    ogTitle,
    ogDescription,
    description,
    ogImage,
    ogUrl,
    host,
  };
};
