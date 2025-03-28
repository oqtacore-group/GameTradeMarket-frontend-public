import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { SvgCloseOutline } from '@game-trade/icons';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';

import { FilterBlockWrapper } from '../filter-block-wrapper';
import { InputRange } from '../components/input-range';

import {
  FloorPriceContent,
  FloorPriceButtonsList,
  ResetButtonWrapper,
  ResetButton,
  ApplyButton,
} from './style';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import {
  ICurrencyItem,
  PriceRangeFields,
} from '../../../../filters-tokens-items/form/blocks/price-range';
import { RadioButton, RadioGroup } from '../components/radio-group';

export interface IFloorPriceItem {
  code: string;
  title: string;
  checked: boolean;
}

export type FloorPriceFields = {
  currency?: IFloorPriceItem;
  price: [any, any];
};

export interface IFloorPriceData {
  key?: any;
  title?: any;
  type?: any;
  [key: string]: any;
}

interface IProps {
  data?: IFloorPriceData | null;
  loading?: boolean;
}

export const FloorPriceFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { data, loading } = props;
  const dataFloorPrice = data?.items;

  const router = useRouter();
  const queryPriceRange = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).priceRange;

  const queryPriceCurrency = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).priceCurrency;

  const { setValue: mainSetValue, watch: mainFormWatch } = useFormContext();
  const { control, handleSubmit, reset, setValue } = useForm<PriceRangeFields>({
    mode: 'onTouched',
  });

  const [filteredList, setFilteredList] = useState(dataFloorPrice);

  const mainWatchFloorPrice = mainFormWatch('floorPrice');

  useEffect(() => {
    if (dataFloorPrice) {
      setFilteredList(dataFloorPrice);
    }
  }, [dataFloorPrice]);

  useEffect(() => {
    if (!mainWatchFloorPrice && !queryPriceRange && !queryPriceCurrency) {
      localReset();
    } else if (!mainWatchFloorPrice && (queryPriceRange || queryPriceCurrency)) {
      mainSetValue('floorPrice', {
        currency: {
          checked: true,
          code: queryPriceCurrency,
          title: queryPriceCurrency,
        },
        price: queryPriceRange,
      });
    }
  }, [mainWatchFloorPrice, queryPriceRange, queryPriceCurrency]);

  useEffect(() => {
    if (queryPriceRange) {
      setValue('price', queryPriceRange ? (queryPriceRange as [string, string]) : [null, null]);
    }
    if (queryPriceCurrency) {
      setValue('currency', {
        checked: true,
        code: queryPriceCurrency ? (queryPriceCurrency as string) : '',
        title: queryPriceCurrency ? (queryPriceCurrency as string) : '',
      });
    }
  }, [queryPriceCurrency, queryPriceRange]);

  useEffect(() => {
    if (!mainWatchFloorPrice) {
      localReset();
    }
  }, [mainWatchFloorPrice]);

  const localReset = () => {
    const defaultValues = { currency: '', price: [null, null] } as any;
    reset(defaultValues);
  };

  const resetHandler = () => {
    localReset();
    mainSetValue('floorPrice', { currency: 'ETH', price: [null, null] });
  };

  const applyHandler = (formInputs: PriceRangeFields) => {
    mainSetValue('floorPrice', {
      currency: formInputs.currency,
      price: formInputs.price,
    });
  };

  return (
    <FilterBlockWrapper title={t('floorPrice')}>
      <FloorPriceContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="currency">
                <RadioGroup>
                  {filteredList?.map((currencyItem: ICurrencyItem) => (
                    <RadioButton key={currencyItem.code} value={currencyItem} valueKey="code">
                      {currencyItem.title}
                    </RadioButton>
                  ))}
                </RadioGroup>
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <ControlledField control={control} name="price">
                <InputRange placeholderFrom={t('min')} placeholderTo={t('max')} />
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <FloorPriceButtonsList>
                <ResetButtonWrapper>
                  <ResetButton onClick={resetHandler}>
                    <span>{t('reset')}</span> <SvgCloseOutline size={20} />
                  </ResetButton>
                </ResetButtonWrapper>
                <ApplyButton dimension="s" onClick={handleSubmit(applyHandler)}>
                  {t('apply')}
                </ApplyButton>
              </FloorPriceButtonsList>
            </GridColumn>
          </Grid>
        )}
        {(loading || typeof window === 'undefined') && (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
        )}
      </FloorPriceContent>
    </FilterBlockWrapper>
  );
};
