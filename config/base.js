const path=require('path')
//自动生成一个html5，插入到dist文件中
const HtmlWebpackPlugin=require('html-webpack-plugin')
//vue必须要加的
const { VueLoaderPlugin } = require('vue-loader')
//css提取
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
//StyleLint
// const StyleLintPlugin = require('stylelint-webpack-plugin');



module.exports={
    //入口
    entry:{
        app:path.resolve(__dirname,'../src/main.js')
    },
    //出口
    output:{
        filename:'[name].[chunkhash].js',
        path:path.resolve(__dirname,'../dist'),
        clean:true
    },
    resolve:{
        // 将 `.ts` 添加为一个可解析的扩展名。
        extensions: ['.ts', '.js']
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader'],
                exclude:file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use:[
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                          // 开启 CSS Modules
                          modules: true,
                          // 自定义生成的类名
                          localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    process.env.NODE_ENV !== 'production'? 'vue-style-loader': MiniCssExtractPlugin.loader,
                ]
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'less-loader'
                ]
            },
            // {
            //     test: /\.ts$/,
            //     loader: 'ts-loader',
            //     options: { appendTsSuffixTo: [/\.vue$/] }
            // },
            // {
            //     test: /\.pug$/,
            //     loader: 'pug-plain-loader'
            // },
            // {
            //     resourceQuery: /blockType=foo/,
            //     loader: 'loader-to-use'
            // },
            // {
            //     resourceQuery: /blockType=docs/,
            //     loader: require.resolve('./docs-loader.js')
            // },
            // {
            //     enforce: 'pre',
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/
            // }
        ]
    },
    plugins:[
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            title:'vue-webpack',
            filename:'index.html'
        }),
        // ... 忽略 vue-loader 插件
        new MiniCssExtractPlugin({
        // filename: 'style.css'
        })
        // new StyleLintPlugin({
        //     files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        // })

    ]
    // extends: [
    //     "plugin:vue/essential"
    //   ]
}