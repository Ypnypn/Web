"use strict";
window.interpretLangName = (function () {

    function interpret(code, input, options) {

        options = options || {};

        const getInput = options.input || function () {
            if (input.length === 0)
                return null;
            const first = input[0];
            input = input.substring(1);
            return first;
        }

        const setOutput = options.output || function (a) { output += a; };
        var output = '';

        const stack = options.stack || [];

        const vars = {
            v: '',
            w: '\n',
            x: 10,
            y: [],
            z: ' '
        }

        const forwards = {};

        function parseForwards(start) {
            for (var i = start; i < code.length; i++) {
                if (code[i] in forwardChars) {
                    var forward = parseForwards(i + 1);
                    forwards[i] = forward;
                    i = forward;
                } else if (code[i] === ')') {
                    return i;
                }
            }
            return code.length;
        }

        function interpretSubprogram(sub, realStart) {

            realStart = realStart || 0;

            for (var i = 0; i < sub.length; i++) {
                const ch = sub[i];

                if (ch === ' ' || ch === '\n') {

                } else if (ch === "'") {
                    stack.push(sub[++i]);
                } else if (ch === '`') {
                    var str = '';
                    var nextChar;
                    for (i++; i < sub.length && (nextChar = sub[i]) !== '`'; i++) {
                        if (nextChar !== '\\') {
                            str += nextChar;
                        } else {
                            var next = sub[++i];
                            if (next === '\\' || next === '`')
                                str += next;
                            else if (next === 'n')
                                str += '\n';
                            else if (next === 'r')
                                str += '\r';
                            else if (next === 't')
                                str += '\t';
                            else
                                i--, str += '\\';
                        }
                    }
                    stack.push(str);
                } else if (ch === '0') {
                    stack.push(0);
                } else if (ch === '₁') {
                    if (i > 0 && sub[i - 1] >= '0' && sub[i - 1] <= '9') {
                        var j = i;
                        do j++; while ((sub[j] >= '0' && sub[j] <= '9') || sub[j] === '.');
                        stack.push(+('1' + sub.substring(i + 1, j)));
                        i = j - 1;
                    } else {
                        stack.pop();
                    }
                } else if (ch === '₂') {
                    if (i > 0 && sub[i - 1] >= '0' && sub[i - 1] <= '9') {
                        var j = i;
                        do j++; while ((sub[j] >= '0' && sub[j] <= '9') || sub[j] === '.');
                        stack.push(+('2' + sub.substring(i + 1, j)));
                        i = j - 1;
                    } else {
                        var top = stack.pop();
                        stack[stack.length - 1] = top;
                    }
                } else if ((ch >= '1' && ch <= '9') || ch == '.') {
                    var j = i;
                    do j++; while ((sub[j] >= '0' && sub[j] <= '9') || sub[j] === '.');
                    stack.push(+sub.substring(i, j));
                    i = j - 1;
                } else if (ch >= 'V' && ch <= 'Z') {
                    vars[ch.toLowerCase()] = stack[stack.length - 1];
                } else if (ch >= 'v' && ch <= 'z') {
                    stack.push(vars[ch]);
                } else if (ch in forwardChars) {
                    const end = forwards[realStart + i];
                    forwardChars[ch](function () {
                        interpretSubprogram(code.substring(realStart + i + 1, end), realStart + i + 1);
                    });
                    i = end - realStart;
                } else {
                    const arity = arities[ch];
                    if (arity === 0) {
                        const result = chars[ch]();
                        stack.push(result);
                    } else if (arity === 1) {
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1);
                        stack.push(result);
                    } else if (arity === 100) {
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1);
                        stack.push(...result);
                    } else if (arity === 2) {
                        const arg2 = stack.pop();
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1, arg2);
                        stack.push(result);
                    } else if (arity === 200) {
                        const arg2 = stack.pop();
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1, arg2);
                        stack.push(...result);
                    } else if (arity === 3) {
                        const arg3 = stack.pop();
                        const arg2 = stack.pop();
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1, arg2, arg3);
                        stack.push(result);
                    } else {
                        throw new Error('unrecognized symbol: ' + ch);
                    }
                }
            }
        }

        const chars = {
            '&': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a & b;
                if (Array.isArray(a) && Array.isArray(b)) {
                    var temp = b.slice();
                    var ret = [];
                    for (var o of a) {
                        var index = temp.indexOf(o)
                        if (index !== -1) {
                            ret.push(o);
                            temp.splice(index, 1);
                        }
                    }
                    return ret;
                }
            },
            '*': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a * b;
                if (typeof (a) === 'string' && typeof (b) === 'number') {
                    if (b < 0) {
                        a = strReverse(a);
                        b = -b;
                    }
                    return a.repeat(b) + a.substring(0, (b - (b | 0)) * a.length);
                }
                if (Array.isArray(a) && typeof (b) === 'number') {
                    if (b < 0) {
                        a = a.reverse();
                        b = -b;
                    }
                    var arr = Array(a.length * b);
                    for (var index = 0; index < arr.length; index++)
                        arr[index] = a[index % a.length];
                    return arr;
                }
            },
            '+': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a + b;
                if (typeof (a) === 'string' && typeof (b) === 'string')
                    return a + b;
                if (Array.isArray(a) && Array.isArray(b))
                    return a.concat(b);
            },
            '-': function (a, b) {
                return a - b;
            },
            '/': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return (a - a % b) / b;
                if (typeof (a) === 'string' && typeof (b) === 'number') {
                    var arr = Array(Math.ceil(a.length / b));
                    for (var ind = 0; ind < arr.length; ind++)
                        arr[ind] = a.substring(ind * b, (ind + 1) * b);
                    return arr;
                }
                if (typeof (a) === 'string' && typeof (b) === 'string')
                    return a.split(b);
                if (Array.isArray(a) && typeof (b) === 'number') {
                    var arr = Array(Math.ceil(a.length / b));
                    for (var ind = 0; ind < arr.length; ind++)
                        arr[ind] = a.slice(ind * b, (ind + 1) * b);
                    return arr;
                }
            },
            '<': function (a, b) {
                return +(compare(a, b) < 0)
            },
            '=': function (a, b) {
                return +(compare(a, b) === 0);
            },
            '>': function (a, b) {
                return +(compare(a, b) > 0);
            },
            '?': function (a, b, c) {
                return truthy(a) ? b : c;
            },
            'U': function (a) {
                if (typeof (a) === 'number') {
                    if (a >= 0) {
                        var arr = Array(a | 0);
                        for (var i = 0; i < arr.length; i++)
                            arr[i] = i + 1;
                        return arr;
                    } else {
                        var arr = Array(-a | 0);
                        for (var i = 0; i < arr.length; i++)
                            arr[i] = -i - 1;
                        return arr;
                    }
                }
                if (typeof (a) === 'string')
                    return a.toUpperCase();
            },
            ']': function (a) {
                return [a];
            },
            'i': function () {
                return getInput();
            },
            'g': function (a, b) {
                if (typeof (a) === 'string' && typeof (b) === 'number')
                    return a[b];
                if (Array.isArray(a) && typeof (b) === 'number')
                    return a[b];
            },
            'l': function () {
                var ret = '';
                var first;
                while ((first = getInput()) !== '\n' && first !== null)
                    ret += first;
                return ret;
            },
            'r': function () {
                var ret = '';
                var first;
                while ((first = getInput()) !== null)
                    ret += first;
                return ret;
            },
            't': function (a) {
                if (typeof (a) === 'string')
                    return a.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase());
                if (Array.isArray(a)) {
                    if (a.length === 0)
                        return a;
                    var minSize = Math.min(...a.map(b => b.length));
                    if (minSize === 0)
                        return [];
                    var ret = [];
                    for (var i = 0; i < minSize; i++) {
                        var sub = [];
                        a.forEach(b => sub.push(b[i]));
                        ret.push(sub);
                    }
                    return ret;
                }
            },
            'u': function (a) {
                if (typeof (a) === 'number') {
                    if (a >= 0) {
                        var arr = Array(a | 0);
                        for (var i = 0; i < arr.length; i++)
                            arr[i] = i;
                        return arr;
                    } else {
                        var arr = Array(-a | 0);
                        for (var i = 0; i < arr.length; i++)
                            arr[i] = -i;
                        return arr;
                    }
                }
                if (typeof (a) === 'string') {
                    var ret = '';
                    for (var c of a)
                        if (ret.indexOf(c) === -1)
                        ret += c;
                    return ret;
                }
                if (Array.isArray(a)) {
                    var ret = [];
                    for (var c of a)
                        if (ret.indexOf(c) === -1)
                        ret.push(c);
                    return ret;
                }
            },
            '|': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a | b;
                if (Array.isArray(a) && Array.isArray(b)) {
                    var temp = b.slice();
                    var ret = [];
                    for (var o of a) {
                        ret.push(o);
                        var index = temp.lastIndexOf(o)
                        if (index !== -1) {
                            temp.splice(index, 1);
                        }
                    }
                    return ret.concat(temp);
                }
            },
            '~': function (a) {
                return ~a;
            },
            '«': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a << b;
                if (typeof (a) === 'string' && typeof (b) === 'number')
                    return b >= 0 ? a.slice(0, b) : a.slice(a.length + b);
                if (Array.isArray(a) && typeof (b) === 'number')
                    return b >= 0 ? a.slice(0, b) : a.slice(a.length + b);
            },
            '¬': function (a) {
                return +!truthy(a);
            },
            '»': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a >> b;
                if (typeof (a) === 'string' && typeof (b) === 'number')
                    return b >= 0 ? a.slice(a.length - b) : a.slice(0, -b);
                if (Array.isArray(a) && typeof (b) === 'number')
                    return b >= 0 ? a.slice(a.length - b) : a.slice(0, -b);
            },
            '÷': function (a, b) {
                return a / b;
            },
            'Σ': function (a) {
                if (Array.isArray(a))
                    return a.reduce(chars['+']);
            },
            '″': function (a) {
                return [a, a];
            },
            '‴': function (a) {
                return [a, a, a];
            },
            '↔': function (a, b) {
                return [b, a];
            },
            '↕': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number') {
                    const size = Math.abs(b - a) + 1;
                    const arr = Array(size);
                    if (b >= a)
                        for (var ind = 0; ind < size; ind++)
                            arr[ind] = a + ind;
                    else
                        for (var ind = 0; ind < size; ind++)
                            arr[ind] = a - ind;
                    return arr;
                }
            },
            '↨': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number') {
                    const size = Math.abs(b - a);
                    const arr = Array(size);
                    if (b >= a)
                        for (var ind = 0; ind < size; ind++)
                            arr[ind] = a + ind;
                    else
                        for (var ind = 0; ind < size; ind++)
                            arr[ind] = a - ind - 1;
                    return arr;
                }
            },
            '≠': function (a, b) {
                return +(compare(a, b) !== 0);
            },
            '≤': function (a, b) {
                return +(compare(a, b) <= 0);
            },
            '≥': function (a, b) {
                return +(compare(a, b) >= 0);
            },
            '⌐': function (a, b) {
                if (typeof (a) === 'number')
                    return -a;
                if (typeof (a) === 'string')
                    return strReverse(a);
                if (Array.isArray(a))
                    return a.reverse();
            }
        };

        var forwardChars = {
            '(': function (go) {
                var stackSize = stack.length;
                go();
                var array = stack.splice(stackSize, stack.length - stackSize);
                stack.push(array);
            },
            '@': function (go) {
                var arg1 = stack.pop();
                for (var item of iterate(arg1)) {
                    stack.push(item);
                    go();
                }
            },
            '˄': function (go) {
                var arg1 = stack.pop();
                if (truthy(arg1))
                    go();
                else
                    stack.push(arg1);
            },
            '˅': function (go) {
                var arg1 = stack.pop();
                if (!truthy(arg1))
                    go();
                else
                    stack.push(arg1);
            }, '∫': function (go) {
                var arg1 = stack.pop();
                var arr = [...iterate(arg1)];
                if (arr.length !== 0) {
                    stack.push(arr[0]);
                    for (var item of iterate(arr.slice(1))) {
                        stack.push(item);
                        go();
                    }
                }
            }
        };

        parseForwards(0);
        interpretSubprogram(code);
        return [stack, output];
    }

    /* HELPER FUNCTIONS */

    function truthy(o) {
        return o && !(Array.isArray(o) && o.length === 0);
    }

    function compare(a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            for (var i = 0; i < a.length && i < b.length; i++) {
                var comp = compare(a[i], b[i]);
                if (comp !== 0)
                    return comp;
            }
            return a.length - b.length;
        } else {
            return a > b ? 1 : a < b ? -1 : 0;
        }
    }

    function iterate(a) {
        if (typeof (a) === 'number')
            return new Function('a', 'return function * () {                \
                                            if (a >= 0)                     \
                                                for (var i = 0; i < a; i++) \
                                                    yield i;                \
                                            else                            \
                                                for (var i = 0; i > a; i--) \
                                                    yield i;                \
                                        }                                       ')(a)();
        return a;
    }

    function strReverse(s) {
        var ret = '';
        for (var i = s.length; i-- > 0;) {
            ret += s[i];
        }
        return ret;
    }

    return interpret;
})();

const allLangNameChars =
    '\n !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~' +
    '«¬»÷Σ˄˅″‴₁₂↔↕↨∫≠≤≥⌐';

const arities = {
    '&': 2,
    '(': 200,
    '*': 2,
    '+': 2,
    '-': 2,
    '/': 2,
    '<': 2,
    '=': 2,
    '>': 2,
    '?': 3,
    '@': 201,
    'U': 1,
    ']': 1,
    'g': 2,
    'i': 0,
    'l': 0,
    'r': 0,
    't': 1,
    'u': 1,
    '|': 2,
    '~': 1,
    '«': 2,
    '¬': 1,
    '»': 2,
    '÷': 2,
    'Σ': 1,
    '˄': 201,
    '˅': 201,
    '″': 101,
    '‴': 101,
    '↔': 102,
    '↕': 2,
    '↨': 2,
    '∫': 201,
    '≠': 2,
    '≤': 2,
    '≥': 2,
    '⌐': 1
};