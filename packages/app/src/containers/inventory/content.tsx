import React from 'react';
import { Grid, GridColumn, TokenCard, PaginationNew, Loader, SIZE, ALIGN } from '@game-trade/ui';

import {
  InventoryContentWrapper,
  InventoryContentStyled,
  GridWrapper,
  DesktopTitleWrapper,
} from './style';
import { TitleGameItems } from './title-game-items';
import { SortingGameItems } from './sorting-game-items';

import { SelectedFilters, useFiltersContext } from '@game-trade/ui/components/filters-tokens-items';
import { breakPointsGridView } from '@/containers/marketplace/utils';

interface IProps {
  onChangeSorting(data: any): any;
  onChangePage(page: number): any;
  onIncreaseOffset(): any;
  page: number;
  offsetStep: number;
  gridView: string;
  gameTokenCards?: any[] | null;
  isWide?: boolean;
  total?: number;
  loading?: boolean;
}

export const InventoryContent = (props: IProps) => {
  const {
    onChangeSorting,
    onChangePage,
    onIncreaseOffset,
    page,
    offsetStep,
    gridView,
    gameTokenCards,
    total,
    isWide,
    loading,
  } = props;
  const { filtersData } = useFiltersContext();
  const isNormalColumns = gridView === 'normal-columns';

  const breakPoints = breakPointsGridView(isNormalColumns, isWide);

  return (
    <InventoryContentWrapper>
      <SortingGameItems onChange={onChangeSorting} isWide={isWide}>
        <DesktopTitleWrapper>
          <TitleGameItems gameName={filtersData?.game?.name} itemsCount={total} />
          {loading && <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />}
        </DesktopTitleWrapper>
      </SortingGameItems>
      <InventoryContentStyled>
        <SelectedFilters />
        <GridWrapper>
          <Grid size={8} breakPoints={breakPoints}>
            {gameTokenCards?.map((item: any) => (
              <GridColumn key={item.token_value} size={1}>
                <TokenCard gameName={item.game_name || ''} tokenCard={item} />
              </GridColumn>
            ))}
          </Grid>
        </GridWrapper>
      </InventoryContentStyled>
      <PaginationNew
        offsetStep={offsetStep}
        total={total || 0}
        page={page}
        onPageChange={onChangePage}
        onClickButton={onIncreaseOffset}
        showButton={true}
        isLoading={loading}
      />
    </InventoryContentWrapper>
  );
};
