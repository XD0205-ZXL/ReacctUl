// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const path = require("path");
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}`);
const merge = require('webpack-merge');

let webpackConfig = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|otf|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ],
    },
    resolve: {
        //表示在import 文件时文件后缀名可以不写
        extensions: ['.js', '.json', ".css", "scss"],
        // 设置别名
        alias: {
            "@comp": path.resolve(__dirname, "./src/components"),
            "@core": path.resolve(__dirname,"./src/assets")
        }
    }
};

module.exports = merge(webpackConfig, _mergeConfig);