"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../../traverser"));

var _matchesIndexOf = _interopRequireDefault(require("./matchesIndexOf"));

var _comparison = require("./comparison");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      var matches = (0, _matchesIndexOf["default"])(node);

      if (matches && (0, _comparison.isIncludesComparison)(matches)) {
        return createIncludes(matches);
      }

      if (matches && (0, _comparison.isNotIncludesComparison)(matches)) {
        return createNot(createIncludes(matches));
      }
    }
  });
}

function createNot(argument) {
  return {
    type: 'UnaryExpression',
    operator: '!',
    prefix: true,
    argument: argument
  };
}

function createIncludes(_ref) {
  var object = _ref.object,
      searchElement = _ref.searchElement;
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: object,
      property: {
        type: 'Identifier',
        name: 'includes'
      }
    },
    arguments: [searchElement]
  };
}