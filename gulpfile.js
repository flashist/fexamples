var gulp = require("gulp");
var runSequence = require("run-sequence");
var requireDir = require("require-dir");
var argv = require("yargs").argv;
var shell = require('gulp-shell');

var tasks = requireDir("./gulp/tasks");

/*gulp.task(
    "build",
    [
        "clean",
        "generate-definitions",
        "compile",
        "webpack",
        "copy-sources-to-dist"
    ]
);*/

gulp.task(
    "build",
    function(cb) {
        runSequence(
            "clean",
            "generate-definitions",
            "compile",
            // "webpack",
            // "copy-sources-to-dist",
            () => {
                cb();
            }
        );
    }
);

gulp.task(
    "build.dev",
    function(cb) {
        console.log("START! build.dev");

        runSequence(
            "build",
            function () {
                return gulp.src(["."], {read: false})
                    .pipe(shell(["gulp copy --to " + argv.to]))
                    .on(
                        "end",
                        function () {
                            console.log("END! build.dev");

                            cb();
                        }
                    )
            }
        );
    }
);

// Default
gulp.task("default", ["build"]);