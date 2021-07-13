"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Taken from http://stackoverflow.com/questions/3430939/node-js-readsync-from-stdin/16048083#16048083
function readStdin() {
  var BUFSIZE = 256;
  var buf = 'alloc' in Buffer ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
  var bytesRead;
  var out = '';

  do {
    try {
      bytesRead = _fs["default"].readSync(process.stdin.fd, buf, 0, BUFSIZE);
    } catch (e) {
      if (e.code === 'EAGAIN') {
        // 'resource temporarily unavailable'
        // Happens on OS X 10.8.3 (not Windows 7!), if there's no
        // stdin input - typically when invoking a script without any
        // input (for interactive stdin input).
        // If you were to just continue, you'd create a tight loop.
        throw e;
      } else if (e.code === 'EOF') {
        // Happens on Windows 7, but not OS X 10.8.3:
        // simply signals the end of *piped* stdin input.
        break;
      }

      throw e; // unexpected exception
    } // Process the chunk read.


    out += buf.toString('utf8', 0, bytesRead);
  } while (bytesRead !== 0); // Loop as long as stdin input is available.


  return out;
}
/**
 * Input/output helpers.
 */


var _default = {
  /**
   * Returns the contents of an entire file.
   * When no filename given, reads from STDIN.
   * @param  {String} filename
   * @return {String}
   */
  read: function read(filename) {
    if (filename) {
      return _fs["default"].readFileSync(filename).toString();
    } else {
      return readStdin();
    }
  },

  /**
   * Writes the data to file.
   * When no filename given, writes to STDIN.
   * @param  {String} filename
   * @param  {String} data
   */
  write: function write(filename, data) {
    if (filename) {
      _fs["default"].writeFileSync(filename, data);
    } else {
      process.stdout.write(data);
    }
  }
};
exports["default"] = _default;