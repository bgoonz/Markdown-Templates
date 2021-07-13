"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Passed to transforms so they can log warnings.
 */
var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.warnings = [];
  }
  /**
   * Logs a warning.
   * @param  {Object} node AAST node that caused the warning
   * @param  {String} msg Warning message itself
   * @param  {String} type Name of the transform
   */


  _createClass(Logger, [{
    key: "warn",
    value: function warn(node, msg, type) {
      this.warnings.push({
        line: node.loc ? node.loc.start.line : 0,
        msg: msg,
        type: type
      });
    }
    /**
     * Returns list of all the warnings
     * @return {Object[]}
     */

  }, {
    key: "getWarnings",
    value: function getWarnings() {
      return this.warnings;
    }
  }]);

  return Logger;
}();

exports["default"] = Logger;