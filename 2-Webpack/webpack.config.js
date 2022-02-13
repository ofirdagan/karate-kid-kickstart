const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/webpackTodoList.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: 'dist',
        port: 5001,
        open: true,
        hot: true,
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My todo list',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/styles/*.css'), to: 'styles/[name].css' }            ]
        })
    ],
};