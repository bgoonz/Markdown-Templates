"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fp = require("lodash/fp");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Base class for Function- and BlockScope.
 *
 * Subclasses implement:
 *
 * - register() for adding variables to scope
 * - findFunctionScoped() for finding function-scoped vars
 * - findBlockScoped() for finding block-scoped vars
 */
var Scope = /*#__PURE__*/function () {
  /**
   * @param  {Scope} parent Parent scope (if any).
   */
  function Scope(parent) {
    _classCallCheck(this, Scope);

    this.parent = parent;
    this.vars = Object.create(null); // eslint-disable-line no-null/no-null
  }
  /**
   * Returns parent scope (possibly undefined).
   * @return {Scope}
   */


  _createClass(Scope, [{
    key: "getParent",
    value: function getParent() {
      return this.parent;
    }
    /**
     * Returns all variables registered in this scope.
     * @return {Variable[]}
     */

  }, {
    key: "getVariables",
    value: function getVariables() {
      return (0, _fp.values)(this.vars);
    }
  }]);

  return Scope;
}();

exports["default"] = Scope;