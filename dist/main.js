/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map