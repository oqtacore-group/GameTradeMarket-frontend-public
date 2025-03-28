export const setPromoCodeToCookie = (code: string) => {
  if (typeof window === 'undefined') return;
  if (getPromoCode()) return;
  document.cookie = 'promo_code=' + code;
};

export const resetPromoCode = (code: string) => {
  if (typeof window === 'undefined') return;
  document.cookie = 'promo_code=' + code;
};

export const getPromoCode = () => {
  if (typeof window === 'undefined') return;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('promo_code='))
    ?.split('=')[1];
};
