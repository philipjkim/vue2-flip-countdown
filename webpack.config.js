// config for webpack v3

const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader');
const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.join(__dirname, '/src/FlipCountdown.vue'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'vue2-flip-countdown.js',

    libraryTarget: 'umd',
    library: 'vue2-flip-countdown',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: {
              loader: 'babel-loader',
              options: { presets: ['env'] }
            },
            less: 'vue-style-loader!css-loader!less-loader'
          }
        }
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "vue-style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ]
  },
  optimization: PROD ? {
    minimize: true,
    minimizer: [new TerserPlugin()],
  } : {
    minimize: false
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
