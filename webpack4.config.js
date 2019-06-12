// config for webpack 4.x

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const PROD = process.env.NODE_ENV === 'production'
const MODE = PROD ? 'production' : 'development'
const optimizationConf = PROD ? {
  minimizer: [
    new UglifyJSPlugin({
      uglifyOptions: {
        warning: 'verbose',
        ecma: 6,
        beautify: false,
        compress: false,
        comments: false,
        mangle: false,
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true
      }
    })
  ]
} : {}

module.exports = {
  mode: MODE,
  entry: path.join(__dirname, '/src/FlipCountdown.vue'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'vue2-flip-countdown.js',
    libraryTarget: 'umd',
    library: 'vue2-flip-countdown',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
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
            }
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
