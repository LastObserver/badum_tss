const webpack = require('webpack')

module.exports = {
  cache: true,
  entry: './app/javascripts/index.js',
  output: {
    // Filename for entry points
    // Only adds hash in build mode
    filename: 'index.js',
    path: __dirname + './dev/javascripts',
  },
  module: {
    loaders: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        test: /\.(png|jpg|jpeg|gif|wav)$/,
        loader: 'file',
      }
    ],
  },
  plugins: [],
  resolve: {
    modules: ['./node_modules']
  },
}
