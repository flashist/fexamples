var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var webpack = require("webpack");
var outDir = path.resolve("./dist");

var entries = glob.sync("./src/**/*.js");

var loaders = [
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts",
        include: path.join(__dirname, "src")
    }
];

module.exports = {
    bundleName: "build.js",
    entry: entries,
    output: {
        path: outDir,
        filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".js", ".ts"]
    },

    module: {
        loaders: loaders.concat()
    },

    ts: {
        configFileName: "./tsconfig.json"
    }
};