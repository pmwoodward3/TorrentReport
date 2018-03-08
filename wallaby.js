const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config');

const wallabyPostprocessor = wallabyWebpack(webpackConfig);
module.exports = function (wallaby) {
  return {
    files: ['**/*.js'],

    tests: ['**/*.spec.js'],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  };
};
