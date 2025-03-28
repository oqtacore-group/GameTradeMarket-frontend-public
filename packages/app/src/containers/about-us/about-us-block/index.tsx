import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  AboutUsWrapper,
  TextWrapper,
  TokenCardWrapper,
  TokenWrapper,
  UserAndSaleTypeWrapper,
  Buttons,
  ButtonTradeIn,
  ButtonMessage,
  CardUser,
  Description,
  Info,
  Account,
  Status,
  SaleType,
  SaleTypeWrapper,
  HeightSaleType,
  TitleSaleType,
  WrapperArrow,
  WrapperForm,
  WrapperColumnsDonuts,
} from './style';
import { Headline, ShadowBorder } from '../style';
import { Card } from '@game-trade/lib/src/codegen-types';
import BasilDroid from '@root/public/imgs/about-us/basil_droid.jpeg';
import { ScheduleDonut } from '@game-trade/ui/components/nft-card/schedule-donut';
import { TokenCard } from '@game-trade/ui/components/nft-card/preview-card';
import { AddressSliceComponent } from '@game-trade/ui/src/modifiers/get-address-slice';
import { COLORS } from '@game-trade/ui/src/styles';
import { ControlledField } from '@game-trade/ui/src/forms/controlled-field';
import Link from 'next/link';
import { SvgArrowDown } from '@game-trade/icons';
import {
  CheckboxComponent,
  CheckboxGroup,
} from '@game-trade/ui/components/filters-tokens-items/form/blocks/components/checkbox';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const columns = [
  {
    trait_type: 'breedCount',
    value: 421,
    max_count: 480,
  },
  {
    trait_type: 'backAccuracy',
    value: 74,
    max_count: 100,
  },
  {
    trait_type: 'breedCount',
    value: 18,
    max_count: 25,
  },
];

const saleType = [
  {
    code: 'FIXED_PRICE',
    title: 'fixedPrice.title',
    disable: false,
  },
  {
    code: 'NOT_FOR_SALE',
    title: 'notForSale.title',
    disable: false,
  },
];

const item: Card = {
  id: '36547',
  contract: '0x9c57d0278199c931cf149cc769f37bb7847091e7',
  is_my_like: false,
  picture:
    'https://storage.gametrade.market/images/SIPHER/0x9c57d0278199c931cf149cc769f37bb7847091e7/9bb0ca44-360f-4007-8bfc-37f0ab0c99e7.webp',
  likes_count: 3,
  owner: 'me',
  comments: { edges: { node: [] }, pageInfo: { hasNextPage: false }, totalCount: 0 },
  currencies: [],
  platform: 'OPENSEA',
  token_value: '3627',
  blockchain: 'ethereum_mainnet',
  name: 'Sipher INU #1738',
  game_code: 'SIPHER',
  game_name: 'Sipher',
  price: 0.014,
  coin_info: {
    usd_price: 19,
    blockchain: '',
    coin_address: '',
    decimals: 0,
    logo: '',
    price: 0,
    symbol: '',
  },
  is_external_item: false,
};

export const AboutUsBlock = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.aboutUs' });

  const { control } = useForm<any>({
    mode: 'onTouched',
  });
  const [openSaleType, setOpenSaleType] = useState<boolean>(true);
  const [hiddenTooltipCopy, setHiddenTooltipCopy] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setHiddenTooltipCopy(true);
    }, 5000);
  }, [hiddenTooltipCopy]);

  return (
    <AboutUsWrapper>
      <TextWrapper>
        <Headline data-text={t('headline')}>{t('headline')}</Headline>
        <p>{t('description')}</p>
      </TextWrapper>
      <TokenWrapper>
        <TokenCardWrapper>
          <ShadowBorder color={COLORS.pink} item={3} />
          <ShadowBorder color={COLORS.pink} item={4} />
          <TokenCard gameName={'Sipher'} tokenCard={item} />
        </TokenCardWrapper>
      </TokenWrapper>
      <UserAndSaleTypeWrapper>
        <CardUser>
          <Description>
            <Image layout={'intrinsic'} src={BasilDroid} alt="basil droid" />
            <Info>
              <Account>
                <Link href={`/user/repaired`}>Basil_droid</Link>
              </Account>
              <AddressSliceComponent address={'0x1ab373A9791A9D44f6065CA522d22eD0d8eDD3C7'} />
              <Status>{t('status')}</Status>
            </Info>
          </Description>
          <Buttons>
            <Link passHref={true} href={`/chat?user=5aff9767-2358-4442-a055-f23f0224c580`}>
              <ButtonMessage>{t('message')}</ButtonMessage>
            </Link>
            <ButtonTradeIn disabled={true}>{t('tradeItems')}</ButtonTradeIn>
          </Buttons>
        </CardUser>

        <SaleTypeWrapper>
          <HeightSaleType>
            <SaleType>
              <TitleSaleType>
                {t('saleType')}{' '}
                <WrapperArrow
                  onClick={() => setOpenSaleType(!openSaleType)}
                  rotateArrow={!openSaleType}>
                  <SvgArrowDown size={14} />
                </WrapperArrow>
              </TitleSaleType>
              {openSaleType && (
                <WrapperForm>
                  <ControlledField control={control} name="saleType">
                    <CheckboxGroup>
                      {saleType.map((checkboxItem) => {
                        return (
                          <CheckboxComponent
                            key={checkboxItem.code}
                            grouped={true}
                            value={checkboxItem}
                            valueKey="code"
                            label={t(checkboxItem.title)}
                            disabled={checkboxItem.disable}
                          />
                        );
                      })}
                    </CheckboxGroup>
                  </ControlledField>
                </WrapperForm>
              )}
            </SaleType>
          </HeightSaleType>

          <WrapperColumnsDonuts>
            {columns.map((donut) => (
              <ScheduleDonut
                key={Math.random()}
                title={t(donut.trait_type)}
                count={donut.value}
                maxCount={donut.max_count || 1}
              />
            ))}
          </WrapperColumnsDonuts>
        </SaleTypeWrapper>
      </UserAndSaleTypeWrapper>
    </AboutUsWrapper>
  );
};
