"use strict";
exports.__esModule = true;
var toString_1 = require("../lang/toString");
var replaceAccents_1 = require("./replaceAccents");
var removeNonWord_1 = require("./removeNonWord");
var upperCase_1 = require("./upperCase");
var lowerCase_1 = require("./lowerCase");
/**
 * Convert string to camelCase text.
 */
function camelCase(str) {
    str = toString_1["default"](str);
    str = replaceAccents_1["default"](str);
    str = removeNonWord_1["default"](str).replace(/[\-_]/g, ' '); // convert all hyphens and underscores to spaces
    // handle acronyms
    // matches lowercase chars && uppercase words
    if (/[a-z]/.test(str) && /^|\s[A-Z]+\s|$/.test(str)) {
        // we convert any word that isn't all caps into lowercase
        str = str.replace(/\s(\w+)/g, function (word, m) {
            return /^[A-Z]+$/.test(m) ? word : lowerCase_1["default"](word);
        });
    }
    else if (/\s/.test(str)) {
        // if it doesn't contain an acronym and it has spaces we should
        // convert every word to lowercase
        str = lowerCase_1["default"](str);
    }
    return str
        .replace(/\s[a-z]/g, upperCase_1["default"]) // convert first char of each word to UPPERCASE
        .replace(/^\s*[A-Z]+/g, lowerCase_1["default"]) // convert first word to lowercase
        .replace(/\s+/g, ''); // remove spaces
}
exports["default"] = camelCase;
