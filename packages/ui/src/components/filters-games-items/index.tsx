import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SvgArrowLeft } from '@game-trade/icons';
import { AnimationHeight, AnimationOpacity } from '../../index';

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
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
// import { GetGameFiltersQuery } from '@game-trade/lib/codegen-types';

interface IProps {
  onChange?(filters: any): void;
  onResize?(isOpen: boolean): void;
  sessionKey?: any;
  blocks?: FilterBlock[];
  games?: any[];
  serverSideDataFilters?: any;
}

export { SelectedFilters } from './selected-filters';
export { useFiltersContext } from './form';
export type { IFilterFormInputs } from './form';

export const FiltersGamesItems = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const {
    onResize,
    blocks = ['genre', 'blockchain', 'friendInGame', 'gameStatus', 'device', 'playAndEarn'],
    ...formProps
  } = props;
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
                serverSideDataFilters={props.serverSideDataFilters}
                blocks={blocks}
                {...formProps}
              />
            </AnimationOpacity>
          </AnimationHeight>
        </FiltersContent>
      </FiltersOuterContent>
    </FiltersWrapper>
  );
};
