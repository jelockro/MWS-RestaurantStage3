const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  optimization: {
      usedExports: true
    //   ,splitChunks: {
    //       chunks: 'all'
    //   }
  },
  entry: {
      index: './src/index.js'
  },
  devtool: 'inline-source-map',
//  *** Used with webpack-dev-server ***
//   devServer: {
//       contentBase: './dist',
//       hot: true
//   },
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          template: "./src/templates/index.html",
          filename: "index.html",
          excludeChunks: [ 'server' ]
      }),
    //  *** Used with webpack-dev-server ****  
    //   new webpack.HotModuleReplacementPlugin(),
      new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true
      }),
      new webpack.NoEmitOnErrorsPlugin()

  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }

    },
    {
        test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            'file-loader'
        ]
    },
    {
        test: /\.html$/,
        use: {
            loader: "html-loader",
            //options: { minimize: true }
        }
    }
    ]
  }
};