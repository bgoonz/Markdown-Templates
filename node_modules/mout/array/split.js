"use strict";
exports.__esModule = true;
/**
 * Split array into a fixed number of segments.
 */
function split(array, segments) {
    if (segments === void 0) { segments = 2; }
    var results = [];
    if (array == null) {
        return results;
    }
    var minLength = Math.floor(array.length / segments);
    var remainder = array.length % segments;
    var i = 0;
    var len = array.length;
    var segmentIndex = 0;
    var segmentLength;
    while (i < len) {
        segmentLength = minLength;
        if (segmentIndex < remainder) {
            segmentLength++;
        }
        results.push(array.slice(i, i + segmentLength));
        segmentIndex++;
        i += segmentLength;
    }
    return results;
}
exports["default"] = split;
