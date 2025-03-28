import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { InputText } from '../input-text';
import { SvgExclamationPoint, SvgMagnifier } from '@game-trade/icons';
import {
  SearchWrapper,
  Game,
  GamesNotFound,
  NotFound,
  WrapperGame,
  WrapperGames,
  WrapperImage,
} from './style';
import { routes } from '@game-trade/lib';
import { ALIGN, ImageComponent, Loader, SIZE } from '@game-trade/ui';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { MediaLink, useGetSearchGamesLazyQuery } from '@game-trade/lib/codegen-types';
import { useRouter } from 'next/router';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

interface GameCard {
  media_links: MediaLink[];
  name: string;
}

export const SearchFieldComponent = ({
  setIsModalGamesNotFoundVisible,
}: {
  setIsModalGamesNotFoundVisible: (state: boolean) => void;
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>();
  const [games, setGames] = useState<GameCard[] | null>(null);
  const router = useRouter();

  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  });

  const [getSearchGames, { data: getDataGamesCards, loading }] = useGetSearchGamesLazyQuery();

  useEffect(() => {
    if (
      getDataGamesCards?.catalogGames?.edges?.node &&
      games !== getDataGamesCards?.catalogGames?.edges?.node
    ) {
      setGames(getDataGamesCards.catalogGames.edges.node as GameCard[]);
    }
  }, [getDataGamesCards]);

  const onSearch = (text: string) => {
    setSearch(text);
    setGames(null);

    if (!text) {
      return;
    }

    setIsOpen(true);
    setTimeout(() => {
      getSearchGames({
        variables: {
          offset: 0,
          first: 7,
          name: text,
        },
      });
    }, 2000);
  };

  useEffect(() => {
    if (!search) {
      setIsOpen(false);
    }
  }, [search]);

  return (
    <SearchWrapper ref={ref}>
      <InputText
        onClick={() => search && setIsOpen(true)}
        value={search}
        onChange={onSearch}
        placeholder={router.asPath === '/' ? t('search.search') : t('search.searchGame')}>
        <SvgMagnifier size={16} />
      </InputText>
      {isOpen && (
        <WrapperGames>
          {games?.map((game) => {
            return (
              <Link
                key={game.name}
                href={`${routes.games}/${game.name.replace(/\s+/g, '-')}`}
                as={`${routes.games}/${game.name.replace(/\s+/g, '-')}`}
                passHref={true}>
                <WrapperGame onClick={() => setSearch('')}>
                  {game.media_links.length ? (
                    <ImageComponent
                      link={game.media_links[0].link}
                      alt={game.name}
                      LCP={false}
                      styleWrapper={WrapperImage}
                    />
                  ) : (
                    ''
                  )}
                  <Game>{game.name}</Game>
                </WrapperGame>
              </Link>
            );
          })}
          {!games && <Loader size={SIZE.MINI} position={ALIGN.CENTER} />}
          {games !== null && !loading && !games.length && (
            <GamesNotFound>
              <SvgExclamationPoint size={24} />
              <NotFound onClick={() => setIsModalGamesNotFoundVisible(true)}>
                {t('search.notFound')}
              </NotFound>
            </GamesNotFound>
          )}
        </WrapperGames>
      )}
    </SearchWrapper>
  );
};
