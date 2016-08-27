(function () {

    // Setting up the SystemJS configuration
    SystemJS.config(
        {
            transpiler: "typescript",
            packages: {
                src: {
                    defaultExtension: "ts"
                },
                "fcore": {defaultExtension: "js"},
                "fgraphics": {defaultExtension: "js"},
                "flibs": {defaultExtension: "js"},
                "fconsole": {defaultExtension: "js"}
            },
            map: {
                "fcore": "node_modules/fcore",
                "fgraphics": "node_modules/fgraphics",
                "flibs": "node_modules/flibs",
                "fconsole": "node_modules/fconsole"
            }
        }
    );
    // Importing the application entry point
    SystemJS.import("src/pixi-native/index").then(
        function (value) {
            console.log("The pixi-native/index.ts was initialized OK! value: ", value);
        },
        function (err) {
            console.error("ERROR! The pixi-native/index.ts wasn't initialized correctly! err: ", err);
        }
    );

})();