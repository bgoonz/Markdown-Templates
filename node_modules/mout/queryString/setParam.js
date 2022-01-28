"use strict";
exports.__esModule = true;
/**
 * Set query string parameter value
 */
function setParam(url, paramName, value) {
    if (url === void 0) { url = ''; }
    var re = new RegExp("(\\?|&)" + paramName + "=[^&]*");
    var param = paramName + "=" + encodeURIComponent(value);
    if (re.test(url)) {
        return url.replace(re, "$1" + param);
    }
    else {
        if (url.indexOf('?') === -1) {
            url += '?';
        }
        if (url.indexOf('=') !== -1) {
            url += '&';
        }
        return url + param;
    }
}
exports["default"] = setParam;
