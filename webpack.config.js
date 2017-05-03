var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractHTML = new ExtractTextPlugin('index.html');
var extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },

  entry: {
    'script': './scripts/index.js',
    'style': './styles/index.scss',
    'index': './index.html',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: extractHTML.extract({
          use: ['html-loader?attrs=link:href'],
        }),
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)\//,
        use: ['babel-loader'],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg.*)$/,
        use: [{
          loader: 'file-loader',
          query: {useRelativePath: false},
        }, 'img-loader'],
      },
      {
        test: /\.(ttf.*|eot.*|woff.*|ogg|mp3)$/,
        use: [{
          loader: 'file-loader',
          query: {useRelativePath: false},
        }],
      },
    ],
  },

  plugins: [
    extractHTML,
    extractCSS,
  ],
};
