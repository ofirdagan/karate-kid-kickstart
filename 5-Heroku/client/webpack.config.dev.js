const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
    mode: "development",
    plugins: [
        new webpack.EnvironmentPlugin({
          TODO_SERVER_URL: "http://localhost:3000"
        })
      ]
});