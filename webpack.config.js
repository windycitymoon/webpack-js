const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    port: 9000
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','postcss-loader']
        })
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [  {
                    loader: 'css-loader',
                    query: {
                        modules: true,
                        sourceMap: true,
                        importLoaders: 2,
                    }
                  },
                  'sass-loader'
              ]
        })
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'JS Sandbox'
    }),
    new ExtractTextPlugin('style.css')
  ]
}
