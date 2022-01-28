"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIncludesComparison = isIncludesComparison;
exports.isNotIncludesComparison = isNotIncludesComparison;

var _matchesIndexOf = require("./matchesIndexOf");

/**
 * True when indexOf() comparison can be translated to includes()
 * @param {Object} matches
 * @return {Boolean}
 */
function isIncludesComparison(_ref) {
  var operator = _ref.operator,
      index = _ref.index;

  switch (operator) {
    case '!==':
    case '!=':
    case '>':
      return (0, _matchesIndexOf.isMinusOne)(index);

    case '>=':
      return (0, _matchesIndexOf.isZero)(index);

    default:
      return false;
  }
}
/**
 * True when indexOf() comparison can be translated to !includes()
 * @param {Object} matches
 * @return {Boolean}
 */


function isNotIncludesComparison(_ref2) {
  var operator = _ref2.operator,
      index = _ref2.index;

  switch (operator) {
    case '===':
    case '==':
      return (0, _matchesIndexOf.isMinusOne)(index);

    case '<':
      return (0, _matchesIndexOf.isZero)(index);

    default:
      return false;
  }
}