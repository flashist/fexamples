var gulp = require("gulp");
var del = require("del");

gulp.task(
    "clean",
    function (cb) {
        console.log("START! clean.js");

        del(["dist/**/*"]).then(
            function() {
                console.log("FINISH! compile.js");
                cb();
            }
        );
    }
);