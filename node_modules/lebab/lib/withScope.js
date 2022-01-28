"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = withScope;

var _escope = require("escope");

var _functionType = require("./utils/functionType");

var emptyFn = function emptyFn() {}; // eslint-disable-line no-empty-function

/**
 * A helper for traversing with scope info from escope.
 *
 * Usage:
 *
 *     traverser.traverse(ast, withScope(ast, {
 *       enter(node, parent, scope) {
 *         // do something with node and scope
 *       }
 *     }))
 *
 * @param {Object} ast The AST root node also passed to traverser.
 * @param {Object} cfg Object with enter function as expected by traverser.
 * @return {Object} Object with enter function to be passed to traverser.
 */


function withScope(ast, _ref) {
  var _ref$enter = _ref.enter,
      _enter = _ref$enter === void 0 ? emptyFn : _ref$enter;

  var scopeManager = (0, _escope.analyze)(ast, {
    ecmaVersion: 6,
    sourceType: 'module'
  });
  var currentScope = scopeManager.acquire(ast);
  return {
    enter: function enter(node, parent) {
      if ((0, _functionType.isFunction)(node)) {
        currentScope = scopeManager.acquire(node);
      }

      return _enter.call(this, node, parent, currentScope);
    } // NOTE: leave() is currently not implemented.
    // See escope docs for supporting it if need arises: https://github.com/estools/escope

  };
}