"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _traverser = _interopRequireDefault(require("../traverser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Provides a way to look up parent nodes.
 */
var Hierarchy = /*#__PURE__*/function () {
  /**
   * @param {Object} ast Root node
   */
  function Hierarchy(ast) {
    var _this = this;

    _classCallCheck(this, Hierarchy);

    this.parents = new Map();

    _traverser["default"].traverse(ast, {
      enter: function enter(node, parent) {
        _this.parents.set(node, parent);
      }
    });
  }
  /**
   * Returns parent node of given AST node.
   * @param {Object} node
   * @return {Object}
   */


  _createClass(Hierarchy, [{
    key: "getParent",
    value: function getParent(node) {
      return this.parents.get(node);
    }
  }]);

  return Hierarchy;
}();

exports["default"] = Hierarchy;