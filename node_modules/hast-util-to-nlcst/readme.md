# hast-util-to-nlcst

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to transform to [**nlcst**][nlcst].

> **Note**: You probably want to use [`rehype-retext`][rehype-retext].

## Install

[npm][]:

```sh
npm install hast-util-to-nlcst
```

## Use

Say we have the following `example.html`:

```html
<article>
  Implicit.
  <h1>Explicit: <strong>foo</strong>s-ball</h1>
  <pre><code class="language-foo">bar()</code></pre>
</article>
```

…and next to it, `index.js`:

```js
var rehype = require('rehype')
var vfile = require('to-vfile')
var English = require('parse-english')
var inspect = require('unist-util-inspect')
var toNlcst = require('hast-util-to-nlcst')

var file = vfile.readSync('example.html')
var tree = rehype().parse(file)

console.log(inspect(toNlcst(tree, file, English)))
```

Which, when running, yields:

```txt
RootNode[2] (1:1-6:1, 0-134)
├─ ParagraphNode[3] (1:10-3:3, 9-24)
│  ├─ WhiteSpaceNode: "\n  " (1:10-2:3, 9-12)
│  ├─ SentenceNode[2] (2:3-2:12, 12-21)
│  │  ├─ WordNode[1] (2:3-2:11, 12-20)
│  │  │  └─ TextNode: "Implicit" (2:3-2:11, 12-20)
│  │  └─ PunctuationNode: "." (2:11-2:12, 20-21)
│  └─ WhiteSpaceNode: "\n  " (2:12-3:3, 21-24)
└─ ParagraphNode[1] (3:7-3:43, 28-64)
   └─ SentenceNode[4] (3:7-3:43, 28-64)
      ├─ WordNode[1] (3:7-3:15, 28-36)
      │  └─ TextNode: "Explicit" (3:7-3:15, 28-36)
      ├─ PunctuationNode: ":" (3:15-3:16, 36-37)
      ├─ WhiteSpaceNode: " " (3:16-3:17, 37-38)
      └─ WordNode[4] (3:25-3:43, 46-64)
         ├─ TextNode: "foo" (3:25-3:28, 46-49)
         ├─ TextNode: "s" (3:37-3:38, 58-59)
         ├─ PunctuationNode: "-" (3:38-3:39, 59-60)
         └─ TextNode: "ball" (3:39-3:43, 60-64)
```

## API

### `toNlcst(tree, file, Parser)`

Transform the given [**hast**][hast] [*tree*][tree] to [**nlcst**][nlcst].

##### Parameters

*   `tree` ([`HastNode`][hast-node])
    — [*Tree*][tree] with [positional info][positional-information]
    ([`HastNode`][hast-node])
*   `file` ([`VFile`][vfile])
    — Virtual file
*   `parser` (`Function`)
    — [**nlcst**][nlcst] parser, such as [`parse-english`][english],
    [`parse-dutch`][dutch], or [`parse-latin`][latin]

##### Returns

[`NlcstNode`][nlcst-node].

##### Notes

###### Implied paragraphs

The algorithm supports implicit and explicit paragraphs, such as:

```html
<article>
  An implicit paragraph.
  <h1>An explicit paragraph.</h1>
</article>
```

Overlapping paragraphs are also supported (see the tests or the HTML spec for
more info).

###### Ignored nodes

Some elements are ignored and their content will not be present in
[**nlcst**][nlcst]: `<script>`, `<style>`, `<svg>`, `<math>`, `<del>`.

To ignore other elements, add a `data-nlcst` attribute with a value of `ignore`:

```html
<p>This is <span data-nlcst="ignore">hidden</span>.</p>
<p data-nlcst="ignore">Completely hidden.</p>
```

###### Source nodes

`<code>` elements are mapped to [`Source`][source] nodes in [**nlcst**][nlcst].

To mark other elements as source, add a `data-nlcst` attribute with a value
of `source`:

```html
<p>This is <span data-nlcst="source">marked as source</span>.</p>
<p data-nlcst="source">Completely marked.</p>
```

## Security

`hast-util-to-nlcst` does not change the original syntax tree so there are no
openings for [cross-site scripting (XSS)][xss] attacks.

## Related

*   [`mdast-util-to-nlcst`](https://github.com/syntax-tree/mdast-util-to-nlcst)
    — transform mdast to nlcst
*   [`mdast-util-to-hast`](https://github.com/syntax-tree/mdast-util-to-hast)
    — transform mdast to hast
*   [`hast-util-to-mdast`](https://github.com/syntax-tree/hast-util-to-mdast)
    — transform hast to mdast
*   [`hast-util-to-xast`](https://github.com/syntax-tree/hast-util-to-xast)
    — transform hast to xast
*   [`hast-util-sanitize`](https://github.com/syntax-tree/hast-util-sanitize)
    — sanitize hast nodes

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

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-to-nlcst.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-to-nlcst

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-nlcst.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-to-nlcst

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-to-nlcst.svg

[downloads]: https://www.npmjs.com/package/hast-util-to-nlcst

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-to-nlcst.svg

[size]: https://bundlephobia.com/result?p=hast-util-to-nlcst

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[english]: https://github.com/wooorm/parse-english

[latin]: https://github.com/wooorm/parse-latin

[dutch]: https://github.com/wooorm/parse-dutch

[rehype-retext]: https://github.com/rehypejs/rehype-retext

[tree]: https://github.com/syntax-tree/unist#tree

[positional-information]: https://github.com/syntax-tree/unist#positional-information

[hast]: https://github.com/syntax-tree/hast

[hast-node]: https://github.com/syntax-tree/hast#nodes

[nlcst]: https://github.com/syntax-tree/nlcst

[nlcst-node]: https://github.com/syntax-tree/nlcst#nodes

[vfile]: https://github.com/vfile/vfile

[source]: https://github.com/syntax-tree/nlcst#source

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
