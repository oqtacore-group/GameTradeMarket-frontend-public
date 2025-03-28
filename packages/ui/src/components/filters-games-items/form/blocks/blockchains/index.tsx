import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { BlockchainContent } from './style';

import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';
import { FilterBlockWrapper } from '../filter-block-wrapper';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';
import { CheckboxGroup, Checkbox } from '../components/checkbox';

export interface IBlockchainItem {
  code: string;
  title: string;
  checked: boolean;
  disable: boolean;
}

export interface IBlockchainData {
  key?: string;
  title?: string;
  type?: string;
  items?: IBlockchainItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IBlockchainData | null;
  loading?: boolean;
}

export const BlockchainsFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { data, loading } = props;
  const blockchainList = data?.items;

  const router = useRouter();
  const queryBlockchains = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).blockchains;

  const { setValue: mainFormSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>();

  const [filteredList, setFilteredList] = useState(blockchainList);
  const blockchains = watch('blockchain');

  useEffect(() => {
    setFilteredList(blockchainList);
  }, [blockchainList]);

  useEffect(() => {
    if (queryBlockchains?.length) {
      setValue(
        'blockchain',
        (queryBlockchains as string[])?.map((item) => {
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
    if (router.query['blockchains[]'] && !blockchains) {
      mainFormSetValue('blockchain', {
        key: 'BLOCKCHAIN',
        title: 'Blockchain',
        items:
          queryBlockchains?.length &&
          (queryBlockchains as string[])?.map((item) => {
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
      'blockchain',
      blockchains?.length
        ? {
            ...data,
            items: blockchains,
          }
        : undefined
    );
  }, [blockchains]);

  return (
    <FilterBlockWrapper title={t('blockchain')}>
      <BlockchainContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="blockchain">
                <CheckboxGroup>
                  {filteredList?.map((blockchain: IBlockchainItem) => {
                    return (
                      <Checkbox
                        key={blockchain.code}
                        grouped={true}
                        value={blockchain}
                        valueKey="code"
                        label={`${blockchain.title}`}
                        disabled={blockchain.disable}
                      />
                    );
                  })}
                </CheckboxGroup>
              </ControlledField>
            </GridColumn>
          </Grid>
        )}
        {(typeof window === 'undefined' || loading) && (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
        )}
      </BlockchainContent>
    </FilterBlockWrapper>
  );
};
