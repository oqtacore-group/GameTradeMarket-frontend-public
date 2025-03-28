import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import {
  FacetsContent,
  FacetsButtonsList,
  ResetButtonWrapper,
  ResetButton,
  ApplyButton,
} from './style';
import { SvgCloseOutline } from '@game-trade/icons';

import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';
import { CheckboxGroup, CheckboxComponent } from '../components/checkbox';
import { FacetsBlockWrapper } from '../facets-block-wrapper';
import { InputRange } from '../components/input-range';

import { GameTokenFacet, useGameTokenFacetsQuery } from '@game-trade/lib/codegen-types';
import {
  prepareQueryFacetsToFilters,
  scrollToTop,
  substringAsPath,
} from '@game-trade/app/src/containers/marketplace/utils';
import { IGameItem } from '../game';

export interface IFacetRangeItem {
  key?: any;
  min?: any;
  max?: any;
  [key: string]: any;
}

interface IFacetCheckboxItem {
  key?: any;
  count?: number;
  disable?: boolean;
  [key: string]: any;
}

export interface IFacetCheckboxGroupItem {
  key?: any;
  values?: IFacetCheckboxItem[] | null;
  [key: string]: any;
}

export type FacetsFields = {
  [key: string]: any;
};

interface IProps {
  gameCode?: string | undefined | null;
  serverSideData?: GameTokenFacet[] | undefined | null;
  game: IGameItem;
}

export const FacetsFilterBlock = (props: IProps) => {
  const { gameCode, serverSideData: dataFacets, game } = props;
  const { t } = useTranslation('marketplacePage', { keyPrefix: 'translation' });
  const router = useRouter();
  const facets = prepareQueryFacetsToFilters(
    queryString.parse(substringAsPath(router.asPath), {
      arrayFormat: 'bracket-separator' as any,
      arrayFormatSeparator: '|',
    }).facets
  );

  const serverSideDataFacets = dataFacets;
  const { setValue: mainFormSetValue, watch: mainFormWatch } = useFormContext();
  const { control, handleSubmit, reset } = useForm<FacetsFields>({
    mode: 'onTouched',
    defaultValues: {
      ...facets.reduce((prev: any, item: any) => {
        if (item.values) {
          prev[item.key] = item.values;
        } else {
          prev[item.key] = [item.min, item.max];
        }
        return prev;
      }, {}),
    },
  });
  const { data: dataGameTokenFacets, loading } = useGameTokenFacetsQuery({
    variables: {
      gameCode: gameCode ? gameCode : '',
    },
  });
  const [facetsRanges, setFacetsRanges] = useState<IFacetRangeItem[]>(
    typeof window === 'undefined' && serverSideDataFacets
      ? serverSideDataFacets?.filter((facetItem: any) => facetItem.type === 'LEVEL')
      : []
  );
  const [facetsCheckboxGroups, setFacetsCheckboxGroups] = useState<IFacetCheckboxGroupItem[]>(
    typeof window === 'undefined' && serverSideDataFacets
      ? serverSideDataFacets?.filter((facetItem: any) => facetItem.type !== 'LEVEL')
      : []
  );
  const mainFormFacets = mainFormWatch('facets');

  const localReset = () => {
    const resetData: any = {};

    facetsRanges.forEach((rageItem: IFacetRangeItem) => {
      resetData[rageItem.key] = [null, null];
    });

    facetsCheckboxGroups.forEach((checkboxGroup: IFacetCheckboxGroupItem) => {
      resetData[checkboxGroup.key] = [];
    });

    reset(resetData);
    mainFormSetValue('facets', undefined);
    handleSubmit(applyHandler);
  };

  useEffect(() => {
    if (!router.query['facets[]']) return;
    mainFormSetValue('facets', facets);
  }, []);

  useEffect(() => {
    if (!game?.code || router.query.gameCode === game?.code) return;
    resetHandler();
  }, [game, router.query.gameCode]);

  useEffect(() => {
    if (router.query['facets[]']) return;
    if (!mainFormFacets) {
      localReset();
    }
  }, [mainFormFacets]);

  useEffect(() => {
    setFacetsRanges(
      dataGameTokenFacets?.gameTokenFacets?.filter(
        (facetItem: any) => facetItem.type === 'LEVEL'
      ) || []
    );
    setFacetsCheckboxGroups(
      dataGameTokenFacets?.gameTokenFacets?.filter(
        (facetItem: any) => facetItem.type !== 'LEVEL'
      ) || []
    );
  }, [dataGameTokenFacets]);

  const resetHandler = () => {
    localReset();
    mainFormSetValue('facets', undefined);
  };

  const applyHandler = (formInputs: FacetsFields) => {
    scrollToTop();
    mainFormSetValue('facets', [
      ...facetsRanges
        .map((rageItem: IFacetRangeItem) => {
          const targetInput = formInputs[rageItem.key];
          return {
            key: rageItem.key,
            type: rageItem.type,
            min:
              targetInput[0] === '0' || targetInput[0] === 0
                ? 0
                : Number(targetInput && targetInput[0]) || '',
            max: Number(targetInput && targetInput[1]) || '',
          };
        })
        .filter(
          (rageItem: IFacetRangeItem) => (rageItem.min || rageItem.min === 0) && rageItem.max
        ), // only filled values
      ...facetsCheckboxGroups
        .map((checkboxGroup: IFacetCheckboxGroupItem) => {
          const targetInput = formInputs[checkboxGroup.key];

          return {
            key: checkboxGroup.key,
            type: checkboxGroup.type,
            values: (targetInput || []).map(({ key, count }: { key: string; count: number }) => ({
              key,
              count,
            })),
          };
        })
        .filter((checkboxGroup: IFacetCheckboxGroupItem) => checkboxGroup.values?.length), // only filled values
    ]);
  };

  return (
    <>
      {(!dataGameTokenFacets ||
        loading ||
        Boolean(dataGameTokenFacets?.gameTokenFacets?.length)) && (
        <FacetsBlockWrapper title={t('facets')}>
          {(!dataGameTokenFacets || !loading) && (
            <FacetsContent>
              <Grid staticSize={4} verticalGap={20}>
                {facetsRanges?.map((rangeItem: IFacetRangeItem) => (
                  <GridColumn key={rangeItem.key}>
                    <ControlledField control={control} name={rangeItem.key}>
                      <InputRange
                        label={rangeItem.key}
                        placeholderFrom={rangeItem.min}
                        placeholderTo={rangeItem.max}
                      />
                    </ControlledField>
                  </GridColumn>
                ))}
                {facetsCheckboxGroups?.map((checkboxGroup: IFacetCheckboxGroupItem) => (
                  <GridColumn key={checkboxGroup.key}>
                    <ControlledField control={control} name={checkboxGroup.key}>
                      <CheckboxGroup label={checkboxGroup.key}>
                        {checkboxGroup.values?.map((checkboxItem: IFacetCheckboxItem) => (
                          <CheckboxComponent
                            key={checkboxItem.key}
                            grouped={true}
                            value={checkboxItem}
                            valueKey="key"
                            label={`${checkboxItem.key} (${checkboxItem.count})`}
                            disabled={checkboxItem.disable}
                          />
                        ))}
                      </CheckboxGroup>
                    </ControlledField>
                  </GridColumn>
                ))}
                <GridColumn>
                  <FacetsButtonsList>
                    <ResetButtonWrapper>
                      <ResetButton onClick={resetHandler}>
                        <span>{t('reset')}</span> <SvgCloseOutline size={20} />
                      </ResetButton>
                    </ResetButtonWrapper>
                    <ApplyButton dimension="s" onClick={handleSubmit(applyHandler)}>
                      {t('apply')}
                    </ApplyButton>
                  </FacetsButtonsList>
                </GridColumn>
              </Grid>
            </FacetsContent>
          )}
          {dataGameTokenFacets && loading && <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />}
        </FacetsBlockWrapper>
      )}
    </>
  );
};
