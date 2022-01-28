"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../traverser"));

var _fMatches = require("f-matches");

var _copyComments = _interopRequireDefault(require("../utils/copyComments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      if (isShortenableArrowFunction(node)) {
        return shortenReturn(node);
      }
    }
  });
}

function shortenReturn(node) {
  node.body = extractArrowBody(node.body);
  return node;
}

var matchesReturnBlock = (0, _fMatches.matches)({
  type: 'BlockStatement',
  body: (0, _fMatches.matchesLength)([(0, _fMatches.extract)('returnStatement', {
    type: 'ReturnStatement',
    argument: (0, _fMatches.extractAny)('returnVal')
  })])
});

function isShortenableArrowFunction(node) {
  return node.type === 'ArrowFunctionExpression' && matchesReturnBlock(node.body);
}

function extractArrowBody(block) {
  var _matchesReturnBlock = matchesReturnBlock(block),
      returnStatement = _matchesReturnBlock.returnStatement,
      returnVal = _matchesReturnBlock.returnVal; // preserve return statement comments


  (0, _copyComments["default"])({
    from: returnStatement,
    to: returnVal
  });
  return returnVal;
}