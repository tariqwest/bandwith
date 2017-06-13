const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('config');

module.exports = {
  entry: './client/src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CONFIG: JSON.stringify(config),
      },
    }),
  ],
};
