"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _fp = require("lodash/fp");

var _traverser = _interopRequireDefault(require("../../traverser"));

var _PotentialClass = _interopRequireDefault(require("./PotentialClass"));

var _PotentialMethod = _interopRequireDefault(require("./PotentialMethod"));

var _PotentialConstructor = _interopRequireDefault(require("./PotentialConstructor"));

var _matchFunctionDeclaration = _interopRequireDefault(require("./matchFunctionDeclaration"));

var _matchFunctionVar = _interopRequireDefault(require("./matchFunctionVar"));

var _matchFunctionAssignment = _interopRequireDefault(require("./matchFunctionAssignment"));

var _matchPrototypeFunctionAssignment = _interopRequireDefault(require("./matchPrototypeFunctionAssignment"));

var _matchPrototypeObjectAssignment = _interopRequireDefault(require("./matchPrototypeObjectAssignment"));

var _matchObjectDefinePropertyCall = _interopRequireDefault(require("./matchObjectDefinePropertyCall"));

var _Inheritance = _interopRequireDefault(require("./inheritance/Inheritance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(ast, logger) {
  var potentialClasses = {};
  var inheritance = new _Inheritance["default"]();

  _traverser["default"].traverse(ast, {
    enter: function enter(node, parent) {
      var m;

      if (m = (0, _matchFunctionDeclaration["default"])(node) || (0, _matchFunctionVar["default"])(node)) {
        potentialClasses[m.className] = new _PotentialClass["default"]({
          name: m.className,
          fullNode: node,
          commentNodes: [node],
          parent: parent
        });
        potentialClasses[m.className].setConstructor(new _PotentialConstructor["default"]({
          methodNode: m.constructorNode,
          potentialClass: potentialClasses[m.className]
        }));
      } else if (m = (0, _matchFunctionAssignment["default"])(node)) {
        if (potentialClasses[m.className]) {
          potentialClasses[m.className].addMethod(new _PotentialMethod["default"]({
            name: m.methodName,
            methodNode: m.methodNode,
            fullNode: node,
            commentNodes: [node],
            parent: parent,
            "static": true
          }));
        }
      } else if (m = (0, _matchPrototypeFunctionAssignment["default"])(node)) {
        if (potentialClasses[m.className]) {
          potentialClasses[m.className].addMethod(new _PotentialMethod["default"]({
            name: m.methodName,
            methodNode: m.methodNode,
            fullNode: node,
            commentNodes: [node],
            parent: parent
          }));
        }
      } else if (m = (0, _matchPrototypeObjectAssignment["default"])(node)) {
        if (potentialClasses[m.className]) {
          m.methods.forEach(function (method, i) {
            var assignmentComments = i === 0 ? [node] : [];
            potentialClasses[m.className].addMethod(new _PotentialMethod["default"]({
              name: method.methodName,
              methodNode: method.methodNode,
              fullNode: node,
              commentNodes: assignmentComments.concat([method.propertyNode]),
              parent: parent,
              kind: classMethodKind(method.kind)
            }));
          });
        }
      } else if (m = (0, _matchObjectDefinePropertyCall["default"])(node)) {
        if (potentialClasses[m.className]) {
          m.descriptors.forEach(function (desc, i) {
            var parentComments = i === 0 ? [node] : [];
            potentialClasses[m.className].addMethod(new _PotentialMethod["default"]({
              name: m.methodName,
              methodNode: desc.methodNode,
              fullNode: node,
              commentNodes: parentComments.concat([desc.propertyNode]),
              parent: parent,
              kind: desc.kind
            }));
          });
        }
      } else if (m = inheritance.process(node, parent)) {
        if (potentialClasses[m.className]) {
          potentialClasses[m.className].setSuperClass(m.superClass, m.relatedExpressions);
        }
      }
    },
    leave: function leave(node) {
      if (node.type === 'Program') {
        (0, _fp.values)(potentialClasses).filter(function (cls) {
          return cls.isTransformable() ? true : logWarning(cls);
        }).forEach(function (cls) {
          return cls.transform();
        });
      }
    }
  }); // Ordinary methods inside class use kind=method,
  // unlike methods inside object literal, which use kind=init.


  function classMethodKind(kind) {
    return kind === 'init' ? 'method' : kind;
  }

  function logWarning(cls) {
    if (/^[A-Z]/.test(cls.getName())) {
      logger.warn(cls.getFullNode(), "Function ".concat(cls.getName(), " looks like class, but has no prototype"), 'class');
    }
  }
}