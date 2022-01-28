"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _importCommonjs = _interopRequireDefault(require("./importCommonjs"));

var _exportCommonjs = _interopRequireDefault(require("./exportCommonjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast, logger) {
  (0, _importCommonjs["default"])(ast, logger);
  (0, _exportCommonjs["default"])(ast, logger);
}