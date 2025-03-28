import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { FormBlocksWrapper } from './style';
import { FilterBlock, IFilterFormInputs } from './interfaces';
import { prepareOutputData } from './utils';
import { useFiltersContext } from './context';
import { GameFilterBlock, IGameItem } from './blocks/game';
import { SaleTypeFilterBlock, ISaleTypeData } from './blocks/sale-type';
import { PriceRangeFilterBlock, IPriceRangeData } from './blocks/price-range';
import { FacetsFilterBlock } from './blocks/facets';

import { Game, GameTokenFacet, GameTokenFilter } from '@game-trade/lib/codegen-types';
import { GameBlockchainsFilterBlock } from './blocks/blockchains';

export type { FilterBlock } from './interfaces';
export { useFiltersContext } from './context';

interface IProps {
  onChange?(formInputs: IFilterFormInputs): void;
  blocks: FilterBlock[];
  gameList?: Game[] | undefined | null;
  game?: IGameItem;
  filters?: GameTokenFilter[] | undefined | null;
  facets?: GameTokenFacet[] | undefined | null;
  sessionKey?: any;
}

export type { IFilterFormInputs };

export const FiltersForm = (props: IProps) => {
  const { onChange, blocks, sessionKey, gameList, game, filters, facets } = props;
  const { __methods__, filtersData, __setFiltersBlocks } = useFiltersContext();
  const hasProvider = Boolean(__methods__);
  const localMethods = useForm<IFilterFormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const methods = hasProvider ? __methods__ : localMethods;
  const { watch } = methods;
  const formInputs: IFilterFormInputs = hasProvider ? filtersData : watch();
  // const { game } = formInputs;

  const [gameBlockchainsData] = useState<ISaleTypeData | null | undefined>(
    filters?.find((filter) => filter?.type === 'COINCHECKBOX')
  );
  const [saleTypeData] = useState<ISaleTypeData | null | undefined>(
    filters?.find((filter) => filter?.type === 'CHECKBOX')
  );
  const [priceRangeData] = useState<IPriceRangeData | null | undefined>(
    filters?.find((filter) => filter.type === 'MIN_MAX')
  );

  useEffect(() => {
    if (hasProvider) {
      __setFiltersBlocks(blocks);
    }
  }, [hasProvider, ...blocks]);

  useEffect(() => {
    onChange && onChange(filtersData || prepareOutputData(formInputs));
  }, [JSON.stringify(formInputs)]);

  useEffect(() => {
    // todo reset form state
  }, [sessionKey]);

  return (
    <FormProvider {...methods}>
      <FormBlocksWrapper>
        {blocks.includes('game') && <GameFilterBlock games={gameList} selectedGame={game} />}

        {blocks.includes('gameBlockchains') && (
          <GameBlockchainsFilterBlock data={gameBlockchainsData} gameCode={game} />
        )}

        {blocks.includes('saleType') && <SaleTypeFilterBlock data={saleTypeData} />}

        {blocks.includes('priceRange') && <PriceRangeFilterBlock data={priceRangeData} />}

        {blocks.includes('facets') && facets && (
          <FacetsFilterBlock
            game={game as IGameItem}
            serverSideData={facets}
            gameCode={game?.code}
          />
        )}
      </FormBlocksWrapper>
    </FormProvider>
  );
};
