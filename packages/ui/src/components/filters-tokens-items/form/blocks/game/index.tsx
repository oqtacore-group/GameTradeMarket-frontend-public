import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { SvgMagnifier } from '@game-trade/icons';

import { FilterBlockWrapper } from '../filter-block-wrapper';
import { RadioGroup, RadioButton } from '../components/radio-group';

import { GameListWrapper, GameListOuter, GameListInner, EmptyGameListMessage } from './style';
import { InputText } from './components/input-text';
import { AnimationHeight } from '../../../../../animation/animation-height';
import { AnimationOpacity } from '../../../../../animation/animation-opacity';
import { ControlledField } from '../../../../../forms/controlled-field';

export interface IGameItem {
  code: string;
  name: string;
}

interface IProps {
  games?: IGameItem[] | undefined | null;
  selectedGame?: IGameItem | undefined | null;
}

// const [getGamesListLazyQuery, { data: dataGameList, loading }] = useGamesListLazyQuery({
//   variables: {
//     offset: 0,
//     first: 500,
//   },
// });

export const GameFilterBlock = (props: IProps) => {
  const { games } = props;
  const { t } = useTranslation('marketplacePage', { keyPrefix: 'translation' });

  const router = useRouter();
  const { control, setValue, watch: mainFormWatch } = useFormContext();
  const [search, setSearch] = useState('');
  const [list, setList] = useState<IGameItem[]>(games ? games : []);
  const [filteredList, setFilteredList] = useState<IGameItem[]>(games ? games : []);
  const queryGameCode = (games || []).find((item) => item.code === router.query.gameCode);
  const mainFormGame = mainFormWatch('game');

  // useEffect(() => {
  //   const node = dataGameList?.games?.edges?.node || [];
  //   setList(node);
  //   setFilteredList(node);
  //
  //   if (node.length && !router.query.gameCode) {
  //     const firstItem = node[0];
  //     setValue('game', firstItem);
  //   } else {
  //     setValue('game', queryGameCode);
  //   }
  // }, [games]);

  useEffect(() => {
    if (!mainFormGame) {
      if (list.length && !router.query.gameCode) {
        const firstItem = list[0];
        setValue('game', firstItem);
      } else {
        setValue('game', queryGameCode);
      }
    }
  }, [mainFormGame]);

  useEffect(() => {
    setFilteredList(
      list.filter((item: IGameItem) => item.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  useEffect(() => {
    if (games) {
      setList(games);
      setFilteredList(games);

      if (games.length && !router.query.gameCode) {
        const firstItem = games[0];
        setValue('game', firstItem);
      } else {
        setValue('game', queryGameCode);
      }
    }
  }, [games]);

  return (
    <FilterBlockWrapper title={t('game')}>
      <InputText value={search} onChange={setSearch} placeholder={t('filterGame') || ''}>
        <SvgMagnifier size={16} />
      </InputText>
      <GameListWrapper>
        {filteredList.length > 0 && (
          <GameListOuter>
            <GameListInner>
              <ControlledField control={control} name="game">
                <RadioGroup>
                  {list.map((gameItem: IGameItem) => {
                    const isOpen = filteredList.some(
                      (item: IGameItem) => item.code === gameItem.code
                    );
                    return (
                      <AnimationHeight key={gameItem.code} isOpen={isOpen} time={300}>
                        <AnimationOpacity
                          state={typeof window === 'undefined' ? false : !isOpen}
                          duration={200}
                          durationStart={0}
                          durationEnd={200}>
                          <RadioButton value={gameItem} valueKey="code">
                            {gameItem.name}
                          </RadioButton>
                        </AnimationOpacity>
                      </AnimationHeight>
                    );
                  })}
                </RadioGroup>
              </ControlledField>
            </GameListInner>
          </GameListOuter>
        )}
        {games?.length === 0 && <EmptyGameListMessage>{t('gamesNotFound')}</EmptyGameListMessage>}
      </GameListWrapper>
    </FilterBlockWrapper>
  );
};
