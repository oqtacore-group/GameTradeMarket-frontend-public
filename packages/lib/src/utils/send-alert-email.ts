export const SendAlertSNSEmail = async () => {
  const url = process.env.NEXT_PUBLIC_AWS_API_GATEWAY + '/alert-seaport-set-the-price';
  return await fetch(url).then((r) => r.text());
};
