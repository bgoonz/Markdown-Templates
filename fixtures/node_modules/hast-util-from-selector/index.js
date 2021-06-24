'use strict'

module.exports = fromSelector

var h = require('hastscript')
var s = require('hastscript/svg')
var zwitch = require('zwitch')
var Parser = require('css-selector-parser').CssSelectorParser

var compile = zwitch('type')
var handlers = compile.handlers

handlers.selectors = selectors
handlers.ruleSet = ruleSet
handlers.rule = rule

var parser = new Parser()

parser.registerNestingOperators('>', '+', '~')
// Register these so we can throw nicer errors.
parser.registerAttrEqualityMods('~', '|', '^', '$', '*')

function fromSelector(selector, space) {
  var opts = (typeof space === 'string' ? {space: space} : space) || {}
  var result = parser.parse(selector || '')
  var config = {space: opts.space || 'html', root: true}

  return compile(result, config) || build(config.space)()
}

function selectors() {
  throw new Error('Cannot handle selector list')
}

function ruleSet(query, config) {
  return compile(query.rule, config)
}

function rule(query, config) {
  var subrule = query.rule
  var name = query.tagName
  var parentSpace = config.space
  var space = parentSpace
  var sibling = false
  var operator
  var node

  if (name === '*') {
    name = ''
  }

  if (subrule) {
    operator = subrule.nestingOperator
    sibling = operator === '+' || operator === '~'

    if (sibling && config.root) {
      throw new Error(
        'Cannot handle sibling combinator `' + operator + '` at root'
      )
    }
  }

  // Switch to SVG when needed.
  if (space === 'html' && name === 'svg') {
    space = 'svg'
  }

  node = build(space)(
    name,
    Object.assign(
      {id: query.id, className: query.classNames},
      pseudosToHast(query.pseudos || []),
      attrsToHast(query.attrs || [])
    ),
    !subrule || sibling ? [] : compile(subrule, {space: space})
  )

  return sibling ? [node, compile(subrule, {space: parentSpace})] : node
}

function pseudosToHast(pseudos) {
  var props = {}
  var length = pseudos.length
  var index = -1
  var pseudo
  var name

  while (++index < length) {
    pseudo = pseudos[index]
    name = pseudo.name

    if (name) {
      throw new Error('Cannot handle pseudo-selector `' + name + '`')
    } else {
      throw new Error('Cannot handle pseudo-element or empty pseudo-class')
    }
  }

  return props
}

function attrsToHast(attrs) {
  var props = {}
  var length = attrs.length
  var index = -1
  var attr
  var name
  var operator

  while (++index < length) {
    attr = attrs[index]
    name = attr.name
    operator = attr.operator

    if (operator) {
      if (operator === '=') {
        props[name] = attr.value
      } else {
        throw new Error(
          'Cannot handle attribute equality modifier `' + operator + '`'
        )
      }
    } else {
      props[name] = true
    }
  }

  return props
}

function build(space) {
  return space === 'html' ? h : s
}
