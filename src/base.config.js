/**
 * @description webpack 配置
 * @author zdzDesigner
 */
import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'
// var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')


export default getConfig

function getConfig(conf, webpackExtend) {

    var publicPath = conf.publicPath || '/'
    var version = conf.version || 'v0.1.0'
    var title = conf.title || '前端基础构建'
    var dirname = conf.dirname || process.cwd()
    var ENV = process.env.NODE_ENV
    console.log('dirname:',dirname)

    var config = {
        entry: {
            app: dirname + '/src/app/index.js'
        },
        output: {
            path:dirname + '/dist'+ publicPath,
            filename: 'js/[name]_[chunkhash:8].js',
            chunkFilename: 'js/[name]_[chunkhash:8].js',
            publicPath: publicPath
        },

        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  extractCSS: true
                }
            },{
                test: /\.js$/,
                loader: 'babel-loader'
            },{    
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },{    
                test: /\.scss$/,
                // loader: 'css-loader!sass-loader'
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },{
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=18192&name=./images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader:'file-loader?name=./style/fonts/[hash:8].[name].[ext]'
            }]
        },
        resolve: {
            alias: {
                VUEX: path.resolve(dirname, './src/app/model/vuex'),
                VIEW: path.resolve(dirname, './src/app/view'),
                UTIL: path.resolve(dirname, './src/app/util'),
                SERVICE: path.resolve(dirname, './src/app/service')

            }
        },
        externals: {
            'vue':'Vue',
            'vuex':'Vuex',
            'vue-router':'VueRouter',
            'axios':'axios'
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: dirname,
                verbose: true,
                dry: false
            }),
            new webpack.DefinePlugin({
                'APP_ENV': JSON.stringify(ENV),
                'APP_VERSION': JSON.stringify(version)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['manifest'].reverse()
            }),

            new CopyWebpackPlugin([{
                from:'src/app/view/assets/images',
                to: 'images'
            }]),
            new InlineManifestWebpackPlugin(),
            new ExtractTextPlugin('style/app_[chunkhash:8].css'),
            new HtmlWebpackPlugin({
                title:title,
                template:'index.ejs',
                env:ENV ? '':'http://172.16.20.47',
                chunks: ['app'],
                inject:false,
                minify: {
                    collapseWhitespace: true
                }
            })
            
        ]
    }

    return merge.smart(config, webpackExtend)

}
