import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { SaleTypeContent } from './style';

import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';

import { CheckboxComponent, CheckboxGroup } from '../components/checkbox';
import { FacetsBlockWrapper } from '../facets-block-wrapper';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';

interface ISaleTypeCheckboxItem {
  checked?: boolean;
  code?: string;
  disable?: boolean;
  title?: string;
  [key: string]: any;
}

export interface ISaleTypeData {
  key?: any;
  title?: any;
  type?: any;
  items?: ISaleTypeCheckboxItem[] | null;
  [key: string]: any;
}

interface IProps {
  data: ISaleTypeData | null | undefined;
}

export const SaleTypeFilterBlock = (props: IProps) => {
  const { data } = props;
  const { t } = useTranslation('marketplacePage', { keyPrefix: 'translation' });
  const saleTypeList = data?.items;

  const router = useRouter();
  const querySaleType = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).saleType;

  const { setValue: mainFormSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>({
    mode: 'onTouched',
  });

  const [filteredList, setFilteredList] = useState(
    saleTypeList?.filter((d) => d.code !== 'NOT_FOR_SALE')
  );
  const saleType = watch('saleType');

  useEffect(() => {
    setFilteredList(saleTypeList?.filter((d) => d.code !== 'NOT_FOR_SALE'));
  }, [saleTypeList]);

  useEffect(() => {
    if (querySaleType?.length) {
      setValue(
        'saleType',
        (querySaleType as string[])?.map((item) => {
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
    if (router.query['saleType[]'] && !saleType) {
      mainFormSetValue('saleType', {
        key: 'CHECKBOX',
        title: 'Sale Type',
        items:
          querySaleType?.length &&
          (querySaleType as string[])?.map((item) => {
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
      'saleType',
      saleType?.length
        ? {
            ...data,
            items: saleType.filter((elem: any) => elem !== ''),
          }
        : undefined
    );
  }, [saleType]);

  return (
    <FacetsBlockWrapper title={t('saleType')}>
      <SaleTypeContent>
        <Grid staticSize={4} verticalGap={20}>
          <GridColumn>
            <ControlledField control={control} name="saleType">
              <CheckboxGroup>
                {filteredList?.map((checkboxItem: ISaleTypeCheckboxItem) => (
                  <CheckboxComponent
                    key={checkboxItem.code}
                    grouped={true}
                    value={checkboxItem}
                    valueKey="code"
                    label={checkboxItem.title}
                    disabled={checkboxItem.disable}
                  />
                ))}
              </CheckboxGroup>
            </ControlledField>
          </GridColumn>
        </Grid>
      </SaleTypeContent>
    </FacetsBlockWrapper>
  );
};
