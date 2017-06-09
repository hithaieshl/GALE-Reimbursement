const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const packageJson = require(path.join(process.cwd(), 'package.json'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const publicPath = process.env.PUBLIC_PATH || '/';
const sourcePath = path.join(process.cwd(), 'client');
const outputPath = path.join(process.cwd(), 'dist');

const pageTitle = packageJson.webpackHtml.title;
const devPublicPath = packageJson.webpackHtml.devPublicPath;

const config = {
  entry: {
    app: path.join(process.cwd(), 'client/index.jsx'),
  },
  output: {
    path: outputPath,
    filename: 'js/[name].[hash].js',
    publicPath,
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.scss'],
    modules: [
      path.join(process.cwd(), 'client'),
      path.join(process.cwd(), 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: new RegExp('/node_modules/(?!(unchained-ui-react|unchained-ui))'),
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: new RegExp('/node_modules\/(?!(unchained-ui))'),
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'images/',
              limit: 8000,
              mimetype: 'image/png',
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /(\.jpg|\.jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'images/',
              limit: 8000,
              mimetype: 'image/jpeg',
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'image/svg+xml',
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-woff2',
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-ttf',
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              prefix: 'fonts/',
              limit: 8000,
              mimetype: 'application/font-eot',
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      'process.env.HOST_ENV': JSON.stringify(process.env.HOST_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.ASSESTS_URL': JSON.stringify(process.env.ASSESTS_URL),
    }),
    new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    }
  );

  config.plugins.push(
    new ProgressPlugin(),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: {
        collapseactivityBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        html5: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
      template: path.join(process.cwd(), 'public/index.html'),
      title: pageTitle,
      version: packageJson.version,
    }),
    new HtmlWebpackPlugin({
      filename: 'preview.html',
      template: path.join(process.cwd(), 'public/preview.html'),
      title: pageTitle,
      version: packageJson.version,
    }),
    new HtmlWebpackPlugin({
      filename: 'cms_embed.html',
      minify: {
        collapseactivityBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        html5: true,
        minifyJS: true,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
      template: path.join(process.cwd(), 'public/cms_embed.html'),
      title: pageTitle,
      version: packageJson.version,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    })
  );

  config.stats = {
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
  };
} else {
  config.devtool = 'eval-source-map';

  config.module.rules.push(
    {
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        'eslint-loader',
      ],
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?sourceMap=true', 'resolve-url-loader'],
      }),
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?sourceMap=true', 'resolve-url-loader', 'sass-loader?sourceMap=true&precision=8'],
      }),
    }
  );

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/local.html'),
      title: pageTitle,
      version: packageJson.version,
      devPublicPath: devPublicPath,
    })
  );

  config.devServer = {
    contentBase: 'public',
    stats: 'errors-only',
    historyApiFallback: { index: publicPath },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    host,
    port,
  };
}

module.exports = config;
