var gulp = require("gulp"),
    requireDir = require("require-dir"),
    tasks = requireDir("./gulp/tasks"),
    runSequence = require("run-sequence"),
    argv = require("yargs").argv,
    shell = require('gulp-shell');

gulp.task(
    "build",
    function(cb) {
        runSequence(
            "clean",
            "test",
            "generate-definitions",
            "compile",
            cb
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