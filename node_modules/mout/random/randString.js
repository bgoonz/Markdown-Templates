"use strict";
exports.__esModule = true;
var isNumber_1 = require("../lang/isNumber");
var isString_1 = require("../lang/isString");
var randInt_1 = require("./randInt");
var defaultDictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function randomString(length, dictionary) {
    if (!isNumber_1["default"](length) || length <= 0) {
        length = 8;
    }
    if (!isString_1["default"](dictionary) || dictionary.length < 1) {
        dictionary = defaultDictionary;
    }
    var result = '';
    var domain = dictionary.length - 1;
    while (length--) {
        result += dictionary[randInt_1["default"](0, domain)];
    }
    return result;
}
exports["default"] = randomString;
