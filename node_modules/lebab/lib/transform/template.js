"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _traverser = _interopRequireDefault(require("../traverser"));

var _TemplateLiteral = _interopRequireDefault(require("./../syntax/TemplateLiteral"));

var _TemplateElement = _interopRequireDefault(require("./../syntax/TemplateElement"));

var _isString = _interopRequireDefault(require("./../utils/isString"));

var _fp = require("lodash/fp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast) {
  _traverser["default"].replace(ast, {
    enter: function enter(node) {
      if (isPlusExpression(node)) {
        var plusExpr = flattenPlusExpression(node);

        if (plusExpr.isString && !plusExpr.operands.every(_isString["default"])) {
          var literal = new _TemplateLiteral["default"](splitQuasisAndExpressions(plusExpr.operands)); // Ensure correct order of comments by sorting them by their position in source

          literal.comments = (0, _fp.sortBy)('start', plusExpr.comments);
          return literal;
        }
      }
    }
  });
} // Returns object of three fields:
// - operands: flat array of all the plus operation sub-expressions
// - comments: array of comments
// - isString: true when the result of the whole plus operation is a string


function flattenPlusExpression(node) {
  if (isPlusExpression(node)) {
    var left = flattenPlusExpression(node.left);
    var right = flattenPlusExpression(node.right);

    if (left.isString || right.isString) {
      return {
        operands: (0, _fp.flatten)([left.operands, right.operands]),
        comments: (0, _fp.flatten)([node.comments || [], left.comments, right.comments]),
        isString: true
      };
    } else {
      return {
        operands: [node],
        comments: node.comments || [],
        isString: false
      };
    }
  } else {
    return {
      operands: [node],
      comments: node.comments || [],
      isString: (0, _isString["default"])(node)
    };
  }
}

function isPlusExpression(node) {
  return node.type === 'BinaryExpression' && node.operator === '+';
}

function splitQuasisAndExpressions(operands) {
  var quasis = [];
  var expressions = [];

  for (var i = 0; i < operands.length; i++) {
    var curr = operands[i];

    if ((0, _isString["default"])(curr)) {
      var currVal = curr.value;
      var currRaw = escapeForTemplate(curr.raw);

      while ((0, _isString["default"])(operands[i + 1] || {})) {
        i++;
        currVal += operands[i].value;
        currRaw += escapeForTemplate(operands[i].raw);
      }

      quasis.push(new _TemplateElement["default"]({
        raw: currRaw,
        cooked: currVal
      }));
    } else {
      if (i === 0) {
        quasis.push(new _TemplateElement["default"]({}));
      }

      if (!(0, _isString["default"])(operands[i + 1] || {})) {
        quasis.push(new _TemplateElement["default"]({
          tail: operands[i + 1] === undefined
        }));
      }

      expressions.push(curr);
    }
  }

  return {
    quasis: quasis,
    expressions: expressions
  };
} // Strip surrounding quotes, escape backticks and unescape escaped quotes


function escapeForTemplate(raw) {
  return raw.replace(/^['"]|['"]$/g, '').replace(/`/g, '\\`').replace(/\\(['"])/g, '$1');
}