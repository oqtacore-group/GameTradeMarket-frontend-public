import React, { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { SvgCloseOutline } from '@game-trade/icons';
import { FilterBlockWrapper } from '../filter-block-wrapper';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';

import { InputRange } from '../components/input-range';

import {
  PriceRangeContent,
  PriceRangeButtonsList,
  ResetButtonWrapper,
  ResetButton,
  ApplyButton,
} from './style';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export type ReleaseYearFields = {
  releaseYear: [any, any];
};

export interface IReleaseYearData {
  key?: any;
  title?: any;
  type?: any;
  [key: string]: any;
}

export interface IReleaseYearOutput {
  key?: any;
  title?: any;
  type?: any;
  years: [any, any];
}

interface IProps {
  loading?: boolean;
  data?: IReleaseYearData | null;
}

export const ReleaseYearFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { loading } = props;
  const router = useRouter();
  const queryReleaseYear = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).releaseDates;

  const { setValue: mainSetValue, watch: mainFormWatch } = useFormContext();
  const { control, handleSubmit, reset } = useForm<ReleaseYearFields>({
    mode: 'onTouched',
    defaultValues: {
      releaseYear: queryReleaseYear ? (queryReleaseYear as [string, string]) : [null, null],
    },
  });
  const mainWatchReleaseYear = mainFormWatch('releaseYear');

  useEffect(() => {
    if (!mainWatchReleaseYear && !queryReleaseYear) {
      localReset();
    } else if (!mainWatchReleaseYear && queryReleaseYear) {
      mainSetValue('releaseYear', { years: queryReleaseYear });
    }
  }, [mainWatchReleaseYear, queryReleaseYear]);

  const localReset = () => {
    const defaultValues = { years: [null, null] } as any;
    reset(defaultValues);
  };

  const resetHandler = () => {
    localReset();
    mainSetValue('releaseYear', undefined);
  };

  const applyHandler = (formInputs: ReleaseYearFields) => {
    mainSetValue('releaseYear', {
      years: formInputs.releaseYear,
    });
  };

  return (
    <FilterBlockWrapper title={t('releaseYear')}>
      <PriceRangeContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="releaseYear">
                <InputRange placeholderFrom={t('from')} placeholderTo={t('to')} />
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
        )}
        {(typeof window === 'undefined' || loading) && (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
        )}
      </PriceRangeContent>
    </FilterBlockWrapper>
  );
};
