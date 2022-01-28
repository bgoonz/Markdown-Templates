"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isVarWithRequireCalls;

var _matchRequire = require("./matchRequire");

/**
 * Matches: var <id> = require(<source>);
 *          var <id> = require(<source>).<property>;
 */
function isVarWithRequireCalls(node) {
  return node.type === 'VariableDeclaration' && node.declarations.some(function (dec) {
    return (0, _matchRequire.matchRequire)(dec) || (0, _matchRequire.matchRequireWithProperty)(dec);
  });
}