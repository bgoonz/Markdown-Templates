"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _commander = require("commander");

var _package = _interopRequireDefault(require("../package.json"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transformsDocs = "\n  Safe transforms:\n\n    + arrow .......... callback to arrow function\n    + arrow-return ... drop return statements in arrow functions\n    + for-of ......... for loop to for-of loop\n    + for-each ....... for loop to Array.forEach()\n    + arg-rest ....... use of arguments to function(...args)\n    + arg-spread ..... use of apply() to spread operator\n    + obj-method ..... function values in objects to methods\n    + obj-shorthand .. {foo: foo} to {foo}\n    + no-strict ...... remove \"use strict\" directives\n    + exponent ....... Math.pow() to ** operator (ES7)\n    + multi-var ...... single var x,y; declaration to var x; var y; (refactor)\n\n  Unsafe transforms:\n\n    + let ............ var to let/const\n    + class .......... prototype assignments to class declaration\n    + commonjs ....... CommonJS module loading to import/export\n    + template ....... string concatenation to template string\n    + default-param .. use of || to default parameters\n    + destruct-param . use destructuring for objects in function parameters\n    + includes ....... indexOf() != -1 to includes() (ES7)\n";
/**
 * Command line options parser.
 */

var OptionParser = /*#__PURE__*/function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);

    this.program = new _commander.Command();
    this.program.usage('-t <transform> <file>');
    this.program.description("".concat(_package["default"].description, "\n").concat(transformsDocs));
    this.program.version(_package["default"].version);
    this.program.option('-o, --out-file <file>', 'write output to a file');
    this.program.option('--replace <dir>', "in-place transform all *.js files in a directory\n                             <dir> can also be a single file or a glob pattern");
    this.program.option('-t, --transform <a,b,c>', 'one or more transformations to perform', function (v) {
      return v.split(',');
    });
  }
  /**
   * Parses and validates command line options from argv.
   *
   * - On success returns object with options.
   * - On failure throws exceptions with error message to be shown to user.
   *
   * @param {String[]} argv Raw command line arguments
   * @return {Object} options object
   */


  _createClass(OptionParser, [{
    key: "parse",
    value: function parse(argv) {
      this.program.parse(argv);
      return {
        inFile: this.getInputFile(),
        outFile: this.program.outFile,
        replace: this.getReplace(),
        transforms: this.getTransforms()
      };
    }
  }, {
    key: "getInputFile",
    value: function getInputFile() {
      if (this.program.args.length > 1) {
        throw "Only one input file allowed, but ".concat(this.program.args.length, " given instead.");
      }

      if (this.program.args[0] && !_fs["default"].existsSync(this.program.args[0])) {
        throw "File ".concat(this.program.args[0], " does not exist.");
      }

      return this.program.args[0];
    }
  }, {
    key: "getReplace",
    value: function getReplace() {
      if (!this.program.replace) {
        return undefined;
      }

      if (this.program.outFile) {
        throw 'The --replace and --out-file options cannot be used together.';
      }

      if (this.program.args[0]) {
        throw 'The --replace and plain input file options cannot be used together.\n' + 'Did you forget to quote the --replace parameter?';
      }

      if (_fs["default"].existsSync(this.program.replace) && _fs["default"].statSync(this.program.replace).isDirectory()) {
        return _path["default"].join(this.program.replace, '/**/*.js');
      }

      return this.program.replace;
    }
  }, {
    key: "getTransforms",
    value: function getTransforms() {
      if (!this.program.transform || this.program.transform.length === 0) {
        throw "No transforms specified :(\n\n  Use --transform option to pick one of the following:\n  ".concat(transformsDocs);
      }

      return this.program.transform;
    }
  }]);

  return OptionParser;
}();

exports["default"] = OptionParser;