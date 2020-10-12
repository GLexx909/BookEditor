const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      { test: /\.js/, use: 'babel-loader' },
      { test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      base: '/'
    }),
    new MiniCssExtractPlugin()
  ]
}
