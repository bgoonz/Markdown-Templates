"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _recast = require("recast");

var _Parser = _interopRequireDefault(require("../Parser"));

var _traverser = _interopRequireDefault(require("../traverser"));

var _withScope = _interopRequireDefault(require("../withScope"));

var functionType = _interopRequireWildcard(require("../utils/functionType"));

var _Hierarchy = _interopRequireDefault(require("../utils/Hierarchy"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var MAX_PROPS = 4;

function _default(ast, logger) {
  var hierarchy = new _Hierarchy["default"](ast);

  _traverser["default"].traverse(ast, (0, _withScope["default"])(ast, {
    enter: function enter(fnNode, parent, scope) {
      if (functionType.isFunction(fnNode)) {
        scope.variables.filter(isParameter).map(function (v) {
          return {
            variable: v,
            exs: getMemberExpressions(v, hierarchy)
          };
        }).filter(function (_ref) {
          var exs = _ref.exs;
          return exs.length > 0;
        }).forEach(function (_ref2) {
          var variable = _ref2.variable,
              exs = _ref2.exs;
          // Replace parameter with destruct-pattern
          var index = fnNode.params.findIndex(function (param) {
            return param === variable.defs[0].name;
          });

          if (index === -1) {
            return;
          }

          if (uniqPropNames(exs).length > MAX_PROPS) {
            logger.warn(fnNode, "".concat(uniqPropNames(exs).length, " different props found, will not transform more than ").concat(MAX_PROPS), 'destruct-param');
            return;
          }

          fnNode.params[index] = createDestructPattern(exs); // Replace references of obj.foo with simply foo

          exs.forEach(function (ex) {
            ex.type = ex.property.type;
            ex.name = ex.property.name;
          });
        });
      }
    }
  }));
}

function isParameter(variable) {
  return variable.defs.length === 1 && variable.defs[0].type === 'Parameter';
}

function getMemberExpressions(variable, hierarchy) {
  var memberExpressions = [];

  var _iterator = _createForOfIteratorHelper(variable.references),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ref = _step.value;
      var memEx = hierarchy.getParent(ref.identifier);

      if (!isMemberExpressionObject(memEx, ref.identifier)) {
        return [];
      }

      var ex = hierarchy.getParent(memEx);

      if (isAssignment(ex, memEx) || isUpdate(ex, memEx) || isMethodCall(ex, memEx)) {
        return [];
      }

      if (isKeyword(memEx.property.name) || variableExists(memEx.property.name, ref.from)) {
        return [];
      }

      memberExpressions.push(memEx);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return memberExpressions;
}

function isMemberExpressionObject(memEx, object) {
  return memEx.type === 'MemberExpression' && memEx.object === object && memEx.computed === false;
}

function isAssignment(ex, node) {
  return ex.type === 'AssignmentExpression' && ex.left === node;
}

function isUpdate(ex, node) {
  return ex.type === 'UpdateExpression' && ex.argument === node;
}

function isMethodCall(ex, node) {
  return ex.type === 'CallExpression' && ex.callee === node;
}

function variableExists(variableName, scope) {
  while (scope) {
    if (scope.through.some(function (ref) {
      return ref.identifier.name === variableName;
    })) {
      return true;
    }

    if (scope.set.get(variableName)) {
      return true;
    }

    scope = scope.upper;
  }

  return false;
}

function isKeyword(name) {
  return _Parser["default"].tokenize(name)[0].type === 'Keyword';
}

function uniqPropNames(exs) {
  return (0, _fp.uniq)(exs.map(function (_ref3) {
    var property = _ref3.property;
    return property.name;
  }));
} // By default recast indents the ObjectPattern AST node
// See: https://github.com/benjamn/recast/issues/240
//
// To work around this, we're building the desired string by ourselves,
// and parsing it with Recast and extracting the ObjectPatter node.
// Feeding this back to Recast will preserve the formatting.


function createDestructPattern(exs) {
  var props = uniqPropNames(exs).join(', ');
  var js = "function foo({".concat(props, "}) {};");
  var ast = (0, _recast.parse)(js, {
    parser: _Parser["default"]
  });
  return ast.program.body[0].params[0];
}