"use strict";

const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'build/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'libpancake.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-1']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'Object.assign': 'imports?this=>global!exports?global.Object.assign!object-assign'
    })
  ]
};
