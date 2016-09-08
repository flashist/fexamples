(function () {

    // Setting up the SystemJS configuration
    SystemJS.config(
        {
            transpiler: "typescript",
            packages: {
                "src": {defaultExtension: "ts"},
                "fcore": {defaultExtension: "js"},
                "fgraphics": {defaultExtension: "js"},
                "flibs": {defaultExtension: "js"},
                "fconsole": {defaultExtension: "js"},
                "eventemitter3": {defaultExtension: "js"}
            },
            map: {
                "fcore": "node_modules/fcore",
                "fgraphics": "node_modules/fgraphics",
                "flibs": "node_modules/flibs",
                "fconsole": "node_modules/fconsole",
                "eventemitter3": "node_modules/eventemitter3/index.js"
            }
        }
    );
    // Importing the application entry point
    SystemJS.import("src/fconsole/pixi-native/index").then(
        function (value) {
            console.log("The src/fconsole/pixi-native/index was initialized OK! value: ", value);
        },
        function (err) {
            console.error("ERROR! The src/fconsole/pixi-native/index wasn't initialized correctly! err: ", err);
        }
    );

})();