// import { CarouselPromo } from './carousel-promo';
import { HowToSell } from './how-to-sell';
import { Games } from './games';
// CarouselPromoWrapper,
import { CarouselPromoWrapper, Home, HomeWrapper } from './style';
// import { EventsOpenseaComponent } from '../../core-layout/events-opensea';
import { OurBlog } from './our-blog';
import { GetHomeSlidesQuery } from '@game-trade/lib/codegen-types';
import { PromoHeadline } from './promo-headline';
import React from 'react';
import { CarouselLaunchpad } from './carousel-launchpad';

export interface IServerSideProps {
  homeSlides?: any | GetHomeSlidesQuery;
  trendingGames?: any;
  highestRanked?: any;
  topFreeGames?: any;
  blogPosts?: any;
}

// { serverSideData }: { serverSideData?: IServerSideProps }
export const HomePage = () => {
  // const { data: dataHomeSlides } = useGetHomeSlidesQuery({
  //   fetchPolicy: 'no-cache',
  // });

  // const homeSlides = dataHomeSlides?.homeSlides;

  return (
    <Home>
      <HomeWrapper>
        <PromoHeadline />
        <CarouselPromoWrapper>
          <CarouselLaunchpad />
        </CarouselPromoWrapper>
        {/*{!!homeSlides?.length && (*/}
        {/*  <CarouselPromoWrapper>*/}
        {/*    <CarouselPromo slides={homeSlides as SlideEntity[]} />*/}
        {/*  </CarouselPromoWrapper>*/}
        {/*)}*/}
        <Games />
        <HowToSell />
        <OurBlog />
      </HomeWrapper>
    </Home>
  );
};
