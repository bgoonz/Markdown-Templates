"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

var _isModuleExports = _interopRequireDefault(require("./isModuleExports"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Matches: module.exports = <value>
 *
 * When match found, return object with:
 *
 * - value
 *
 * @param  {Object} node
 * @return {Object|Boolean}
 */
var _default = (0, _fMatches.matches)({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    operator: '=',
    left: _isModuleExports["default"],
    right: (0, _fMatches.extractAny)('value')
  }
});

exports["default"] = _default;