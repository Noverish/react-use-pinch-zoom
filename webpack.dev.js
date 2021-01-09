const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.default(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './demo-dev'),
  },
  devServer: {
    contentBase: './demo-dev',
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
});