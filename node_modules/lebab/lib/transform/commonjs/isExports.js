"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

/**
 * Matches just identifier `exports`
 * @param  {Object} node
 * @return {Boolean}
 */
var _default = (0, _fMatches.matches)({
  type: 'Identifier',
  name: 'exports'
});

exports["default"] = _default;