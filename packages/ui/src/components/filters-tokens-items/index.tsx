import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SvgArrowLeft } from '@game-trade/icons';

import {
  FiltersWrapper,
  FiltersOuterContent,
  FiltersContent,
  Opener,
  FiltersHeader,
} from './style';
import { Status } from './interfaces';
import { ANIMATION_TIME } from './constants';
import { FilterBlock, FiltersForm } from './form';

import { Game, GameTokenFacet, GameTokenFilter } from '@game-trade/lib/codegen-types';
import { IGameItem } from './form/blocks/game';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { AnimationHeight } from '../../animation/animation-height';
import { AnimationOpacity } from '../../animation/animation-opacity';

interface IProps {
  onChange?(filters: any): void;
  onResize?(isOpen: boolean): void;
  sessionKey?: any;
  blocks?: FilterBlock[];
  gameList?: Game[] | undefined | null;
  game?: IGameItem;
  filters?: GameTokenFilter[] | undefined | null;
  facets?: GameTokenFacet[] | undefined | null;
}

export { SelectedFilters } from './selected-filters';
export { useFiltersContext } from './form';
export type { IFilterFormInputs } from './form';

export const FiltersTokensItems = (props: IProps) => {
  const {
    onResize,
    blocks = ['game', 'gameBlockchains', 'saleType', 'priceRange', 'facets'],
    gameList,
    game,
    filters,
    facets,
    ...formProps
  } = props;
  const { t } = useTranslation('marketplacePage', { keyPrefix: 'translation' });
  const [status, setStatus] = useState<Status>('init');
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [disabledAnimationHeight, setDisabledAnimationHeight] = useState(!isMobile);

  useEffect(() => {
    setDisabledAnimationHeight(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    let timerId: any;

    if (status !== 'init' && onResize) {
      timerId = window?.setTimeout(() => onResize(status === 'open'), ANIMATION_TIME);
    }

    return () => window?.clearTimeout(timerId);
  }, [status]);

  const openFilters = () => {
    setStatus('open');
  };

  const closeFilters = () => {
    setStatus('close');
  };

  return (
    <FiltersWrapper status={status}>
      <FiltersOuterContent>
        <Opener status={status} onClick={openFilters}>
          {!isMobile && <SvgArrowLeft size={40} />}
        </Opener>

        <FiltersContent status={status}>
          <FiltersHeader onClick={closeFilters}>
            {t('filter')}
            {!isMobile && <SvgArrowLeft size={30} />}
          </FiltersHeader>

          <AnimationHeight
            isOpen={!isMobile || status === 'open'}
            time={ANIMATION_TIME}
            disabled={disabledAnimationHeight}>
            <AnimationOpacity state={status === 'close'} duration={200}>
              <FiltersForm
                gameList={gameList}
                game={game}
                filters={filters}
                blocks={blocks}
                facets={facets}
                {...formProps}
              />
            </AnimationOpacity>
          </AnimationHeight>
        </FiltersContent>
      </FiltersOuterContent>
    </FiltersWrapper>
  );
};
