const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = {
  entry: {
    app: ['./src/js/app.js', './src/scss/app.scss']
  },
  output: {
    path: path.resolve('dist/'),
    filename: '[name].js',
    publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          plugins: ['babel-plugin-transform-class-properties'],
          presets: [
            ['env', { modules: false }],
          ],
        },
        exclude: /node_modules/,
      },
      { test: /\.json$/, loaders: ['json-loader'] },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        exclude: [/src\/img/],
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)/,
        exclude: [/node_modules/, /src\/fonts/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    // new CleanPlugin({}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin(
      [
        { from: './src/media', to: './media' },
        { from: './src/views', to: './' },
      ],
      { copyUnmodified: true },
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', './src/js']
  }
}

module.exports = common;
