const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry:{
        main: path.resolve(__dirname,'src/index.js'),
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    devtool: 'inline-source-map',
    devServer:{
        static: './dist',
        port: 5001,
        open: true,
        hot: true,
    },
    module:{
        rules:[
            //css
            {   test: /\.css$/i , 
                use: ['style-loader','css-loader'],
            },
            //assets
            {   test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/,
                type:'asset/resource'},
            //babel
            {   test: /\.js$/i,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
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
              { from: "src/styles/*.css", to: path.resolve(__dirname,'dist/[name].css')},
            ],
          })
    ]
}