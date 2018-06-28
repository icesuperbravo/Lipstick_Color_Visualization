// Webpack will grab your React app and run it through babel-loader, translating all of your JSX into JavaScript.
// In order to do this, Webpack needs to know three things:
//
//1.     What JavaScript file it should transform.
//2.     Which transformations it should use on that file.
//3.     Where the new, transformed file should go.
// ---------------------------------------------------------------------
// use 'html-webpack-plugin' to make a new index.js and index.html file in the transformed directory!
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
        template: __dirname + '/app/index.html',  // the template that you're trying to copy and move
        filename: 'index.html',  //the new file name in transformed directory
        inject: 'body'  //inject template script tag in body or header, it should be in BODY because the root container is under body tag
    }
);
// var React=require('react');
// var ReactDom=require('react-dom');
// var App = require('./components/App');
// ReactDom.render(
//     <App />,
//     document.getElementById('app')
// );
module.exports= {
    entry: __dirname + '/app/index.js', //the entry point of your need-to-transform files
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,  //which files will be affected by the loader
                exclude: /node_modules/,  //specify files that match the "test" criteria, that you don't want to be transformed
                loader: "babel-loader"   //Your loader will search for all files ending in ".js", excluding files in the node_modules folder. Whatever files it finds, it will run through the 'babel-loader' transformation.
            }
        ]
    },
    output: {
        filename: "transformed.js",
        path: __dirname+"/build"
    },
    plugins: [HTMLWebpackPluginConfig],
};