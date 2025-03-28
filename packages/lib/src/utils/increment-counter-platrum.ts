export const PlatrumIncrementCounterBuyingSeaport = async () => {
  const url = process.env.NEXT_PUBLIC_AWS_API_GATEWAY + '/buying-seaport';
  try {
    await fetch(url).then((r) => r.text());
  } catch (e) {
    console.log('Platrum Buy error', e);
  }
};

export const PlatrumIncrementCounterSetThePriceOnGTM = async () => {
  const url = process.env.NEXT_PUBLIC_AWS_API_GATEWAY + '/listings-gtm';
  try {
    await fetch(url).then((r) => r.text());
  } catch (e) {
    console.log('Platrum Set The price error', e);
  }
};
