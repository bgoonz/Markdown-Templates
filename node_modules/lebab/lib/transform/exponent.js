"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var _traverser = _interopRequireDefault(require("../traverser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isMathPow = (0, _fMatches.matches)({
  type: 'CallExpression',
  callee: {
    type: 'MemberExpression',
    computed: false,
    object: {
      type: 'Identifier',
      name: 'Math'
    },
    property: {
      type: 'Identifier',
      name: 'pow'
    }
  },
  arguments: function _arguments(args) {
    return args.length === 2;
  }
});

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      if (isMathPow(node)) {
        return {
          type: 'BinaryExpression',
          operator: '**',
          left: node.arguments[0],
          right: node.arguments[1]
        };
      }
    }
  });
}