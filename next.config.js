/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@azure/communication-calling-effects'] = path.resolve(__dirname, 'src/shims/communication-calling-effects.js');
    return config;
  }
};

module.exports = nextConfig;
