'use strict';
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: 'node_modules'},
      {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]', exclude: 'node_modules'},
    ]
  },
  devtool: 'source-map'
};
