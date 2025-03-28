import { Color, ModelPriceSpec, PRICE_MODELS } from '../interfaces';

export const modelPriceType = [
  'is_crypto_required',
  'is_free_to_play',
  'is_game_required',
  'is_nft_required',
  'is_play_to_earn_crypto',
  'is_play_to_earn_nft',
];

export function getPriceModel(model: string, display: boolean): ModelPriceSpec {
  switch (model) {
    case PRICE_MODELS.is_crypto_required:
      return {
        value: 'Crypto required',
        color: Color.Pink,
        display,
      };
    case PRICE_MODELS.is_game_required:
      return {
        value: 'Game required',
        color: Color.Pink,
        display,
      };
    case PRICE_MODELS.is_nft_required:
      return {
        value: 'NFT required',
        color: Color.Pink,
        display,
      };
    case PRICE_MODELS.is_free_to_play:
      return {
        value: 'Free to play',
        color: Color.Blue,
        display,
      };
    case PRICE_MODELS.is_play_to_earn_crypto:
      return {
        value: 'Play & Earn Crypto',
        color: Color.White,
        display,
      };
    case PRICE_MODELS.is_play_to_earn_nft:
      return {
        value: 'Play & Earn NFT',
        color: Color.White,
        display,
      };
    default:
      return {
        value: model,
        color: Color.White,
        display,
      };
  }
}
