export type TrackType =
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'WalletAdded'
  | 'ViewContent'
  | 'BuyStart'
  | 'WalletAdded'
  | 'PageView'
  | 'token_list_purchase'
  | 'Mint';

export const dataLayerTrigger = (eventName: string, data: any) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...data,
    });
  }
};

export const trackEventsPixel = (eventName: TrackType, data: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};
