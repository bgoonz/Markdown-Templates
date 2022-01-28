"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _recast = require("recast");

var _Parser = _interopRequireDefault(require("./Parser"));

var _Logger = _interopRequireDefault(require("./Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Runs transforms on code.
 */
var Transformer = /*#__PURE__*/function () {
  /**
   * @param {Function[]} transforms List of transforms to perform
   */
  function Transformer() {
    var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Transformer);

    this.transforms = transforms;
  }
  /**
   * Tranforms code using all configured transforms.
   *
   * @param {String} code Input ES5 code
   * @return {Object} Output ES6 code
   */


  _createClass(Transformer, [{
    key: "run",
    value: function run(code) {
      var logger = new _Logger["default"]();
      return {
        code: this.applyAllTransforms(code, logger),
        warnings: logger.getWarnings()
      };
    }
  }, {
    key: "applyAllTransforms",
    value: function applyAllTransforms(code, logger) {
      var _this = this;

      return this.ignoringHashBangComment(code, function (js) {
        var ast = (0, _recast.parse)(js, {
          parser: _Parser["default"]
        });

        _this.transforms.forEach(function (transformer) {
          transformer(ast.program, logger);
        });

        return (0, _recast.print)(ast, {
          lineTerminator: _this.detectLineTerminator(code),
          objectCurlySpacing: false
        }).code;
      });
    } // strips hashBang comment,
    // invokes callback with normal js,
    // then re-adds the hashBang comment back

  }, {
    key: "ignoringHashBangComment",
    value: function ignoringHashBangComment(code, callback) {
      var _code$match = code.match(/^(\s*#!.*?\r?\n|)([\s\S]*)$/),
          _code$match2 = _slicedToArray(_code$match, 3),

      /* all */
      hashBang = _code$match2[1],
          js = _code$match2[2];

      return hashBang + callback(js);
    }
  }, {
    key: "detectLineTerminator",
    value: function detectLineTerminator(code) {
      var hasCRLF = /\r\n/.test(code);
      var hasLF = /[^\r]\n/.test(code);
      return hasCRLF && !hasLF ? '\r\n' : '\n';
    }
  }]);

  return Transformer;
}();

exports["default"] = Transformer;