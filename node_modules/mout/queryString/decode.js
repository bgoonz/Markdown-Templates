"use strict";
exports.__esModule = true;
var typecast_1 = require("../string/typecast");
var isArray_1 = require("../lang/isArray");
var hasOwn_1 = require("../object/hasOwn");
/**
 * Decode query string into an object of keys => vals.
 */
function decode(queryStr, shouldTypecast) {
    var queryArr = (queryStr || '').replace('?', '').split('&');
    var i = -1;
    var obj = {};
    var equalIndex;
    var cur;
    var pValue;
    var pName;
    while ((cur = queryArr[++i])) {
        equalIndex = cur.indexOf('=');
        pName = cur.substring(0, equalIndex);
        pValue = decodeURIComponent(cur.substring(equalIndex + 1));
        if (shouldTypecast !== false) {
            pValue = typecast_1["default"](pValue);
        }
        if (hasOwn_1["default"](obj, pName)) {
            if (isArray_1["default"](obj[pName])) {
                obj[pName].push(pValue);
            }
            else {
                obj[pName] = [obj[pName], pValue];
            }
        }
        else {
            obj[pName] = pValue;
        }
    }
    return obj;
}
exports["default"] = decode;
