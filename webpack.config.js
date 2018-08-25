const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'build'),
      },
    ]),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    // this is here because i'm running webpack inside docker container
    public: `localhost:${process.env.HOST_PORT}`,
    host: '0.0.0.0',
    port: 3000,
  },
}
