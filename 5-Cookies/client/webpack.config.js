import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

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
    proxy: {
      "/todos": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  externals: {
    jss: "jss",
  },
  plugins: [
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
