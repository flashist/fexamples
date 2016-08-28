/*var gulp = require("gulp");
var Builder = require('systemjs-builder');

gulp.task(
    "bundle",
    function() {

        // optional constructor options
        // sets the baseURL and loads the configuration file
        var builder = new Builder('./dist', './dist/fconsole/pixi-native/config.js');

        builder
            .bundle('./dist', './dist/fconsole/pixi-native/index.js')
            .then(function () {
                console.log('Build complete');
            })
            .catch(function (err) {
                console.log('Build error');
                console.log(err);
            });
    }
);*/


var gulp = require("gulp");
var Builder = require("systemjs-builder");

gulp.task(
    "bundle",
    function() {
        var builder = new Builder();
        builder.config({
            defaultJSExtensions: true,
            baseURL: "./",
            packages: {
                "fcore": {bundle: "js"},
                "fgraphics": {bundle: "js"},
                "flibs": {bundle: "js"},
                "fconsole": {bundle: "js"}
            },
            map: {
                "fcore": "node_modules/fcore",
                "fgraphics": "node_modules/fgraphics",
                "flibs": "node_modules/flibs",
                "fconsole": "node_modules/fconsole"
            }
        });
        var path = "./src/fconsole/pixi-native/index";
        return builder.buildStatic(
            path,
            "build/result.js"
        ).then(
            function() {
                console.log("COMPLETE! bundle.js");
            }
        ).catch(
            function(err) {
                console.log("ERROR! bundle.js | err: " + err);
            }
        );
    }
);