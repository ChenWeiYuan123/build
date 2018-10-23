const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/', 
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: true,
            template: './src/index.html',
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./dll/vendor.manifest.json'),
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dll/vendor.js'),
            hash: true,
            includeSourcemap: false,
        }),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: '[name].js.map',
        //     exclude: ['vendor.js']
        // }),
    ],
    devServer: {
        // hot: true,
        publicPath: '/public/',
        contentBase: path.resolve(__dirname, 'public'),
    },
    // devtool: 'source-map'
}