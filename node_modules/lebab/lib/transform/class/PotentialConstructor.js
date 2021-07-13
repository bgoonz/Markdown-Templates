"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _traverser = _interopRequireDefault(require("../../traverser"));

var _isEqualAst = _interopRequireDefault(require("./../../utils/isEqualAst"));

var _fMatches = require("f-matches");

var _PotentialMethod2 = _interopRequireDefault(require("./PotentialMethod"));

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
 * Represents a potential constructor method to be created.
 */
var PotentialConstructor = /*#__PURE__*/function (_PotentialMethod) {
  _inherits(PotentialConstructor, _PotentialMethod);

  var _super = _createSuper(PotentialConstructor);

  function PotentialConstructor(cfg) {
    _classCallCheck(this, PotentialConstructor);

    cfg.name = 'constructor';
    return _super.call(this, cfg);
  } // Override superclass method


  _createClass(PotentialConstructor, [{
    key: "getBody",
    value: function getBody() {
      if (this.superClass) {
        return this.transformSuperCalls(this.getBodyBlock());
      } else {
        return this.getBodyBlock();
      }
    } // Transforms constructor body by replacing
    // SuperClass.call(this, ...args) --> super(...args)

  }, {
    key: "transformSuperCalls",
    value: function transformSuperCalls(body) {
      var _this = this;

      return _traverser["default"].replace(body, {
        enter: function enter(node) {
          if (_this.isSuperConstructorCall(node)) {
            node.expression.callee = {
              type: 'Super'
            };
            node.expression.arguments = node.expression.arguments.slice(1);
          }
        }
      });
    }
  }, {
    key: "isSuperConstructorCall",
    value: function isSuperConstructorCall(node) {
      var _this2 = this;

      return (0, _fMatches.matches)({
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: function object(obj) {
              return (0, _isEqualAst["default"])(obj, _this2.superClass);
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

  return PotentialConstructor;
}(_PotentialMethod2["default"]);

exports["default"] = PotentialConstructor;