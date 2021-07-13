"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isEqualAst;

var _fp = require("lodash/fp");

var metaDataFields = {
  comments: true,
  loc: true,
  start: true,
  end: true
};
/**
 * True when two AST nodes are structurally equal.
 * When comparing objects it ignores the meta-data fields for
 * comments and source-code position.
 * @param  {Object}  a
 * @param  {Object}  b
 * @return {Boolean}
 */

function isEqualAst(a, b) {
  return (0, _fp.isEqualWith)(function (aValue, bValue, key) {
    return metaDataFields[key];
  }, a, b);
}