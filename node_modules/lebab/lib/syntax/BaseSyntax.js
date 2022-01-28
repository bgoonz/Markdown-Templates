"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @abstract BaseSyntax
 */
var BaseSyntax =
/**
 * The constructor of BaseSyntax
 *
 * @param {String} type
 */
function BaseSyntax(type) {
  _classCallCheck(this, BaseSyntax);

  this.type = type;
};

exports["default"] = BaseSyntax;