var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

gulp.task(
    "test",
    function (cb) {
        tsProject.src()
            .pipe(ts(tsProject))
            .on(
                "error",
                function () {
                    console.log("ERROR! test.js");
                }
            ).on(
                "finish",
                function() {
                    console.log("FINISH! test.js");
                    cb();
                }
            );
    }
);