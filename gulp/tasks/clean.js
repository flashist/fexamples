var gulp = require("gulp");
var rimraf = require("rimraf");

gulp.task(
    "clean",
    (cb) => {
        console.log("clean start");

        rimraf(
            "./dist/**/*",
            () => {
                console.log("clean callback");
                cb();
            }
        );
    }
);