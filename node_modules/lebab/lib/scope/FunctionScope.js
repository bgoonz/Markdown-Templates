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
 * Container for function-scoped variables.
 */
var FunctionScope = /*#__PURE__*/function (_Scope) {
  _inherits(FunctionScope, _Scope);

  var _super = _createSuper(FunctionScope);

  function FunctionScope() {
    _classCallCheck(this, FunctionScope);

    return _super.apply(this, arguments);
  }

  _createClass(FunctionScope, [{
    key: "register",

    /**
     * Registers a variable in function scope.
     *
     * All variables (including function name and params) are first
     * registered as function scoped, during hoisting phase.
     * Later thay can also be registered in block scope.
     *
     * Ignores attempts to register the same variable twice.
     *
     * @param  {String} name Variable name
     * @param  {Variable} variable Variable object
     */
    value: function register(name, variable) {
      if (!this.vars[name]) {
        this.vars[name] = variable;
      }
    }
    /**
     * Looks up variable from function scope.
     * (Either from this function scope or from any parent function scope.)
     *
     * @param  {String} name Variable name
     * @return {Variable} The found variable or false
     */

  }, {
    key: "findFunctionScoped",
    value: function findFunctionScoped(name) {
      if (this.vars[name]) {
        return this.vars[name];
      }

      if (this.parent) {
        return this.parent.findFunctionScoped(name);
      }

      return false;
    }
    /**
     * Looks up variable from block scope.
     * (i.e. the parent block scope of the function scope.)
     *
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
        return false;
      }

      if (this.parent) {
        return this.parent.findBlockScoped(name);
      }

      return false;
    }
  }]);

  return FunctionScope;
}(_Scope2["default"]);

exports["default"] = FunctionScope;