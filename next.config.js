require('dotenv').config()

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts|tsx)x?$/,
      },
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  env: {
    AUTH0_SECRET: process.env.REACT_APP_AUTH0_SECRET,
    AUTH0_BASE_URL: `https://${process.env.REACT_APP_REDIRECT_URL}`,
    AUTH0_ISSUER_BASE_URL: `https://${process.env.REACT_APP_AUTH0_SECRET}`,
    AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.REACT_APP_AUTH0_PROFILE_ID,
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  },
};
