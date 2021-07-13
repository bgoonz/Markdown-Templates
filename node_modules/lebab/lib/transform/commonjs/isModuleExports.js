"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

var _isExports = _interopRequireDefault(require("./isExports"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Matches: module.exports
 * @param  {Object} node
 * @return {Boolean}
 */
var _default = (0, _fMatches.matches)({
  type: 'MemberExpression',
  computed: false,
  object: {
    type: 'Identifier',
    name: 'module'
  },
  property: _isExports["default"]
});

exports["default"] = _default;