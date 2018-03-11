const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractPlugin = new ExtractTextPlugin({
   filename: 'main__[name].css'
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['core-js/fn/promise', './js/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    publicPath: '/',
    port: 9000
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      loader:'file-loader'
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader'
    }, {
      test: /\.css$/,
      use: extractPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.ejs',
      title: '🤺 init.ninja'
    }),
    extractPlugin,
    new CleanWebpackPlugin(['dist'])
  ]
}
