import { getLangCookies } from '@game-trade/lib/services/i18n/utils';

export enum GetDescriptionQuery {
  getTokenCard = 'getTokenCard',
  getGameCard = 'getGameCard',
}

export const getDescription = async (id: string, query: GetDescriptionQuery) => {
  // id or code
  const lang = getLangCookies();
  const url = process.env.NEXT_PUBLIC_AWS_API_GATEWAY + '/translate';
  return await fetch(url + `?id=${id}&lang=${lang === 'jp' ? 'ja' : lang}&queryName=${query}`).then(
    (r) => r.text()
  );
};
