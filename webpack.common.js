const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './demo/index.tsx',
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './demo/public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'demo/public',
          to: './',
          globOptions: {
            ignore: ['**/index.html', '**/.DS_Store'],
          },
        }
      ],
    }),
  ],
}