const merge = require('webpack-merge');
const common = require('./webpack.common.js');
JscramblerWebpack = require('jscrambler-webpack-plugin');
module.exports = merge(common, {
plugins: [
  new JscramblerWebpack({
    enable: true, // optional, defaults to true
    chunks: ['app'], // optional, defaults to all chunks
    // and other jscrambler configurations
  })
]});