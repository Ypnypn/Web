const documentation = {
    '!': {
        'n': 'Factorial of `a`',
        's': 'Permutations of `a`',
        'a': 'Permutations of `a`'
    },
    '&': {
        'nn': 'Bitwise-and of `a` and `b`',
        'ss': 'Intersection of `a` and `b`, in order of appearance in `a`',
        'aa': 'Intersection of `a` and `b`, in order of appearance in `a`'
    },
    '\'': {
        '': 'Single-character string'
    },
    '(': {
        '': 'Collect in array'
    },
    '*': {
        'nn': '`a` times `b`',
        'sn': '`a` repeated `b` times',
        'an': '`a` repeated `b` times'
    },
    '+': {
        'nn': '`a` plus `b`',
        'ss': 'Concatenation of `a` and `b`',
        'aa': 'Concatenation of `a` and `b`'
    },
    '-': {
        'nn': '`a` minus `b`'
    },
    '/': {
        'nn': '`a` divided by `b`, truncated to integer',
        'ss': '`a` split by `b`'
    },
    ':': {
        '??': 'Execute for each of `a` and `b`, and wrap in array'
    },
    '<': {
        '??': '`a` is less than `b`'
    },
    '=': {
        '??': '`a` equals `b`'
    },
    '>': {
        '??': '`a` is greater than `b`'
    },
    '?': {
        '???': 'If `a`, then `b`, else `c`'
    },
    '@': {
        '?': 'Execute for each of `a`'
    },
    'L': {
        'n': 'Natural logarithm of `a`',
        's': '`a` in lower case'
    },
    'S': {
        's': 'Sorted characters of `a`',
        'a': 'Sotered elements of `a`'
    },
    'T': {
        's': 'Each word of `a` capitalized'
    },
    'U': {
        'n': 'Integers from 1 (inclusive) to `a` (inclusive)',
        's': '`a` in upper case'
    },
    'V': {
        '': 'Set to `v`'
    },
    'W': {
        '': 'Set to `w`'
    },
    'X': {
        '': 'Set to `x`'
    },
    'Y': {
        '': 'Set to `y`'
    },
    'Z': {
        '': 'Set to `z`'
    },
    '\\': {
        '?': 'Map `a`'
    },
    ']': {
        '?': 'Array containing just `a`'
    },
    '^': {
        'nn': 'Bitwise-xor of `a` and `b`',
        'ss': 'Characters of `a` not in `b`, then characters of `b` not in `a`',
        'aa': 'Elements of `a` not in `b`, then elements of `b` not in `a`'
    },
    '`': {
        '': 'String literal, with `\\` used to escape'
    },
    'g': {
        'sn': 'The `b`\'th character of `a`',
        'an': 'The `b`\'th element of `a`'
    },
    'h': {
        'n': '`a` in hexadecimal',
        's': '`a`, treated as hexacidemal'
    },
    'i': {
        '': 'Read one character from input'
    },
    'l': {
        '': 'Read one line from input'
    },
    'r': {
        '': 'Read entire input'
    },
    's': {
        'nnn': 'Numbers from `a` (inclusive) to `b` (inclusive), with a step of `c`',
        'nns': 'Characters from index `a` (inclusive) to `b` (exclusive) of `c`',
        'nna': 'Elements from index `a` (inclusive) to `b` (exclusive) of `c`',
        'sn?': '`a`, with the `b`\'th character replaced with `c`',
        'sss': '`b`, with each `a` replaced with `c`',
        'an?': '`a`, with the `b`\'th element replaced with `c`',
        '?a?': '`b`, with each `a` replaced with `c`'
    },
    't': {
        's': '`a` with leading and trailing whitespace removed',
        'a': '`a` transposed'
    },
    'u': {
        'n': 'Integers from 0 (inclusive) until `a` (exclusive)',
        's': 'Unique characters of `a`, in order of first appearance',
        'a': 'Unique elements of `a`, in order of first appearance'
    },
    'v': {
        '': 'Variable (initialized to empty string)'
    },
    'w': {
        '': 'Variable (initialized to newline)'
    },
    'x': {
        '': 'Variable (initialized to 10)'
    },
    'y': {
        '': 'Variable (initialized to empty array)'
    },
    'z': {
        '': 'Variable (initialized to space)'
    },
    '|': {
        'nn': 'Bitwise-or of `a` and `b`',
        'ss': 'Union of `a` and `b`, in the order of `a` followed by remaining characters of `b`',
        'aa': 'Union of `a` and `b`, in the order of `a` followed by remaining elements of `b`'
    },
    '~': {
        'n': 'Bitwise-not of `a`',
        's': 'Length of `a`',
        'a': 'Length of `a`'
    },
    '«': {
        'nn': '`a` shifted left by `b`',
        'sn': 'First `b` characters of `b`',
        'an': 'First `b` elements of `b`'
    },
    '¬': {
        '?': 'Logical not of `a`'
    },
    '»': {
        'nn': '`a` shifted right by `b`',
        'sn': 'Last `b` characters of `b`',
        'an': 'Last `b` elements of `b`'
    },
    '÷': {
        'nn': '`a` divided by `b`'
    },
    'Σ': {
        'a': 'Sum of elements of `a`'
    },
    'π': {
        '': 'Pi'
    },
    '˄': {
        '?': 'If `a` is false, leave on stack; otherwise, execute'
    },
    '˅': {
        '?': 'If `a` is true, leave on stack; otherwise, execute'
    },
    '″': {
        '?': 'Two copies of `a`'
    },
    '‴': {
        '?': 'Three copies of `a`'
    },
    '₁': {
        '': 'If preceded by a numeral, begin a new number starting with 1; otherwise, remove top of stack'
    },
    '₂': {
        '': 'If preceded by a numeral, begin a new number starting with 2; otherwise, remove second-to-top of stack'
    },
    '↑': {
        'n': '`a` plus one',
        's': 'First character of `a`',
        'a': 'First element of `a`'
    },
    '↓': {
        'n': '`a` minus one',
        's': 'Last character of `a`',
        'a': 'Last element of `a`'
    },
    '↔': {
        '??': '`b`, then `a`'
    },
    '↕': {
        'nn': 'Integers from `a` (inclusive) to `b` (inclusive)'
    },
    '↨': {
        'nn': 'Integers from `a` (inclusive) to `b` (exclusive)'
    },
    '∫': {
        '?': 'Reduce `a`'
    },
    '≠': {
        '??': '`a` is not equal to `b`'
    },
    '≤': {
        '??': '`a` is less than or equal to `b`'
    },
    '≥': {
        '??': '`a` is greater than or equal to `b`'
    },
    '⌐': {
        'n': 'Opposite of `a`',
        's': 'Reverse of `a`',
        'a': 'Reverse of `a`'
    }
};