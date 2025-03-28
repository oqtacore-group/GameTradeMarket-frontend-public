import React, { useEffect, useState } from 'react';
import {
  ImagesWrapper,
  MainImage,
  VideoClasses,
  WrapperPills,
  RowBlue,
  RowPink,
  RowWhite,
  Pill,
} from './style';
import { useMediaQuery } from 'react-responsive';
import { CarouselGamesThumbnails } from '@game-trade/ui/components/carousel/games-thumbnails';
import { MediaLink } from '@game-trade/lib/codegen-types';
import VideoPlayer from '@game-trade/ui/modifiers/get-video-player';
import { ModelPriceSpec, Color } from '../../interfaces';
import { ImageComponent } from '@game-trade/ui/modifiers/get-image-optimization';

interface IProps {
  images: MediaLink[];
  logo: string;
  priceModel?: ModelPriceSpec[] | null;
}

export interface IPicture extends MediaLink {
  selected?: boolean;
}

export const MediaContent = (props: IProps) => {
  const { images, logo, priceModel } = props;
  const isTablet = useMediaQuery({ query: '(max-width: 1200px)' });
  const [picture, setPicture] = useState<MediaLink | null>();
  const [carouselPictures, setCarouselPictures] = useState<IPicture[]>();
  const bluePills = priceModel?.filter((item) => item.color === Color.Blue);
  const whitePills = priceModel?.filter((item) => item.color === Color.White);
  const pinkPills = priceModel?.filter((item) => item.color === Color.Pink);

  useEffect(() => {
    if (images && images.length) {
      const _images = images.map((item) => {
        const img: IPicture = { ...item, selected: false };
        if (item.link === picture?.link && item.type === picture.type) {
          img.selected = true;
        }
        return img;
      });
      setCarouselPictures(_images);
    }
  }, [picture]);

  useEffect(() => {
    if (images && images.length) setPicture(images[0]);
  }, [images]);

  return (
    <ImagesWrapper>
      <MainImage isVideo={picture?.type === 'video'}>
        {picture && (
          <>
            {picture.type === 'image' ? (
              <ImageComponent
                link={picture.link}
                alt={picture.type}
                LCP={true}
                setImage={setPicture}
                styleWrapper={{ position: 'initial' }}
                objectFit={isTablet ? 'contain' : 'cover'}
              />
            ) : (
              <VideoPlayer className={'videoWrapper'} src={picture.link} poster={logo} />
            )}
          </>
        )}
        <WrapperPills>
          {whitePills && whitePills?.length > 0 && (
            <RowWhite>
              {whitePills.map((item) => {
                return <Pill key={item.value}>{item.value}</Pill>;
              })}
            </RowWhite>
          )}
          {bluePills && bluePills?.length > 0 && (
            <RowBlue>
              {bluePills.map((item) => {
                return <Pill key={item.value}>{item.value}</Pill>;
              })}
            </RowBlue>
          )}
          {pinkPills && pinkPills?.length > 0 && (
            <RowPink>
              {pinkPills.map((item) => {
                return <Pill key={item.value}>{item.value}</Pill>;
              })}
            </RowPink>
          )}
        </WrapperPills>
      </MainImage>
      {images && images.length > 1 && (
        <CarouselGamesThumbnails setPicture={setPicture} data={carouselPictures} logo={logo} />
      )}
      <VideoClasses />
    </ImagesWrapper>
  );
};
