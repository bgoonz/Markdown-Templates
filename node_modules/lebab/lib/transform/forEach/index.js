"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../../traverser"));

var _isEqualAst = _interopRequireDefault(require("../../utils/isEqualAst"));

var _variableType = require("../../utils/variableType");

var _copyComments = _interopRequireDefault(require("../../utils/copyComments"));

var _matchAliasedForLoop = _interopRequireDefault(require("../../utils/matchAliasedForLoop"));

var _validateForLoop = _interopRequireDefault(require("./validateForLoop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _default(ast, logger) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      var matches = (0, _matchAliasedForLoop["default"])(node);

      if (matches) {
        var warning = (0, _validateForLoop["default"])(node, matches);

        if (warning) {
          logger.warn.apply(logger, _toConsumableArray(warning).concat(['for-each']));
          return;
        }

        return withComments(node, createForEach(matches));
      }

      if (node.type === 'ForStatement') {
        logger.warn(node, 'Unable to transform for loop', 'for-each');
      }
    }
  });
}

function withComments(node, forEach) {
  (0, _copyComments["default"])({
    from: node,
    to: forEach
  });
  (0, _copyComments["default"])({
    from: node.body.body[0],
    to: forEach
  });
  return forEach;
}

function createForEach(_ref) {
  var body = _ref.body,
      item = _ref.item,
      index = _ref.index,
      array = _ref.array;
  var newBody = removeFirstBodyElement(body);
  var params = createForEachParams(newBody, item, index);
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: array,
        property: {
          type: 'Identifier',
          name: 'forEach'
        }
      },
      arguments: [{
        type: 'ArrowFunctionExpression',
        params: params,
        body: newBody
      }]
    }
  };
}

function removeFirstBodyElement(body) {
  return _objectSpread(_objectSpread({}, body), {}, {
    body: (0, _fp.tail)(body.body)
  });
}

function createForEachParams(newBody, item, index) {
  if (indexUsedInBody(newBody, index)) {
    return [item, index];
  }

  return [item];
}

function indexUsedInBody(newBody, index) {
  return _traverser["default"].find(newBody, function (node, parent) {
    return (0, _isEqualAst["default"])(node, index) && (0, _variableType.isReference)(node, parent);
  });
}