import { Category, Title, List, Item } from './style';
import Link from 'next/link';
import { SvgIconHeartFilled, SvgPolygonMaticLogo, SvgGamepad } from '@game-trade/icons';
import { IGenreData } from '@game-trade/ui/components/filters-games-items/form/blocks/genres';
import { IBlockchainData } from '@game-trade/ui/components/filters-games-items/form/blocks/blockchains';
import { useTranslation } from 'next-i18next';

interface IProps {
  genres?: IGenreData[];
  blockchains?: IBlockchainData[];
  recommended?: any;
}

export const Categories = ({ genres, blockchains, recommended }: IProps) => {
  const { t } = useTranslation('homePage', { keyPrefix: 'translation' });
  return (
    <>
      {recommended && (
        <Category>
          <Title>
            <SvgIconHeartFilled />
            Recommended
          </Title>
          <List>
            <Item>
              <Link href="https://google.com">Undead</Link>
            </Item>
            <Item>
              <Link href="https://google.com">Blocks</Link>
            </Item>
            <Item>
              <Link href="https://google.com">Neon</Link>
            </Item>
            <Item>
              <Link href="https://google.com">District</Link>
            </Item>
          </List>
        </Category>
      )}
      {genres && (
        <Category>
          <Title>
            <SvgGamepad />
            {t('findByGenre')}
          </Title>
          <List>
            {genres.map((item) => {
              return (
                <Item key={item.code}>
                  <Link href={`/games?genreCodes[]=${item.code}`}>{item.title}</Link>
                </Item>
              );
            })}
          </List>
        </Category>
      )}
      {blockchains && (
        <Category>
          <Title>
            <SvgPolygonMaticLogo color={'white'} />
            {t('findByBlockchain')}
          </Title>
          <List>
            {blockchains.map((item) => {
              return (
                <Item key={item.code}>
                  <Link href={`/games?blockchains[]=${item.code}`}>{item.title}</Link>
                </Item>
              );
            })}
          </List>
        </Category>
      )}
    </>
  );
};
