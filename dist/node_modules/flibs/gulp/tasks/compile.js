var gulp = require("gulp");
var shell = require('gulp-shell');
var del = require("del");

gulp.task(
    "compile",
    function (cb) {
        console.log("START! compile.js");

        gulp.src(".", {read: false})
            .pipe(shell([
                "tsc"
            ]))
            .on(
                "end",
                function () {
                    console.log("FINISH! compile.js");
                    cb();
                }

            ).on(
            "error",
            function () {
                console.log("ERROR! compile.js");
            }
        );
    }
);