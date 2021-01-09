const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.default(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'demo-build'),
    filename: 'index.[hash].js',
  },
})