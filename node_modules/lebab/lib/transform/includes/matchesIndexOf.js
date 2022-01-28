"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.isZero = exports.isMinusOne = void 0;

var _fMatches = require("f-matches");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Matches: -1
 */
var isMinusOne = (0, _fMatches.matches)({
  type: 'UnaryExpression',
  operator: '-',
  argument: {
    type: 'Literal',
    value: 1
  },
  prefix: true
});
/**
 * Matches: 0
 */

exports.isMinusOne = isMinusOne;
var isZero = (0, _fMatches.matches)({
  type: 'Literal',
  value: 0
}); // Matches: object.indexOf(searchElement)

exports.isZero = isZero;
var matchesCallIndexOf = (0, _fMatches.matches)({
  type: 'CallExpression',
  callee: {
    type: 'MemberExpression',
    computed: false,
    object: (0, _fMatches.extractAny)('object'),
    property: {
      type: 'Identifier',
      name: 'indexOf'
    }
  },
  arguments: (0, _fMatches.matchesLength)([(0, _fMatches.extractAny)('searchElement')])
}); // Matches: -1 or 0

var matchesIndex = (0, _fMatches.extract)('index', function (v) {
  return isMinusOne(v) || isZero(v);
}); // Matches: object.indexOf(searchElement) <operator> index

var matchesIndexOfNormal = (0, _fMatches.matches)({
  type: 'BinaryExpression',
  operator: (0, _fMatches.extractAny)('operator'),
  left: matchesCallIndexOf,
  right: matchesIndex
}); // Matches: index <operator> object.indexOf(searchElement)

var matchesIndexOfReversed = (0, _fMatches.matches)({
  type: 'BinaryExpression',
  operator: (0, _fMatches.extractAny)('operator'),
  left: matchesIndex,
  right: matchesCallIndexOf
}); // Reverses the direction of comparison operator

function reverseOperator(operator) {
  return operator.replace(/[><]/, function (op) {
    return op === '>' ? '<' : '>';
  });
}

function reverseOperatorField(match) {
  if (!match) {
    return false;
  }

  return _objectSpread(_objectSpread({}, match), {}, {
    operator: reverseOperator(match.operator)
  });
}
/**
 * Matches:
 *
 *    object.indexOf(searchElement) <operator> index
 *
 * or
 *
 *    index <operator> object.indexOf(searchElement)
 *
 * On success returns object with keys:
 *
 * - object
 * - searchElement
 * - operator
 * - index
 *
 * @param  {Object} node
 * @return {Object}
 */


function _default(node) {
  return matchesIndexOfNormal(node) || reverseOperatorField(matchesIndexOfReversed(node));
}