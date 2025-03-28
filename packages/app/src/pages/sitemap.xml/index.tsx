import { GetServerSideProps } from 'next';

const debug = false;
export const baseUrl = `https://${
  process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
}gametrade.market`;

const SitemapStaticPages = ['/sitemap-0.xml'];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const tokens: string[] = [];
  const games: string[] = [];
  const sitemaps: string[] = SitemapStaticPages;

  await fetch('https://api.gametrade.market/api/sitemap-info')
    .then((response) => response.json())
    .then((data) => {
      for (let i = data.gamesChunkCount - 1; i >= 0; i--) {
        games.push(
          'https://storage.gametrade.market/games/sitemap-marketplace-chunk-' + i + '.xml'
        );
      }
    });

  await fetch('https://api.gametrade.market/api/sitemap-info')
    .then((response) => response.json())
    .then((data) => {
      for (let i = data.tokensChunkCount - 1; i >= 0; i--) {
        tokens.push(
          'https://storage.gametrade.market/tokens/sitemap-marketplace-chunk-' + i + '.xml'
        );
      }
    });

  const sitemap =
    process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.' && !debug
      ? ''
      : !!tokens.length || !!games.length || !!sitemaps.length
      ? `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${
        !!games.length &&
        games
          .map((item) => {
            return `<sitemap>
                      <loc>${item}</loc>
                    </sitemap>`;
          })
          .join('')
      }
      ${
        !!tokens.length &&
        tokens
          .map((item) => {
            return `<sitemap>
                      <loc>${item}</loc>
                    </sitemap>`;
          })
          .join('')
      }
      ${
        !!sitemaps.length &&
        sitemaps
          .map((item) => {
            return `<sitemap>
                      <loc>${baseUrl + item}</loc>
                    </sitemap>`;
          })
          .join('')
      }
    </sitemapindex>
  `
      : '';

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapIndex() {}
