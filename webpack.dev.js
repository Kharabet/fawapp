const merge = require('webpack-merge');
var webpack = require('webpack');
const common = require('./webpack.common.js');
var path = require('path');

module.exports = merge(common, {
  entry: ['webpack-hot-middleware/client'],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })

  ]
});