"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Scope2 = _interopRequireDefault(require("./Scope"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Container for block-scoped variables.
 */
var BlockScope = /*#__PURE__*/function (_Scope) {
  _inherits(BlockScope, _Scope);

  var _super = _createSuper(BlockScope);

  function BlockScope() {
    _classCallCheck(this, BlockScope);

    return _super.apply(this, arguments);
  }

  _createClass(BlockScope, [{
    key: "register",

    /**
     * Registers variable in block scope.
     *
     * (All variables are first registered in function scope.)
     *
     * @param  {String} name Variable name
     * @param  {Variable} variable Variable object
     */
    value: function register(name, variable) {
      this.vars[name] = variable;
    }
    /**
     * Looks up variable from function scope.
     *
     * Traveling up the scope chain until reaching a function scope.
     *
     * @param  {String} name Variable name
     * @return {Variable} The found variable or false
     */

  }, {
    key: "findFunctionScoped",
    value: function findFunctionScoped(name) {
      return this.parent.findFunctionScoped(name);
    }
    /**
     * Looks up variable from block scope.
     *
     * Either from the current block, or any parent block.
     * When variable found from function scope instead,
     * returns false to signify it's not properly block-scoped.
     *
     * @param  {String} name Variable name
     * @return {Variable} The found variable or false
     */

  }, {
    key: "findBlockScoped",
    value: function findBlockScoped(name) {
      if (this.vars[name]) {
        return this.vars[name];
      }

      return this.parent.findBlockScoped(name);
    }
  }]);

  return BlockScope;
}(_Scope2["default"]);

exports["default"] = BlockScope;