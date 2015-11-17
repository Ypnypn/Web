﻿const tests = {

    // !
    '5!': '120',
    '`cat`!': '(cat cta act atc tca tac)',
    '(3⌐ 2 `a`)!': '((-3 2 a) (-3 a 2) (2 -3 a) (2 a -3) (a -3 2) (a 2 -3))',

    // &
    '25 43&': '9',
    '`adcacab``cbaedd`&': 'adcb',
    '(1 4 3 1 3 1 2)(3 2 1 5 4 4)&': '(1 4 3 2)',

    // (
    '((1 (1 2)(`ab`()))(1)())': '((1 (1 2) (ab ())) (1) ())',

    // *
    '1.2 .5*': '0.6',
    '`abcde`1.7*': 'abcdeabc',
    '5u1.7*': '(0 1 2 3 4 0 1 2)',

    // +
    '1.2 3.4+': '4.6',
    '`abc``de`+': 'abcde',
    '(1 2 ())(() `ab`)+': '(1 2 () () ab)',

    // -
    '1.2 3.4 -': '-2.2',

    // .
    '(1.2.3)': '(1.2 0.3)',

    // /
    '01.2-.5/': '-2',
    '`abcabcacbaab``ab`/': '( c cacba )',

    // 0
    '(0010)': '(0 0 10)',

    // :
    '7 3U:*)': '(0 2 6)',

    // <
    '1 2<': '1',
    '`abc``abcd`<': '1',
    '(1 3)(1 2)<': '0',

    // =
    '(1())(1())=': '1',
    '23`23`=': '1',
    '(1)1=': '1',
    '(1 2)`1,2`=': '1',

    // >
    '`1`2>': '0',
    '`10`2>': '1',
    '10`2`>': '1',

    // ?
    '0 1 2?': '2',
    '()1 2?': '2',
    '(``)1 2?': '1',

    // @
    '(`abc`@`.`+))': '(a. b. c.)',
    '(4@1+))': '(1 2 3 4)',

    // L
    '10L': '2.302585092994046',
    '`aBcD.E Fg h.i`L': 'abcd.e fg h.i',

    // T
    '`aBcD.E Fg h.i`T': 'Abcd.e Fg H.i',

    // U
    '04.5-U': '(-1 -2 -3 -4 -5)',
    '`aBcD.E Fg h.i`U': 'ABCD.E FG H.I',

    // V-Z
    '3Ww+': '6',

    // ]
    '()]': '(())',

    // ^
    '25 43^': '50',
    '`cadbabaccdca``bebacadabbac`^': 'cdcbeb',
    '(3 1 4 2 1 2 1 3 3 4 3 1)(2 5 2 1 3 1 4 1 2 2 1 3)^': '(3 4 3 2 5 2)',

    // g
    '`abcd`6g': 'c',
    '4u06-g': '2',

    // h
    '762⌐h': '-2FA',
    '`-2FA`h': '-762',

    // s
    '4.5 3 .5s': '(4.5 4 3.5 3)',
    '3 1`abcde`s': 'dc',
    '3 1 5us': '(3 2)',
    '`abcd`6 9s': 'ab9d',
    '`ab``abcbbaababc``xyz`s': 'xyzcbbaxyzxyzc',
    '4u06-\'zs': '(0 1 z 3)',
    '`1`(1`1`(1)`1`)`a`s': '(1 a (1) a)',

    // t
    '` \na \n`t': 'a',
    '((1 2 3)(4 5)(6 7 8 9))t': '((1 4 6) (2 5 7))',
    '(`abc``de``fghi`)t': '(adf beg)',

    // u
    '04.5-u': '(0 -1 -2 -3 -4)',
    '`caabacdab`u': 'cabd',
    '(`1`1(1)()(1)(())1()`1`)u': '(1 1 (1) () (()))',

    // v-z
    '(vwxyz)': '( \n 10 ()  )',

    // |
    '25 43|': '59',
    '`adcacab``cbaedd`|': 'adcacabed',
    '(1 4 3 1 3 1 2)(3 2 1 5 4 4)|': '(1 4 3 1 3 1 2 5 4)',

    // ~
    '3~': '-4',
    '`abc\\\\d\\`e`~': '7',
    '((())(1)1)~': '3',

    // «
    '3 5«': '96',
    '`abcdef`5«': 'abcde',
    '6u5«': '(0 1 2 3 4)',

    // ¬
    '()¬': '1',
    '`0`': '0',

    // »
    '114 5»': '3',
    '`abcdef`5»': 'bcdef',
    '6u5»': '(1 2 3 4 5)',

    // ÷
    '01.2-.5÷': '-2.4',

    // Σ
    '7uΣ': '21',

    // π
    'π': '3.141592653589793',

    // ˄
    '0˄1)': '0',
    '`0`˄1)': '1',

    // ˅
    '0˅1)': '1',
    '`0`˅1)': '0',

    // ″
    '(1)″+': '(1 1)',

    // ‴
    '((1)‴+)': '((1) (1 1))',

    // ₁
    '(1₁1 1 ₁)': '(1 11)',

    // ₂
    '(2₂2 1 2 ₂)': '(2 22 2)',

    //↑
    '2.5↑': '3.5',
    '`badc`↑': 'b',
    '(2 1 4 3)↑': '2',

    //↓
    '02.5-↓': '-3.5',
    '`badc`↓': 'c',
    '(2 1 4 3)↓': '3',

    // ↔
    '(1 2 ↔)': '(2 1)',

    // ↕
    '5 2 ↕': '(5 4 3 2)',

    // ↨
    '5 2 ↨': '(5 4 3)',

    // ∫
    '4U∫*)': '24',

    // ≠
    '(1 2)`(1 2)`≠': '1',

    // ≤
    '`abc``abc`≤': '1',

    // ≥
    '`ab``abc`≥': '0',

    // ⌐
    '5⌐': '-5',
    '`abc`⌐': 'cba',
    '(1 2 3)⌐': '(3 2 1)',
};



function runTests() {
    const passed = [], failed = [];
    for (var test in tests) {
        var expected = tests[test];
        var actual;
        try {
            actual = stringify(interpretLangName(test)[0][0]);
        } catch (e) {
            actual = 'ERROR: "' + e.message + '"';
        }
        if (actual === expected)
            passed.push({ test: test, expected: expected });
        else
            failed.push({ test: test, expected: expected, actual: actual });
    }
    return { passed: passed, failed: failed };
}