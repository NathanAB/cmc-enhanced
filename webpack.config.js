const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/main.js',
    './css/night-theme.scss',
  ],
  output: {
    path: `${__dirname}/build`,
    filename: 'js/bundle.js',
  },
  devtool: 'eval',
  module: {
    rules: [{
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }),
    }],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './manifest.json',
        to: './manifest.json',
      },
      {
        from: './icons/*',
        to: './',
      },
      {
        from: './options/*',
        to: './',
      },
    ]),
    new ExtractTextPlugin({
      filename: 'css/style.css',
    }),
  ],
};
