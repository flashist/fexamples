var gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("../../webpack.config.js");

gulp.task(
    "webpack",
    () => {
        return gulp.src("src/index.ts")
            .pipe(
                webpackStream(webpackConfig)
            )
            .pipe(
                gulp.dest(webpackConfig.output.path)
            )
    }
);