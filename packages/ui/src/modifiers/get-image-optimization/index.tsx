import ImageNext, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import IconEmptyItemImageSvg from '@game-trade/app/public/imgs/icon_empty_item_image.svg';
import { EmptyTokenImageWrapper, ImageWrapper, ImageShadow } from './style';
import { useMediaQuery } from 'react-responsive';
import { ImageProps } from 'next/dist/client/image';

type ImageType = {
  link?: string | null | StaticImageData;
  alt?: string | null;
  defaultAlt?: string;
  setImage?: (img: any) => void;
  LCP: boolean;
  styleWrapper?: any;
  width?: number;
  height?: number;
  layout?: any;
  objectFit?: any;
  staticImg?: boolean;
  shadow?: boolean;
};

type LoaderImage = {
  src: string;
  width?: number;
  quality?: number;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#150C19" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#150C19" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const ImageComponent = ({
  link,
  alt,
  defaultAlt,
  setImage,
  LCP,
  styleWrapper,
  layout,
  objectFit,
  width,
  height,
  staticImg = false,
  shadow = true,
}: ImageType) => {
  const [error, setError] = useState<boolean>(false);
  // const [onLoadImage, setOnLoadImage] = useState<boolean>(false);
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const quality = isMobile ? 30 : isTablet ? 50 : 70;
  const host = 'https://proxy-imgs.gametrade.market/?src=';

  const loader = ({ src, width }: LoaderImage) => {
    const encoded = encodeURIComponent(src);
    return host + encoded + '&w=' + width;
  };

  const loaderDefault = ({ src }: { src: string }) => {
    return src;
  };

  const props: ImageProps = {
    layout: layout ? layout : 'fill',
    objectFit: objectFit ? objectFit : 'cover',
    src: link || '',
    width: width,
    height: height,
    alt: alt || defaultAlt || 'GameTradeMarket image_' + Math.random(),
    placeholder: 'blur',
    priority: LCP,
    quality: quality,
    blurDataURL: `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`,
    sizes:
      '(max-width: 640) 100vw, (max-width: 750) 90vw, (max-width: 828) 80vw, (max-width: 1080) 70vw, (max-width: 1200px) 50vw, (max-width: 1400px) 40vw, 33vw',
  };

  return (
    <ImageWrapper styleWrapper={styleWrapper}>
      {shadow && props.src && <ImageShadow style={{ backgroundImage: `url(${props.src})` }} />}
      {link && !error && !staticImg ? (
        <ImageNext
          loader={loader}
          unoptimized={false}
          {...props}
          // onLoad={(data) => {
          //   console.log('data', data, data.timeStamp > 400000)
          //   setOnLoadImage(data.timeStamp > 400000);
          // }}
          onError={(e) => {
            setError(!!e);
          }}
        />
      ) : link && error && !staticImg ? (
        <ImageNext
          loader={loaderDefault}
          unoptimized={true}
          {...props}
          // onLoad={(data) => {
          //   console.log('data', data, data.timeStamp > 400000)
          //   setOnLoadImage(data.timeStamp > 400000);
          // }}
          onError={(e) => {
            return setImage ? () => setImage(null) : console.log(e);
          }}
        />
      ) : staticImg ? (
        <ImageNext
          unoptimized={false}
          {...props}
          onError={(e) => {
            setError(!!e);
          }}
        />
      ) : (
        <EmptyTokenImageWrapper>
          <IconEmptyItemImageSvg />
        </EmptyTokenImageWrapper>
      )}
    </ImageWrapper>
  );
};
