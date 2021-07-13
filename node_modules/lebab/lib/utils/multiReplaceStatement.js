"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = multiReplaceStatement;

var _copyComments = _interopRequireDefault(require("./copyComments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Replaces `node` inside `parent` with any number of `replacements`.
 *
 * ESTraverse only allows replacing one node with a single other node.
 * This function overcomes this limitation, allowing to replace it with multiple nodes.
 *
 * NOTE: Only works for nodes that allow multiple elements in their body.
 *       When node doesn't exist inside parent, does nothing.
 *
 * @param  {Object} cfg
 *   @param  {Object} cfg.parent Parent node of the node to replace
 *   @param  {Object} cfg.node The node to replace
 *   @param  {Object[]} cfg.replacements Replacement nodes (can be empty array)
 *   @param  {Boolean} [cfg.preserveComments] True to copy over comments from
 *     node to first replacement node
 */
function multiReplaceStatement(_ref) {
  var parent = _ref.parent,
      node = _ref.node,
      replacements = _ref.replacements,
      preserveComments = _ref.preserveComments;
  var body = getBody(parent);
  var index = body.indexOf(node);

  if (preserveComments && replacements[0]) {
    (0, _copyComments["default"])({
      from: node,
      to: replacements[0]
    });
  }

  if (index !== -1) {
    body.splice.apply(body, [index, 1].concat(_toConsumableArray(replacements)));
  }
}

function getBody(node) {
  switch (node.type) {
    case 'BlockStatement':
    case 'Program':
      return node.body;

    case 'SwitchCase':
      return node.consequent;

    default:
      throw "Unsupported node type '".concat(node.type, "' in multiReplaceStatement()");
  }
}