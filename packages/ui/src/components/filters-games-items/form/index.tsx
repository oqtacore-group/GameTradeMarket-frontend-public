import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { FormBlocksWrapper } from './style';
import { FilterBlock, IFilterFormInputs } from './interfaces';
import { prepareOutputData } from './utils';
import { useFiltersContext } from './context';
import { GenresFilterBlock } from './blocks/genres';
import { BlockchainsFilterBlock } from './blocks/blockchains';

import { PriceModelFilterBlock } from './blocks/price-model';
import { GameStatusFilterBlock } from './blocks/game-status';
import { DeviceFilterBlock } from './blocks/device';
// import { FriendsInGameFilterBlock } from '@/components/filters-games-items/form/elements/friends-in-game';
import { PlayAndEarnFilterBlock } from './blocks/play-and-earn';
export type { FilterBlock } from './interfaces';
export { useFiltersContext } from './context';

import { GetGameFiltersQuery, useGetGameFiltersQuery } from '@game-trade/lib/codegen-types';

interface IProps {
  onChange?(formInputs: IFilterFormInputs): void;
  blocks: FilterBlock[];
  sessionKey?: any;
  serverSideDataFilters?: GetGameFiltersQuery;
}

export type { IFilterFormInputs };

export const FiltersForm = (props: IProps) => {
  const { onChange, blocks, sessionKey, serverSideDataFilters } = props;
  const { __methods__, filtersData, __setFiltersBlocks } = useFiltersContext();
  const hasProvider = Boolean(__methods__);
  const localMethods = useForm<IFilterFormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const methods = hasProvider ? __methods__ : localMethods;
  const { watch } = methods;
  const formInputs: IFilterFormInputs = hasProvider ? filtersData : watch();

  const { data: getDynamicFiltersData, loading: dynamicFiltersLoading } = useGetGameFiltersQuery(); // dynamic filters
  const dynamicFiltersData =
    getDynamicFiltersData?.gameFilters || serverSideDataFilters?.gameFilters;

  const [genreData, setGenreData] = useState<any>(null);
  const [blockchainData, setBlockchainData] = useState<any>(null);
  // const [releaseYearData, setReleaseYearData] = useState<any>(null);
  // const [floorPriceData, setFloorPriceData] = useState<any>(null);
  const [deviceData, setDeviceData] = useState<any>(null);
  // const [friendsInGameData, setFriendsInGameData] = useState<any>(null);
  const [gameStatusData, setGameStatusData] = useState<any>(null);
  const [priceModelData, setPriceModelData] = useState<any>(null);
  const [playAndEarnData, setPlayAndEarnData] = useState<any>(null);

  useEffect(() => {
    if (hasProvider) {
      __setFiltersBlocks(blocks);
    }
  }, [hasProvider, ...blocks]);

  useEffect(() => {
    if (dynamicFiltersData) {
      const initialGenreData = dynamicFiltersData?.find((filter) => {
        return filter.key === 'GENRE';
      });
      const initialBlockchainData = dynamicFiltersData?.find((filter) => {
        return filter.key === 'BLOCKCHAIN';
      });
      // const initialFloorPriceData = dynamicFiltersData?.find((filter) => {
      //   return filter.key === 'FLOOR_PRICE';
      // });
      // const initialReleaseYearData = dynamicFiltersData?.find((filter) => {
      //   return filter.key === 'RELEASE_YEAR';
      // });
      const initialDeviceData = dynamicFiltersData?.find((filter) => {
        return filter.key === 'DEVICE';
      });
      // const initialFriendsInGameData = dynamicFiltersData?.find((filter) => {
      //   return filter.key === 'FRIENDS_IN_GAME';
      // });
      const initialPlayAndEarnData = dynamicFiltersData?.find((filter) => {
        return filter.key === 'PLAY_AND_EARN';
      });
      const initialPriceModelData = dynamicFiltersData?.find((filter) => {
        return filter.key === 'PRICE_MODEL';
      });
      const initialGameStatusData = dynamicFiltersData?.find((filter) => {
        return filter.key === 'GAME_STATUS';
      });
      setGenreData(initialGenreData);
      setBlockchainData(initialBlockchainData);
      // setFloorPriceData(initialFloorPriceData);
      // setReleaseYearData(initialReleaseYearData);
      setDeviceData(initialDeviceData);
      // setFriendsInGameData(initialFriendsInGameData);
      setPriceModelData(initialPriceModelData);
      setGameStatusData(initialGameStatusData);
      setPlayAndEarnData(initialPlayAndEarnData);
    }
  }, [getDynamicFiltersData]);

  useEffect(() => {
    onChange && onChange(filtersData || prepareOutputData(formInputs));
  }, [JSON.stringify(formInputs)]);

  useEffect(() => {
    // todo reset form state
  }, [sessionKey]);

  const serverSideBlockchain = serverSideDataFilters?.gameFilters?.find((filter: any) => {
    return filter.key === 'BLOCKCHAIN';
  });

  return (
    <FormProvider {...methods}>
      <FormBlocksWrapper>
        {blocks.includes('genre') && (
          <GenresFilterBlock
            serverSideData={serverSideDataFilters}
            loading={dynamicFiltersLoading}
            data={genreData}
          />
        )}
        {blocks.includes('blockchain') && (
          <BlockchainsFilterBlock
            data={typeof window === 'undefined' ? serverSideBlockchain : blockchainData}
          />
        )}
        {/* {elements.includes('releaseYear') && <ReleaseYearFilterBlock data={releaseYearData} />} */}
        {blocks.includes('playAndEarn') && (
          <PlayAndEarnFilterBlock serverSideData={serverSideDataFilters} data={playAndEarnData} />
        )}
        {blocks.includes('priceModel') && (
          <PriceModelFilterBlock serverSideData={serverSideDataFilters} data={priceModelData} />
        )}
        {/* {elements.includes('floorPrice') && <FloorPriceFilterBlock data={floorPriceData} />} */}
        {/*{elements.includes('friendInGame') && (*/}
        {/*  <FriendsInGameFilterBlock*/}
        {/*    serverSideData={serverSideDataFilters}*/}
        {/*    data={friendsInGameData}*/}
        {/*  />*/}
        {/*)}*/}
        {blocks.includes('gameStatus') && (
          <GameStatusFilterBlock serverSideData={serverSideDataFilters} data={gameStatusData} />
        )}
        {blocks.includes('device') && (
          <DeviceFilterBlock serverSideData={serverSideDataFilters} data={deviceData} />
        )}
      </FormBlocksWrapper>
    </FormProvider>
  );
};
