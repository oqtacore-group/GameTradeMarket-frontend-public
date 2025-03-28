import { GameDetailCardContentWrapper, ContentWrapper } from './style';
import { MediaContent } from './item-content/media-content';
import { DescriptionContent } from './item-content/description-content';
import { AboutItem } from '@/containers/game-detail-card/item-about';
import { useMediaQuery } from 'react-responsive';
import { GameCard, MediaLink, SocialLink } from '@game-trade/lib/codegen-types';
import { GameDownloadsProvider } from '@game-trade/lib';
import { getPriceModel, modelPriceType } from '@/containers/game-detail-card/item-content/utils';
import { ModelPriceSpec } from '@/containers/game-detail-card/interfaces';
interface IProps {
  gameCard?: GameCard | null;
  gameCode?: string | null;
  game?: any;
}

export const GameDetailCardContent = (props: IProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { gameCard, gameCode } = props;

  const priceModel =
    gameCard &&
    Object.keys(gameCard).reduce((arr: ModelPriceSpec[], key) => {
      if (modelPriceType.find((type) => type === key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!gameCard[key]) return arr;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        arr.push(getPriceModel(key, gameCard[key]));
      }
      return arr;
    }, []);

  return (
    <GameDetailCardContentWrapper>
      <ContentWrapper>
        <MediaContent
          images={gameCard?.media_links as MediaLink[]}
          logo={
            gameCard?.logo
              ? (gameCard?.logo as string)
              : 'https://gametrade.market/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg_space.c6a799f2.webp&w=3840&q=75'
          }
          priceModel={priceModel}
        />
        {!isMobile && (
          <AboutItem
            gameCode={gameCode}
            descriptionDefault={gameCard?.description}
            social_links={gameCard?.social_links as SocialLink[]}
            external_url={gameCard?.external_url}
          />
        )}
      </ContentWrapper>

      <GameDownloadsProvider>
        <DescriptionContent gameCard={gameCard} game={props.game} />
      </GameDownloadsProvider>

      {isMobile && (
        <AboutItem
          gameCode={gameCode}
          descriptionDefault={gameCard?.description}
          social_links={gameCard?.social_links as SocialLink[]}
          external_url={gameCard?.external_url}
        />
      )}
    </GameDetailCardContentWrapper>
  );
};
