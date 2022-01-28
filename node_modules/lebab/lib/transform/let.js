"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../traverser"));

var functionType = _interopRequireWildcard(require("../utils/functionType"));

var variableType = _interopRequireWildcard(require("../utils/variableType"));

var destructuring = _interopRequireWildcard(require("../utils/destructuring.js"));

var _multiReplaceStatement = _interopRequireDefault(require("../utils/multiReplaceStatement"));

var _ScopeManager = _interopRequireDefault(require("../scope/ScopeManager"));

var _VariableMarker = _interopRequireDefault(require("../scope/VariableMarker"));

var _FunctionHoister = _interopRequireDefault(require("../scope/FunctionHoister"));

var _VariableDeclaration = _interopRequireDefault(require("../syntax/VariableDeclaration"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logger;
var scopeManager;

function _default(ast, loggerInstance) {
  logger = loggerInstance;
  scopeManager = new _ScopeManager["default"]();
  var variableMarker = new _VariableMarker["default"](scopeManager);

  _traverser["default"].traverse(ast, {
    enter: function enter(node, parent) {
      if (node.type === 'Program') {
        enterProgram(node);
      } else if (functionType.isFunctionDeclaration(node)) {
        enterFunctionDeclaration(node);
      } else if (functionType.isFunctionExpression(node)) {
        enterFunctionExpression(node);
      } else if (isBlockScopedStatement(node)) {
        scopeManager.enterBlock();
      } else if (node.type === 'VariableDeclaration') {
        node.declarations.forEach(function (decl) {
          variableMarker.markDeclared(destructuring.extractVariableNames(decl.id)); // Uninitialized variables can never be const.
          // But variables in for-in/of loop heads are actually initialized (although init === null).

          var inForLoopHead = isAnyForStatement(parent) && parent.left === node;

          if (decl.init === null && !inForLoopHead) {
            // eslint-disable-line no-null/no-null
            variableMarker.markModified(decl.id.name);
          }
        });
      } else if (node.type === 'AssignmentExpression') {
        destructuring.extractVariableNames(node.left).forEach(function (name) {
          variableMarker.markModified(name);
        });
      } else if (variableType.isUpdate(node)) {
        variableMarker.markModified(node.argument.name);
      } else if (variableType.isReference(node, parent)) {
        variableMarker.markReferenced(node.name);
      }
    },
    leave: function leave(node) {
      if (node.type === 'Program') {
        leaveProgram();
      } else if (functionType.isFunction(node)) {
        leaveFunction();
      } else if (isBlockScopedStatement(node)) {
        scopeManager.leaveScope();
      }
    }
  });
} // Block scope is usually delimited by { ... }
// But for-loop heads also constitute a block scope.


function isBlockScopedStatement(node) {
  return node.type === 'BlockStatement' || isAnyForStatement(node);
} // True when dealing with any kind of for-loop


function isAnyForStatement(node) {
  return node.type === 'ForStatement' || node.type === 'ForInStatement' || node.type === 'ForOfStatement';
} // Program node works almost like a function:
// it hoists all variables which can be tranformed to block-scoped let/const.
// It just doesn't have name and parameters.
// So we create an implied FunctionScope and BlockScope.


function enterProgram(node) {
  scopeManager.enterFunction();
  hoistFunction({
    body: node
  });
  scopeManager.enterBlock();
} // FunctionDeclaration has it's name visible outside the function,
// so we first register it in surrounding block-scope and
// after that enter new FunctionScope.


function enterFunctionDeclaration(func) {
  if (func.id) {
    getScope().register(func.id.name, getScope().findFunctionScoped(func.id.name));
  }

  scopeManager.enterFunction();
  hoistFunction({
    params: func.params,
    body: func.body
  });
} // FunctionExpression has it's name visible only inside the function,
// so we first enter new FunctionScope and
// hoist function name and params variables inside it.


function enterFunctionExpression(func) {
  scopeManager.enterFunction();
  hoistFunction({
    id: func.id,
    params: func.params,
    body: func.body
  });
}

function hoistFunction(cfg) {
  new _FunctionHoister["default"](getScope()).hoist(cfg);
} // Exits the implied BlockScope and FunctionScope of Program node


function leaveProgram() {
  scopeManager.leaveScope();
  leaveFunction();
} // Exits FunctionScope but first transforms all variables inside it


function leaveFunction() {
  transformVarsToLetOrConst();
  scopeManager.leaveScope();
} // This is where the actual transform happens


function transformVarsToLetOrConst() {
  getFunctionVariableGroups().forEach(function (group) {
    // Do not modify existing let & const
    if (group.getNode().kind !== 'var') {
      return;
    }

    var commonKind = group.getCommonKind();

    if (commonKind) {
      // When all variables in group are of the same kind,
      // just set appropriate `kind` value for the existing
      // VariableDeclaration node.
      group.getNode().kind = commonKind;
      logWarningForVarKind(group.getNode());
    } else if (hasMultiStatementBody(group.getParentNode())) {
      // When some variables are of a different kind,
      // create separate VariableDeclaration nodes for each
      // VariableDeclarator and set their `kind` value appropriately.
      var varNodes = group.getVariables().map(function (v) {
        return new _VariableDeclaration["default"](v.getKind(), [v.getNode()]);
      });
      (0, _multiReplaceStatement["default"])({
        parent: group.getParentNode(),
        node: group.getNode(),
        replacements: varNodes,
        preserveComments: true
      });
      logWarningForVarKind(group.getNode());
    } else {
      // When parent node restricts breaking VariableDeclaration to multiple ones
      // just change the kind of the declaration to the most restrictive possible
      group.getNode().kind = group.getMostRestrictiveKind();
      logWarningForVarKind(group.getNode());
    }
  });
}

function logWarningForVarKind(node) {
  if (node.kind === 'var') {
    logger.warn(node, 'Unable to transform var', 'let');
  }
} // Does a node have body that can contain an array of statements


function hasMultiStatementBody(node) {
  return node.type === 'BlockStatement' || node.type === 'Program' || node.type === 'SwitchCase';
} // Returns all VariableGroups of variables in current function scope,
// including from all the nested block-scopes (but not the nested
// functions).


function getFunctionVariableGroups() {
  return (0, _fp.flow)((0, _fp.map)(function (v) {
    return v.getGroup();
  }), _fp.uniq, _fp.compact)(getScope().getVariables());
}

function getScope() {
  return scopeManager.getScope();
}