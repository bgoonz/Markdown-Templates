"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../traverser"));

var _fMatches = require("f-matches");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      var _matchFunctionApplyCa = matchFunctionApplyCall(node),
          func = _matchFunctionApplyCa.func,
          array = _matchFunctionApplyCa.array;

      if (func) {
        return createCallWithSpread(func, array);
      }

      var _matchObjectApplyCall = matchObjectApplyCall(node),
          memberExpr = _matchObjectApplyCall.memberExpr,
          thisParam = _matchObjectApplyCall.thisParam,
          arrayParam = _matchObjectApplyCall.arrayParam;

      if (memberExpr && (0, _fp.isEqual)(omitLoc(memberExpr.object), omitLoc(thisParam))) {
        return createCallWithSpread(memberExpr, arrayParam);
      }
    }
  });
}

function createCallWithSpread(func, array) {
  return {
    type: 'CallExpression',
    callee: func,
    arguments: [{
      type: 'SpreadElement',
      argument: array
    }]
  };
} // Recursively strips `loc`, `start` and `end` fields from given object and its nested objects,
// removing the location information that we don't care about when comparing
// AST nodes.


function omitLoc(obj) {
  if ((0, _fp.isArray)(obj)) {
    return obj.map(omitLoc);
  } else if ((0, _fp.isObjectLike)(obj)) {
    return (0, _fp.flow)((0, _fp.omit)(['loc', 'start', 'end']), (0, _fp.mapValues)(omitLoc))(obj);
  } else {
    return obj;
  }
}

var isUndefined = (0, _fMatches.matches)({
  type: 'Identifier',
  name: 'undefined'
});
var isNull = (0, _fMatches.matches)({
  type: 'Literal',
  value: null,
  // eslint-disable-line no-null/no-null
  raw: 'null'
});

function matchFunctionApplyCall(node) {
  return (0, _fMatches.matches)({
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: (0, _fMatches.extract)('func', {
        type: 'Identifier'
      }),
      property: {
        type: 'Identifier',
        name: 'apply'
      }
    },
    arguments: [function (arg) {
      return isUndefined(arg) || isNull(arg);
    }, (0, _fMatches.extractAny)('array')]
  }, node);
}

function matchObjectApplyCall(node) {
  return (0, _fMatches.matches)({
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: (0, _fMatches.extract)('memberExpr', {
        type: 'MemberExpression'
      }),
      property: {
        type: 'Identifier',
        name: 'apply'
      }
    },
    arguments: [(0, _fMatches.extractAny)('thisParam'), (0, _fMatches.extractAny)('arrayParam')]
  }, node);
}