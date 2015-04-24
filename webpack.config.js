var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/js/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['jsx-loader?harmony', 'react-hot', 'babel'], include: path.join(__dirname, 'src') },
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss?$/, loader: 'style!css!sass', include: path.join(__dirname, 'src/css') }
    ]
  }
};
