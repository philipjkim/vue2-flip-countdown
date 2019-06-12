// config for webpack v3

const webpack = require('webpack')
const path = require('path')
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
      }
    ]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      minimize: !!PROD,
      sourceMap: !PROD,
      mangle: !!PROD,
      compress: {
        warnings: !PROD
      }
    })
  ] : []
}
