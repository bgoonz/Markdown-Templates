var i = 0
function assert(expect) {
    var assert = require('assert')
    var args = Array.prototype.slice.call(arguments, 1)
    var msg = 'assert(format(' + args.map(JSON.stringify).join(', ')
        + ')) === ' + JSON.stringify(expect)
    var formatFunction = require('../lib/python-format')
    var result
    result = formatFunction.apply({}, args)
    try {
        assert.equal(result, expect, msg)
    }
    catch (exception) {
        console.log(formatFunction('Expected: {}', expect))
        console.log(formatFunction('Got:      {}', result))
        throw exception
    }
    console.log(formatFunction(' {:02d}: OK {}', ++i, msg))
}

assert('', '')
assert('a', 'a')
assert('ab', 'ab')
assert('a{', 'a{{')
assert('a}', 'a}}')
assert('{b', '{{b')
assert('}b', '}}b')
assert('a{b', 'a{{b')

// Examples from PEP 3101
assert('My name is Fred', 'My name is {0}', 'Fred')
assert('My name is Fred', 'My name is {0[name]}', {name: 'Fred'})
assert('My name is Fred :-{}', 'My name is {0} :-{{}}', 'Fred')

// Real examples
assert('abc', '{0}', 'abc')
assert('abc', '{0:}', 'abc')
assert('Xabc', 'X{0}', 'abc')
assert('abcX', '{0}X', 'abc')
assert('XabcY', 'X{0}Y', 'abc')
assert('abc', '{1}', 1, 'abc')
assert('Xabc', 'X{1}', 1, 'abc')
assert('abcX', '{1}X', 1, 'abc')
assert('XabcY', 'X{1}Y', 1, 'abc')
assert('-15', '{0}', -15)
assert('-15abc', '{0}{1}', -15, 'abc')
assert('-15Xabc', '{0}X{1}', -15, 'abc')
assert('{', '{{')
assert('}', '}}')
assert('{}', '{{}}')
assert('{x}', '{{x}}')
assert('{123}', '{{{0}}}', 123)
assert('{{0}}', '{{{{0}}}}')
assert('}{', '}}{{')
assert('}x{', '}}x{{')

// Weird field names
assert('baz', '{0[foo-bar]}', {'foo-bar': 'baz'})
assert('baz', '{0[foo bar]}', {'foo bar': 'baz'})
assert('3', '{0[ ]}', {' ': 3})
assert('42', '{0[]}', {'': 42})
assert('20', '{0.foo._x}', {foo: {_x: 20}})
assert('2010', '{1}{0}', 10, 20)
assert('abc', '{0._x.x}', {_x: {x: 'abc'}})
assert('abc', '{0[0]}', ['abc', 'def'])
assert('def', '{0[1]}', ['abc', 'def'])
assert('def', '{0[1][0]}', ['abc', ['def']])
assert('def', '{0[1][0].x}', ['abc', [{x: 'def'}]])

// Strings
assert('abc', '{0:.3s}', 'abc')
assert('ab', '{0:.3s}', 'ab')
assert('abc', '{0:.3s}', 'abcdef')
assert('', '{0:.0s}', 'abcdef')
assert('abc', '{0:3.3s}', 'abc')
assert('abc', '{0:2.3s}', 'abc')
assert('ab', '{0:2.2s}', 'abc')
assert('ab ', '{0:3.2s}', 'abc')
assert('result', '{0:x<0s}', 'result')
assert('result', '{0:x<5s}', 'result')
assert('result', '{0:x<6s}', 'result')
assert('resultx', '{0:x<7s}', 'result')
assert('resultxx', '{0:x<8s}', 'result')
assert('result ', '{0: <7s}', 'result')
assert('result ', '{0:<7s}', 'result')
assert(' result', '{0:>7s}', 'result')
assert('  result', '{0:>8s}', 'result')
assert(' result ', '{0:^8s}', 'result')
assert(' result  ', '{0:^9s}', 'result')
assert('  result  ', '{0:^10s}', 'result')

// Test fallback
assert('[object Object]', '{0}', {})
assert('', '{0}', [])
assert('1', '{0}', [1])

// Non-ASCII
assert("ABC\u0410\u0411\u0412", '{0:s}{1:s}', 'ABC', "АБВ")
assert("ABC", '{0:.3s}', "ABCАБВ")
assert("", '{0:.0s}', "ABCАБВ")

// Auto numbering
assert('10', '{}', 10)
assert('s    ', '{:5}', 's')
assert('10', '{._x}', {_x: 10})
assert('2', '{[1]}', [1, 2])
assert('1', '{[a]}', {a: 1, b: 2})
assert('a0b1c', 'a{}b{}c', 0, 1)

// g modifier
assert('0', '{:g}', 0)
assert('-0', '{:g}', -0)

// thousands
assert('1', '{:,}', '1')
assert('12', '{:,}', '12')
assert('123', '{:,}', '123')
assert('1,234', '{:,}', '1234')
assert('12,345', '{:,}', '12345')
assert('123,456', '{:,}', '123456')
assert('1,234,567', '{:,}', '1234567')
assert('12,345,678', '{:,}', '12345678')
assert('123,456,789', '{:,}', '123456789')

