import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { setReferralURLToCookie, setPromoCodeToCookie } from '@game-trade/lib';

export const Referral = () => {
  const router = useRouter();
  const { promoCode } = router.query;

  useEffect(() => {
    setReferralURLToCookie();
  }, []);

  useEffect(() => {
    if (promoCode) setPromoCodeToCookie(promoCode as string);
  }, [promoCode]);
  return <></>;
};
