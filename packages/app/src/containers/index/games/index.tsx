import { GamesWrapper, GameSlidersWrapper } from './style';
import { GameSliders } from './game-sliders';
import { Menu } from './menu';
import {
  GameCard,
  useGetHighestRankedQuery,
  useGetTopFreeGamesQuery,
  useGetTrendingGamesQuery,
} from '@game-trade/lib/codegen-types';
import { useTranslation } from 'next-i18next';

export const Games = () => {
  const { t } = useTranslation('homePage', { keyPrefix: 'translation' });
  const { data: dataTrendingGames } = useGetTrendingGamesQuery({
    variables: {
      isTrending: true,
      first: 20,
    },
    fetchPolicy: 'no-cache',
  });
  const trendingGames = dataTrendingGames?.catalogLandingGames.edges.node;

  const { data: dataHighestRanked } = useGetHighestRankedQuery({
    variables: {
      topRank: true,
      first: 20,
    },
    fetchPolicy: 'no-cache',
  });

  const highestRanked = dataHighestRanked?.catalogLandingGames.edges.node;

  const { data: dataTopFreeGames } = useGetTopFreeGamesQuery({
    variables: {
      topFree: true,
      first: 20,
    },
    fetchPolicy: 'no-cache',
  });

  const topFreeGames = dataTopFreeGames?.catalogLandingGames.edges.node;

  if (!trendingGames || !highestRanked || !topFreeGames) return <></>;

  return (
    <GamesWrapper>
      <Menu />
      <GameSlidersWrapper>
        {!!trendingGames?.length && (
          <GameSliders
            title={t('trendingGames')}
            browse={'/games'}
            slides={trendingGames as GameCard[]}
          />
        )}
        {!!highestRanked?.length && (
          <GameSliders
            title={t('highestRanked')}
            browse={'/games'}
            slides={highestRanked as GameCard[]}
          />
        )}
        {!!topFreeGames?.length && (
          <GameSliders
            title={t('topFreeToPlay')}
            subTitle={t('noNFTrequired')}
            browse={'/games'}
            slides={topFreeGames as GameCard[]}
          />
        )}
      </GameSlidersWrapper>
    </GamesWrapper>
  );
};
