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
 * Labels variables in relation to their use in block scope.
 *
 * When variable is declared/modified/referenced not according to
 * block scoping rules, it'll be marked hoisted.
 */
var VariableMarker = /*#__PURE__*/function () {
  /**
   * @param  {ScopeManager} scopeManager
   */
  function VariableMarker(scopeManager) {
    _classCallCheck(this, VariableMarker);

    this.scopeManager = scopeManager;
  }
  /**
   * Marks set of variables declared in current block scope.
   *
   * Takes an array of variable names to support the case of declaring
   * multiple variables at once with a destructuring operation.
   *
   * - Not valid block var when already declared before.
   *
   * @param  {String[]} varNames
   */


  _createClass(VariableMarker, [{
    key: "markDeclared",
    value: function markDeclared(varNames) {
      var _this = this;

      var alreadySeen = [];
      varNames.forEach(function (varName) {
        var blockVar = _this.getScope().findFunctionScoped(varName); // all variable names declared with a destructuring operation
        // reference the same Variable object, so when we mark the
        // first variable in destructuring as declared, they all
        // will be marked as declared, but this kind of re-declaring
        // (which isn't actually real re-declaring) should not cause
        // variable to be marked as declared multiple times and
        // therefore marked as hoisted.


        if (!(0, _fp.includes)(blockVar, alreadySeen)) {
          alreadySeen.push(blockVar); // Ignore repeated var declarations

          if (blockVar.isDeclared()) {
            blockVar.markHoisted();
            return;
          }
        } // Remember that it's declared and register in current block scope


        blockVar.markDeclared();

        _this.getScope().register(varName, blockVar);
      });
    }
    /**
     * Marks variable modified in current block scope.
     *
     * - Not valid block var when not declared in current block scope.
     *
     * @param  {String} varName
     */

  }, {
    key: "markModified",
    value: function markModified(varName) {
      var blockVar = this.getScope().findBlockScoped(varName);

      if (blockVar) {
        blockVar.markModified();
        return;
      }

      var funcVar = this.getScope().findFunctionScoped(varName);

      if (funcVar) {
        funcVar.markHoisted();
        funcVar.markModified();
      }
    }
    /**
     * Marks variable referenced in current block scope.
     *
     * - Not valid block var when not declared in current block scope.
     *
     * @param  {String} varName
     */

  }, {
    key: "markReferenced",
    value: function markReferenced(varName) {
      var blockVar = this.getScope().findBlockScoped(varName);

      if (blockVar) {
        return;
      }

      var funcVar = this.getScope().findFunctionScoped(varName);

      if (funcVar) {
        funcVar.markHoisted();
      }
    }
  }, {
    key: "getScope",
    value: function getScope() {
      return this.scopeManager.getScope();
    }
  }]);

  return VariableMarker;
}();

exports["default"] = VariableMarker;