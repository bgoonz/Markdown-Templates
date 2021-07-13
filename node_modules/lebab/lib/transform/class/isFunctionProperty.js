"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

var _isTransformableToMethod = _interopRequireDefault(require("./isTransformableToMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Matches: <ident>: function() { ... }
 *
 * @param {Object} node
 * @return {Boolean}
 */
var _default = (0, _fMatches.matches)({
  type: 'Property',
  key: {
    type: 'Identifier' // name: <ident>

  },
  computed: false,
  value: _isTransformableToMethod["default"]
});

exports["default"] = _default;