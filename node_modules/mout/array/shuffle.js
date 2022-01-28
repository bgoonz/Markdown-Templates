"use strict";
exports.__esModule = true;
var randInt_1 = require("../random/randInt");
/**
 * Shuffle array items.
 */
function shuffle(arr) {
    var results = [];
    var rnd;
    if (arr == null) {
        return results;
    }
    var i = -1;
    var len = arr.length;
    while (++i < len) {
        if (!i) {
            results[0] = arr[0];
        }
        else {
            rnd = randInt_1["default"](0, i);
            results[i] = results[rnd];
            results[rnd] = arr[i];
        }
    }
    return results;
}
exports["default"] = shuffle;
