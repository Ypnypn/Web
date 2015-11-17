#LangName - <a href="http://ypnypn.github.io/LangName/index.html">try it now</a>

LangName is a stack-based language based on CJam and Pyth.    

##The encoding

LangName uses less than 256 characters, from across the Unicode range.    

On the website, you can simply type these characters from the keyboard, or use the buttons on the right of the page.    

Alternatively, you can use a hex-editor on your computer, and then upload a `.langname` file.    

For example, the following hex file:    

    1a 02

refers to the twenty-sixth button on the webpage (`9`), followed by the second (`!`). This encodes the program `9!`, which calculates 9 factorial, or 362880.    

Thus, this encoding uses only one byte per character. A consequence of this is that only those characters on the webpage can be used in LangName. For example, the tab character can not be used, even in string literals.    

##The language

A LangName program places values on the stack and performs operations on them.    

There are three common datatypes - numbers, strings, and arrays.    

Number literals mean what they are. If a literal starts with <code>0</code>, the next character begins a new number. When following a number literal, <code>&#x2081;</code> and <code>&#x2082;</code> also begin new literals.    

    12 034&#x2081;5     -- pushes 12, 0, 34, 15

String literals begin and end with `\``, with `\\` used to escape. Single-character literals can be made with `'`.

    `abc`'d`e\`\t\\f`   -- pushes "abc", "d", and "e`     \f"
	
Arrays can be created with the `(` operator, Lisp-style.    

    (2 3`abc`()          -- pushes (2 3 abc ())