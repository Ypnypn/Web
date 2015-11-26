﻿const tests = {

    // <LF>
    '(2\n3)': '(2 3)',

    // !
    '5!': '120',
    '`cat`!': '(cat cta act atc tca tac)',
    '(3⌐ 2 `a`)!': '((-3 2 a) (-3 a 2) (2 -3 a) (2 a -3) (a -3 2) (a 2 -3))',

    // %
    '07-3%': '-1',
    '`abcdefghijklm`2.5%': '(ab cde fg hij kl m)',
    '13U2.5%': '((1 2) (3 4 5) (6 7) (8 9 10) (11 12) (13))',
    '`ab3c45d678efg90``\\d{2,}`%': '(ab3c d efg )',
    '`x·yz·`(35`a`)%': 'x35yza',
    '(1987 6 5 4 3 2 10)`Yy-Mm-Oo-Dd H:h:N:n:S:s/L|l Aa W.w.x`%': '198787-JulyJul-077-055 04:4:03:3:02:2/010|01 AMam Sunday.Sun.0',
    '(`abc``d``efgh```)(`xy``z```)%': '(abcx dzzz efgh xyxy)',
    '((1 2 3)(4)(5 6 7 8)())((`a``b`) (`c`) ())%':'((1 2 3 a) (4 c c c) (5 6 7 8) (a b a b))',

    // &
    '25 43&': '9',
    '`adcacab``cbaedd`&': 'adcb',
    '(1 4 3 1 3 1 2)(3 2 1 5 4 4)&': '(1 4 3 2)',

    // '
    '(2@\')o+)3)': '(41 42 3)',

    // (
    '((1 (1 2)(`ab`()))(1)())': '((1 (1 2) (ab ())) (1) ())',

    // *
    '1.2 .5*': '.6',
    '`abcde`1.7*': 'abcdeabc',
    '`ere``dr`*': '(ed er rd rr ed er)',
    '`th`1u*': '((t 0) (h 0))',
    '5u1.7*': '(0 1 2 3 4 0 1 2)',
    '(())`ab`*': '((() a) (() b))',
    '(1 2 (1))()*': '()',

    // +
    '1.2 3.4+': '4.6',
    '`abc``de`+': 'abcde',
    '(1 2 ())(() `ab`)+': '(1 2 () () ab)',

    // ,
    '3(1`a`),': '((1 a) (1 a) (1 a))',
    '`aAAaaaAaaaaaAAa``aa`,': '3',
    '(1(1)`1`1(1))(1),': '2',

    // -
    '(-1 23.5 -4 -0 -1.5)': '(-1 27.5 0 -1.5)',

    '1.2 3.4 -': '-2.2',
    '`acdacadca``ac`-': 'dadca',
    '(2(2 2)2(2)`2`(2))(2)-': '(2 (2 2) 2 2)',

    // .
    '(1.2.3)': '(1.2 .3)',
    '4.!': '(1 1 2 6)',
    '(4 5 6)(1 2).*': '(4 10 6)',

    // /
    '01.2-.5/': '-2',
    '`abcdefghijklm`5/': '(abc def ghi jk lm)',
    '`abcabcacbaab``ab`/': '( c cacba )',
    '15U5/': '((1 2 3) (4 5 6) (7 8 9) (10 11 12) (13 14 15))',

    // 0
    '(0010)': '(0 0 10)',

    // :
    '7 3U:*)': '(0 2 6 3 8 15 6)',

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

    // K
    '(5u@2>˄K)10)': '(0 0 0 10)',

    // L
    '10L': '2.302585092994046',
    '`aBcD.E Fg h.i`L': 'abcd.e fg h.i',

    // N
    '1234567890123N 2«': '(2009 1)',
    '`March 20, 2015`N': '(2015 2 20 0 0 0 0)',
    '(1975 11 11 11 11 11 111)N1000000000/': '187',

    // P
    '5P': '32',
    '` abc  d ef`P': '( abc  d ef)',
    '(`abc``d````ef`)P': 'abc d  ef',

    // Q
    '(1 2Q3 4)': '1',

    // S
    '.25S': '-2',
    '`the tests`S': ' eehssttt',
    '(3(2)`2`(2)(1 2))S': '((1 2) (2) 2 (2) 3)',

    // T
    '3.5T1/': '3162',
    '`aBcD.E Fg h.i`T': 'Abcd.e Fg H.i',
    '((1 2 3)(4 5)(6 7 8 9))T': '((1 4 6) (2 5 7) (3 8) (9))',
    '(`abc``de``fghi`)T': '(adf beg ch i)',

    // U
    '04.5-U': '(-1 -2 -3 -4 -5)',
    '`aBcD.E Fg h.i`U': 'ABCD.E FG H.I',

    // V-Z
    '3Ww+': '6',

    // [
    '(2 4 (2 3 2))[u)': '((0 1) (0 1 2 3) (2 3))',

    // \
    '(1 2 3\\)': '(1 (2 3))',

    // ]
    '()]': '(())',

    // ^
    '25 43^': '50',
    '`cadbabaccdca``bebacadabbac`^': 'cdcbeb',
    '(3 1 4 2 1 2 1 3 3 4 3 1)(2 5 2 1 3 1 4 1 2 2 1 3)^': '(3 4 3 2 5 2)',

    // _
    '-3.5_': '-1',
    '`abca`_': '(a b c a)',
    '((()(1)(`(1()(2 3)`(`a```))))_': '(1 (1()(2 3) a )',

    // `
    '(`ab\\`\\\\\\t``a`)': '(ab`\\\t a)',

    // g
    '7.5 09-g': '1.5',
    '`abcd`6g': 'c',
    '4u06-g': '2',

    // h
    '762⌐h': '-2FA',
    '`-2FA`h': '-762',

    // j
    '(25`ab`(7()`z`))`,`j': '25,ab,(7 () z)',

    // k
    '(1 2k3)': '(1 2 (1 2) 3)',
    
    // m
    '(2.7 3.3 3 -1)m': '2',

    // n
    'n~': '7',

    // o
    '8110o': 'ᾮ',
    '`∫`o': '8747',

    // p
    '04545-p': '(-1 3 3 5 101)',
    '`here`p': '( h e he r hr er her e he ee hee re hre ere here)',
    '(2 1 3)p': '(() (2) (1) (2 1) (3) (2 3) (1 3) (2 1 3))',

    // q
    '01.25-q': '-.8',
    '`bccaabac`q': '((a 3) (c 3) (b 2))',
    '(`1`1(1)1 1`1`)q': '((1 3) (1 2) ((1) 1))',

    // s
    '4.5 3 .5s': '(4.5 4 3.5 3)',
    '3 1`abcde`s': 'dc',
    '3 1 5us': '(3 2)',
    '`abcd`6 50s': 'ab50d',
    '`ab``abcbbaababc``xyz`s': 'xyzcbbaxyzxyzc',
    '4u06-\'zs': '(0 1 z 3)',
    '`1`(1`1`(1)`1`)`a`s': '(1 a (1) a)',

    // t
    '100t': '2',
    '` \na \n`t': 'a',
    '((1 2 3)(4 5)(6 7 8 9))t': '((1 4 6) (2 5 7))',
    '(`abc``de``fghi`)t': '(adf beg)',

    // u
    '04.5-u': '(0 -1 -2 -3 -4)',
    '`caabacdab`u': 'cabd',
    '(`1`1(1)()(1)(())1()`1`)u': '(1 1 (1) () (()))',

    // v-z
    '(vwxyz)': '( \n 10 ()  )',

    // {
    '3 4u{-': '(3 2 1 0)',

    // |
    '25 43|': '59',
    '`adcacab``cbaedd`|': 'adcacabed',
    '(1 4 3 1 3 1 2)(3 2 1 5 4 4)|': '(1 4 3 1 3 1 2 5 4)',

    // }
    '4u3}-': '(-3 -2 -1 0)',

    // ~
    '3~': '-4',
    '`abc\\\\d\\`e`~': '7',
    '((())(1)1)~': '3',

    // ¡
    '(2u¡3)': '(0 1 3)',

    // ¦
    '-4.5¦1¦+': '-4.51',
    '`abc`¦': 'abc',
    '(1 2+)¦(3 4+)¦+': '(3)(7)',

    // §
    '`the tests`§`i`<)': 'ttstshe e',
    '(3U4u2](1))§~)': '((2) (1) (1 2 3) (0 1 2 3))',

    // «
    '3 5«': '96',
    '`abcdef`5«': 'abcde',
    '6u5«': '(0 1 2 3 4)',

    // ¬
    '()¬': '1',
    '`0`': '0',

    // ²
    '3.5²': '12.25',
    '`aba`²': '(aa ab aa ba bb ba aa ab aa)',
    '(2 1)²': '((2 2) (2 1) (1 2) (1 1))',

    // ´
    '3 5u´-': '(3 2 1 0 -1)',

    // ·
    '`abc`·S': '1',
    '5u3·-': '(-3 -2 -1 0 1)',

    // »
    '114 5»': '3',
    '`abcdef`5»': 'bcdef',
    '6u5»': '(1 2 3 4 5)',

    // ½
    '3½': '1.5',
    '`abcdefgh`½' :'de',
    '7u½': '(3)',

    // ÷
    '01.2-.5÷': '-2.4',

    // ˄
    '0˄1)': '0',
    '`0`˄1)': '1',

    // ˅
    '0˅1)': '1',
    '`0`˅1)': '0',

    // ˦
    '-3.5 3˦': '3',
    '0⌐ 0˦q0>': '1',
    '`abdcdcdabcd``cd`˦': '3',
    '(1 2(2 1)(1 2)(1 2)1 2)(1 2)˦': '3',

    // ˨
    '-3.5 3˨': '-3.5',
    '0⌐ 0˨q0>': '0',
    '`abdcdcdabcd``cd`˨': '9',
    '(1 2(2 1)(1 2)(1 2)1 2)(1 2)˨': '4',

    // Σ
    '-53Σ': '-110101',
    '`-01101`Σ': '-13',
    '7uΣ': '21',

    // π
    'π': '3.141592653589793',

    // ‖
    '-7.5‖': '7.5',
    '(2 .5 -1.5 -3 -1″ 2.5 -3.5)‖': '6',

    // ″
    '(1)″+': '(1 1)',

    // ‴
    '((1)‴+)': '((1) (1 1))',

    // ⁞
    '(5⁞2))': '(2 2 2 2 2)',
    '`abcd`⁞*)': '( b cc ddd)',

    // ⁿ
    '4 .5ⁿ': '2',
    '`ab`3ⁿ': '(aaa aab aba abb baa bab bba bbb)',
    '(1 1 0)2ⁿ': '((1 1) (1 1) (1 0) (1 1) (1 1) (1 0) (0 1) (0 1) (0 0))',

    // ₁
    '(1₁1 1 ₁)': '(1 11)',

    // ₂
    '(2₂2 1 2 ₂)': '(2 22 2)',

    // ⅓
    '(1 2 3⅓)': '(3 1 2)',

    // ⅔
    '(1 2 3⅔)': '(2 3 1)',

    // ↑
    '2.5↑': '3.5',
    '`badc`↑': 'b',
    '(2 1 4 3)↑': '2',

    // ↓
    '02.5-↓': '-3.5',
    '`badc`↓': 'c',
    '(2 1 4 3)↓': '3',

    // ↔
    '(1 2 ↔)': '(2 1)',

    // ↕
    '5 2 ↕': '(5 4 3 2)',
    '`f``m`↕': 'fghijklm',

    // ↨
    '5 2 ↨': '(5 4 3)',
    '`m``f`↨': 'mlkjihg',

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

    //┐
    '-3.9┐': '-3',
    '`abcde`┐': 'bcde',
    '()┐': '()',

    //┘
    '7┘': '7',
    '`z`┘': '',
    '4u┘': '(0 1 2)',

    // ╞
    '-4`qwerty`╞': 'ertyqw',
    '`abc`(2())╞': 'abc(2 ())',
    '3u()╞': '(0 1 2 ())',

    // ╡
    '13x╡': '(7 8 9 0 1 2 3 4 5 6)',
    '`abc`72╡': '72abc',
    '(1)`a`╡': '(a 1)',

    // ▼
    '`accbdca`▼`b`>)': 'ccdc',

    // ◄
    '(1 2 3◄ 4 5)': '((1 2 3) 4 5)',

    // ◊
    '(5″◊`a`↔↓″)₁)': '(a a a a a)',

    // ●
    '(10●″3+↔5>))': '(3 4 5 6 7 8 9 6)',

    // ◘
    '5◘5<': '1',
    '`abc`◘~3=': '1',
    '4U◘∫*)24=': '1',

    // ◙
    '5◙″1/=': '1',
    '`abc`◙`d`<': '1',
    '7`a`,◙7=': '1',

    // ☺
    '3☺': 'Hello, world.',

    // ♦
    '(5♦`a`↔↓)₁)': '(a a a a a)',

    // ✶
    '-4.5✶': '-4.5',
    '`3 2+`✶': '5',
    '(`3 2 -``5`)✶': '(1 5)'
};

function runTests() {
    const passed = [], failed = [];
    for (var test in tests) {
        var expected = tests[test];
        var actual;
        try {
            actual = stringify(interpretPar(test)[0][0]);
        } catch (e) {
            actual = 'ERROR: "' + (e.message || e) + '"';
        }
        if (actual === expected)
            passed.push({ test: test, expected: expected });
        else
            failed.push({ test: test, expected: expected, actual: actual });
    }
    return { passed: passed, failed: failed };
}