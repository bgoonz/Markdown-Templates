"use strict";
exports.__esModule = true;
var forEach_1 = require("../array/forEach");
var identity_1 = require("../function/identity");
var makeIterator_1 = require("../function/makeIterator_");
/**
 * Bucket the array values.
 */
function groupBy(arr, categorize, thisObj) {
    if (categorize) {
        categorize = makeIterator_1["default"](categorize, thisObj);
    }
    else {
        // Default to identity function.
        categorize = identity_1["default"];
    }
    var buckets = {};
    forEach_1["default"](arr, function (element) {
        var bucket = categorize(element);
        if (!(bucket in buckets)) {
            buckets[bucket] = [];
        }
        buckets[bucket].push(element);
    });
    return buckets;
}
exports["default"] = groupBy;
