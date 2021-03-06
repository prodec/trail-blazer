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
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3001
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'react-hot!babel?optional[]=runtime&stage=0',
        include: path.join(__dirname, 'src') },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer-loader!sass',
        include: path.join(__dirname, 'src/css') },
      { test: /\.css$/, loader: 'style!css!autoprefixer-loader' },
      { test: /\.png$/, loader: 'url' },
      { test: /\.otf$|\.ttf$|\.svg$|\.eot$|\.woff$/, loader: 'url' }
    ],
    noParse: /proj4\.js$/
  }
};
