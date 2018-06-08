// Not working via webpack v4 yet: error occurs

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const PROD = process.env.NODE_ENV === 'production'
const MODE = PROD ? 'production' : 'development'
const optimizationConf = PROD ? {
  minimizer: [
    new UglifyJsPlugin({
      cache: !!PROD,
      parallel: !!PROD,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: !!PROD
      },
      sourceMap: !!PROD
    })
  ]
} : {}

module.exports = {
  mode: MODE,
  entry: path.join(__dirname, '/src/FlipCountdown.vue'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'vue-flip-countdown.js',

    libraryTarget: 'umd',
    library: 'vue-flip-countdown',
    umdNamedDefine: true
  },
  optimization: optimizationConf,
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
            less: {
              use: ['vue-style-loader', 'css-loader', 'less-loader']
            }
          }
        }
      }
    ]
  }
}
