/** @type {import('next').NextConfig} */
const commonConfig = require('./common');

module.exports = {
  ...commonConfig,

  images: {
    domains: ['picsum.photos'],
  },

  trailingSlash: false,
};
