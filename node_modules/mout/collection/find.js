"use strict";
exports.__esModule = true;
var make_1 = require("./make_");
var find_1 = require("../array/find");
var find_2 = require("../object/find");
/**
 * Find value that returns true on iterator check.
 */
exports["default"] = make_1["default"](find_1["default"], find_2["default"]);
