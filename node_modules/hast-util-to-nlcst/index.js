'use strict'

var embedded = require('hast-util-embedded')
var convert = require('hast-util-is-element/convert')
var phrasing = require('hast-util-phrasing')
var textContent = require('hast-util-to-string')
var whitespace = require('hast-util-whitespace')
var toString = require('nlcst-to-string')
var position = require('unist-util-position')
var vfileLocation = require('vfile-location')

module.exports = toNlcst

var push = [].push

var source = convert(['code', dataNlcstSourced])
var ignore = convert(['script', 'style', 'svg', 'math', 'del', dataNlcstIgnore])
var explicit = convert(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

var flowAccepting = convert([
  'body',
  'article',
  'section',
  'blockquote',
  'nav',
  'aside',
  'header',
  'footer',
  'address',
  'li',
  'dt',
  'dd',
  'figure',
  'figcaption',
  'div',
  'main',
  'caption',
  'td',
  'th',
  'form',
  'fieldset',
  'details',
  'dialog'
])

// See: <https://html.spec.whatwg.org/multipage/dom.html#paragraphs>
var unravelInParagraph = convert(['a', 'ins', 'del', 'map'])

// Transform `tree` to nlcst.
function toNlcst(tree, file, Parser) {
  var parser
  var location
  var results
  var doc

  // Warn for invalid parameters.
  if (!tree || !tree.type) {
    throw new Error('hast-util-to-nlcst expected node')
  }

  if (!file || !file.messages) {
    throw new Error('hast-util-to-nlcst expected file')
  }

  // Construct parser.
  if (!Parser) {
    throw new Error('hast-util-to-nlcst expected parser')
  }

  if (!position.start(tree).line || !position.start(tree).column) {
    throw new Error('hast-util-to-nlcst expected position on nodes')
  }

  doc = String(file)
  location = vfileLocation(doc)
  parser = 'parse' in Parser ? Parser : new Parser()

  // Transform hast to nlcst, and pass these into `parser.parse` to insert
  // sentences, paragraphs where needed.
  results = []

  find(tree)

  return {
    type: 'RootNode',
    children: results,
    position: {start: location.toPoint(0), end: location.toPoint(doc.length)}
  }

  function find(node) {
    if (node.type === 'root') {
      findAll(node.children)
    } else if (node.type === 'element' && !ignore(node)) {
      if (explicit(node)) {
        // Explicit paragraph.
        add(node)
      } else if (flowAccepting(node)) {
        // Slightly simplified version of: <https://html.spec.whatwg.org/#paragraphs>.
        implicit(flattenAll(node.children))
      } else {
        // Dig deeper.
        findAll(node.children)
      }
    }
  }

  function findAll(children) {
    var index = -1

    while (++index < children.length) {
      find(children[index])
    }
  }

  function flattenAll(children) {
    var results = []
    var index = -1

    while (++index < children.length) {
      if (unravelInParagraph(children[index])) {
        push.apply(results, flattenAll(children[index].children))
      } else {
        results.push(children[index])
      }
    }

    return results
  }

  function add(node) {
    var result = ('length' in node ? all : one)(node)

    if (result.length) {
      results.push(parser.tokenizeParagraph(result))
    }
  }

  function implicit(children) {
    var index = -1
    var start = -1
    var viable
    var child

    while (++index <= children.length) {
      child = children[index]

      if (child && phrasing(child)) {
        if (start === -1) start = index

        if (!viable && !embedded(child) && !whitespace(child)) {
          viable = true
        }
      } else if (child && start === -1) {
        find(child)
        start = index + 1
      } else if (start !== -1) {
        ;(viable ? add : findAll)(children.slice(start, index))

        if (child) {
          find(child)
        }

        viable = null
        start = -1
      }
    }
  }

  // Convert `node` (hast) to nlcst.
  function one(node) {
    var replacement
    var change

    if (node.type === 'text') {
      replacement = parser.tokenize(node.value)
      change = true
    } else if (node.type === 'element' && !ignore(node)) {
      if (node.tagName === 'wbr') {
        replacement = [parser.tokenizeWhiteSpace(' ')]
        change = true
      } else if (node.tagName === 'br') {
        replacement = [parser.tokenizeWhiteSpace('\n')]
        change = true
      } else if (source(node)) {
        replacement = [parser.tokenizeSource(textContent(node))]
        change = true
      } else {
        replacement = all(node.children)
      }
    }

    return change
      ? patch(replacement, location, location.toOffset(position.start(node)))
      : replacement
  }

  // Convert all `children` (hast) to nlcst.
  function all(children) {
    var results = []
    var index = -1

    while (++index < children.length) {
      push.apply(results, one(children[index]) || [])
    }

    return results
  }

  // Patch a position on each node in `nodes`.
  // `offset` is the offset in `file` this run of content starts at.
  //
  // Note that nlcst nodes are concrete, meaning that their starting and ending
  // positions can be inferred from their content.
  function patch(nodes, location, offset) {
    var index = -1
    var start = offset
    var end
    var node

    while (++index < nodes.length) {
      node = nodes[index]

      if (node.children) {
        patch(node.children, location, start)
      }

      end = start + toString(node).length

      node.position = {
        start: location.toPoint(start),
        end: location.toPoint(end)
      }

      start = end
    }

    return nodes
  }
}

function dataNlcstSourced(node) {
  return node.properties.dataNlcst === 'source'
}

function dataNlcstIgnore(node) {
  return node.properties.dataNlcst === 'ignore'
}
