const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const pluginsArr = [
  new ExtractTextPlugin('public/style.css', {
    allChunks: true,
  }),
];

if (isDev) pluginsArr.push(new LiveReloadPlugin({ appendScriptTag: true }));

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }, { loader: 'postcss-loader' }],
        }),
      },
    ],
  },

  plugins: pluginsArr,
};

// [
//   'style-loader',
//   { loader: 'css-loader', options: { importLoaders: 1 } },
//   'postcss-loader',
// ]
