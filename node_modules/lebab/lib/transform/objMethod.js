"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var _traverser = _interopRequireDefault(require("../traverser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var matchTransformableProperty = (0, _fMatches.matches)({
  type: 'Property',
  key: {
    type: 'Identifier'
  },
  value: {
    type: 'FunctionExpression',
    id: (0, _fMatches.extractAny)('functionName')
  },
  method: false,
  computed: false,
  shorthand: false
});

function _default(ast, logger) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      var match = matchTransformableProperty(node);

      if (match) {
        // Do not transform functions with name,
        // as the name might be recursively referenced from inside.
        if (match.functionName) {
          logger.warn(node, 'Unable to transform named function', 'obj-method');
          return;
        }

        node.method = true;
      }
    }
  });
}