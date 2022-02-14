const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports={
    mode:"production",
    entry:'./toDoListApp.js',
    output:{
        filename: 'main.js'
    },
    devtool: 'source-map',
    devServer: {
        static: 'dist',
        port: 8080,
        open: true
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './index.html', to: './index.html' },
                { from: './styles.css', to: './styles.css' },
            ]
        })
    ]
}