# Developer Guide

Yorlang is an interpreted programming language built on NodeJS.

When you run `yorl <file>.yl` in your terminal, the `yorl` command is handled by the [cli.js](../cli.js) file, which uses [commander](https://www.npmjs.com/package/commander) to start the Yorlang interpreter, which performs the following actions:

## InputStream

The file path is passed into the [InputStream](./inputstream.js) instance, which reads the file's contents as a string.

An InputStream contains methods such as `next`, `peek` and `isEndOfFile`.

### - next()

It maintains a cursor position which begins at the beginning of the file, and everytime `next()` is called, the character immediately after the cursor is returned, and the cursor moved one-char forward.

> This [repl](https://repl.it/@mykeels/yl-input-stream-next-demo) shows how InputStream's `next()` works.

### - peek()

Rather than update the cursor position, the `peek()` function returns the character immediately after the cursor, and keeps its position the same.

### - isEndOfFile()

This returns a boolean value when the cursor has reached the end of the input file.

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

> This [repl](https://repl.it/@mykeels/yl-input-lexer-demo) shows the output tokens of the Lexer.

## Parser

The Parser instance accepts a Lexer as an argument, and uses the recursive descent parsing technique and backtracking, to read each token, handle operator precendence, and build an abstract syntax tree.
