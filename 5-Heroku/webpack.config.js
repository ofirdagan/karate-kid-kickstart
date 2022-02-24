const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

module.exports = {

    mode: process.env.NODE_ENV||'production',
    entry:{
        main: path.resolve(__dirname,'src/index.js'),
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    devtool: process.env.NODE_ENV === 'development' && 'inline-source-map',
    devServer:{
        static: './dist',
        port: process.env.CLIENT_PORT,
        open: true,
        hot: true,
        proxy: {
            '/todos': {
              target: 'http://localhost:3000',
              secure: false
            }
          }
    },
    module:{
        rules:[
            {   test: /\.css$/i , 
                use: ['style-loader','css-loader'],
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Vanilla TODO',
            filename: 'index.html',
            template: path.resolve(__dirname,'src/index.html')
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/styles/*.css", to: path.resolve(__dirname,'dist/styles.css')},
            ],
          })
    ]
}