/** @type {import('next').NextConfig} */

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  optimizeFonts: true,
  experimental: {
    esmExternals: false,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/blog/:path*',
          destination: `http://52.0.128.24/:path*`,
        },
      ],
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: true,
        async: true,
        issue: {
          include: [{ file: '**/*.{ts,tsx,jsx}' }],
          exclude: [
            { origin: 'eslint', file: '**/public/**/*' },
            { origin: 'eslint', file: '**/.next/**/*' },
          ],
        },
        logger: {
          infrastructure: 'silent',
          issues: 'console',
          devServer: true,
        },
      })
    );

    return config;
  },
};
