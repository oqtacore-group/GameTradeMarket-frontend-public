import React, { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { SvgCloseOutline } from '@game-trade/icons';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { InputRange } from '../components/input-range';

import {
  PriceRangeContent,
  PriceRangeButtonsList,
  ResetButtonWrapper,
  ResetButton,
  ApplyButton,
  TextContent,
} from './style';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';
import { FacetsBlockWrapper } from '../facets-block-wrapper';

export interface ICurrencyItem {
  code: string;
  title: string;
  checked: boolean;
}

export type PriceRangeFields = {
  currency?: ICurrencyItem;
  price: [any, any];
};

export interface IPriceRangeData {
  key?: any;
  title?: any;
  type?: any;
  items?: ICurrencyItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IPriceRangeData | null;
}

export const PriceRangeFilterBlock = (props: IProps) => {
  const { t } = useTranslation('marketplacePage', { keyPrefix: 'translation' });

  const router = useRouter();
  const queryPriceRange = {
    price: queryString.parse(substringAsPath(router.asPath), {
      arrayFormat: 'bracket-separator' as any,
      arrayFormatSeparator: '|',
    }).priceRange || [null, null],
  };
  const { setValue: mainFormSetValue, watch: mainFormWatch } = useFormContext();
  const { control, handleSubmit, reset } = useForm<PriceRangeFields>({
    mode: 'onTouched',
    defaultValues: queryPriceRange as any,
  });
  const mainFormPriceRange = mainFormWatch('priceRange');

  useEffect(() => {
    if (!mainFormPriceRange) {
      localReset();
    }
  }, [mainFormPriceRange]);

  const resetHandler = () => {
    localReset();
    mainFormSetValue('priceRange', undefined);
  };

  const applyHandler = (formInputs: PriceRangeFields) => {
    mainFormSetValue('priceRange', {
      price: formInputs.price,
    });
  };

  const localReset = () => {
    const defaultValues = { price: [null, null] } as any;
    reset(defaultValues);
  };

  return (
    <FacetsBlockWrapper title={t('priceRange')}>
      <PriceRangeContent>
        <TextContent>USD equivalent</TextContent>
        <Grid staticSize={4} verticalGap={20}>
          <GridColumn>
            <ControlledField control={control} name="price">
              <InputRange placeholderFrom={t('min')} placeholderTo={t('max')} />
            </ControlledField>
          </GridColumn>
          <GridColumn>
            <PriceRangeButtonsList>
              <ResetButtonWrapper>
                <ResetButton onClick={resetHandler}>
                  <span>{t('reset')}</span> <SvgCloseOutline size={20} />
                </ResetButton>
              </ResetButtonWrapper>
              <ApplyButton dimension="s" onClick={handleSubmit(applyHandler)}>
                {t('apply')}
              </ApplyButton>
            </PriceRangeButtonsList>
          </GridColumn>
        </Grid>
      </PriceRangeContent>
    </FacetsBlockWrapper>
  );
};
