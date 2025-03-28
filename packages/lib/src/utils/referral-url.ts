export const setReferralURLToCookie = () => {
  if (typeof window === 'undefined') return;
  if (getReferralUrl()) return;
  const referrer_url = document.referrer ? document.referrer : 'direct link';
  document.cookie = 'referrer_url=' + referrer_url;
};

export const getReferralUrl = () => {
  if (typeof window === 'undefined') return;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('referrer_url='))
    ?.split('=')[1];
};

// export const setReferralCodeToLocalStorage = (code: string) => {
//   if (getReferralCode()) return;
//   localStorage.setItem('referral_code', code);
// };
//
// export const getReferralCode = () => {
//   return localStorage.getItem('referral_code');
// };
