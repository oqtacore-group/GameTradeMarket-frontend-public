import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { BlockchainContent } from './style';

import { FilterBlockWrapper } from '../filter-block-wrapper';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';
import { Checkbox, CheckboxGroup } from '../components/checkbox';

import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';

export interface IPriceModelItem {
  code: string;
  title: string;
  checked: boolean;
  disable: boolean;
}

export interface IPriceModelData {
  key?: any;
  title?: any;
  type?: any;
  items?: IPriceModelItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IPriceModelData | null;
  loading?: boolean;
  serverSideData: any;
}

export const PriceModelFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { data, loading } = props;
  const dataPriceModel = data?.items;

  const router = useRouter();
  const queryPriceModels = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).priceModels;

  // const serverSidePriceModel = serverSideData?.gameFilters?.find((filter: any) => {
  //   return filter.key === 'PRICE_MODEL';
  // });

  const { setValue: mainFormSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>();

  const priceModel = watch('priceModel');

  const [filteredList, setFilteredList] = useState(dataPriceModel);

  useEffect(() => {
    if (dataPriceModel) {
      setFilteredList(dataPriceModel);
    }
  }, [dataPriceModel]);

  useEffect(() => {
    if (queryPriceModels?.length) {
      setValue(
        'priceModel',
        (queryPriceModels as string[])?.map((item) => {
          return {
            code: item,
            title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
            checked: true,
            disable: false,
          };
        })
      );
    }
  }, []);

  useEffect(() => {
    if (router.query['priceModel[]'] && !priceModel) {
      mainFormSetValue('priceModel', {
        key: 'PRICE_MODEL',
        title: 'Price model',
        items:
          queryPriceModels?.length &&
          (queryPriceModels as string[])?.map((item) => {
            return {
              code: item,
              title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
              checked: true,
              disable: false,
            };
          }),
      });
      return;
    }
    mainFormSetValue(
      'priceModel',
      priceModel?.length
        ? {
            ...data,
            items: priceModel,
          }
        : undefined
    );
  }, [priceModel]);

  return (
    <FilterBlockWrapper title={t('priceModel')}>
      <BlockchainContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="priceModel">
                <CheckboxGroup>
                  {filteredList?.map((priceModelItem: IPriceModelItem) => {
                    return (
                      <Checkbox
                        key={priceModelItem.code}
                        grouped={true}
                        value={priceModelItem}
                        valueKey="code"
                        label={`${priceModelItem.title}`}
                        disabled={priceModelItem.disable}
                      />
                    );
                  })}
                </CheckboxGroup>
              </ControlledField>
            </GridColumn>
          </Grid>
        )}
        {(loading || typeof window === 'undefined') && (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
        )}
      </BlockchainContent>
    </FilterBlockWrapper>
  );
};
