var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    fs = require("fs"),
    argv = require("yargs").argv,
    map = require("map-stream"),
    file = require("gulp-file"),
    path = require("path"),
    del = require("del");

gulp.task(
    "generate-definitions",
    function(cb) {

        console.log("START! generate-definitions.js");

        var getSafeDirPath = function(dirPath) {
            dirPath += dirPath.charAt(dirPath.length - 1) == "/" ? "" : "/";
            return dirPath;
        };

        var basePath = "./src/";
        console.log("argv.src: " + argv.src);
        argv.src = argv.src ? argv.src : basePath;
        // Adding a closing slash to make correct folder path (if needed)
        // argv.src += argv.src.charAt(argv.src.length - 1) == "/" ? "" : "/";
        argv.src = getSafeDirPath(argv.src);

        console.log("argv.outFile: " + argv.outFile);
        argv.outFile = argv.outFile ? argv.outFile : "index";
        console.log("argv.outDir: " + argv.outDir);
        argv.outDir = argv.outDir ? argv.outDir : "./src/";
        argv.outDir = getSafeDirPath(argv.outDir);

        var delFiles = [
            argv.outDir + argv.outFile + ".ts",
            argv.outDir + argv.outFile + ".d.ts",
            argv.outDir + argv.outFile + ".js",
            argv.outDir + argv.outFile + ".js.map"
        ];
        console.log("delFiles: " + delFiles);
        var outFileName = argv.outFile + ".ts";
        console.log("outFileName: " + outFileName);

        del(delFiles).then(
            function (paths) {

                var resultDeclarationText = "";
                var processFile = function(file, cb) {

                    var importPath = path.relative(basePath, file.path);
                    if (importPath.indexOf(".d.ts") != -1) {
                        importPath = importPath.substr(0, importPath.lastIndexOf(".d.ts"));
                    }else if (importPath.indexOf(".ts") != -1) {
                        importPath = importPath.substr(0, importPath.lastIndexOf(".ts"));
                    }
                    console.log(importPath);

                    resultDeclarationText += "export * from '" + "./" + importPath + "'";
                    resultDeclarationText += "\n";

                    cb(null, file);
                };


                var tempSettings = [argv.src + "**/*.ts", "!./**/*.d.ts"];

                gulp.src(tempSettings)
                    .pipe(map(processFile))
                    .on(
                        "end",
                        function () {

                            file(outFileName, resultDeclarationText)
                                .pipe(gulp.dest(argv.outDir));

                            console.log("FINISH! generate-definitions.js");
                            cb();
                        }
                    );
            }
        );
    }
);