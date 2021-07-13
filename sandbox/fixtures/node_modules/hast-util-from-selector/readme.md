# hast-util-from-selector

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to create nodes from an advanced CSS selector.

## Install

[npm][]:

```sh
npm install hast-util-from-selector
```

## Use

```js
var from = require('hast-util-from-selector')

console.log(from('p svg[viewbox=0 0 10 10] circle[cx=10][cy=10][r=10]'))
```

Yields:

```js
{
  type: 'element',
  tagName: 'p',
  properties: {},
  children: [
    {
      type: 'element',
      tagName: 'svg',
      properties: {viewBox: '0 0 10 10'},
      children: [
        {
          type: 'element',
          tagName: 'circle',
          properties: {cx: '10', cy: '10', r: '10'},
          children: []
        }
      ]
    }
  ]
}
```

## API

### `fromSelector([selector][, options])`

Create one or more [*element*][element] [*node*][node]s from a CSS selector.

###### Parameters

*   `selector` (`string`, optional)
    — CSS selector
*   `space` (`string`, optional)
    — Treated as `options.space`
*   `options.space` (enum, `'svg'` or `'html'`, default: `'html'`)
    — Which space first element in the selector is in.
    When an `svg` is created in HTML, the space is switched automatically to SVG

###### Returns

[`Element`][element].

## Support

*   [x] `*` (universal selector, *creates a `div` in HTML, `g` in SVG*)
*   [x] `p` (type selector)
*   [x] `.class` (class selector)
*   [x] `#id` (id selector)
*   [x] `[attr]` (attribute existence, *creates a boolean*)
*   [x] `[attr=value]` (attribute equality)
*   [x] `article p` (descendant combinator)
*   [x] `article > p` (child combinator)
*   [x] `section h1 + p` (next-sibling combinator, *not at root*)
*   [x] `section h1 ~ p` (subsequent-sibling combinator, *not at root*)

## Security

Use of `from-selector` can open you up to a [cross-site scripting (XSS)][xss]
attack as values are injected into the syntax tree.

Either do not use user input in `from-selector` or use
[`hast-util-santize`][sanitize].

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-from-selector.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-from-selector

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-from-selector.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-from-selector

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-from-selector.svg

[downloads]: https://www.npmjs.com/package/hast-util-from-selector

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-from-selector.svg

[size]: https://bundlephobia.com/result?p=hast-util-from-selector

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/hast#nodes

[element]: https://github.com/syntax-tree/hast#element

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize
