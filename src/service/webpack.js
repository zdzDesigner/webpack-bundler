const MemoryFS = require("memory-fs")
const webpack = require('webpack')
const merge = require('webpack-merge')
const opn = require('opn')
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
// var BrowserSync = require('browser-sync-webpack-plugin')

// process.on('message',function(conig){
//     let {webpackBase, webpackExtend, conf} = conig
//     webpackServer(webpackBase, webpackExtend, conf)
// })

module.exports = webpackServer

function webpackServer(webpackBase, webpackExtend, conf){
    // console.log({conf})
    // const memoryFS = new MemoryFS()
    let {mock, port, isflow} = conf
    let webpackConfig = merge.smart(webpackBase, {
        watch: true,
        watchOptions:{
            poll:true
        },
        // devtool: 'cheap-module-eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'APP_MOCK': JSON.stringify(mock),
                'APP_PORT': JSON.stringify(port)
            }),
            new NyanProgressPlugin()

        ]
    })

    if(webpackExtend) webpackConfig = merge.smart(webpackConfig,webpackExtend)

    if (isflow) {
        webpackConfig.module.rules.forEach(function (item) {
            if( item.loader == 'vue-loader'
                && item.options
                && item.options.preLoaders
                && item.options.preLoaders.js){
                let loaders = item.options.preLoaders.js.split('!')
                item.options.preLoaders.js
                    = ['vue-flow-loader'].concat(loaders).join('!')
            }
        })
    }
    // console.log(webpackConfig)
    // console.log(webpackConfig.module.rules[0])

    let webpackCompiler = webpack(webpackConfig)
    // webpackCompiler.outputFileSystem = memoryFS
    // console.log({webpackCompiler})
    return webpackCompiler
}
