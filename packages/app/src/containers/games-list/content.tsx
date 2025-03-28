import React from 'react';
import { Grid, GridColumn } from '@game-trade/ui/modifiers/smart-grid-styled';
import { GameCardItem } from '@game-trade/ui/components/game/preview-card';
import { PaginationNew } from '@game-trade/ui/components/pagination/pagination-new';

import {
  GamesListContentWrapper,
  GamesListContentStyled,
  GridWrapper,
  DesktopTitleWrapper,
} from './style';
import { TitleGameItems } from './title-game-items';
import { SortingGameItems } from './sorting-game-items';
// useFiltersContext
import { SelectedFilters } from '@game-trade/ui/components/filters-games-items';
import { breakPointsGridView } from './utils';
import { IServerSideProps } from '@/containers/marketplace';
import { GameCard } from '@game-trade/lib/codegen-types';

interface IProps {
  onChangeSorting(data: any): any;
  onChangePage(page: number): any;
  onSearch(search: string): any;
  onIncreaseOffset(): any;
  page: number;
  offset: number;
  gridView: string;
  gamesCards?: any[] | undefined | null;
  isWide?: boolean;
  total?: number;
  loading?: boolean;
  serverSideData?: IServerSideProps;
}

export const GamesListContent = (props: IProps) => {
  const {
    onChangeSorting,
    onChangePage,
    onIncreaseOffset,
    onSearch,
    page,
    offset,
    gridView,
    gamesCards,
    total,
    isWide,
    loading,
    // serverSideData,
  } = props;
  // const { filtersData } = useFiltersContext();
  const isNormalColumns = gridView === 'normal-columns';

  const breakPoints = breakPointsGridView(isNormalColumns, isWide);

  return (
    <GamesListContentWrapper>
      <SortingGameItems onChange={onChangeSorting} isWide={isWide} onSearch={onSearch}>
        <DesktopTitleWrapper>
          <TitleGameItems itemsCount={total} />
        </DesktopTitleWrapper>
      </SortingGameItems>

      <GamesListContentStyled>
        <SelectedFilters />
        <GridWrapper>
          <Grid size={2} breakPoints={breakPoints}>
            {gamesCards?.map((item: GameCard) => (
              <GridColumn key={Math.random() + (item.name ? item.name : '')} size={1}>
                <GameCardItem gameCard={item} />
              </GridColumn>
            ))}
          </Grid>
        </GridWrapper>
      </GamesListContentStyled>

      <PaginationNew
        offsetStep={offset}
        total={Number(total)}
        page={page}
        onPageChange={onChangePage}
        onClickButton={onIncreaseOffset}
        showButton={true}
        isLoading={loading}
      />
    </GamesListContentWrapper>
  );
};
