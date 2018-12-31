# Developer Guide

Yorlang is an interpreted programming language built on NodeJS.

When you run `yorl <file>.yl` in your terminal, the `yorl` command is handled by the [cli.js](../cli.js) file, which uses [commander](https://www.npmjs.com/package/commander) to start the Yorlang interpreter, which performs the following actions:

## InputStream

The file path is passed into the [InputStream](./inputstream.js) instance, which reads the file's contents as a string.

An InputStream contains methods such as `next`, `peek` and `isEndOfFile`.

### - next()

It maintains a cursor position which begins at the beginning of the file, and everytime `next()` is called, the character at the position of the cursor is returned, and the cursor moved one-char forward.

---

[![How Yorlang's InputStream's `next()` works](https://user-images.githubusercontent.com/11996508/50557529-6fd8c780-0ce6-11e9-8129-50729991b236.png)](https://repl.it/@mykeels/yl-input-stream-next-demo)

> This [repl](https://repl.it/@mykeels/yl-input-stream-next-demo) shows how InputStream's `next()` works.

### - peek()

Rather than update the cursor position, the `peek()` function returns the character at the position of the cursor, and keeps its position the same.

### - isEndOfFile()

This returns a boolean value when the cursor has reached the end of the input file.

---

[![How Yorlang's InputStream's peek() and isEndOfFile() work](https://user-images.githubusercontent.com/11996508/50557505-0f498a80-0ce6-11e9-9616-4008d9fe0c87.png)](https://repl.it/@mykeels/yl-input-stream-peek-demo)

> This [repl](https://repl.it/@mykeels/yl-input-stream-peek-demo) shows how InputStream's `peek()` and `isEndOfFile()` work.

## Lexical Analyser

The [Lexer](./lexer.js) instance accepts an InputStream as an argument, and attempts to read each character, and recognise token such as identifiers, operators, keywords, and numbers.

A Lexer contains methods such as:

### - readWhile(predicate)

This will retrieve the next characters from the InputStream until a character is found that does not match the condition given by a predicate function.

> `readWhile((c) => c != ";")` will read characters until either one of them matches `";"`, or the end of the file is reached.

### - readNext()

This makes sure to skip whitespaces and comments, and depending on the nature of a character read, it calls and returns any of other methods such as:

### - readString()

This is called by `readNext()` when a quote character is found. It will attempt to read the characters until a closing quote is found. It returns a token object like:

```json
{ "type": "string", "value": "example string" }
```

### - readNumber()

This is called by `readNext()` when a digit is found. It will attempt to read a valid number (including dots), until no more digits can be found. It returns a token object like:

```json
{ "type": "number", "value": 0.123 }
```

### - readIdentifier()

This is called by `readNext()` when a character is found that matches the `constants.REGEX.IDENTIFIER` regex pattern. It will attempt to read subsequent characters that match the pattern, till either one is found that does not, or the end of file is reached. It returns a token object like:

```json
{ "type": "keyword", "value": "jeki" }
```

or

```json
{ "type": "variable", "value": "foo" }
```

### - isPunctuation()

This determines whether a character read is a punctuation. The list of punctuations can be found in `constants.LIST.PUNCTUATIONS`.

When `readNext()` detects a punctuation, it returns a token object like:

```json
{ "type": "punctuation", "value": "{" }
```

### - isOperator()

This determines whether a character read is an operator. The list of operators can be found in `constants.LIST.OPERATORS`.

When `readNext()` detects an operator, it returns a token object like:

```json
{ "type": "operator", "value": "+" }
```

### - next ()

This returns the token returned by the `readNext()` function.

### - peek ()

This returns the current token, while preventing the InputStream from advancing.

---

[![The Output Tokens of Yorlang's Lexer](https://user-images.githubusercontent.com/11996508/50558891-e62ef700-0cf1-11e9-993c-5c3b210eea2a.png)](https://repl.it/@mykeels/yl-input-lexer-demo)

> This [repl](https://repl.it/@mykeels/yl-input-lexer-demo) shows the output tokens of the Lexer.

## Parser

The `Parser` instance accepts a `Lexer` as an argument, and uses the [recursive descent parsing](https://en.wikipedia.org/wiki/Recursive_descent_parser) technique with backtracking, to read each token, handle operator precendence, and build an abstract syntax tree.

To do this, the Parser makes use of Parser Nodes. Each Parser Node contains logic for ensuring grammar expectations for a particular Yorlang construct are met.

> A Yorlang construct can be either a keyword such as `jeki` and `sope`, or a node literal such an `array` or `bracket expression`.

### - getNode()

Each Parser Node instance has a `getNode()` method, which contains logic for ensuring the keyword's or literal's grammar is correct.

Here's an example of the grammar for `jeki`:

```txt
jeki<whitespace><identifier><whitespace>=<expression>;
```

such as

```js
jeki name = "Yorlang";
```

The `getNode()` function output for the above code returns:

```json
{
  "operation": "=",
  "left": "name",
  "right": {
    "value": "Yorlang",
    "left": null,
    "right": null,
    "operation": null
  }
}
```

Notice how the `right` and `left` properties indicate a tree structure? This is an Abstract Syntax Tree.

---

[![The AST Output of Yorlang's Parser](https://user-images.githubusercontent.com/11996508/50559756-825cfc00-0cfa-11e9-9776-863bd5052f8d.png)](https://repl.it/@mykeels/yl-parser-demo)

> This [repl](https://repl.it/@mykeels/yl-parser-demo) shows the Abstract Syntax Tree outputs of the Parser.

---

See list of [other available parser nodes](./parsers/README.md).

The `Parser` instance contains methods such as:

### - parseWhile(list, fn)

This function takes a list of operators, and a function containing another `parseWhile` function as arguments, creating a recursive flow.

It will attempt to evaluate the function argument, before performing its own evaluation, which checks that the next token in the AST, can be found in the operator list argument.

If found, it'll return an object with properties `left`, `operation`, `right` and `value`.

### - parseExpression
