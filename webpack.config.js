const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/', 
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    // 'style-loader',
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        // options: {
                            // 开启 CSS Modules
                            // modules: true,
                            // 自定义生成的类名
                            // localIdentName: '[local]_[hash:base64:8]'
                        // }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
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
    resolve: {
        alias: {
            vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
            'vue-router$': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm.js'),
            mixins: path.resolve(__dirname, 'src/mixins'),
            page: path.resolve(__dirname, 'src/page'),
        },
    },
    devtool: 'source-map'
}