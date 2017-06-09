const localConfig = {
  host: {
    api: 'http://localhost:8000',
    assets: 'http://localhost:8000',
  },
  publicPath: 'http://localhost:3000/',
};

const prodConfig = {
  host: {
    api: 'http://localhost:8000',
    assets: 'http://localhost:8000',
  },
  publicPath: 'http://localhost:3000/',
};

let config;
switch (process.env.HOST_ENV) {
  case 'production':
    config = prodConfig;
    break;
  default:
    config = localConfig;
    break;
}
module.exports = config;
