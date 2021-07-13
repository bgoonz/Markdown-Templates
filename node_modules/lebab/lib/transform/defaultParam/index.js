"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fMatches = require("f-matches");

var _fp = require("lodash/fp");

var _destructuring = require("../../utils/destructuring");

var _traverser = _interopRequireDefault(require("../../traverser"));

var _multiReplaceStatement = _interopRequireDefault(require("../../utils/multiReplaceStatement"));

var _functionType = require("../../utils/functionType");

var _matchOrAssignment = _interopRequireDefault(require("./matchOrAssignment"));

var _matchTernaryAssignment = _interopRequireDefault(require("./matchTernaryAssignment"));

var _matchIfUndefinedAssignment = _interopRequireDefault(require("./matchIfUndefinedAssignment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      if ((0, _functionType.isFunction)(node) && node.body.type === 'BlockStatement') {
        transformDefaultParams(node);
      }
    }
  });
}

function transformDefaultParams(fn) {
  var detectedDefaults = findDefaults(fn.body.body);
  fn.params = fn.params.map(function (param, i) {
    // Ignore params that use destructoring or already have a default
    if (param.type !== 'Identifier') {
      return param;
    }

    var detected = detectedDefaults[param.name]; // Transform when default value detected
    // and default does not contain this or any of the remaining parameters

    if (detected && !containsParams(detected.value, remainingParams(fn, i))) {
      (0, _multiReplaceStatement["default"])({
        parent: fn.body,
        node: detected.node,
        replacements: []
      });
      return withDefault(param, detected.value);
    }

    return param;
  });
}

function withDefault(param, value) {
  return {
    type: 'AssignmentPattern',
    left: param,
    right: value
  };
}

function remainingParams(fn, i) {
  return fn.params.slice(i);
}

function containsParams(defaultValue, params) {
  return (0, _fp.flow)((0, _fp.flatMap)(_destructuring.extractVariables), (0, _fp.some)(function (param) {
    return _traverser["default"].find(defaultValue, (0, _fMatches.matches)({
      type: 'Identifier',
      name: param.name
    }));
  }))(params);
} // Looks default value assignments at the beginning of a function
//
// Returns a map of variable-name:{name, value, node}


function findDefaults(fnBody) {
  var defaults = {};

  var _iterator = _createForOfIteratorHelper(fnBody),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      var def = matchDefaultAssignment(node);

      if (!def) {
        break;
      }

      defaults[def.name] = def;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return defaults;
}

function matchDefaultAssignment(node) {
  return (0, _matchOrAssignment["default"])(node) || (0, _matchTernaryAssignment["default"])(node) || (0, _matchIfUndefinedAssignment["default"])(node);
}