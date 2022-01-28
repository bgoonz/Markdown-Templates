"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../traverser"));

var _multiReplaceStatement = _interopRequireDefault(require("../utils/multiReplaceStatement"));

var _VariableDeclaration = _interopRequireDefault(require("../syntax/VariableDeclaration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast, logger) {
  _traverser["default"].traverse(ast, {
    enter: function enter(node, parent) {
      if (node.type === 'VariableDeclaration' && node.declarations.length > 1) {
        splitDeclaration(node, parent, logger);
        return _traverser["default"].VisitorOption.Skip;
      }
    }
  });
}

function splitDeclaration(node, parent, logger) {
  var declNodes = node.declarations.map(function (declarator) {
    return new _VariableDeclaration["default"](node.kind, [declarator]);
  });

  try {
    (0, _multiReplaceStatement["default"])({
      parent: parent,
      node: node,
      replacements: declNodes,
      preserveComments: true
    });
  } catch (e) {
    logger.warn(parent, "Unable to split var statement in a ".concat(parent.type), 'multi-var');
  }
}