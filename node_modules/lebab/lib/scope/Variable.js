"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Encapsulates a single variable declaring AST node.
 *
 * It might be the actual VariableDeclarator node,
 * but it might also be a function parameter or -name.
 */
var Variable = /*#__PURE__*/function () {
  /**
   * @param  {Object} node AST node declaring the variable.
   * @param  {VariableGroup} group The containing var-statement (if any).
   */
  function Variable(node, group) {
    _classCallCheck(this, Variable);

    this.node = node;
    this.group = group;
    this.declared = false;
    this.hoisted = false;
    this.modified = false;
  }

  _createClass(Variable, [{
    key: "markDeclared",
    value: function markDeclared() {
      this.declared = true;
    }
  }, {
    key: "isDeclared",
    value: function isDeclared() {
      return this.declared;
    }
    /**
     * Marks that the use of the variable is not block-scoped,
     * so it cannot be simply converted to `let` or `const`.
     */

  }, {
    key: "markHoisted",
    value: function markHoisted() {
      this.hoisted = true;
    }
    /**
     * Marks that the variable is assigned to,
     * so it cannot be converted to `const`.
     */

  }, {
    key: "markModified",
    value: function markModified() {
      this.modified = true;
    }
    /**
     * Returns the strictest possible kind-attribute value for this variable.
     *
     * @return {String} Either "var", "let" or "const".
     */

  }, {
    key: "getKind",
    value: function getKind() {
      if (this.hoisted) {
        return 'var';
      } else if (this.modified) {
        return 'let';
      } else {
        return 'const';
      }
    }
    /**
     * Returns the AST node that declares this variable.
     * @return {Object}
     */

  }, {
    key: "getNode",
    value: function getNode() {
      return this.node;
    }
    /**
     * Returns the containing var-statement (if any).
     * @return {VariableGroup}
     */

  }, {
    key: "getGroup",
    value: function getGroup() {
      return this.group;
    }
  }]);

  return Variable;
}();

exports["default"] = Variable;