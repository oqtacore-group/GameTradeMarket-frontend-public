import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { GameBlockChainsContent } from './style';

import { CheckboxComponent, CheckboxGroup } from '../components/checkbox';
import { FacetsBlockWrapper } from '../facets-block-wrapper';
import { useGameTokenFiltersQuery } from '@game-trade/lib/codegen-types';
import { CurrencyBlockWrapper } from '../currency-block-wrapper';

import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';
import { Grid, GridColumn } from '../../../../../modifiers/smart-grid-styled';
import { ControlledField } from '../../../../../forms/controlled-field';

interface ICoinsItem {
  checked?: boolean;
  code?: string;
  coinAddress?: string;
  blockchain?: string;
  disable?: boolean;
  title?: string;
  [key: string]: any;
}

interface IBlockchainsCheckboxItem {
  checked?: boolean;
  code?: string;
  disable?: boolean;
  title?: string;
  coins?: ICoinsItem[] | null;
  [key: string]: any;
}

export interface IBlockchainsData {
  key?: any;
  title?: any;
  type?: any;
  items?: IBlockchainsCheckboxItem[] | null;
  [key: string]: any;
}

interface IProps {
  data: IBlockchainsData | null | undefined;
  gameCode?: any;
}

interface IElementData {
  blockchain?: string;
  chacked?: boolean;
  code?: string;
  coin_address?: string;
  disable: boolean;
  title: string;
}

export const GameBlockchainsFilterBlock = (props: IProps) => {
  const { data, gameCode } = props;
  const [blockchain, setBlockchain] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState([]);
  const [chain, setChain] = useState([]);
  const [blockchainList, setBlockchainList] = useState([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState();

  const titleFilter: { [key: string]: string } = {
    ethereum_mainnet: 'Ethereum',
    polygon: 'Polygon',
    immutable: 'Immutable',
    binance: 'Binance Smart Chain',
  };

  const router = useRouter();
  const queryGameBlockchains = queryString.parse(substringAsPath(router.asPath), {
    arrayFormat: 'bracket-separator' as any,
    arrayFormatSeparator: '|',
  }).coinSymbol;

  const { data: dataGameBlockchains } = useGameTokenFiltersQuery({
    variables: {
      gameCode: gameCode?.code ? gameCode.code : '',
    },
  });
  const gameBlockchainsList = dataGameBlockchains?.gameTokenFilters;

  const { setValue: mainFormSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>({
    mode: 'onTouched',
  });

  useEffect(() => {
    mainFormSetValue(
      'gameBlockchains',
      gameBlockchains?.length
        ? {
            ...data,
            items: null,
          }
        : undefined
    );
    setValue(
      'gameBlockchains',
      (queryGameBlockchains as string[])?.map((item) => {
        return {
          code: item,
          title: item.charAt(0).toUpperCase() || '' + item.slice(1).toLowerCase() || '',
          checked: false,
          disable: false,
        };
      })
    );
  }, [gameCode?.code]);

  const [filteredList, setFilteredList] = useState(
    gameBlockchainsList?.filter((elem) => elem?.title === 'Blockchains' || [])
  );
  const gameBlockchains = watch('gameBlockchains');

  useEffect(() => {
    setFilteredList(gameBlockchainsList?.filter((d) => d?.title === 'Blockchains'));
  }, [gameBlockchainsList]);

  const itemsArray = filteredList?.map((elem: any) => elem.items).flat();

  useEffect(() => {
    mainFormSetValue(
      'gameBlockchains',
      gameBlockchains?.length
        ? {
            ...data,
            items:
              gameBlockchains?.length && chain.length > 0
                ? null
                : gameBlockchains.filter((elem: any) => elem !== ''),
          }
        : {
            ...data,
            items: chain.length > 0 ? chain : null,
          }
    );
  }, [gameBlockchains, blockchain, selectedBlockchain, blockchainList]);

  const changeCoin = async (element: IElementData[]) => {
    if (element === blockchainList) {
      setBlockchainList(blockchainList.filter((item) => item !== element));
      setChain(
        chain.filter(
          (chainElement: any) =>
            !element.some((el: IElementData) => el?.code === chainElement?.code)
        )
      );
      setSelectedBlockchain([]);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setBlockchainList(element);
      if (
        !chain.some((chainElement: any) =>
          element.some((el: IElementData) => el?.code === chainElement?.code)
        )
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setChain([...chain, ...element]);
      } else {
        setChain(
          chain.filter(
            (chainElement: any) =>
              !element.some((el: IElementData) => el?.code === chainElement?.code)
          )
        );
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSelectedBlockchain(element?.title);
    }
  };

  const handleChangeChain = (item: any, elem: any) => {
    if (titleFilter[item] == title && code == elem.code) {
      setTitle('');
      setBlockchain('');
    } else {
      setTitle(titleFilter[item]);
      setBlockchain(titleFilter[item]);
      setCode(elem.code);
    }
  };

  return (
    <FacetsBlockWrapper title={'Blockchains and currencies'}>
      <GameBlockChainsContent>
        <Grid staticSize={4} verticalGap={20}>
          <GridColumn>
            <ControlledField control={control} name="gameBlockchains">
              <CheckboxGroup>
                {itemsArray?.map((checkboxItem) => (
                  <div key={checkboxItem?.code}>
                    <CurrencyBlockWrapper
                      title={titleFilter[checkboxItem?.title]}
                      checkedChain={blockchain}
                      onBlockchainChange={() => changeCoin(checkboxItem?.coins)}>
                      {checkboxItem?.coins?.map((coin: any) => (
                        <CheckboxComponent
                          onClick={() => handleChangeChain(checkboxItem?.title, coin)}
                          padding={'0 0 0 15px'}
                          key={coin?.code}
                          grouped={true}
                          value={coin}
                          valueKey="code"
                          label={coin?.title.toUpperCase()}
                          disabled={coin.disable}
                          selectedBlockchain={
                            chain.find((coin: any) => coin.code === checkboxItem?.coins[0]?.code)
                              ? coin
                              : ''
                          }
                          resetCheckbox={gameBlockchains?.length && chain.length > 0 ? true : false}
                        />
                      ))}
                    </CurrencyBlockWrapper>
                  </div>
                ))}
              </CheckboxGroup>
            </ControlledField>
          </GridColumn>
        </Grid>
      </GameBlockChainsContent>
    </FacetsBlockWrapper>
  );
};
