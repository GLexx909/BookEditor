const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const ClosurePlugin = require('closure-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist/assets')
  },
  resolve: {
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules']
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
    ],
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      base: '/'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new WebpackManifestPlugin()
  ],

  // optimization: {
  //   minimize: true,
  //   minimizer: [new ClosurePlugin()],
  //   minimizer: [new TerserPlugin()],
  // },
}
