export enum FIELD_FORM {
  description = 'description',
  rating = 'rating',
}

export enum FIELD_RATE {
  HighlyNotRecommended = 'highlyNotRecommended',
  NotRecommended = 'notRecommended',
  Neutral = 'neutral',
  Recommended = 'recommended',
  HighlyRecommended = 'highlyRecommended',
}

export enum HEADLINE_RATE {
  HighlyNotRecommended = 'highlyNotRecommended',
  NotRecommended = 'notRecommended',
  Neutral = 'neutral',
  Recommended = 'recommended',
  HighlyRecommended = 'highlyRecommended',
}

export type Form = {
  [FIELD_FORM.description]: string;
  [FIELD_FORM.rating]: number;
};

export enum PRICE_MODELS {
  is_crypto_required = 'is_crypto_required',
  is_free_to_play = 'is_free_to_play',
  is_game_required = 'is_game_required',
  is_nft_required = 'is_nft_required',
  is_play_to_earn_crypto = 'is_play_to_earn_crypto',
  is_play_to_earn_nft = 'is_play_to_earn_nft',
}

export interface ModelPriceSpec {
  value: string;
  color: string;
  display: boolean;
}

export enum Color {
  Blue = 'blue',
  White = 'white',
  Pink = 'pink',
}

export enum APP_KIND {
  Android = 'ANDROID',
  Ios = 'IOS',
  Linux = 'LINUX',
  Mac = 'MAC',
  Web = 'WEB',
  Windows = 'WINDOWS',
}

export type TAppLink = {
  link: string;
  type: APP_KIND;
};
