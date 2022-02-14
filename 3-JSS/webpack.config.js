const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "main.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  devServer: {
    static: "dist",
    port: 5001,
    open: true,
    hot: true,
  },

  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "Todo App",
      filename: "index.html",
      template: path.resolve(__dirname, "temp.html"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "**/*.css", to: path.resolve(__dirname, "dist/[name].css") },
      ],
    }),
  ],
};
