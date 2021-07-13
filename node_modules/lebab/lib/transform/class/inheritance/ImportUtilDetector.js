"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fMatches = require("f-matches");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Detects variable name imported from: import <name> from "util"
 */
var ImportUtilDetector = /*#__PURE__*/function () {
  function ImportUtilDetector() {
    _classCallCheck(this, ImportUtilDetector);
  }

  _createClass(ImportUtilDetector, [{
    key: "detect",

    /**
     * Detects: import <identifier> from "util"
     *
     * @param {Object} node
     * @return {Object} MemberExpression of <identifier>.inherits
     */
    value: function detect(node) {
      var m = this.matchImportUtil(node);

      if (m) {
        return {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: m.name
          },
          property: {
            type: 'Identifier',
            name: 'inherits'
          }
        };
      }
    } // Matches: import <name> from "util"

  }, {
    key: "matchImportUtil",
    value: function matchImportUtil(node) {
      return (0, _fMatches.matches)({
        type: 'ImportDeclaration',
        specifiers: (0, _fMatches.matchesLength)([{
          type: 'ImportDefaultSpecifier',
          local: {
            type: 'Identifier',
            name: (0, _fMatches.extractAny)('name')
          }
        }]),
        source: {
          type: 'Literal',
          value: 'util'
        }
      }, node);
    }
  }]);

  return ImportUtilDetector;
}();

exports["default"] = ImportUtilDetector;