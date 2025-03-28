import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { FilterBlockWrapper } from '../filter-block-wrapper';

import { BlockchainContent } from './style';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { Checkbox, CheckboxGroup } from '../components/checkbox';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';

export interface IPlayAndEarnItem {
  code: string;
  title: string;
  checked: boolean;
  disable: boolean;
}

export interface IPlayAndEarnData {
  key?: any;
  title?: any;
  type?: any;
  items?: IPlayAndEarnItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IPlayAndEarnData | null;
  loading?: boolean;
  serverSideData: any;
}

export const PlayAndEarnFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });
  const { data, loading } = props;
  const dataPlayAndEarn = data?.items;

  const router = useRouter();
  const queryPlayAndEarn = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).playAndEarn;

  // const serverSidePriceModel = serverSideData?.gameFilters?.find((filter: any) => {
  //   return filter.key === 'PRICE_MODEL';
  // });

  const { setValue: mainFormSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>();

  const playAndEarn = watch('playAndEarn');

  const [filteredList, setFilteredList] = useState(dataPlayAndEarn);

  useEffect(() => {
    if (dataPlayAndEarn) {
      setFilteredList(dataPlayAndEarn);
    }
  }, [dataPlayAndEarn]);

  useEffect(() => {
    if (queryPlayAndEarn?.length) {
      setValue(
        'playAndEarn',
        (queryPlayAndEarn as string[])?.map((item) => {
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
    if (router.query['playAndEarn[]'] && !playAndEarn) {
      mainFormSetValue('playAndEarn', {
        key: 'PLAY_AND_EARN',
        title: 'Play and Earn',
        items:
          queryPlayAndEarn?.length &&
          (queryPlayAndEarn as string[])?.map((item) => {
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
      'playAndEarn',
      playAndEarn?.length
        ? {
            ...data,
            items: playAndEarn,
          }
        : undefined
    );
  }, [playAndEarn]);

  return (
    <FilterBlockWrapper title={t('playAndEarn')}>
      <BlockchainContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="playAndEarn">
                <CheckboxGroup>
                  {filteredList?.map((playAndEarnItem: IPlayAndEarnItem) => {
                    return (
                      <Checkbox
                        key={playAndEarnItem.code}
                        grouped={true}
                        value={playAndEarnItem}
                        valueKey="code"
                        label={`${playAndEarnItem.title}`}
                        disabled={playAndEarnItem.disable}
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
