"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../traverser"));

var _isString = _interopRequireDefault(require("../utils/isString"));

var _copyComments = _interopRequireDefault(require("../utils/copyComments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node, parent) {
      if (node.type === 'ExpressionStatement' && isUseStrictString(node.expression)) {
        (0, _copyComments["default"])({
          from: node,
          to: parent
        });
        this.remove();
      }
    }
  });
}

function isUseStrictString(node) {
  return (0, _isString["default"])(node) && node.value === 'use strict';
}