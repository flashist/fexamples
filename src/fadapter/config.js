(function () {

    // Setting up the SystemJS configuration
    SystemJS.config(
        {
            transpiler: "typescript",
            packages: {
                "eventemitter3": {defaultExtension: "js"},
                "pixi.js": {defaultExtension: "js"},

                "src": {defaultExtension: "ts"},
                "fcore": {defaultExtension: "js"},
                "fadapter": {defaultExtension: "js"}
                // "fgraphics": {defaultExtension: "js"},
                // "flibs": {defaultExtension: "js"},
                // "fconsole": {defaultExtension: "js"},
            },
            map: {
                "eventemitter3": "node_modules/eventemitter3/index.js",
                "pixi.js": "node_modules/pixi.js/bin/pixi.js",

                "fcore": "node_modules/fcore",
                "fadapter": "node_modules/fadapter"
                /*"fgraphics": "node_modules/fgraphics",
                "flibs": "node_modules/flibs",
                "fconsole": "node_modules/fconsole",*/
            }
        }
    );
    // Importing the application entry point
    SystemJS.import("src/fadapter/index").then(
        function (value) {
            console.log("The src/fadapter/index was initialized OK! value: ", value);
        },
        function (err) {
            console.error("ERROR! The src/fadapter/index wasn't initialized correctly! err: ", err);
        }
    );

})();