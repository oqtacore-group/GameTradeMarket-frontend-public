/** @type {import('next').NextConfig} */

const { merge } = require('webpack-merge');

const { i18n } = require('./i18next');
const commonConfig = require('./common');

module.exports = () => {
  return merge({
    ...commonConfig,
    i18n,
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1400],
      imageSizes: [48, 64, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      domains: ['0psrgnk3l9.execute-api.us-east-1.amazonaws.com', 'storage.gametrade.market', 'cdn-qa.gametrade.market', 'cdn.gametrade.market', 'i0.wp.com', 'i.seadn.io', 'openseauserdata.com', 'polygonscan.com'],
    },
  })
};
