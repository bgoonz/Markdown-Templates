"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../traverser"));

var functionType = _interopRequireWildcard(require("../utils/functionType"));

var destructuring = _interopRequireWildcard(require("../utils/destructuring.js"));

var _Variable = _interopRequireDefault(require("../scope/Variable"));

var _VariableGroup = _interopRequireDefault(require("../scope/VariableGroup"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Registers all variables defined inside a function.
 * Emulating ECMAScript variable hoisting.
 */
var FunctionHoister = /*#__PURE__*/function () {
  /**
   * Instantiates hoister with a function scope where to
   * register the variables that are found.
   * @param  {FunctionScope} functionScope
   */
  function FunctionHoister(functionScope) {
    _classCallCheck(this, FunctionHoister);

    this.functionScope = functionScope;
  }
  /**
   * Performs the hoisting of a function name, params and variables.
   *
   * @param {Object} cfg
   *   @param {Identifier} cfg.id Optional function name
   *   @param {Identifier[]} cfg.params Optional function parameters
   *   @param {Object} cfg.body Function body node or Program node to search variables from.
   */


  _createClass(FunctionHoister, [{
    key: "hoist",
    value: function hoist(_ref) {
      var id = _ref.id,
          params = _ref.params,
          body = _ref.body;

      if (id) {
        this.hoistFunctionId(id);
      }

      if (params) {
        this.hoistFunctionParams(params);
      }

      this.hoistVariables(body);
    }
  }, {
    key: "hoistFunctionId",
    value: function hoistFunctionId(id) {
      this.functionScope.register(id.name, new _Variable["default"](id));
    }
  }, {
    key: "hoistFunctionParams",
    value: function hoistFunctionParams(params) {
      return (0, _fp.flow)((0, _fp.map)(destructuring.extractVariables), _fp.flatten, (0, _fp.forEach)(this.registerParam.bind(this)))(params);
    }
  }, {
    key: "registerParam",
    value: function registerParam(p) {
      this.functionScope.register(p.name, new _Variable["default"](p));
    }
  }, {
    key: "hoistVariables",
    value: function hoistVariables(ast) {
      var _this = this;

      _traverser["default"].traverse(ast, {
        // Use arrow-function here, so we can access outer `this`.
        enter: function enter(node, parent) {
          if (node.type === 'VariableDeclaration') {
            _this.hoistVariableDeclaration(node, parent);
          } else if (functionType.isFunctionDeclaration(node)) {
            // Register variable for the function if it has a name
            if (node.id) {
              _this.functionScope.register(node.id.name, new _Variable["default"](node));
            } // Skip anything inside the nested function


            return _traverser["default"].VisitorOption.Skip;
          } else if (functionType.isFunctionExpression(node)) {
            // Skip anything inside the nested function
            return _traverser["default"].VisitorOption.Skip;
          }
        }
      });
    }
  }, {
    key: "hoistVariableDeclaration",
    value: function hoistVariableDeclaration(node, parent) {
      var _this2 = this;

      var group = new _VariableGroup["default"](node, parent);
      node.declarations.forEach(function (declaratorNode) {
        var variable = new _Variable["default"](declaratorNode, group);
        group.add(variable); // All destructured variable names point to the same Variable instance,
        // as we want to treat the destructured variables as one un-breakable
        // unit - if one of them is modified and other one not, we cannot break
        // them apart into const and let, but instead need to use let for both.

        destructuring.extractVariableNames(declaratorNode.id).forEach(function (name) {
          _this2.functionScope.register(name, variable);
        });
      });
    }
  }]);

  return FunctionHoister;
}();

exports["default"] = FunctionHoister;