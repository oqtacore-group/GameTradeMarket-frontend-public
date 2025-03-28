import { TitleGameItemsWrapper, TitleGameName, TitleGameItemsCount } from './style';
import { useFiltersContext } from '@game-trade/ui/components/filters-games-items';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface IProps {
  itemsCount?: number;
}

export const TitleGameItems = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });
  const { itemsCount = 0 } = props;
  const { filtersData } = useFiltersContext();
  const [genre, setGenre] = useState<string[]>();

  useEffect(() => {
    if (filtersData && filtersData.genre && filtersData.genre.items) {
      setGenre(() => {
        let data: any = filtersData?.genre?.items?.map((item: any) => item.title);
        if (data?.length > 2) {
          data = [data[0] + ', ', data[1], ` & ${data.length - 2} more`];
        } else if (data?.length) {
          data = data.join(', ');
        }
        return [data];
      });
    } else {
      setGenre(undefined);
    }
  }, [filtersData]);

  return (
    <TitleGameItemsWrapper>
      <TitleGameItemsCount>{`${itemsCount} ${t('games')}`}</TitleGameItemsCount>
      <TitleGameName>{genre}</TitleGameName>
    </TitleGameItemsWrapper>
  );
};
