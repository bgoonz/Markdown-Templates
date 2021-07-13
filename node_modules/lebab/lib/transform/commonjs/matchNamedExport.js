"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

var _isExports = _interopRequireDefault(require("./isExports"));

var _isModuleExports = _interopRequireDefault(require("./isModuleExports"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Matches: exports.<id> = <value>
 * Matches: module.exports.<id> = <value>
 *
 * When match found, returns object with:
 *
 * - id
 * - value
 *
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
var _default = (0, _fMatches.matches)({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    operator: '=',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: function object(ast) {
        return (0, _isExports["default"])(ast) || (0, _isModuleExports["default"])(ast);
      },
      property: (0, _fMatches.extract)('id', {
        type: 'Identifier'
      })
    },
    right: (0, _fMatches.extractAny)('value')
  }
});

exports["default"] = _default;