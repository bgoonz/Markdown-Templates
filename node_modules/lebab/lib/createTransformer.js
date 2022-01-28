"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTransformer;

var _Transformer = _interopRequireDefault(require("./Transformer"));

var _class = _interopRequireDefault(require("./transform/class"));

var _template = _interopRequireDefault(require("./transform/template"));

var _arrow = _interopRequireDefault(require("./transform/arrow"));

var _arrowReturn = _interopRequireDefault(require("./transform/arrowReturn"));

var _let = _interopRequireDefault(require("./transform/let"));

var _defaultParam = _interopRequireDefault(require("./transform/defaultParam"));

var _destructParam = _interopRequireDefault(require("./transform/destructParam"));

var _argSpread = _interopRequireDefault(require("./transform/argSpread"));

var _argRest = _interopRequireDefault(require("./transform/argRest"));

var _objMethod = _interopRequireDefault(require("./transform/objMethod"));

var _objShorthand = _interopRequireDefault(require("./transform/objShorthand"));

var _noStrict = _interopRequireDefault(require("./transform/noStrict"));

var _commonjs = _interopRequireDefault(require("./transform/commonjs"));

var _exponent = _interopRequireDefault(require("./transform/exponent"));

var _multiVar = _interopRequireDefault(require("./transform/multiVar"));

var _forOf = _interopRequireDefault(require("./transform/forOf"));

var _forEach = _interopRequireDefault(require("./transform/forEach"));

var _includes = _interopRequireDefault(require("./transform/includes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transformsMap = {
  'class': _class["default"],
  'template': _template["default"],
  'arrow': _arrow["default"],
  'arrow-return': _arrowReturn["default"],
  'let': _let["default"],
  'default-param': _defaultParam["default"],
  'destruct-param': _destructParam["default"],
  'arg-spread': _argSpread["default"],
  'arg-rest': _argRest["default"],
  'obj-method': _objMethod["default"],
  'obj-shorthand': _objShorthand["default"],
  'no-strict': _noStrict["default"],
  'commonjs': _commonjs["default"],
  'exponent': _exponent["default"],
  'multi-var': _multiVar["default"],
  'for-of': _forOf["default"],
  'for-each': _forEach["default"],
  'includes': _includes["default"]
};
/**
 * Factory for creating a Transformer
 * by just specifying the names of the transforms.
 * @param  {String[]} transformNames
 * @return {Transformer}
 */

function createTransformer(transformNames) {
  validate(transformNames);
  return new _Transformer["default"](transformNames.map(function (name) {
    return transformsMap[name];
  }));
}

function validate(transformNames) {
  transformNames.forEach(function (name) {
    if (!transformsMap[name]) {
      throw "Unknown transform \"".concat(name, "\".");
    }
  });
}