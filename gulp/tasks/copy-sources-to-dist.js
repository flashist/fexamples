var gulp = require("gulp");
var argv = require("yargs").argv;

gulp.task(
    "copy-sources-to-dist",
    function (cb) {
        console.log("START! copy-sources-to-dist.js");

        return gulp.src(
                [
                    "../../**/*.ts",
                    "../../**/*.js",
                    "../../**/*.html",
                    "../../**/*.css",
                    "!../../node_modules",
                    "!../../node_modules/**/*",
                    "!../../dist",
                    "!../../dist/**/*"
                ]
            )
            .pipe(
                gulp.dest("../../dist")
            );
    }
);
