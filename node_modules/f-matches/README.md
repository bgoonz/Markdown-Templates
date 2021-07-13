# f-matches: Composable version of Lodash.matches()

An utility used by [Lebab][] for complex matching of AST nodes.

The package exports 4 curried functions:

- `matches :: Pattern -> Obj -> (Bool|Obj)`
- `extract :: Name -> Pattern -> Obj -> (Bool|Obj)`
- `extractAny :: Name -> Obj -> (Bool|Obj)`
- `matchesLength :: Pattern -> Array -> (Bool|Obj)`

For details, just read the source, it's really small.

Alternatively, [read how Lebab uses this for patterns in syntax trees.][lebab-blog]

## Example

```js
import {matches, matchesLength, extract} from "f-matches";

// Function for matching string literal
const isStringLiteral = matches({
    "type": "Literal",
    // Unlike in Lodash.matches(),
    // we can provide a function to assert if object field matches.
    "value": (v) => typeof v === 'string',
});

// Function for matching: <local> = require(<source>)
const isRequireDeclarator = matches({
    "type": "VariableDeclarator",
    // Store the matching identifier under key: "local"
    "id": extract("local", {
        "type": "Identifier",
    }),
    "init": {
        "type": "CallExpression",
        "callee": {
            "type": "Identifier",
            "name": "require"
        },
        "arguments": matchesLength([
            // Store the matching string literal under key: "source"
            extract("source", isStringLiteral),
        ]),
    },
});

// Function for matching: var <local> = require(<source>)
const isRequire = matches({
    "type": "VariableDeclaration",
    // Match array of exactly 1 element (not 1 or more elements, which is the default)
    "declarations": matchesLength([
        isRequireDeclarator,
    ]),
    "kind": "var",
});

// Transform require() call to ES6 import statement.
estraverse.replace(ast, {
    enter(node) {
        const match = isRequire(node);
        if (match) {
            return {
                "type": "ImportDeclaration",
                "specifiers": [
                    {
                        "type": "ImportDefaultSpecifier",
                        "local": match.local
                    }
                ],
                "source": match.source
            };
        }
    }
});
```

[Lebab]: https://github.com/lebab/lebab
[lebab-blog]: http://nene.github.io/2016/04/02/matches-ast
