[![Build Status](https://secure.travis-ci.org/xfix/python-format.png?branch=master)](http://travis-ci.org/xfix/python-format) 

`python-format` is implementation of Python's `str.format`. It works
both in browser and in Node.js. If you want to use this in Node.js,
just use `npm install python-format` in console.

```javascript
var format = require('python-format')
console.log(format('Hello, {}!', 'world'))
```

If you want to use this in browser, download
[python-format.js](https://raw.github.com/xfix/python-format/master/lib/python-format.js),
and if you want, pass it using your favorite JavaScript minifizer (I prefer
[UglifyJS](http://lisperator.net/uglifyjs/), but you can use other
minifizers).

For more details, see <http://docs.python.org/py3k/library/stdtypes.html#str.format>.

# Changelog
## 1.0.2
* Grouping of digits now works properly with @johnbellessa's patches.

## 1.0.1
* `-0` is returned instead of `0` when dealing with `format('{:g}', -0)`.

## 1.0.0
* First release
