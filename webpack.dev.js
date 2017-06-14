const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('config');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:1337',
    'webpack/hot/only-dev-server',
    './client/src/index.js',
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 1337,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': 'http://localhost:3000',
      '/test': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
    hot: true,
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, 'client/src'), /flexboxgrid/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/client/src/index.html'),
      favicon: path.join(__dirname, '/client/src/favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        CONFIG: JSON.stringify(config),
      },
    }),
  ],
};
