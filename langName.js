"use strict";
window.interpretLangName = (function () {

    function interpret(code, input, options) {

        code = code || '';
        input = input || '';
        options = options || {};

        var error = '';
        for (var c of code)
            if (allLangNameChars.indexOf(c) === -1)
            error += `Contains illegal character: '${c}'\n`;
        if (error.length !== 0)
            throw new Error(error);

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

        const vars = options.vars || {
            v: '',
            w: '\n',
            x: 10,
            y: [],
            z: ' '
        };

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
                } else if ((ch >= '1' && ch <= '9') || ch === '.') {
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
                    } else if (arity === 101) {
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1);
                        stack.push(...result);
                    } else if (arity === 2) {
                        const arg2 = stack.pop();
                        const arg1 = stack.pop();
                        const result = chars[ch](arg1, arg2);
                        stack.push(result);
                    } else if (arity === 102) {
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
                        throw new Error(`unrecognized symbol: '${ch}'`);
                    }
                }
            }
        }

        const chars = {
            '!': function (a) {
                if (typeof (a) === 'number') {
                    const num = Math.abs(a | 0);
                    var res = 1;
                    for (var i = 1; i <= num; i++)
                        res *= i;
                    return res;
                }

                function strPermute(str) {
                    if (str.length === 1)
                        return [str];
                    if (str.length === 0)
                        return [];
                    return [].concat(...[...str].map((c, i) => strPermute(str.substring(0, i) +str.substring(i +1)).map(s=>c +s)));
                }

                if (typeof (a) === 'string') {
                    return strPermute(a);
                }

                function arrPermute(arr) {
                    if (arr.length === 1)
                        return [arr];
                    if (arr.length === 0)
                        return [];
                    return [].concat(...arr.map((e, i) => arrPermute(arr.slice(0, i).concat(arr.slice(i+1))).map(s=>[e].concat(s))));
                }

                if (Array.isArray(a)) {
                    return arrPermute(a);
                }
            },
            '&': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a & b;
                if (typeof (a) === 'string' && typeof (b) === 'string') {
                    var temp = b.slice();
                    var ret = '';
                    for (var c of a) {
                        var index = temp.indexOf(c);
                        if (index !== -1) {
                            ret += c;
                            temp = temp.slice(0, index) + temp.slice(index + 1);
                        }
                    }
                    return ret;
                }
                if (Array.isArray(a) && Array.isArray(b)) {
                    var temp = b.slice();
                    var ret = [];
                    for (var o of a) {
                        var index = temp.findIndex(e => typeof (e) === typeof (o) && compare(e, o) === 0);
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
                    var arr = Array(a.length * b | 0);
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
            'L': function (a) {
                if (typeof (a) === 'number')
                    return Math.log(a);
                if (typeof (a) === 'string')
                    return a.toLowerCase();
            },
            'S': function (a) {
                if (typeof (a) === 'string') {
                    var arr = [...a];
                    arr.sort();
                    return arr.join('');
                }
                if (Array.isArray(a)) {
                    var ret = a.slice();
                    ret.sort();
                    return ret;
                }
            },
            'T': function (a) {
                if (typeof (a) === 'string')
                    return a.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            },
            'U': function (a) {
                if (typeof (a) === 'number') {
                    if (a >= 0) {
                        var arr = Array(Math.ceil(a));
                        for (var i = 0; i < arr.length; i++)
                            arr[i] = i + 1;
                        return arr;
                    } else {
                        var arr = Array(Math.ceil(-a));
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
            '^': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a ^ b;
                if (typeof (a) === 'string' && typeof (b) === 'string') {
                    var c = a;
                    var d = b;
                    for (var i = c.length - 1; i >= 0; i--) {
                        var dInd = d.lastIndexOf(c[i]);
                        if (dInd !== -1) {
                            c = c.slice(0, i) + c.slice(i + 1);
                            d = d.slice(0, dInd) + d.slice(dInd + 1);
                        }
                    }
                    return c + d;
                }
                if (Array.isArray(a) && Array.isArray(b)) {
                    var c = a.slice();
                    var d = b.reverse();
                    for (var i = c.length - 1; i >= 0; i--) {
                        var dInd = d.findIndex(e => typeof (e) === typeof (c[i]) && compare(e, c[i]) === 0);
                        if (dInd !== -1) {
                            c.splice(i, 1);
                            d.splice(dInd, 1);
                        }
                    }
                    return c.concat(d.reverse());
                }
            },
            'i': function () {
                return getInput();
            },
            'g': function (a, b) {
                if (typeof (a) === 'string' && typeof (b) === 'number') {
                    const size = a.length;
                    return a[(b % size + size) % size];
                }
                if (Array.isArray(a) && typeof (b) === 'number') {
                    const size = a.length;
                    return a[(b % size + size) % size];
                }
            },
            'h': function (a) {
                if (typeof (a) === 'number')
                    return a.toString(16).toUpperCase();
                if (typeof (a) === 'string')
                    return parseInt(a, 16);
            },
            'l': function () {
                var ret = '';
                var first;
                while ((first = getInput()) !== '\n' && first !== null)
                    ret += first;
                return ret;
            },
            'o': function(a) {
                if (typeof (a) === 'number')
                    return String.fromCharCode(a);
                if (typeof (a) === 'string')
                    return a.charCodeAt(0);
            },
            'p': function (a) {
                if (typeof (a) === 'number') {
                    var num = Math.abs(a | 0);
                    if (num < 2)
                        return [a | 0];
                    var factors = a === num ? [] : [-1];
                    for (var prime of[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]) {
                        while (num % prime === 0) {
                            factors.push(prime);
                            num /= prime;
                        }
                        if (num === 1)
                            return factors;
                    }
                    for (var divisor = 101; divisor * divisor <= num; divisor += 2) {
                        while (num % divisor === 0) {
                            factors.push(divisor);
                            num /= divisor;
                        }
                    }
                    if (num === 1)
                        return factors;
                    factors.push(num);
                    return factors;
                }
                if (typeof (a) === 'string') {
                    var arr = [...a];
                    var resultSize = 1 << a.length;
                    var result = Array(resultSize);
                    for (var i = 0; i < resultSize; i++) {
                        result[i] = arr.filter((c, j) => (1 << j) & i).join('');
                    }
                    return result;
                }
                if (Array.isArray(a)) {
                    var resultSize = 1 << a.length;
                    var result = Array(resultSize);
                    for (var i = 0; i < resultSize; i++) {
                        result[i] = a.filter((e, j) => (1 << j) & i);
                    }
                    return result;
                }
            },
            'r': function () {
                var ret = '';
                var first;
                while ((first = getInput()) !== null)
                    ret += first;
                return ret;
            },
            's': function (a, b, c) {
                if (typeof (a) === 'number' && typeof (b) === 'number' && typeof (c) === 'number') {
                    var step = a < b ? Math.abs(c) : -Math.abs(c);
                    var arr = Array((b - a) / step + 1 | 0);
                    for (var i = 0; i < arr.length; i++)
                        arr[i] = a + i * step;
                    return arr;
                }
                if (typeof (a) === 'number' && typeof (b) === 'number' && typeof (c) === 'string') {
                    var size = c.length;
                    var start = (a % size + size) % size;
                    var stop = (b % size + size) % size;
                    if (stop >= start)
                        return c.slice(start, stop);
                    else
                        return strReverse(c.slice(stop + 1, start + 1));
                }
                if (typeof (a) === 'number' && typeof (b) === 'number' && Array.isArray(c)) {
                    var size = c.length;
                    var start = (a % size + size) % size;
                    var stop = (b % size + size) % size;
                    if (stop >= start)
                        return c.slice(start, stop);
                    else
                        return c.slice(stop + 1, start + 1).reverse();
                }
                if (typeof (a) === 'string' && typeof (b) === 'string' && typeof (c) === 'string') {
                    return b.split(a).join(c);
                }
                if (typeof (a) === 'string' && typeof (b) === 'number') {
                    var size = a.length;
                    var index = (b % size + size) % size;
                    return a.substring(0, index) + c + a.substring(index + 1);
                }
                if (Array.isArray(a) && typeof (b) === 'number') {
                    var size = a.length;
                    var ret = a.slice();
                    ret[(b % size + size) % size] = c;
                    return ret;
                }
                if (Array.isArray(b)) {
                    var ret = b.slice();
                    var size = b.length;
                    for (var i = 0; i < size; i++)
                        if (typeof (a) === typeof (b[i]) && compare(a, b[i]) === 0)
                            ret[i] = c;
                    return ret;
                }
            },
            't': function (a) {
                if (typeof (a) === 'string')
                    return a.trim();
                if (Array.isArray(a)) {
                    if (a.length === 0)
                        return a;
                    if (typeof (a[0]) === 'string') {
                        var minSize = Math.min(...a.map(b => b.length));
                        if (minSize === 0)
                            return [];
                        var ret = [];
                        for (var i = 0; i < minSize; i++) {
                            var str = '';
                            for (var b of a)
                                str += b[i];
                            ret.push(str);
                        }
                        return ret;
                    }
                    if (Array.isArray(a[0])) {
                        var minSize = Math.min(...a.map(b => b.length));
                        if (minSize === 0)
                            return [];
                        var ret = [];
                        for (var i = 0; i < minSize; i++) {
                            var sub = [];
                            for (var b of a)
                                sub.push(b[i]);
                            ret.push(sub);
                        }
                        return ret;
                    }
                }
            },
            'u': function (a) {
                if (typeof (a) === 'number') {
                    if (a >= 0) {
                        var arr = Array(Math.ceil(a))
                        for (var i = 0; i < arr.length; i++)
                            arr[i] = i;
                        return arr;
                    } else {
                        var arr = Array(Math.ceil(-a));
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
                        if (ret.every(b => typeof (b) !== typeof (c) || compare(b, c) !== 0))
                        ret.push(c);
                    return ret;
                }
            },
            '|': function (a, b) {
                if (typeof (a) === 'number' && typeof (b) === 'number')
                    return a | b;
                if (typeof (a) === 'string' && typeof (b) === 'string') {
                    var temp = b;
                    var ret = '';
                    for (var c of a) {
                        ret += c;
                        var index = temp.lastIndexOf(c);
                        if (index !== -1) {
                            temp = temp.slice(0, index) + temp.slice(index + 1);
                        }
                    }
                    return ret + temp;
                }
                if (Array.isArray(a) && Array.isArray(b)) {
                    var temp = b.reverse();
                    var ret = [];
                    for (var o of a) {
                        ret.push(o);
                        var index = temp.findIndex(e => typeof (e) === typeof (o) && compare(e, o) === 0);
                        if (index !== -1) {
                            temp.splice(index, 1);
                        }
                    }
                    return ret.concat(temp.reverse());
                }
            },
            '~': function (a) {
                if (typeof (a) === 'number')
                    return ~a;
                if (typeof (a) === 'string')
                    return a.length;
                if (Array.isArray(a))
                    return a.length;
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
            'π': function () {
                return Math.PI;
            },
            '″': function (a) {
                return [a, a];
            },
            '‴': function (a) {
                return [a, a, a];
            },
            '↑': function (a) {
                if (typeof (a) === 'number')
                    return a + 1;
                if (typeof (a) === 'string')
                    return a[0];
                if (Array.isArray(a))
                    return a[0];
            },
            '↓': function (a) {
                if (typeof (a) === 'number')
                    return a - 1;
                if (typeof (a) === 'string')
                    return a[a.length - 1];
                if (Array.isArray(a))
                    return a[a.length - 1];
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
                            arr[ind] = a - ind;
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
                var arg = stack.pop();
                for (var item of iterate(arg)) {
                    stack.push(item);
                    go();
                }
            },
            ':': function (go) {
                var arg2 = [...iterate(stack.pop())];
                var arg1 = [...iterate(stack.pop())];
                var size = Math.min(arg1.length, arg2.length);
                for (var i = 0; i < size; i++) {
                    stack.push(arg1[i], arg2[i]);
                    go();
                }
                var result = stack.splice(stack.length - size, size);
                stack.push(result);
            },
            '\\': function (go) {
                var arg = [...stack.pop()];
                var size = arg.length;
                for (var i = 0; i < size; i++) {
                    stack.push(arg[i]);
                    go();
                }
                var result = stack.splice(stack.length - size, size);
                stack.push(result);
            },
            '§': function (go) {
                var arg = stack.pop();
                var arr = [...arg];
                var vals = [];
                for (var val of arr) {
                    stack.push(val);
                    go();
                    vals.push([val, stack.pop()]);
                }
                vals.sort((a, b) => compare(a[1], b[1]));
                var res = vals.map(e => e[0]);
                stack.push(typeof (arg) === 'string' ? res.join('') : res);
            },
            '˄': function (go) {
                var arg = stack.pop();
                if (truthy(arg))
                    go();
                else
                    stack.push(arg);
            },
            '˅': function (go) {
                var arg = stack.pop();
                if (!truthy(arg))
                    go();
                else
                    stack.push(arg);
            },
            '∫': function (go) {
                var arg = stack.pop();
                var arr = [...iterate(arg)];
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
    '§«¬»÷Σπ˄˅″‴₁₂↑↓↔↕↨∫≠≤≥⌐';

const arities = {
    '!': 1,
    '&': 2,
    '(': 200,
    '*': 2,
    '+': 2,
    '-': 2,
    '/': 2,
    ':': 202,
    '<': 2,
    '=': 2,
    '>': 2,
    '?': 3,
    '@': 201,
    'L': 1,
    'S': 1,
    'T': 1,
    'U': 1,
    '\\': 201,
    ']': 1,
    '^': 2,
    'g': 2,
    'h': 1,
    'i': 0,
    'l': 0,
    'o': 1,
    'p': 1,
    'r': 0,
    's': 3,
    't': 1,
    'u': 1,
    '|': 2,
    '~': 1,
    '§': 201,
    '«': 2,
    '¬': 1,
    '»': 2,
    '÷': 2,
    'Σ': 1,
    'π': 0,
    '˄': 201,
    '˅': 201,
    '″': 101,
    '‴': 101,
    '↑': 1,
    '↓': 1,
    '↔': 102,
    '↕': 2,
    '↨': 2,
    '∫': 201,
    '≠': 2,
    '≤': 2,
    '≥': 2,
    '⌐': 1
};

function stringify(val) {
    if (Array.isArray(val))
        return '(' + val.map(stringify).join(' ') + ')';
    return val + '';
}