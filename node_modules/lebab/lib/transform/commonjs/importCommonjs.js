"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../../traverser"));

var _isVarWithRequireCalls = _interopRequireDefault(require("./isVarWithRequireCalls"));

var _matchRequire = require("./matchRequire");

var _multiReplaceStatement = _interopRequireDefault(require("../../utils/multiReplaceStatement"));

var _ImportDeclaration = _interopRequireDefault(require("../../syntax/ImportDeclaration"));

var _ImportSpecifier = _interopRequireDefault(require("../../syntax/ImportSpecifier"));

var _ImportDefaultSpecifier = _interopRequireDefault(require("../../syntax/ImportDefaultSpecifier"));

var _VariableDeclaration = _interopRequireDefault(require("../../syntax/VariableDeclaration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast, logger) {
  _traverser["default"].replace(ast, {
    enter: function enter(node, parent) {
      if ((0, _isVarWithRequireCalls["default"])(node)) {
        if (parent.type !== 'Program') {
          logger.warn(node, 'import can only be at root level', 'commonjs');
          return;
        }

        (0, _multiReplaceStatement["default"])({
          parent: parent,
          node: node,
          replacements: node.declarations.map(function (dec) {
            return varToImport(dec, node.kind);
          }),
          preserveComments: true
        });
      }
    }
  });
} // Converts VariableDeclarator to ImportDeclaration when we recognize it
// as such, otherwise converts it to full VariableDeclaration (of original kind).


function varToImport(dec, kind) {
  var m;

  if (m = (0, _matchRequire.matchRequire)(dec)) {
    if (m.id.type === 'ObjectPattern') {
      return patternToNamedImport(m);
    } else if (m.id.type === 'Identifier') {
      return identifierToDefaultImport(m);
    }
  } else if (m = (0, _matchRequire.matchRequireWithProperty)(dec)) {
    if (m.property.name === 'default') {
      return identifierToDefaultImport(m);
    }

    return propertyToNamedImport(m);
  } else {
    return new _VariableDeclaration["default"](kind, [dec]);
  }
}

function patternToNamedImport(_ref) {
  var id = _ref.id,
      sources = _ref.sources;
  return new _ImportDeclaration["default"]({
    specifiers: id.properties.map(function (_ref2) {
      var key = _ref2.key,
          value = _ref2.value;
      return createImportSpecifier({
        local: value,
        imported: key
      });
    }),
    source: sources[0]
  });
}

function identifierToDefaultImport(_ref3) {
  var id = _ref3.id,
      sources = _ref3.sources;
  return new _ImportDeclaration["default"]({
    specifiers: [new _ImportDefaultSpecifier["default"](id)],
    source: sources[0]
  });
}

function propertyToNamedImport(_ref4) {
  var id = _ref4.id,
      property = _ref4.property,
      sources = _ref4.sources;
  return new _ImportDeclaration["default"]({
    specifiers: [createImportSpecifier({
      local: id,
      imported: property
    })],
    source: sources[0]
  });
}

function createImportSpecifier(_ref5) {
  var local = _ref5.local,
      imported = _ref5.imported;

  if (imported.name === 'default') {
    return new _ImportDefaultSpecifier["default"](local);
  }

  return new _ImportSpecifier["default"]({
    local: local,
    imported: imported
  });
}