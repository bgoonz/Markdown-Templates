"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

var _RequireUtilDetector = _interopRequireDefault(require("./RequireUtilDetector"));

var _RequireUtilInheritsDetector = _interopRequireDefault(require("./RequireUtilInheritsDetector"));

var _ImportUtilDetector = _interopRequireDefault(require("./ImportUtilDetector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Processes nodes to detect super classes and return information for later
 * transformation.
 *
 * Detects:
 *
 *   var util = require('util');
 *   ...
 *   util.inherits(Class1, Class2);
 */
var UtilInherits = /*#__PURE__*/function () {
  function UtilInherits() {
    _classCallCheck(this, UtilInherits);

    this.inheritsNode = undefined;
    this.detectors = [new _RequireUtilDetector["default"](), new _RequireUtilInheritsDetector["default"](), new _ImportUtilDetector["default"]()];
  }
  /**
   * Process a node and return inheritance details if found.
   * @param {Object} node
   * @param {Object} parent
   * @returns {Object/undefined} m
   *                    {String}   m.className
   *                    {Node}     m.superClass
   *                    {Object[]} m.relatedExpressions
   */


  _createClass(UtilInherits, [{
    key: "process",
    value: function process(node, parent) {
      var m;

      if (parent && parent.type === 'Program' && (m = this.detectInheritsNode(node))) {
        this.inheritsNode = m;
      } else if (this.inheritsNode && (m = this.matchUtilInherits(node))) {
        return {
          className: m.className,
          superClass: m.superClass,
          relatedExpressions: [{
            node: node,
            parent: parent
          }]
        };
      }
    }
  }, {
    key: "detectInheritsNode",
    value: function detectInheritsNode(node) {
      var _iterator = _createForOfIteratorHelper(this.detectors),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var detector = _step.value;
          var inheritsNode = void 0;

          if (inheritsNode = detector.detect(node)) {
            return inheritsNode;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // Discover usage of this.inheritsNode
    //
    // Matches: <this.utilInherits>(<className>, <superClass>);

  }, {
    key: "matchUtilInherits",
    value: function matchUtilInherits(node) {
      return (0, _fMatches.matches)({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: this.inheritsNode,
          arguments: [{
            type: 'Identifier',
            name: (0, _fMatches.extractAny)('className')
          }, (0, _fMatches.extractAny)('superClass')]
        }
      }, node);
    }
  }]);

  return UtilInherits;
}();

exports["default"] = UtilInherits;