"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _UtilInherits = _interopRequireDefault(require("./UtilInherits"));

var _Prototypal = _interopRequireDefault(require("./Prototypal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Processes nodes to detect super classes and return information for later
 * transformation.
 */
var Inheritance = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *   @param {PotentialClass[]} cfg.potentialClasses Class name
   */
  function Inheritance() {
    _classCallCheck(this, Inheritance);

    this.utilInherits = new _UtilInherits["default"]();
    this.prototypal = new _Prototypal["default"]();
  }
  /**
   * Process a node and return inheritance details if found.
   * @param {Object} node
   * @param {Object} parent
   * @returns {Object}
   *            {String}   className
   *            {Node}     superClass
   *            {Object[]} relatedExpressions
   */


  _createClass(Inheritance, [{
    key: "process",
    value: function process(node, parent) {
      return this.utilInherits.process(node, parent) || this.prototypal.process(node, parent);
    }
  }]);

  return Inheritance;
}();

exports["default"] = Inheritance;