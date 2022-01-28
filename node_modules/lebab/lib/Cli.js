"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _glob = _interopRequireDefault(require("glob"));

var _OptionParser = _interopRequireDefault(require("./OptionParser"));

var _createTransformer = _interopRequireDefault(require("./createTransformer"));

var _io = _interopRequireDefault(require("./io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Lebab command line app
 */
var Cli = /*#__PURE__*/function () {
  /**
   * @param {String[]} argv Command line arguments
   */
  function Cli(argv) {
    _classCallCheck(this, Cli);

    try {
      this.options = new _OptionParser["default"]().parse(argv);
      this.transformer = (0, _createTransformer["default"])(this.options.transforms);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console

      process.exit(2);
    }
  }
  /**
   * Runs the app
   */


  _createClass(Cli, [{
    key: "run",
    value: function run() {
      var _this = this;

      if (this.options.replace) {
        // Transform all files in a directory
        _glob["default"].sync(this.options.replace).forEach(function (file) {
          _this.transformFile(file, file);
        });
      } else {
        // Transform just a single file
        this.transformFile(this.options.inFile, this.options.outFile);
      }
    }
  }, {
    key: "transformFile",
    value: function transformFile(inFile, outFile) {
      var _this$transformer$run = this.transformer.run(_io["default"].read(inFile)),
          code = _this$transformer$run.code,
          warnings = _this$transformer$run.warnings; // Log warnings if there are any


      if (warnings.length > 0 && inFile) {
        console.error("".concat(inFile, ":")); // eslint-disable-line no-console
      }

      warnings.forEach(function (_ref) {
        var line = _ref.line,
            msg = _ref.msg,
            type = _ref.type;
        console.error( // eslint-disable-line no-console
        "".concat(line, ":  warning  ").concat(msg, "  (").concat(type, ")"));
      });

      _io["default"].write(outFile, code);
    }
  }]);

  return Cli;
}();

exports["default"] = Cli;