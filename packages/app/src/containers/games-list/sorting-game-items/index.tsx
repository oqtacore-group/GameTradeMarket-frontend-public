import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { ControlledField, Input } from '@game-trade/ui';
import { SortValues } from '@game-trade/lib/src/codegen-types';

import { SortingWrapper, ControlsWrapper, ControlItemWrapper, SearchFieldStyled } from './style';
import { Dropdown, IOption } from './dropdown';
import { SvgSearch } from '@game-trade/icons';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { prepareQueryGameItemSortToFilters, substringAsPath } from '@/containers/games-list/utils';
import { useTranslation } from 'next-i18next';

interface IProps {
  children: any;
  onChange(sortFormInputs: SortFormInputs): void;
  onSearch(search: string): void;
  isWide?: boolean;
}

export interface ISortValue {
  key: string;
  direction: SortValues;
}

export type SortFormInputs = {
  sort?: ISortValue;
  view?: 'normal-columns' | 'small-columns';
  searchTokenName?: string;
};

const sortOptions: IOption<ISortValue>[] = [
  {
    label: 'recentlyAdded',
    value: {
      key: 'date',
      direction: SortValues.Asc,
    },
  },
  {
    label: 'priceLowToHigh',
    value: {
      key: 'price',
      direction: SortValues.Asc,
    },
  },
  {
    label: 'priceHighToLow',
    value: {
      key: 'price',
      direction: SortValues.Desc,
    },
  },
  {
    label: 'ratingLowToHigh',
    value: {
      key: 'rating',
      direction: SortValues.Asc,
    },
  },
  {
    label: 'ratingHighToLow',
    value: {
      key: 'rating',
      direction: SortValues.Desc,
    },
  },
];

export const SortingGameItems = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const router = useRouter();
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const { children, onChange, isWide, onSearch } = props;
  const queryGameItemsSort = prepareQueryGameItemSortToFilters(
    queryString.parse(substringAsPath(router.asPath), {
      arrayFormat: 'bracket-separator' as any,
      arrayFormatSeparator: '|',
    }).gameItemsSort
  );

  const { watch, control, setValue } = useForm<SortFormInputs>({
    defaultValues: {
      sort: router.query['gameItemsSort[]'] ? queryGameItemsSort : undefined,
      view: router.query.gridView
        ? (router?.query?.gridView as SortFormInputs['view'])
        : 'normal-columns',
      searchTokenName: router.query.gameItemSearch
        ? (router?.query?.gameItemSearch as string)
        : undefined,
    },
  });
  const formInputs: SortFormInputs = watch();

  useEffect(() => {
    onChange(formInputs);
  }, [JSON.stringify(formInputs)]);

  useEffect(() => {
    if (isTablet && !isWide) {
      setValue('view', 'normal-columns');
    }
  }, [isTablet, isWide]);

  const handleOnChange = debounce((evt, value) => {
    onSearch(value);
  }, 300);

  return (
    <SortingWrapper>
      {children}
      <ControlsWrapper>
        <ControlItemWrapper>
          <SearchFieldStyled>
            <ControlledField name={'searchTokenName'} control={control}>
              <Input
                placeholder={t('search') || ''}
                onChange={handleOnChange}
                dimension={'free'}
                postIcon={<SvgSearch size={16} />}
              />
            </ControlledField>
          </SearchFieldStyled>
        </ControlItemWrapper>

        <ControlItemWrapper>
          <ControlledField control={control} name="sort">
            <Dropdown
              options={sortOptions}
              value={queryGameItemsSort}
              stringifyValue={(obj) => JSON.stringify(obj)}
              placeholder={t('sortBy') || ''}
            />
          </ControlledField>
        </ControlItemWrapper>
      </ControlsWrapper>
    </SortingWrapper>
  );
};
