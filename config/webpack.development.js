const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'scripts/[name][hash:8].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',   // 指定生成的文件名，默认就是 index.html
            template: './src/index.html',  // 指定 html 生成使用用的模版文件，我指定 使用 ```./index.html``` 作为模版文件
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "8081",
        openPage: './index.html',
        proxy: {
            '/':{
                // target: 'https://s.nec.lenovouat.com',//这个是下拉搜索的地址
                target: 'http://admin.nec.lenovouat.cn',
                secure: false,
                changeOrigin: true
            },
        },
        //404 页面返回 index.html
        historyApiFallback: true,
    },
    devtool: 'eval-source-map'
}