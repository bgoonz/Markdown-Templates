"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../traverser"));

var _ArrowFunctionExpression = _interopRequireDefault(require("../syntax/ArrowFunctionExpression"));

var _fMatches = require("f-matches");

var _copyComments = _interopRequireDefault(require("../utils/copyComments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast, logger) {
  _traverser["default"].replace(ast, {
    enter: function enter(node, parent) {
      if (isFunctionConvertableToArrow(node, parent)) {
        if (hasArguments(node.body)) {
          logger.warn(node, 'Can not use arguments in arrow function', 'arrow');
          return;
        }

        return functionToArrow(node, parent);
      }

      var _matchBoundFunction = matchBoundFunction(node),
          func = _matchBoundFunction.func;

      if (func) {
        return functionToArrow(func, parent);
      }
    }
  });
}

function isFunctionConvertableToArrow(node, parent) {
  return node.type === 'FunctionExpression' && parent.type !== 'Property' && parent.type !== 'MethodDefinition' && !node.id && !node.generator && !hasThis(node.body);
} // Matches: function(){}.bind(this)


function matchBoundFunction(node) {
  return (0, _fMatches.matches)({
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: (0, _fMatches.extract)('func', {
        type: 'FunctionExpression',
        id: null,
        // eslint-disable-line no-null/no-null
        body: function body(_body) {
          return !hasArguments(_body);
        },
        generator: false
      }),
      property: {
        type: 'Identifier',
        name: 'bind'
      }
    },
    arguments: (0, _fMatches.matchesLength)([{
      type: 'ThisExpression'
    }])
  }, node);
}

function hasThis(ast) {
  return hasInFunctionBody(ast, {
    type: 'ThisExpression'
  });
}

function hasArguments(ast) {
  return hasInFunctionBody(ast, {
    type: 'Identifier',
    name: 'arguments'
  });
} // Returns true when pattern matches any node in given function body,
// excluding any nested functions


function hasInFunctionBody(ast, pattern) {
  return _traverser["default"].find(ast, (0, _fp.matches)(pattern), {
    skipTypes: ['FunctionExpression', 'FunctionDeclaration']
  });
}

function functionToArrow(func, parent) {
  var arrow = new _ArrowFunctionExpression["default"]({
    body: func.body,
    params: func.params,
    defaults: func.defaults,
    rest: func.rest,
    async: func.async
  });
  (0, _copyComments["default"])({
    from: func,
    to: arrow
  }); // Get rid of extra parentheses around IIFE
  // by forcing Recast to reformat the CallExpression

  if (isIIFE(func, parent)) {
    parent.original = null; // eslint-disable-line no-null/no-null
  }

  return arrow;
} // Is it immediately invoked function expression?


function isIIFE(func, parent) {
  return parent.type === 'CallExpression' && parent.callee === func;
}