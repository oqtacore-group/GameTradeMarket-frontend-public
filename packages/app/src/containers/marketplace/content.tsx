import React from 'react';
import { Grid, GridColumn, TokenCard, PaginationNew } from '@game-trade/ui';

import {
  MarketplaceContentWrapper,
  MarketplaceContentStyled,
  GridWrapper,
  DesktopTitleWrapper,
  NoItems,
} from './style';
import { TitleGameItems } from './title-game-items';
import { SortingGameItems } from './sorting-game-items';

import { SelectedFilters } from '@game-trade/ui/components/filters-tokens-items';
import { breakPointsGridView } from '@/containers/marketplace/utils';
import { IServerSideProps } from '@/containers/marketplace/index';

interface IProps {
  onChangeSorting(data: any): any;
  onChangePage(page: number): any;
  onSearch(search: string): any;
  onIncreaseOffset(): any;
  page: number;
  offset: number;
  gridView: string;
  gameTokenCards?: any[] | undefined | null;
  isWide?: boolean;
  total: number | undefined | null;
  loading?: boolean;
  serverSideData?: IServerSideProps;
  gameName?: string | undefined | null;
}

export const MarketplaceContent = (props: IProps) => {
  const {
    onChangeSorting,
    onChangePage,
    onIncreaseOffset,
    onSearch,
    page,
    offset,
    gridView,
    gameTokenCards,
    total,
    isWide,
    loading,
    gameName,
  } = props;
  const isNormalColumns = gridView === 'normal-columns';

  const breakPoints = breakPointsGridView(isNormalColumns, isWide);

  return (
    <MarketplaceContentWrapper>
      <SortingGameItems onChange={onChangeSorting} isWide={isWide} onSearch={onSearch}>
        <DesktopTitleWrapper>
          <TitleGameItems gameName={gameName} itemsCount={total} />
        </DesktopTitleWrapper>
      </SortingGameItems>

      <MarketplaceContentStyled>
        <SelectedFilters />
        <GridWrapper>
          {gameTokenCards?.length && (
            <Grid size={8} breakPoints={breakPoints}>
              {gameTokenCards?.map((item: any) => (
                <GridColumn key={item.token_value} size={1}>
                  <TokenCard
                    gameName={gameName || ''}
                    tokenCard={item}
                    isNormalColumns={isNormalColumns}
                  />
                </GridColumn>
              ))}
            </Grid>
          )}
          {!loading && !gameTokenCards?.length && (
            <NoItems>{'There are no tokens matching the search criteria'}</NoItems>
          )}
        </GridWrapper>
      </MarketplaceContentStyled>

      {
        <PaginationNew
          offsetStep={offset}
          total={Number(total)}
          page={page}
          onPageChange={onChangePage}
          onClickButton={onIncreaseOffset}
          showButton={true}
          isLoading={loading}
        />
      }
    </MarketplaceContentWrapper>
  );
};
