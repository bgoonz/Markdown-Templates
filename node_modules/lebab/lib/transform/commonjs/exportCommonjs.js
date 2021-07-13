"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../../traverser"));

var _matchDefaultExport = _interopRequireDefault(require("./matchDefaultExport"));

var _matchNamedExport = _interopRequireDefault(require("./matchNamedExport"));

var _functionType = require("../../utils/functionType");

var _ExportNamedDeclaration = _interopRequireDefault(require("../../syntax/ExportNamedDeclaration"));

var _VariableDeclaration = _interopRequireDefault(require("../../syntax/VariableDeclaration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast, logger) {
  _traverser["default"].replace(ast, {
    enter: function enter(node, parent) {
      var m;

      if (m = (0, _matchDefaultExport["default"])(node)) {
        if (parent.type !== 'Program') {
          logger.warn(node, 'export can only be at root level', 'commonjs');
          return;
        }

        return exportDefault(m, node.comments);
      } else if (m = (0, _matchNamedExport["default"])(node)) {
        if (parent.type !== 'Program') {
          logger.warn(node, 'export can only be at root level', 'commonjs');
          return;
        }

        return exportNamed(m, node.comments);
      }
    }
  });
}

function exportDefault(_ref, comments) {
  var value = _ref.value;
  return {
    type: 'ExportDefaultDeclaration',
    declaration: value,
    comments: comments
  };
}

function exportNamed(_ref2, comments) {
  var id = _ref2.id,
      value = _ref2.value;

  if ((0, _functionType.isFunctionExpression)(value)) {
    // Exclude functions with different name than the assigned property name
    if (compatibleIdentifiers(id, value.id)) {
      return new _ExportNamedDeclaration["default"]({
        declaration: functionExpressionToDeclaration(value, id),
        comments: comments
      });
    }
  } else if (value.type === 'ClassExpression') {
    // Exclude classes with different name than the assigned property name
    if (compatibleIdentifiers(id, value.id)) {
      return new _ExportNamedDeclaration["default"]({
        declaration: classExpressionToDeclaration(value, id),
        comments: comments
      });
    }
  } else if (value.type === 'Identifier') {
    return new _ExportNamedDeclaration["default"]({
      specifiers: [{
        type: 'ExportSpecifier',
        exported: id,
        local: value
      }],
      comments: comments
    });
  } else {
    return new _ExportNamedDeclaration["default"]({
      declaration: new _VariableDeclaration["default"]('var', [{
        type: 'VariableDeclarator',
        id: id,
        init: value
      }]),
      comments: comments
    });
  }
} // True when one of the identifiers is null or their names are equal.


function compatibleIdentifiers(id1, id2) {
  return !id1 || !id2 || id1.name === id2.name;
}

function functionExpressionToDeclaration(func, id) {
  func.type = 'FunctionDeclaration';
  func.id = id; // Transform <expression> to { return <expression>; }

  if (func.body.type !== 'BlockStatement') {
    func.body = {
      type: 'BlockStatement',
      body: [{
        type: 'ReturnStatement',
        argument: func.body
      }]
    };
  }

  return func;
}

function classExpressionToDeclaration(cls, id) {
  cls.type = 'ClassDeclaration';
  cls.id = id;
  return cls;
}