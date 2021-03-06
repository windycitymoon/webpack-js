const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    open: true,
    openPage: '',
    port: 9000
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: 'jshint-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [  {
                    loader: 'css-loader',
                    query: {
                        modules: false,
                        sourceMap: true,
                        importLoaders: 2,
                    }
                  },
                  'postcss-loader',
                  'sass-loader'
              ]
        })
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['style-loader', 'css-loader']
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'JS Dev Sandbox'
    }),
    new ExtractTextPlugin('app.css'),
    new Dotenv({
      path: './.env'
    })
  ]
}
