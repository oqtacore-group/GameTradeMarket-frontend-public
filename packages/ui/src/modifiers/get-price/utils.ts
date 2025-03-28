import { GameCurrency } from '@game-trade/lib/codegen-types';

export const checkNativeCurrency = (coin_address?: string | null) => {
  return (
    !coin_address ||
    coin_address === '0x0000000000000000000000000000000000000000' ||
    coin_address === null
  );
};

export const getTokenCurrencyName = (
  currencies?: GameCurrency[],
  coin_address?: string | null | undefined
) => {
  return currencies?.find((item) => {
    return item.contract_address?.toLocaleLowerCase() === coin_address;
  })?.coin_name;
};
