import {
  GameSlidersWrapper,
  Title,
  SubTitle,
  Header,
  HeadlineWrapper,
  GameCardCarouselWrapper,
} from './style';
// import { Browse } from '../../style';
// import Link from 'next/link';
import { GameCardCarouselHomePage } from '@game-trade/ui/components/game/game-card-carousel-home-page';
import { GameCard } from '@game-trade/lib/codegen-types';

interface IProps {
  title?: string;
  browse?: string;
  subTitle?: string;
  slides: GameCard[];
}

export const GameSliders = ({ title, subTitle, slides }: IProps) => {
  // browse,
  return (
    <GameSlidersWrapper>
      <Header>
        <HeadlineWrapper>
          {title && <Title data-text={title}>{title}</Title>}
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </HeadlineWrapper>
        {/*{browse && (*/}
        {/*  <Browse>*/}
        {/*    <Link href={browse}>Browse more</Link>*/}
        {/*  </Browse>*/}
        {/*)}*/}
      </Header>
      <GameCardCarouselWrapper>
        <GameCardCarouselHomePage dataSlides={slides} />
      </GameCardCarouselWrapper>
    </GameSlidersWrapper>
  );
};
