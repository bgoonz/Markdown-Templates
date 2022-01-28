"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateForLoop;

var _traverser = _interopRequireDefault(require("../../traverser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks that for-loop can be transformed to Array.forEach()
 *
 * Returns a warning message in case we can't transform.
 *
 * @param  {Object} node The ForStatement
 * @param  {Object} body BlockStatement that's body of ForStatement
 * @param  {String} indexKind
 * @param  {String} itemKind
 * @return {Array} Array of node and warnings message or undefined on success.
 */
function validateForLoop(node, _ref) {
  var body = _ref.body,
      indexKind = _ref.indexKind,
      itemKind = _ref.itemKind;
  var statement;

  if (statement = returnUsed(body)) {
    return [statement, 'Return statement used in for-loop body'];
  } else if (statement = breakWithLabelUsed(body)) {
    return [statement, 'Break statement with label used in for-loop body'];
  } else if (statement = continueWithLabelUsed(body)) {
    return [statement, 'Continue statement with label used in for-loop body'];
  } else if (statement = breakUsed(body)) {
    return [statement, 'Break statement used in for-loop body'];
  } else if (statement = continueUsed(body)) {
    return [statement, 'Continue statement used in for-loop body'];
  } else if (indexKind !== 'let') {
    return [node, 'Only for-loops with indexes declared as let can be tranformed (use let transform first)'];
  } else if (itemKind !== 'const') {
    return [node, 'Only for-loops with const array items can be tranformed (use let transform first)'];
  }
}

var loopStatements = ['ForStatement', 'ForInStatement', 'ForOfStatement', 'DoWhileStatement', 'WhileStatement'];

function returnUsed(body) {
  return _traverser["default"].find(body, 'ReturnStatement');
}

function breakWithLabelUsed(body) {
  return _traverser["default"].find(body, function (_ref2) {
    var type = _ref2.type,
        label = _ref2.label;
    return type === 'BreakStatement' && label;
  });
}

function continueWithLabelUsed(body) {
  return _traverser["default"].find(body, function (_ref3) {
    var type = _ref3.type,
        label = _ref3.label;
    return type === 'ContinueStatement' && label;
  });
}

function breakUsed(body) {
  return _traverser["default"].find(body, 'BreakStatement', {
    skipTypes: [].concat(loopStatements, ['SwitchStatement'])
  });
}

function continueUsed(body) {
  return _traverser["default"].find(body, 'ContinueStatement', {
    skipTypes: loopStatements
  });
}