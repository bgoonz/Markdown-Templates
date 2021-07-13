"use strict";
exports.__esModule = true;
var decode_1 = require("./decode");
var getQuery_1 = require("./getQuery");
/**
 * Get query string, parses and decodes it.
 */
function parse(url, shouldTypecast) {
    return decode_1["default"](getQuery_1["default"](url), shouldTypecast);
}
exports["default"] = parse;
