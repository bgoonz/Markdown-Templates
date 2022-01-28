"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BlockScope = _interopRequireDefault(require("../scope/BlockScope"));

var _FunctionScope = _interopRequireDefault(require("../scope/FunctionScope"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Keeps track of the current function/block scope.
 */
var ScopeManager = /*#__PURE__*/function () {
  function ScopeManager() {
    _classCallCheck(this, ScopeManager);

    this.scope = undefined;
  }
  /**
   * Enters new function scope
   */


  _createClass(ScopeManager, [{
    key: "enterFunction",
    value: function enterFunction() {
      this.scope = new _FunctionScope["default"](this.scope);
    }
    /**
     * Enters new block scope
     */

  }, {
    key: "enterBlock",
    value: function enterBlock() {
      this.scope = new _BlockScope["default"](this.scope);
    }
    /**
     * Leaves the current scope.
     */

  }, {
    key: "leaveScope",
    value: function leaveScope() {
      this.scope = this.scope.getParent();
    }
    /**
     * Returns the current scope.
     * @return {FunctionScope|BlockScope}
     */

  }, {
    key: "getScope",
    value: function getScope() {
      return this.scope;
    }
  }]);

  return ScopeManager;
}();

exports["default"] = ScopeManager;