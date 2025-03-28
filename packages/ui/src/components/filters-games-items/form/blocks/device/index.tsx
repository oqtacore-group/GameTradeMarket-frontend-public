import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { ResetButton, ResetButtonWrapper, DeviceButtonsList, DeviceContent } from './style';

import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';
import { FilterBlockWrapper } from '../filter-block-wrapper';
import { RadioButton, RadioGroup } from '../components/radio-group';

import { SvgCloseOutline } from '@game-trade/icons';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';

export interface IDeviceItem {
  code: string;
  title: string;
  checked: boolean;
  disable: boolean;
}

export type DeviceFields = {
  device?: IDeviceItem;
};

export interface IDeviceData {
  key?: any;
  title?: any;
  type?: any;
  items?: IDeviceItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IDeviceData | null;
  loading?: boolean;
  serverSideData?: IDeviceData;
}

export const DeviceFilterBlock = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });

  const { data, loading } = props;
  const dataDevices = data?.items;

  // const serverSideDevice = serverSideData?.gameFilters?.find((filter: any) => {
  //   return filter.key === 'DEVICE';
  // });

  const router = useRouter();
  const queryDevice = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).device;

  const { control, setValue: mainSetValue, watch: mainFormWatch } = useFormContext();
  const mainWatchDevice = mainFormWatch('device');

  const [filteredList, setFilteredList] = useState<IDeviceItem[]>([]);

  useEffect(() => {
    if (dataDevices && !queryDevice) {
      setFilteredList(dataDevices);
    }

    if (queryDevice && !mainWatchDevice) {
      mainSetValue('device', {
        checked: false,
        code: queryDevice,
        disable: false,
        title:
          (queryDevice as string)?.charAt(0).toUpperCase() +
          (queryDevice as string).slice(1)?.toLowerCase(),
      });
    }
  }, [dataDevices, queryDevice, mainWatchDevice]);

  useEffect(() => {
    if (!mainWatchDevice && !queryDevice) {
      localReset();
    }
  }, [mainWatchDevice, queryDevice]);

  const resetHandler = () => {
    localReset();
    mainSetValue('device', {});
  };

  const localReset = () => {
    if (!dataDevices) return;
    mainSetValue('device', {});
  };

  return (
    <FilterBlockWrapper title={t('device')}>
      <DeviceContent>
        {(!loading || typeof window === 'undefined') && (
          <Grid staticSize={4} verticalGap={20}>
            <GridColumn>
              <ControlledField control={control} name="device">
                <RadioGroup>
                  {filteredList?.map((deviceItem: IDeviceItem) => (
                    <RadioButton key={deviceItem.code} value={deviceItem} valueKey="code">
                      {deviceItem.title}
                    </RadioButton>
                  ))}
                </RadioGroup>
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <DeviceButtonsList>
                <ResetButtonWrapper>
                  <ResetButton onClick={resetHandler}>
                    <span>{t('reset')}</span> <SvgCloseOutline size={20} />
                  </ResetButton>
                </ResetButtonWrapper>
                {/*<ApplyButton dimension="s" onClick={handleSubmit(applyHandler)}>*/}
                {/*  Apply*/}
                {/*</ApplyButton>*/}
              </DeviceButtonsList>
            </GridColumn>
          </Grid>
        )}
        {(loading || typeof window === 'undefined') && (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
        )}
      </DeviceContent>
    </FilterBlockWrapper>
  );
};
