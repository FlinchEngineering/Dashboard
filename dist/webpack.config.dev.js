"use strict";

module.exports = {
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader'
    }]
  }
};