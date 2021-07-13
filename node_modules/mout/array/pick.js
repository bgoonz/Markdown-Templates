"use strict";
exports.__esModule = true;
var randInt_1 = require("../random/randInt");
/**
 * Remove random item(s) from the Array and return it.
 * Returns an Array of items if [nItems] is provided or a single item if
 * it isn't specified.
 */
function pick(arr, nItems) {
    if (nItems != null) {
        var result = [];
        if (nItems > 0 && arr && arr.length) {
            nItems = nItems > arr.length ? arr.length : nItems;
            while (nItems--) {
                result.push(pickOne(arr));
            }
        }
        return result;
    }
    return arr && arr.length ? pickOne(arr) : void 0;
}
function pickOne(arr) {
    var idx = randInt_1["default"](0, arr.length - 1);
    return arr.splice(idx, 1)[0];
}
exports["default"] = pick;
