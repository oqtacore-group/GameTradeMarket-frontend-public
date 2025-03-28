import { GetServerSideProps } from 'next';
import { routes } from '@game-trade/lib';
import { baseUrl } from '../sitemap.xml';

const debug = false;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticPages = Object.entries(routes)
    .map((item) => item[1])
    .filter((url) => {
      // exclude paths
      if (process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.' && !debug) return '';
      return ![
        routes.chat,
        routes.marketplace,
        routes.manageFriends,
        routes.friendsOfUser,
        routes.account,
        routes.inventory,
        routes.token,
        routes.marketplaceGameName,
        routes.marketplaceDefaultGameName,
      ].includes(url);
    })
    .map((staticPagePath) => baseUrl + staticPagePath);

  const sitemap = staticPages.length
    ? `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((url) => {
        return `
              <url>
                <loc>${url}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
              </url>
            `;
      })
      .join('')}
    </urlset>
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
export default function SitemapStaticPages() {}
