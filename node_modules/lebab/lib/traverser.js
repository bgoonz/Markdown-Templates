"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fp = require("lodash/fp");

var _estraverse = _interopRequireDefault(require("estraverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// JSX AST types, as documented in:
// https://github.com/facebook/jsx/blob/master/AST.md
var jsxExtensionKeys = {
  keys: {
    JSXIdentifier: [],
    JSXMemberExpression: ['object', 'property'],
    JSXNamespacedName: ['namespace', 'name'],
    JSXEmptyExpression: [],
    JSXExpressionContainer: ['expression'],
    JSXOpeningElement: ['name', 'attributes'],
    JSXClosingElement: ['name'],
    JSXAttribute: ['name', 'value'],
    JSXSpreadAttribute: ['argument'],
    JSXElement: ['openingElement', 'closingElement', 'children'],
    JSXText: []
  }
};
/**
 * Proxy for ESTraverse.
 * Providing a single place to easily extend its functionality.
 *
 * Exposes the traverse() and replace() methods just like ESTraverse,
 * plus some custom helpers.
 */

var _default = {
  /**
   * Traverses AST like ESTraverse.traverse()
   * @param  {Object} tree
   * @param  {Object} cfg Object with optional enter() and leave() methods.
   * @return {Object} The transformed tree
   */
  traverse: function traverse(tree, cfg) {
    return _estraverse["default"].traverse(tree, Object.assign(cfg, jsxExtensionKeys));
  },

  /**
   * Traverses AST like ESTraverse.replace()
   * @param  {Object} tree
   * @param  {Object} cfg Object with optional enter() and leave() methods.
   * @return {Object} The transformed tree
   */
  replace: function replace(tree, cfg) {
    return _estraverse["default"].replace(tree, Object.assign(cfg, jsxExtensionKeys));
  },

  /**
   * Constants to return from enter()/leave() to control traversal:
   *
   * - Skip - skips walking child nodes
   * - Break - ends it all
   * - Remove - removes the current node (only with replace())
   */
  VisitorOption: _estraverse["default"].VisitorOption,

  /**
   * Searches in AST tree for node which satisfies the predicate.
   * @param  {Object} tree
   * @param  {Function|String} query Search function called with `node` and `parent`
   *   Alternatively it can be string: the node type to search for.
   * @param  {String[]} opts.skipTypes List of node types to skip (not traversing into these nodes)
   * @return {Object} The found node or undefined when not found
   */
  find: function find(tree, query) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$skipTypes = _ref.skipTypes,
        skipTypes = _ref$skipTypes === void 0 ? [] : _ref$skipTypes;

    var predicate = this.createFindPredicate(query);
    var found;
    this.traverse(tree, {
      enter: function enter(node, parent) {
        if ((0, _fp.includes)(node.type, skipTypes)) {
          return _estraverse["default"].VisitorOption.Skip;
        }

        if (predicate(node, parent)) {
          found = node;
          return _estraverse["default"].VisitorOption.Break;
        }
      }
    });
    return found;
  },
  createFindPredicate: function createFindPredicate(query) {
    if ((0, _fp.isString)(query)) {
      return function (node) {
        return node.type === query;
      };
    } else {
      return query;
    }
  }
};
exports["default"] = _default;