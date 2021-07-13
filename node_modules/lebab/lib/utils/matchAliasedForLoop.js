"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _isEqualAst = _interopRequireDefault(require("./isEqualAst"));

var _fMatches = require("f-matches");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Matches <ident>++ or ++<ident>
var matchPlusPlus = (0, _fMatches.matches)({
  type: 'UpdateExpression',
  operator: '++',
  argument: (0, _fMatches.extract)('indexIncrement', {
    type: 'Identifier'
  })
}); // Matches <ident>+=1

var matchPlusOne = (0, _fMatches.matches)({
  type: 'AssignmentExpression',
  operator: '+=',
  left: (0, _fMatches.extract)('indexIncrement', {
    type: 'Identifier'
  }),
  right: {
    type: 'Literal',
    value: 1
  }
}); // Matches for-loop
// without checking the consistency of index and array variables:
//
// for (let index = 0; indexComparison < array.length; indexIncrement++) {
//     let item = arrayReference[indexReference];
//     ...
// }

var matchLooseForLoop = (0, _fMatches.matches)({
  type: 'ForStatement',
  init: {
    type: 'VariableDeclaration',
    declarations: (0, _fMatches.matchesLength)([{
      type: 'VariableDeclarator',
      id: (0, _fMatches.extract)('index', {
        type: 'Identifier'
      }),
      init: {
        type: 'Literal',
        value: 0
      }
    }]),
    kind: (0, _fMatches.extractAny)('indexKind')
  },
  test: {
    type: 'BinaryExpression',
    operator: '<',
    left: (0, _fMatches.extract)('indexComparison', {
      type: 'Identifier'
    }),
    right: {
      type: 'MemberExpression',
      computed: false,
      object: (0, _fMatches.extractAny)('array'),
      property: {
        type: 'Identifier',
        name: 'length'
      }
    }
  },
  update: function update(node) {
    return matchPlusPlus(node) || matchPlusOne(node);
  },
  body: (0, _fMatches.extract)('body', {
    type: 'BlockStatement',
    body: [{
      type: 'VariableDeclaration',
      declarations: [{
        type: 'VariableDeclarator',
        id: (0, _fMatches.extract)('item', {
          type: 'Identifier'
        }),
        init: {
          type: 'MemberExpression',
          computed: true,
          object: (0, _fMatches.extractAny)('arrayReference'),
          property: (0, _fMatches.extract)('indexReference', {
            type: 'Identifier'
          })
        }
      }],
      kind: (0, _fMatches.extractAny)('itemKind')
    }]
  })
});

function isConsistentIndexVar(_ref) {
  var index = _ref.index,
      indexComparison = _ref.indexComparison,
      indexIncrement = _ref.indexIncrement,
      indexReference = _ref.indexReference;
  return (0, _isEqualAst["default"])(index, indexComparison) && (0, _isEqualAst["default"])(index, indexIncrement) && (0, _isEqualAst["default"])(index, indexReference);
}

function isConsistentArrayVar(_ref2) {
  var array = _ref2.array,
      arrayReference = _ref2.arrayReference;
  return (0, _isEqualAst["default"])(array, arrayReference);
}
/**
 * Matches for-loop that aliases current array element
 * in the first line of the loop body:
 *
 *     for (let index = 0; index < array.length; index++) {
 *         let item = array[index];
 *         ...
 *     }
 *
 * Extracts the following fields:
 *
 * - index - loop index identifier
 * - indexKind - the kind of <index>
 * - array - array identifier or expression
 * - item - identifier used to alias current array element
 * - itemKind - the kind of <item>
 * - body - the whole BlockStatement of for-loop body
 *
 * @param  {Object} node
 * @return {Object}
 */


function _default(ast) {
  var match = matchLooseForLoop(ast);

  if (match && isConsistentIndexVar(match) && isConsistentArrayVar(match)) {
    return match;
  }
}