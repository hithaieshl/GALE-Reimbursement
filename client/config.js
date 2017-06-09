import merge from 'lodash/merge';

const browser = typeof window !== 'undefined';

const config = {
  all: {
    env: process.env.HOST_ENV || 'development',
    apiUrl: process.env.API_URL || 'http://localhost:8000',
    assetsUrl: process.env.ASSESTS_URL || 'http://localhost:8000',
    publicPath: process.env.PUBLIC_PATH || 'http://localhost:3000/',
    browser
  },
  develop: {},
  QA: {},
  UAT: {},
  production: {}
};

module.exports = merge(config.all, config[config.all.env]);

export default module.exports;
