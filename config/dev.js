const { merge }=require('webpack-merge')
const base=require('./base.js')
const path=require('path')

module.exports=merge(base,{
    mode:'development',
    //解决控制台报错时“行号对不住”的问题，比如报的是Es5行好错误跟Es6的对不上
    devtool:'inline-source-map',
    devServer:{
        port:10086,
        hot:true,
        contentBase:path.resolve(__dirname,'../public')
    },
    module:{
        rules:[]
    },
    plugins:[]
})


