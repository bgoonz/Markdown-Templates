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
 * Encapsulates a VariableDeclaration node
 * and a list of Variable objects declared by it.
 *
 * PS. Named VariableGroup not VariableDeclaration to avoid confusion with syntax class.
 */
var VariableGroup = /*#__PURE__*/function () {
  /**
   * @param  {VariableDeclaration} node AST node
   * @param  {Object} parentNode Parent AST node (pretty much any node)
   */
  function VariableGroup(node, parentNode) {
    _classCallCheck(this, VariableGroup);

    this.node = node;
    this.parentNode = parentNode;
    this.variables = [];
  }
  /**
   * Adds a variable to this group.
   * @param {Variable} variable
   */


  _createClass(VariableGroup, [{
    key: "add",
    value: function add(variable) {
      this.variables.push(variable);
    }
    /**
     * Returns all variables declared in this group.
     * @return {Variable[]}
     */

  }, {
    key: "getVariables",
    value: function getVariables() {
      return this.variables;
    }
    /**
     * Returns the `kind` value of variable defined in this group.
     *
     * When not all variables are of the same kind, returns undefined.
     *
     * @return {String} Either "var", "let", "const" or undefined.
     */

  }, {
    key: "getCommonKind",
    value: function getCommonKind() {
      var firstKind = this.variables[0].getKind();

      if (this.variables.every(function (v) {
        return v.getKind() === firstKind;
      })) {
        return firstKind;
      } else {
        return undefined;
      }
    }
    /**
     * Returns the most restrictive possible common `kind` value
     * for variables defined in this group.
     *
     * - When all vars are const, return "const".
     * - When some vars are "let" and some "const", returns "let".
     * - When some vars are "var", return "var".
     *
     * @return {String} Either "var", "let" or "const".
     */

  }, {
    key: "getMostRestrictiveKind",
    value: function getMostRestrictiveKind() {
      var kindToVal = {
        'var': 1,
        'let': 2,
        'const': 3
      };
      var valToKind = {
        1: 'var',
        2: 'let',
        3: 'const'
      };
      var minVal = (0, _fp.min)(this.variables.map(function (v) {
        return kindToVal[v.getKind()];
      }));
      return valToKind[minVal];
    }
    /**
     * Returns the AST node
     * @return {VariableDeclaration}
     */

  }, {
    key: "getNode",
    value: function getNode() {
      return this.node;
    }
    /**
     * Returns the parent AST node (which can be pretty much anything)
     * @return {Object}
     */

  }, {
    key: "getParentNode",
    value: function getParentNode() {
      return this.parentNode;
    }
  }]);

  return VariableGroup;
}();

exports["default"] = VariableGroup;