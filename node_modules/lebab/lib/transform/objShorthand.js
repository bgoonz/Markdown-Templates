"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../traverser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: propertyToShorthand
  });
}

function propertyToShorthand(node) {
  if (node.type === 'Property' && equalIdentifiers(node.key, node.value)) {
    node.shorthand = true;
  }
}

function equalIdentifiers(a, b) {
  return a.type === 'Identifier' && b.type === 'Identifier' && a.name === b.name;
}