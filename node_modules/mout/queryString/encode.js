"use strict";
exports.__esModule = true;
var forOwn_1 = require("../object/forOwn");
var isArray_1 = require("../lang/isArray");
var forEach_1 = require("../array/forEach");
/**
 * Encode object into a query string.
 */
function encode(obj) {
    var query = [];
    var arrValues;
    var reg;
    forOwn_1["default"](obj, function (val, key) {
        if (isArray_1["default"](val)) {
            arrValues = key + "=";
            reg = new RegExp("&" + key + "+=$");
            forEach_1["default"](val, function (aValue) {
                arrValues += encodeURIComponent(aValue) + "&" + key + "=";
            });
            query.push(arrValues.replace(reg, ''));
        }
        else {
            query.push(key + "=" + encodeURIComponent(val));
        }
    });
    return query.length ? "?" + query.join('&') : '';
}
exports["default"] = encode;
