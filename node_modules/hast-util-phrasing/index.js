var is = require('hast-util-is-element')
var has = require('hast-util-has-property')
var embedded = require('hast-util-embedded')
var bodyOKLink = require('hast-util-is-body-ok-link')

module.exports = phrasing

var list = [
  'a',
  'abbr',
  // `area` is in fact only phrasing if it is inside a `map` element.
  // However, since `area`s are required to be inside a `map` element, and it’s
  // a rather involved check, it’s ignored here for now.
  'area',
  'b',
  'bdi',
  'bdo',
  'br',
  'button',
  'cite',
  'code',
  'data',
  'datalist',
  'del',
  'dfn',
  'em',
  'i',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'map',
  'mark',
  'meter',
  'noscript',
  'output',
  'progress',
  'q',
  'ruby',
  's',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'template',
  'textarea',
  'time',
  'u',
  'var',
  'wbr'
]

function phrasing(node) {
  return (
    node.type === 'text' ||
    is(node, list) ||
    embedded(node) ||
    bodyOKLink(node) ||
    (is(node, 'meta') && has(node, 'itemProp'))
  )
}
