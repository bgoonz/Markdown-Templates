"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractComments;

var _fp = require("lodash/fp");

/**
 * Extracts comments from an array of nodes.
 * @param {Object[]} nodes
 * @param {Object[]} extracted comments
 */
function extractComments(nodes) {
  return (0, _fp.flatMap)(function (n) {
    return n.comments || [];
  }, nodes);
}