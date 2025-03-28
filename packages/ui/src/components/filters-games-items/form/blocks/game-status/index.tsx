import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { ResetButton, ResetButtonWrapper, GameStatusButtonsList, GameStatusContent } from './style';

import { FilterBlockWrapper } from '../filter-block-wrapper';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { RadioGroup } from '../../../../filters-tokens-items/form/blocks/components/radio-group';
import { RadioButton } from '../components/radio-group';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';

import { SvgCloseOutline } from '@game-trade/icons';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';

export interface IGameStatusItem {
  code: string;
  title: string;
  checked: boolean;
  disable: boolean;
}

export type GameStatusFields = {
  gameStatus?: any;
};

export interface IGameStatusData {
  key?: any;
  title?: any;
  type?: any;
  items?: IGameStatusItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IGameStatusData | null;
  loading?: boolean;
  serverSideData?: any;
}

export const GameStatusFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { data, loading } = props;
  const dataGameStatus = data?.items;

  // const serverSideGameStatus = serverSideData?.gameFilters?.find((filter: any) => {
  //   return filter.key === 'GAME_STATUS';
  // }).items;

  const router = useRouter();
  const queryGameStatus = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).gameStatus;

  const { control, setValue: mainSetValue, watch: mainFormWatch } = useFormContext();
  const mainWatchGameStatus = mainFormWatch('gameStatus');

  const [filteredList, setFilteredList] = useState<IGameStatusItem[]>([]);

  useEffect(() => {
    if (dataGameStatus && !queryGameStatus) {
      setFilteredList(dataGameStatus);
    }

    if (queryGameStatus && !mainWatchGameStatus) {
      mainSetValue('gameStatus', {
        checked: false,
        code: queryGameStatus,
        disable: false,
        title:
          (queryGameStatus as string)?.charAt(0).toUpperCase() +
          (queryGameStatus as string).slice(1)?.toLowerCase(),
      });
    }
  }, [dataGameStatus, queryGameStatus, mainWatchGameStatus]);

  useEffect(() => {
    if (!mainWatchGameStatus && !queryGameStatus) {
      localReset();
    }
  }, [mainWatchGameStatus, queryGameStatus]);

  const resetHandler = () => {
    localReset();
    mainSetValue('gameStatus', {});
  };

  const localReset = () => {
    if (!dataGameStatus) return;
    mainSetValue('gameStatus', {});
  };

  return (
    <FilterBlockWrapper title={t('gameStatus')}>
      <GameStatusContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="gameStatus">
                <RadioGroup>
                  {filteredList?.map((gameStatusItem: IGameStatusItem) => (
                    <RadioButton key={gameStatusItem.code} value={gameStatusItem} valueKey="code">
                      {gameStatusItem.title}
                    </RadioButton>
                  ))}
                </RadioGroup>
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <GameStatusButtonsList>
                <ResetButtonWrapper>
                  <ResetButton onClick={resetHandler}>
                    <span>{t('reset')}</span> <SvgCloseOutline size={20} />
                  </ResetButton>
                </ResetButtonWrapper>
                {/*<ApplyButton dimension="s" onClick={handleSubmit(applyHandler)}>*/}
                {/*  Apply*/}
                {/*</ApplyButton>*/}
              </GameStatusButtonsList>
            </GridColumn>
          </Grid>
        )}
        {(loading || typeof window === 'undefined') && (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
        )}
      </GameStatusContent>
    </FilterBlockWrapper>
  );
};
