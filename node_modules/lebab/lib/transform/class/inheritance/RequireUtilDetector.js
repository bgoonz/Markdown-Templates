"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fp = require("lodash/fp");

var _fMatches = require("f-matches");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Detects variable name imported from require("util")
 */
var RequireUtilDetector = /*#__PURE__*/function () {
  function RequireUtilDetector() {
    _classCallCheck(this, RequireUtilDetector);
  }

  _createClass(RequireUtilDetector, [{
    key: "detect",

    /**
     * Detects: var <identifier> = require("util")
     *
     * @param {Object} node
     * @return {Object} MemberExpression of <identifier>.inherits
     */
    value: function detect(node) {
      var _this = this;

      if (node.type !== 'VariableDeclaration') {
        return;
      }

      var declaration = (0, _fp.find)(function (dec) {
        return _this.isRequireUtil(dec);
      }, node.declarations);

      if (declaration) {
        return {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'Identifier',
            name: declaration.id.name
          },
          property: {
            type: 'Identifier',
            name: 'inherits'
          }
        };
      }
    } // Matches: <id> = require("util")

  }, {
    key: "isRequireUtil",
    value: function isRequireUtil(dec) {
      return (0, _fMatches.matches)({
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier'
        },
        init: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'require'
          },
          arguments: (0, _fMatches.matchesLength)([{
            type: 'Literal',
            value: 'util'
          }])
        }
      }, dec);
    }
  }]);

  return RequireUtilDetector;
}();

exports["default"] = RequireUtilDetector;