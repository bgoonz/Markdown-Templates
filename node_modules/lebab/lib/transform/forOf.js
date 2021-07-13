"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../traverser"));

var _isEqualAst = _interopRequireDefault(require("../utils/isEqualAst"));

var _variableType = require("../utils/variableType");

var _copyComments = _interopRequireDefault(require("../utils/copyComments"));

var _matchAliasedForLoop = _interopRequireDefault(require("../utils/matchAliasedForLoop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(ast, logger) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      var matches = (0, _matchAliasedForLoop["default"])(node);

      if (matches) {
        if (indexUsedInBody(matches)) {
          logger.warn(node, 'Index variable used in for-loop body', 'for-of');
          return;
        }

        if (matches.itemKind === 'var' || matches.indexKind === 'var') {
          logger.warn(node, 'Only for-loops with let/const can be tranformed (use let transform first)', 'for-of');
          return;
        }

        return withComments(node, createForOf(matches));
      }

      if (node.type === 'ForStatement') {
        logger.warn(node, 'Unable to transform for loop', 'for-of');
      }
    }
  });
}

function indexUsedInBody(_ref) {
  var body = _ref.body,
      index = _ref.index;
  return _traverser["default"].find(removeFirstBodyElement(body), function (node, parent) {
    return (0, _isEqualAst["default"])(node, index) && (0, _variableType.isReference)(node, parent);
  });
}

function withComments(node, forOf) {
  (0, _copyComments["default"])({
    from: node,
    to: forOf
  });
  (0, _copyComments["default"])({
    from: node.body.body[0],
    to: forOf
  });
  return forOf;
}

function createForOf(_ref2) {
  var item = _ref2.item,
      itemKind = _ref2.itemKind,
      array = _ref2.array,
      body = _ref2.body;
  return {
    type: 'ForOfStatement',
    left: {
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: item,
        init: null // eslint-disable-line no-null/no-null

      }],
      kind: itemKind
    },
    right: array,
    body: removeFirstBodyElement(body)
  };
}

function removeFirstBodyElement(body) {
  return _objectSpread(_objectSpread({}, body), {}, {
    body: (0, _fp.tail)(body.body)
  });
}