"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _traverser = _interopRequireDefault(require("../../traverser"));

var _isEqualAst = _interopRequireDefault(require("./../../utils/isEqualAst"));

var _fMatches = require("f-matches");

var _extractComments = _interopRequireDefault(require("./extractComments"));

var _multiReplaceStatement = _interopRequireDefault(require("./../../utils/multiReplaceStatement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Represents a potential class method to be created.
 */
var PotentialMethod = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *   @param {String} cfg.name Method name
   *   @param {Object} cfg.methodNode
   *   @param {Object} cfg.fullNode Node to remove after converting to class
   *   @param {Object[]} cfg.commentNodes Nodes to extract comments from
   *   @param {Object} cfg.parent
   *   @param {String} cfg.kind Either 'get' or 'set' (optional)
   *   @param {Boolean} cfg.static True to make static method (optional)
   */
  function PotentialMethod(cfg) {
    _classCallCheck(this, PotentialMethod);

    this.name = cfg.name;
    this.methodNode = cfg.methodNode;
    this.fullNode = cfg.fullNode;
    this.commentNodes = cfg.commentNodes || [];
    this.parent = cfg.parent;
    this.kind = cfg.kind || 'method';
    this["static"] = cfg["static"] || false;
  }
  /**
   * Sets the superClass node.
   * @param {Node} superClass
   */


  _createClass(PotentialMethod, [{
    key: "setSuperClass",
    value: function setSuperClass(superClass) {
      this.superClass = superClass;
    }
    /**
     * True when method body is empty.
     * @return {Boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.getBodyBlock().body.length === 0;
    }
    /**
     * Transforms the potential method to actual MethodDefinition node.
     * @return {MethodDefinition}
     */

  }, {
    key: "toMethodDefinition",
    value: function toMethodDefinition() {
      return {
        type: 'MethodDefinition',
        key: {
          type: 'Identifier',
          name: this.name
        },
        computed: false,
        value: {
          type: 'FunctionExpression',
          async: this.methodNode.async,
          params: this.methodNode.params,
          defaults: this.methodNode.defaults,
          body: this.getBody(),
          generator: false,
          expression: false
        },
        kind: this.kind,
        "static": this["static"],
        comments: (0, _extractComments["default"])(this.commentNodes)
      };
    }
    /**
     * Removes original prototype assignment node from AST.
     */

  }, {
    key: "remove",
    value: function remove() {
      (0, _multiReplaceStatement["default"])({
        parent: this.parent,
        node: this.fullNode,
        replacements: []
      });
    } // To be overridden in subclasses

  }, {
    key: "getBody",
    value: function getBody() {
      if (this.superClass) {
        return this.transformSuperCalls(this.getBodyBlock());
      } else {
        return this.getBodyBlock();
      }
    }
  }, {
    key: "getBodyBlock",
    value: function getBodyBlock() {
      if (this.methodNode.body.type === 'BlockStatement') {
        return this.methodNode.body;
      } else {
        return {
          type: 'BlockStatement',
          body: [{
            type: 'ReturnStatement',
            argument: this.methodNode.body
          }]
        };
      }
    } // Transforms method body by replacing
    // SuperClass.prototype.foo.call(this, ...args) --> super.foo(...args)

  }, {
    key: "transformSuperCalls",
    value: function transformSuperCalls(body) {
      var _this = this;

      return _traverser["default"].replace(body, {
        enter: function enter(node) {
          var m = _this.matchSuperCall(node);

          if (m) {
            node.expression.callee = {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Super'
              },
              property: m.method
            };
            node.expression.arguments = node.expression.arguments.slice(1);
          }
        }
      });
    }
  }, {
    key: "matchSuperCall",
    value: function matchSuperCall(node) {
      var _this2 = this;

      return (0, _fMatches.matches)({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'MemberExpression',
                computed: false,
                object: function object(obj) {
                  return (0, _isEqualAst["default"])(obj, _this2.superClass);
                },
                property: {
                  type: 'Identifier',
                  name: 'prototype'
                }
              },
              property: (0, _fMatches.extract)('method', {
                type: 'Identifier'
              })
            },
            property: {
              type: 'Identifier',
              name: 'call'
            }
          },
          arguments: [{
            type: 'ThisExpression'
          }]
        }
      }, node);
    }
  }]);

  return PotentialMethod;
}();

exports["default"] = PotentialMethod;