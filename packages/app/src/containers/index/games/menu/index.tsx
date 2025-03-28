import { MenuWrapper } from './style';
import { Categories } from './list';
import { useGetGameFiltersLazyQuery } from '@game-trade/lib/codegen-types';
import { useEffect, useState } from 'react';
import { IGenreData } from '@game-trade/ui/components/filters-games-items/form/blocks/genres';
import { IBlockchainData } from '@game-trade/ui/components/filters-games-items/form/blocks/blockchains';

export const Menu = () => {
  const [genreData, setGenreData] = useState<IGenreData[]>();
  const [blockchainData, setBlockchainData] = useState<IBlockchainData[]>();

  const [getData, { data: getDynamicFiltersData }] = useGetGameFiltersLazyQuery(); // dynamic filters

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (getDynamicFiltersData) {
      const initialGenreData = getDynamicFiltersData?.gameFilters?.find((filter) => {
        return filter.key === 'GENRE';
      })?.items;
      const initialBlockchainData = getDynamicFiltersData?.gameFilters?.find((filter) => {
        return filter.key === 'BLOCKCHAIN';
      })?.items;

      setGenreData(initialGenreData as IGenreData[]);
      setBlockchainData(initialBlockchainData as IBlockchainData[]);
    }
  }, [getDynamicFiltersData]);

  return (
    <MenuWrapper>
      {genreData && blockchainData && (
        <Categories genres={genreData} blockchains={blockchainData} />
      )}
    </MenuWrapper>
  );
};
