var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
  context: __dirname,

  entry: './assets/js/index',

  output: {

      path: path.join(__dirname, 'assets/bundles'),
      filename: "[name]-[hash].js",
      publicPath: '/static/',


  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
{
            test:/\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'

            ]
        },
        { test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  mode: 'development'

};