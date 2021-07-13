"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchRequireWithProperty = exports.matchRequire = void 0;

var _isString = _interopRequireDefault(require("../../utils/isString"));

var _fMatches = require("f-matches");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isIdentifier = (0, _fMatches.matches)({
  type: 'Identifier'
}); // matches Property with Identifier key and value (possibly shorthand)

var isSimpleProperty = (0, _fMatches.matches)({
  type: 'Property',
  key: isIdentifier,
  computed: false,
  value: isIdentifier
}); // matches: {a, b: myB, c, ...}

var isObjectPattern = (0, _fMatches.matches)({
  type: 'ObjectPattern',
  properties: function properties(props) {
    return props.every(isSimpleProperty);
  }
}); // matches: require(<source>)

var matchRequireCall = (0, _fMatches.matches)({
  type: 'CallExpression',
  callee: {
    type: 'Identifier',
    name: 'require'
  },
  arguments: (0, _fMatches.extract)('sources', function (args) {
    return args.length === 1 && (0, _isString["default"])(args[0]);
  })
});
/**
 * Matches: <id> = require(<source>);
 */

var matchRequire = (0, _fMatches.matches)({
  type: 'VariableDeclarator',
  id: (0, _fMatches.extract)('id', function (id) {
    return isIdentifier(id) || isObjectPattern(id);
  }),
  init: matchRequireCall
});
/**
 * Matches: <id> = require(<source>).<property>;
 */

exports.matchRequire = matchRequire;
var matchRequireWithProperty = (0, _fMatches.matches)({
  type: 'VariableDeclarator',
  id: (0, _fMatches.extract)('id', isIdentifier),
  init: {
    type: 'MemberExpression',
    computed: false,
    object: matchRequireCall,
    property: (0, _fMatches.extract)('property', {
      type: 'Identifier'
    })
  }
});
exports.matchRequireWithProperty = matchRequireWithProperty;